/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import * as ckeditor5 from '../src/index.js';
import { describe, expect, it } from 'vitest';
import * as adapterCkfinder from '@ckeditor-nonkey/ckeditor5-adapter-ckfinder';
import * as alignment from '@ckeditor-nonkey/ckeditor5-alignment';
import * as autoformat from '@ckeditor-nonkey/ckeditor5-autoformat';
import * as autosave from '@ckeditor-nonkey/ckeditor5-autosave';
import * as basicStyles from '@ckeditor-nonkey/ckeditor5-basic-styles';
import * as blockQuote from '@ckeditor-nonkey/ckeditor5-block-quote';
import * as ckbox from '@ckeditor-nonkey/ckeditor5-ckbox';
import * as ckfinder from '@ckeditor-nonkey/ckeditor5-ckfinder';
import * as clipboard from '@ckeditor-nonkey/ckeditor5-clipboard';
import * as cloudServices from '@ckeditor-nonkey/ckeditor5-cloud-services';
import * as codeBlock from '@ckeditor-nonkey/ckeditor5-code-block';
import * as core from '@ckeditor-nonkey/ckeditor5-core';
import * as easyImage from '@ckeditor-nonkey/ckeditor5-easy-image';
import * as editorBalloon from '@ckeditor-nonkey/ckeditor5-editor-balloon';
import * as editorClassic from '@ckeditor-nonkey/ckeditor5-editor-classic';
import * as editorDecoupled from '@ckeditor-nonkey/ckeditor5-editor-decoupled';
import * as editorInline from '@ckeditor-nonkey/ckeditor5-editor-inline';
import * as editorMultiRoot from '@ckeditor-nonkey/ckeditor5-editor-multi-root';
import * as engine from '@ckeditor-nonkey/ckeditor5-engine';
import * as enter from '@ckeditor-nonkey/ckeditor5-enter';
import * as essentials from '@ckeditor-nonkey/ckeditor5-essentials';
import * as findAndReplace from '@ckeditor-nonkey/ckeditor5-find-and-replace';
import * as font from '@ckeditor-nonkey/ckeditor5-font';
import * as heading from '@ckeditor-nonkey/ckeditor5-heading';
import * as highlight from '@ckeditor-nonkey/ckeditor5-highlight';
import * as horizontalLine from '@ckeditor-nonkey/ckeditor5-horizontal-line';
import * as htmlEmbed from '@ckeditor-nonkey/ckeditor5-html-embed';
import * as htmlSupport from '@ckeditor-nonkey/ckeditor5-html-support';
import * as image from '@ckeditor-nonkey/ckeditor5-image';
import * as indent from '@ckeditor-nonkey/ckeditor5-indent';
import * as language from '@ckeditor-nonkey/ckeditor5-language';
import * as link from '@ckeditor-nonkey/ckeditor5-link';
import * as list from '@ckeditor-nonkey/ckeditor5-list';
import * as markdownGfm from '@ckeditor-nonkey/ckeditor5-markdown-gfm';
import * as mediaEmbed from '@ckeditor-nonkey/ckeditor5-media-embed';
import * as mention from '@ckeditor-nonkey/ckeditor5-mention';
import * as minimap from '@ckeditor-nonkey/ckeditor5-minimap';
import * as pageBreak from '@ckeditor-nonkey/ckeditor5-page-break';
import * as paragraph from '@ckeditor-nonkey/ckeditor5-paragraph';
import * as pasteFromOffice from '@ckeditor-nonkey/ckeditor5-paste-from-office';
import * as removeFormat from '@ckeditor-nonkey/ckeditor5-remove-format';
import * as restrictedEditing from '@ckeditor-nonkey/ckeditor5-restricted-editing';
import * as selectAll from '@ckeditor-nonkey/ckeditor5-select-all';
import * as showBlocks from '@ckeditor-nonkey/ckeditor5-show-blocks';
import * as sourceEditing from '@ckeditor-nonkey/ckeditor5-source-editing';
import * as specialCharacters from '@ckeditor-nonkey/ckeditor5-special-characters';
import * as style from '@ckeditor-nonkey/ckeditor5-style';
import * as table from '@ckeditor-nonkey/ckeditor5-table';
import * as typing from '@ckeditor-nonkey/ckeditor5-typing';
import * as ui from '@ckeditor-nonkey/ckeditor5-ui';
import * as undo from '@ckeditor-nonkey/ckeditor5-undo';
import * as upload from '@ckeditor-nonkey/ckeditor5-upload';
import * as utils from '@ckeditor-nonkey/ckeditor5-utils';
import * as watchdog from '@ckeditor-nonkey/ckeditor5-watchdog';
import * as widget from '@ckeditor-nonkey/ckeditor5-widget';
import * as wordCount from '@ckeditor-nonkey/ckeditor5-word-count';

const packages = [
	adapterCkfinder,
	alignment,
	autoformat,
	autosave,
	basicStyles,
	blockQuote,
	ckbox,
	ckfinder,
	clipboard,
	cloudServices,
	codeBlock,
	core,
	easyImage,
	editorBalloon,
	editorClassic,
	editorDecoupled,
	editorInline,
	editorMultiRoot,
	engine,
	enter,
	essentials,
	findAndReplace,
	font,
	heading,
	highlight,
	horizontalLine,
	htmlEmbed,
	htmlSupport,
	image,
	indent,
	language,
	link,
	list,
	markdownGfm,
	mediaEmbed,
	mention,
	minimap,
	pageBreak,
	paragraph,
	pasteFromOffice,
	removeFormat,
	restrictedEditing,
	selectAll,
	showBlocks,
	sourceEditing,
	specialCharacters,
	style,
	table,
	typing,
	ui,
	undo,
	upload,
	utils,
	watchdog,
	widget,
	wordCount
];

describe( '"ckeditor5" Node build', () => {
	it( 'Re-exports everything', () => {
		for ( const pkg of packages ) {
			for ( const exportName of Object.keys( pkg ) ) {
				expect( ckeditor5[ exportName ], exportName ).toBe( pkg[ exportName ] );
			}
		}
	} );
} );
