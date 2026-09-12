#!/usr/bin/env node

/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import upath from 'upath';
import fs from 'fs-extra';
import * as releaseTools from '@ckeditor/ckeditor5-dev-release-tools';
import { Listr } from 'listr2';
import { ListrInquirerPromptAdapter } from '@listr2/prompt-adapter-inquirer';
import { confirm } from '@inquirer/prompts';
import validateDependenciesVersions from './utils/validatedependenciesversions.mjs';
import parseArguments from './utils/parsearguments.mjs';
import { CKEDITOR5_ROOT_PATH } from '../constants.mjs';
import { RELEASE_NPM_DIRECTORY } from './utils/constants.mjs';
import getListrOptions from './utils/getlistroptions.mjs';
import assertNpmAuthorization from "@ckeditor/ckeditor5-dev-release-tools/lib/utils/assertnpmauthorization.js";
import assertPackages from "@ckeditor/ckeditor5-dev-release-tools/lib/utils/assertpackages.js";
import assertFilesToPublish from "@ckeditor/ckeditor5-dev-release-tools/lib/utils/assertfilestopublish.js";
import assertNpmTag from "@ckeditor/ckeditor5-dev-release-tools/lib/utils/assertnpmtag.js";
import executeInParallel from "@ckeditor/ckeditor5-dev-release-tools/lib/utils/executeinparallel.js";

const cliArguments = parseArguments( process.argv.slice( 2 ) );

const { tools, workspaces, npm } = await import( '@ckeditor/ckeditor5-dev-utils' );

const { rm } = await import( 'node:fs/promises' );

const { version: latestVersion } = fs.readJsonSync( upath.join( CKEDITOR5_ROOT_PATH, 'package.json' ) );

const tasks = new Listr( [
	{
		title: 'Validating CKEditor 5 packages.',
		task: () => {
			return validateDependenciesVersions( {
				packagesDirectory: RELEASE_NPM_DIRECTORY,
				version: latestVersion
			} );
		}
	},
	{
		title: 'Publishing packages.',
		task: async ( _, task ) => {
			return publishPackages( {
				packagesDirectory: RELEASE_NPM_DIRECTORY,
				npmOwner: 'toannv',
				npmTag: cliArguments.npmTag,
				listrTask: task,
				confirmationCallback: () => {
					if ( cliArguments.ci ) {
						return true;
					}

					return task.prompt( ListrInquirerPromptAdapter )
						.run( confirm, { message: 'Do you want to continue?' } );
				},
				optionalEntries: {
					// The `#default` key is used for all packages that do not have own definition.
					default: [
						// The CKEditor 5 framework does not define features.
						'ckeditor5-metadata.json'
					]
				},
				requireEntryPoint: true,
				optionalEntryPointPackages: [
					'ckeditor5'
				]
			} );
		}
	}

	// In merged monorepo release flow, pushing tags/commits is handled once by
	// `ckeditor5-commercial/scripts/release/publishpackages.mjs`.
], getListrOptions( cliArguments ) );

tasks.run()
	.catch( err => {
		process.exitCode = 1;

		console.error( err );
	} );

async function publishPackages( options ) {
	const {
		packagesDirectory,
		npmOwner,
		useOidc = false,
		listrTask,
		signal = null,
		npmTag = 'staging',
		disallowLatestNpmTag = false,
		optionalEntries = null,
		confirmationCallback = null,
		requireEntryPoint = false,
		optionalEntryPointPackages = [],
		cwd = process.cwd(),
		concurrency = 2,
		attempts = 5
	} = options;

	if ( useOidc ) {
		// npm exchanges the OIDC token only during supported operations, such as `npm publish`, and `npm whoami`
		// does not reflect Trusted Publishing authentication. Hence, only the token presence can be verified upfront.
		if ( !process.env.NPM_ID_TOKEN ) {
			throw new Error( 'The "NPM_ID_TOKEN" environment variable is required when publishing using npm Trusted Publishing (OIDC).' );
		}
	} else {
		await assertNpmAuthorization( npmOwner );
	}

	// Find packages that would be published...
	const packagePaths = await workspaces.findPathsToPackages( cwd, packagesDirectory );

	// ...and filter out those that have already been processed.
	// In other words, check whether a version per package (it's read from a `package.json` file)
	// is not available. Otherwise, a package is ignored.
	await removeAlreadyPublishedPackages( packagePaths );

	// Once again, find packages to publish after the filtering operation.
	const packagesToProcess = await workspaces.findPathsToPackages( cwd, packagesDirectory );

	if ( !packagesToProcess.length ) {
		listrTask.output = 'All packages have been published.';

		return Promise.resolve();
	}

	// No more attempts. Abort.
	if ( attempts <= 0 ) {
		throw new Error( 'Some packages could not be published.' );
	}

	await assertPackages( packagesToProcess, { requireEntryPoint, optionalEntryPointPackages } );
	await assertFilesToPublish( packagesToProcess, optionalEntries );
	await assertNpmTag( packagesToProcess, npmTag, { disallowLatestNpmTag } );

	const shouldPublishPackages = confirmationCallback ? await confirmationCallback() : true;

	if ( !shouldPublishPackages ) {
		return Promise.resolve();
	}

	for ( const path of packagesToProcess ) {
		console.log( path );
		await publishPackageOnNpmCallback( path, options );
	}

	listrTask.output = 'Let\'s give an npm a moment for taking a breath (~10 sec)...';

	await wait( 1000 * 10 );

	listrTask.output = 'Done. Let\'s continue. Re-executing.';

	// ...and try again.
	return publishPackages( {
		...options,
		confirmationCallback: null, // Do not ask again if already here.
		attempts: attempts - 1
	} );
}

async function publishPackageOnNpmCallback( packagePath, taskOptions ) {
	try {
		await tools.shExec( `npm publish --access=public --tag ${ taskOptions.npmTag }`, {
			cwd: packagePath,
			async: true,
			verbosity: 'silent'
		} );

		await rm( packagePath, { recursive: true, force: true } );
	} catch ( e ) {
		console.log( e );
		// Do nothing if an error occurs. A parent task will handle it.
	}
}

async function removeAlreadyPublishedPackages( packagePaths ) {
	for ( const absolutePackagePath of packagePaths ) {
		const pkgJsonFile = await fs.readFile( upath.join( absolutePackagePath, 'package.json' ), 'utf-8' );
		const pkgJson = JSON.parse( pkgJsonFile );
		const isAvailable = await npm.checkVersionAvailability( pkgJson.version, pkgJson.name );

		if ( !isAvailable ) {
			await fs.rm( absolutePackagePath, { recursive: true, force: true } );
		}
	}
}

function wait( time ) {
	return new Promise( resolve => {
		setTimeout( resolve, time );
	} );
}
