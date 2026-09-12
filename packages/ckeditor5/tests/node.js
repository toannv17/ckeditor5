/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import * as ckeditor5 from '../src/index.js';
import { describe, expect, it } from 'vitest';
import * as adapterCkfinder from 'toannv-ckeditor5-adapter-ckfinder';
import * as alignment from 'toannv-ckeditor5-alignment';
import * as autoformat from 'toannv-ckeditor5-autoformat';
import * as autosave from 'toannv-ckeditor5-autosave';
import * as basicStyles from 'toannv-ckeditor5-basic-styles';
import * as blockQuote from 'toannv-ckeditor5-block-quote';
import * as ckbox from 'toannv-ckeditor5-ckbox';
import * as ckfinder from 'toannv-ckeditor5-ckfinder';
import * as clipboard from 'toannv-ckeditor5-clipboard';
import * as cloudServices from 'toannv-ckeditor5-cloud-services';
import * as codeBlock from 'toannv-ckeditor5-code-block';
import * as core from 'toannv-ckeditor5-core';
import * as easyImage from 'toannv-ckeditor5-easy-image';
import * as editorBalloon from 'toannv-ckeditor5-editor-balloon';
import * as editorClassic from 'toannv-ckeditor5-editor-classic';
import * as editorDecoupled from 'toannv-ckeditor5-editor-decoupled';
import * as editorInline from 'toannv-ckeditor5-editor-inline';
import * as editorMultiRoot from 'toannv-ckeditor5-editor-multi-root';
import * as engine from 'toannv-ckeditor5-engine';
import * as enter from 'toannv-ckeditor5-enter';
import * as essentials from 'toannv-ckeditor5-essentials';
import * as findAndReplace from 'toannv-ckeditor5-find-and-replace';
import * as font from 'toannv-ckeditor5-font';
import * as heading from 'toannv-ckeditor5-heading';
import * as highlight from 'toannv-ckeditor5-highlight';
import * as horizontalLine from 'toannv-ckeditor5-horizontal-line';
import * as htmlEmbed from 'toannv-ckeditor5-html-embed';
import * as htmlSupport from 'toannv-ckeditor5-html-support';
import * as image from 'toannv-ckeditor5-image';
import * as indent from 'toannv-ckeditor5-indent';
import * as language from 'toannv-ckeditor5-language';
import * as link from 'toannv-ckeditor5-link';
import * as list from 'toannv-ckeditor5-list';
import * as markdownGfm from 'toannv-ckeditor5-markdown-gfm';
import * as mediaEmbed from 'toannv-ckeditor5-media-embed';
import * as mention from 'toannv-ckeditor5-mention';
import * as minimap from 'toannv-ckeditor5-minimap';
import * as pageBreak from 'toannv-ckeditor5-page-break';
import * as paragraph from 'toannv-ckeditor5-paragraph';
import * as pasteFromOffice from 'toannv-ckeditor5-paste-from-office';
import * as removeFormat from 'toannv-ckeditor5-remove-format';
import * as restrictedEditing from 'toannv-ckeditor5-restricted-editing';
import * as selectAll from 'toannv-ckeditor5-select-all';
import * as showBlocks from 'toannv-ckeditor5-show-blocks';
import * as sourceEditing from 'toannv-ckeditor5-source-editing';
import * as specialCharacters from 'toannv-ckeditor5-special-characters';
import * as style from 'toannv-ckeditor5-style';
import * as table from 'toannv-ckeditor5-table';
import * as typing from 'toannv-ckeditor5-typing';
import * as ui from 'toannv-ckeditor5-ui';
import * as undo from 'toannv-ckeditor5-undo';
import * as upload from 'toannv-ckeditor5-upload';
import * as utils from 'toannv-ckeditor5-utils';
import * as watchdog from 'toannv-ckeditor5-watchdog';
import * as widget from 'toannv-ckeditor5-widget';
import * as wordCount from 'toannv-ckeditor5-word-count';

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
