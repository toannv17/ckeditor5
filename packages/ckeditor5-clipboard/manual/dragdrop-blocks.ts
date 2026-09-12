/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { Autoformat } from 'toannv-ckeditor5-autoformat';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { Bold, Italic, Underline, Strikethrough, Superscript, Subscript, Code } from 'toannv-ckeditor5-basic-styles';
import { Heading, HeadingButtonsUI } from 'toannv-ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageResize, ImageInsert, AutoImage, ImageUpload } from 'toannv-ckeditor5-image';
import { Indent, IndentBlock } from 'toannv-ckeditor5-indent';
import { Link, LinkImage, AutoLink } from 'toannv-ckeditor5-link';
import { List, ListProperties } from 'toannv-ckeditor5-list';
import { Paragraph, ParagraphButtonUI } from 'toannv-ckeditor5-paragraph';
import { Table, TableToolbar, TableProperties, TableCellProperties, TableCaption, TableColumnResize } from 'toannv-ckeditor5-table';
import { RemoveFormat } from 'toannv-ckeditor5-remove-format';
import { FindAndReplace } from 'toannv-ckeditor5-find-and-replace';
import { FontColor, FontBackgroundColor, FontFamily, FontSize } from 'toannv-ckeditor5-font';
import { Highlight } from 'toannv-ckeditor5-highlight';
import { CodeBlock } from 'toannv-ckeditor5-code-block';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { HtmlEmbed } from 'toannv-ckeditor5-html-embed';
import { Mention } from 'toannv-ckeditor5-mention';
import { TextTransformation, Typing } from 'toannv-ckeditor5-typing';
import { Alignment } from 'toannv-ckeditor5-alignment';
import { PageBreak } from 'toannv-ckeditor5-page-break';
import { HorizontalLine } from 'toannv-ckeditor5-horizontal-line';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
import { TextPartLanguage } from 'toannv-ckeditor5-language';
import { SourceEditing } from 'toannv-ckeditor5-source-editing';
import { Style } from 'toannv-ckeditor5-style';
import { GeneralHtmlSupport } from 'toannv-ckeditor5-html-support';
import { DecoupledEditor } from 'toannv-ckeditor5-editor-decoupled';
import { Enter } from 'toannv-ckeditor5-enter';
import { Undo } from 'toannv-ckeditor5-undo';
import { BalloonEditor } from 'toannv-ckeditor5-editor-balloon';
import { BlockToolbar } from 'toannv-ckeditor5-ui';

import { Clipboard, DragDrop } from '../src/index.js';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';
declare const CKEditorInspector: any;

declare global {
	interface Window {
		editorBalloon: any;
		editorBalloonCustomIcon: any;
		editorBalloonRtl: any;
		editorClassic: any;
		editorDecoupled: any;
	}
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor-classic' ) as HTMLElement,
		plugins: [
			Essentials, Autoformat, BlockQuote, Bold, Heading, Image, ImageCaption, ImageStyle, ImageToolbar, Indent, Italic, Link,
			List, Paragraph, Table, TableToolbar, Underline, Strikethrough, Superscript, Subscript, Code, RemoveFormat,
			FindAndReplace, FontColor, FontBackgroundColor, FontFamily, FontSize, Highlight,
			CodeBlock, ListProperties, TableProperties, TableCellProperties, TableCaption, TableColumnResize,
			EasyImage, ImageResize, ImageInsert, LinkImage, AutoImage, HtmlEmbed,
			AutoLink, Mention, TextTransformation, Alignment, IndentBlock, PageBreak, HorizontalLine,
			CloudServices, TextPartLanguage, SourceEditing, Style, GeneralHtmlSupport, DragDrop
		],
		toolbar: [
			'heading', 'style',
			'|',
			'removeFormat', 'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'link',
			'|',
			'highlight', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
			'|',
			'bulletedList', 'numberedList',
			'|',
			'blockQuote', 'insertImage', 'insertTable', 'codeBlock',
			'|',
			'htmlEmbed',
			'|',
			'alignment', 'outdent', 'indent',
			'|',
			'pageBreak', 'horizontalLine',
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
		root: {
			placeholder: 'Type the content here!'
		},
		mention: {
			feeds: [
				{
					marker: '@',
					feed: [
						'@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
						'@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
						'@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
						'@sugar', '@sweet', '@topping', '@wafer'
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
			sanitizeHtml: ( ( html: string ) => ( { html, hasChange: false } ) ) as any
		},
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true
			}
		},
		style: {
			definitions: [
				{
					name: 'Article category',
					element: 'h3',
					classes: [ 'category' ]
				},
				{
					name: 'Title',
					element: 'h2',
					classes: [ 'document-title' ]
				},
				{
					name: 'Subtitle',
					element: 'h3',
					classes: [ 'document-subtitle' ]
				},
				{
					name: 'Info box',
					element: 'p',
					classes: [ 'info-box' ]
				},
				{
					name: 'Side quote',
					element: 'blockquote',
					classes: [ 'side-quote' ]
				},
				{
					name: 'Marker',
					element: 'span',
					classes: [ 'marker' ]
				},
				{
					name: 'Spoiler',
					element: 'span',
					classes: [ 'spoiler' ]
				},
				{
					name: 'Code (dark)',
					element: 'pre',
					classes: [ 'fancy-code', 'fancy-code-dark' ]
				},
				{
					name: 'Code (bright)',
					element: 'pre',
					classes: [ 'fancy-code', 'fancy-code-bright' ]
				}
			]
		}
	} )
	.then( editor => {
		window.editorClassic = editor;

		CKEditorInspector.attach( { classic: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

const editorData = document.querySelector( '#editor-classic' )!.innerHTML;

DecoupledEditor
	.create( {
		root: {
			initialData: editorData
		},
		plugins: [ Enter, Typing, Paragraph, Undo, Heading, Bold, Italic, Clipboard, Table, DragDrop ],
		toolbar: [ 'heading', '|', 'bold', 'italic', 'insertTable', 'undo', 'redo' ]
	} )
	.then( editor => {
		document.querySelector( '.toolbar-container' )!.appendChild( editor.ui.view.toolbar.element! );
		document.querySelector( '.editable-container' )!.appendChild( editor.ui.view.editable.element! );

		window.editorDecoupled = editor;

		CKEditorInspector.attach( { decoupled: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

BalloonEditor
	.create( {
		root: {
			element: document.querySelector( '#editor-balloon' ) as HTMLElement
		},
		plugins: [
			Essentials, List, Paragraph, Heading,
			Image, ImageResize, ImageStyle, ImageToolbar, ImageCaption,
			HeadingButtonsUI, ParagraphButtonUI, BlockToolbar, Table, TableToolbar,
			CloudServices, ImageUpload, EasyImage, DragDrop
		],
		cloudServices: CS_CONFIG,
		blockToolbar: [
			'paragraph', 'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList', 'paragraph',
			'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList', 'paragraph', 'heading1', 'heading2', 'heading3',
			'bulletedList', 'numberedList', 'insertTable', 'uploadImage'
		],
		image: {
			toolbar: [
				'imageTextAlternative', 'toggleImageCaption', '|',
				'imageStyle:inline', 'imageStyle:breakText', 'imageStyle:wrapText', '|',
				'resizeImage'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn', 'tableRow', 'mergeTableCells', 'toggleTableCaption'
			]
		}
	} )
	.then( editor => {
		window.editorBalloon = editor;

		CKEditorInspector.attach( { balloon: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

BalloonEditor
	.create( {
		root: {
			element: document.querySelector( '#editor-balloon-custom-icon' ) as HTMLElement
		},
		plugins: [
			Essentials, List, Paragraph, Heading,
			Image, ImageResize, ImageStyle, ImageToolbar, ImageCaption,
			HeadingButtonsUI, ParagraphButtonUI, BlockToolbar, Table, TableToolbar,
			CloudServices, ImageUpload, EasyImage, DragDrop
		],
		cloudServices: CS_CONFIG,
		blockToolbar: {
			items: [ 'paragraph', 'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList',
				'paragraph', 'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList', 'paragraph', 'heading1', 'heading2',
				'heading3', 'bulletedList', 'numberedList', 'insertTable', 'uploadImage' ],
			icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">' +
				'<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>'
		},
		image: {
			toolbar: [
				'imageTextAlternative', 'toggleImageCaption', '|',
				'imageStyle:inline', 'imageStyle:breakText', 'imageStyle:wrapText', '|',
				'resizeImage'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn', 'tableRow', 'mergeTableCells', 'toggleTableCaption'
			]
		}
	} )
	.then( editor => {
		window.editorBalloonCustomIcon = editor;

		CKEditorInspector.attach( { balloonCustomIcon: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

BalloonEditor
	.create( {
		root: {
			element: document.querySelector( '#editor-block-rtl' ) as HTMLElement
		},
		plugins: [
			Essentials, List, Paragraph, Heading,
			Image, ImageResize, ImageStyle, ImageToolbar, ImageCaption,
			HeadingButtonsUI, ParagraphButtonUI, BlockToolbar, Table, TableToolbar,
			CloudServices, ImageUpload, EasyImage, DragDrop
		],
		language: 'ar',
		cloudServices: CS_CONFIG,
		blockToolbar: {
			items: [ 'paragraph', 'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList',
				'paragraph', 'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList', 'paragraph', 'heading1', 'heading2',
				'heading3', 'bulletedList', 'numberedList', 'insertTable', 'uploadImage' ]
		},
		image: {
			toolbar: [
				'imageTextAlternative', 'toggleImageCaption', '|',
				'imageStyle:inline', 'imageStyle:breakText', 'imageStyle:wrapText', '|',
				'resizeImage'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn', 'tableRow', 'mergeTableCells', 'toggleTableCaption'
			]
		}
	} )
	.then( editor => {
		window.editorBalloonRtl = editor;

		CKEditorInspector.attach( { balloonRtl: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
