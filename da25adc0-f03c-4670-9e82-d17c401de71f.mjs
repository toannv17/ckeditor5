export default async function publishPackageOnNpmCallback( packagePath, taskOptions ) {
	const { tools } = await import( '@ckeditor/ckeditor5-dev-utils' );
	const { rm } = await import( 'node:fs/promises' );

	try {
		await tools.shExec( `npm publish --access=public --tag ${ taskOptions.npmTag }`, {
			cwd: packagePath,
			async: true,
			verbosity: 'silent'
		} );

		await rm( packagePath, { recursive: true, force: true } );
	} catch {
		// Do nothing if an error occurs. A parent task will handle it.
	}
};