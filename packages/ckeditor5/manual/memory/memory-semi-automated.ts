/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Alignment } from 'toannv-ckeditor5-alignment';
import { ArticlePluginSet } from 'toannv-ckeditor5-core/tests/_utils/articlepluginset.js';
import { AutoImage, ImageResize, ImageUpload } from 'toannv-ckeditor5-image';
import { AutoLink, LinkImage } from 'toannv-ckeditor5-link';
import { Code, Strikethrough, Subscript, Superscript, Underline } from 'toannv-ckeditor5-basic-styles';
import { CodeBlock } from 'toannv-ckeditor5-code-block';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { FindAndReplace } from 'toannv-ckeditor5-find-and-replace';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from 'toannv-ckeditor5-font';
import { Highlight } from 'toannv-ckeditor5-highlight';
import { HorizontalLine } from 'toannv-ckeditor5-horizontal-line';
import { HtmlEmbed } from 'toannv-ckeditor5-html-embed';
import { HtmlComment } from 'toannv-ckeditor5-html-support';
import { IndentBlock } from 'toannv-ckeditor5-indent';
import { ListProperties, TodoList } from 'toannv-ckeditor5-list';
import { Mention } from 'toannv-ckeditor5-mention';
import { PageBreak } from 'toannv-ckeditor5-page-break';
import { PasteFromOffice } from 'toannv-ckeditor5-paste-from-office';
import { RemoveFormat } from 'toannv-ckeditor5-remove-format';
import { SourceEditing } from 'toannv-ckeditor5-source-editing';
import { SpecialCharacters, SpecialCharactersEssentials } from 'toannv-ckeditor5-special-characters';
import { TableCellProperties, TableProperties, TableCaption, TableColumnResize } from 'toannv-ckeditor5-table';
import { TextTransformation } from 'toannv-ckeditor5-typing';
import { TextPartLanguage } from 'toannv-ckeditor5-language';
import { WordCount } from 'toannv-ckeditor5-word-count';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
// import { MathType } from '@wiris/mathtype-ckeditor5/dist/index.js';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';
declare global {
	interface Window {
		memoryTestEditor: any;

		// Exposed by the browser when it runs with the `--js-flags=--expose-gc` flag.
		gc?: () => void;
	}
}

function initEditor() {
	return ClassicEditor
		.create( {
			attachTo: document.querySelector( '#editor' ) as HTMLElement,
			root: {
				placeholder: 'Type the content here!'
			},
			plugins: [
				ArticlePluginSet, Underline, Strikethrough, Superscript, Subscript, Code, RemoveFormat,
				FindAndReplace, FontColor, FontBackgroundColor, FontFamily, FontSize, Highlight,
				CodeBlock, TodoList, ListProperties, TableProperties, TableCellProperties, TableCaption,
				TableColumnResize, EasyImage, ImageResize, LinkImage, AutoImage, HtmlEmbed, HtmlComment,
				AutoLink, Mention, TextTransformation,
				Alignment, IndentBlock,
				PasteFromOffice, PageBreak, HorizontalLine,
				SpecialCharacters, SpecialCharactersEssentials, WordCount,
				ImageUpload, CloudServices, TextPartLanguage, SourceEditing
				// MathType
			],
			toolbar: [
				// 'MathType', 'ChemType',
				// '|',
				'heading',
				'|',
				'removeFormat', 'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'link',
				'|',
				'highlight', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
				'|',
				'bulletedList', 'numberedList', 'todoList',
				'|',
				'blockQuote', 'uploadImage', 'insertTable', 'mediaEmbed', 'codeBlock',
				'|',
				'htmlEmbed',
				'|',
				'alignment', 'outdent', 'indent',
				'|',
				'pageBreak', 'horizontalLine', 'specialCharacters',
				'|',
				'textPartLanguage',
				'|',
				'sourceEditing',
				'|',
				'undo', 'redo', 'findAndReplace'
			],
			cloudServices: CS_CONFIG,
			table: {
				contentToolbar: [
					'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'
				]
			},
			image: {
				styles: [
					'alignCenter',
					'alignLeft',
					'alignRight'
				] as any,
				resizeOptions: [
					{
						name: 'resizeImage:original',
						label: 'Original size',
						value: null
					},
					{
						name: 'resizeImage:50',
						label: '50%',
						value: '50'
					},
					{
						name: 'resizeImage:75',
						label: '75%',
						value: '75'
					}
				],
				toolbar: [
					'imageTextAlternative', 'toggleImageCaption', '|',
					'imageStyle:inline', 'imageStyle:breakText', 'imageStyle:wrapText', '|',
					'resizeImage'
				]
			},
			mention: {
				feeds: [
					{
						marker: '@',
						feed: [
							'@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton',
							'@cream', '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice',
							'@jelly-o', '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps',
							'@soufflé', '@sugar', '@sweet', '@topping', '@wafer'
						],
						minimumCharacters: 1
					}
				]
			},
			link: {
				decorators: {
					isExternal: {
						mode: 'manual',
						label: 'Open in a new tab',
						attributes: {
							target: '_blank',
							rel: 'noopener noreferrer'
						}
					},
					isDownloadable: {
						mode: 'manual',
						label: 'Downloadable',
						attributes: {
							download: 'download'
						}
					},
					isGallery: {
						mode: 'manual',
						label: 'Gallery link',
						classes: 'gallery'
					}
				}
			},
			htmlEmbed: {
				showPreviews: true,
				sanitizeHtml: html => ( { html, hasChanged: false } )
			}
		} )
		.then( editor => {
			window.memoryTestEditor = editor;

			console.log( 'Editor was created.' );
		} )
		.catch( err => {
			console.error( err.stack );
		} );
}

function destroyEditor() {
	return window.memoryTestEditor.destroy().then( () => {
		window.memoryTestEditor = null;
		console.log( 'Editor was destroyed.' );
	} );
}

let i = 1;
function runAnotherCycleOfInitsAndDestroys() {
	if ( i > 10 ) {
		i = 0;
		return;
	}

	console.group( '#' + i );
	console.log( 'Starting init/destroy cycle #' + i );

	initEditor().then( () => {
		setTimeout( () => {
			destroyEditor().then( () => {
				console.log( 'Forcing the garbage collector.' );

				window.gc!();
				i++;

				console.log( 'Finished the cycle.' );
				console.groupEnd();

				setTimeout( () => {
					runAnotherCycleOfInitsAndDestroys();
				}, 500 );
			} );
		}, 500 );
	} );
}

document.getElementById( 'start' )!.addEventListener( 'click', runAnotherCycleOfInitsAndDestroys );
