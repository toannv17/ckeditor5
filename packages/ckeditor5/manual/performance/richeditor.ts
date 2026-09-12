/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { ArticlePluginSet } from 'toannv-ckeditor5-core/tests/_utils/articlepluginset.js';

import { Alignment } from 'toannv-ckeditor5-alignment';
import { Autoformat } from 'toannv-ckeditor5-autoformat';
import { Autosave } from 'toannv-ckeditor5-autosave';
import { Strikethrough, Subscript, Superscript, Underline, Code } from 'toannv-ckeditor5-basic-styles';
import { CodeBlock } from 'toannv-ckeditor5-code-block';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from 'toannv-ckeditor5-font';
import { Highlight } from 'toannv-ckeditor5-highlight';
import { HorizontalLine } from 'toannv-ckeditor5-horizontal-line';
import { TodoList } from 'toannv-ckeditor5-list';
import { Mention } from 'toannv-ckeditor5-mention';
import { PageBreak } from 'toannv-ckeditor5-page-break';
import { PasteFromOffice } from 'toannv-ckeditor5-paste-from-office';
import { RemoveFormat } from 'toannv-ckeditor5-remove-format';
import { StandardEditingMode } from 'toannv-ckeditor5-restricted-editing';
import { SpecialCharacters, SpecialCharactersEssentials } from 'toannv-ckeditor5-special-characters';
import { TableProperties, TableCellProperties, TableColumnResize } from 'toannv-ckeditor5-table';
import { ImageUpload, ImageResize } from 'toannv-ckeditor5-image';
import { IndentBlock } from 'toannv-ckeditor5-indent';
import { UploadAdapterMock } from 'toannv-ckeditor5-upload/tests/_utils/mocks.js';
import { WordCount } from 'toannv-ckeditor5-word-count';

import { getPerformanceData, renderPerformanceDataButtons } from '../../tests/_utils/utils.js';

import smallTablesInlineCssFixture from '../../tests/_data/small-tables-inline-css.html?raw';

renderPerformanceDataButtons( document.querySelector( '#fixture-buttons' )!, {
	'smallTablesInlineCss': 'text and tables (styled)'
} );

let editor: any;

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			ArticlePluginSet,
			Alignment,
			Autoformat,
			Autosave,
			Strikethrough,
			Subscript,
			Superscript,
			Underline,
			Code,
			CodeBlock,
			FontBackgroundColor,
			FontColor,
			FontFamily,
			FontSize,
			Highlight,
			HorizontalLine,
			TodoList,
			Mention,
			PageBreak,
			PasteFromOffice,
			RemoveFormat,
			StandardEditingMode,
			SpecialCharacters,
			SpecialCharactersEssentials,
			TableProperties,
			TableCellProperties,
			TableColumnResize,
			ImageUpload,
			ImageResize,
			WordCount,
			IndentBlock
		],
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'strikethrough',
				'subscript',
				'superscript',
				'underline',
				'code',
				'alignment',
				'link',
				'removeFormat',
				'|',
				'fontBackgroundColor',
				'fontColor',
				'fontFamily',
				'fontSize',
				'highlight',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'outdent',
				'indent',
				'|',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'codeBlock',
				'horizontalLine',
				'pageBreak',
				'specialCharacters',
				'restrictedEditingException',
				'undo',
				'redo'
			],
			shouldNotGroupWhenFull: true
		},
		table: {
			contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties' ]
		},
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:wrapText',
				'imageStyle:breakText', '|',
				'toggleImageCaption',
				'imageTextAlternative'
			]
		}
	} )
	.then( newEditor => {
		// Editor is not exposed as window.editor to disable CKEditor5 Inspector for performance tests.
		editor = newEditor;

		addWordCountListener( newEditor );
		addUploadMockAdapter( newEditor );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

function addWordCountListener( editor: any ) {
	const wordCount: WordCount = editor.plugins.get( WordCount );
	const wordCountElement = document.getElementById( 'word-count' );
	const characterCountElement = document.getElementById( 'character-count' );

	wordCountElement!.innerHTML = wordCount.words as any;
	characterCountElement!.innerHTML = wordCount.characters as any;

	wordCount.on( 'change:words', ( evt, name, value ) => {
		document.getElementById( 'word-count' )!.innerHTML = value;
	} );

	wordCount.on( 'change:characters', ( evt, name, value ) => {
		document.getElementById( 'character-count' )!.innerHTML = value;
	} );

	document.getElementById( 'word-count-wrapper' )!.style.display = 'block';
}

function addUploadMockAdapter( editor: any ) {
	editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader: any ) => {
		return new UploadAdapterMock( loader );
	};
}

const fixtures = getPerformanceData();
fixtures.smallTablesInlineCss = smallTablesInlineCssFixture;

const buttons = document.querySelectorAll( '#test-controls button' ) as NodeListOf<HTMLButtonElement>;

for ( const button of buttons ) {
	button.addEventListener( 'click', function() {
		const content = fixtures[ this.getAttribute( 'data-file-name' )! ];

		editor.setData( content );
	} );
	button.disabled = false;
}
