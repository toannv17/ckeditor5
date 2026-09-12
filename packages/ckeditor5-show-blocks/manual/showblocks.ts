/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ShowBlocks } from '../src/showblocks.js';

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Alignment } from 'toannv-ckeditor5-alignment';
import { Autoformat } from 'toannv-ckeditor5-autoformat';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from 'toannv-ckeditor5-basic-styles';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
import { CodeBlock } from 'toannv-ckeditor5-code-block';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { FindAndReplace } from 'toannv-ckeditor5-find-and-replace';
import { Font } from 'toannv-ckeditor5-font';
import { Heading } from 'toannv-ckeditor5-heading';
import { Highlight } from 'toannv-ckeditor5-highlight';
import { HorizontalLine } from 'toannv-ckeditor5-horizontal-line';
import { HtmlEmbed } from 'toannv-ckeditor5-html-embed';
import { GeneralHtmlSupport } from 'toannv-ckeditor5-html-support';
import {
	AutoImage,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing
} from 'toannv-ckeditor5-image';
import { Indent, IndentBlock } from 'toannv-ckeditor5-indent';
import { AutoLink, Link, LinkImage } from 'toannv-ckeditor5-link';
import { List, ListProperties } from 'toannv-ckeditor5-list';
import { MediaEmbed } from 'toannv-ckeditor5-media-embed';
import { Mention } from 'toannv-ckeditor5-mention';
import { PageBreak } from 'toannv-ckeditor5-page-break';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { PasteFromOffice } from 'toannv-ckeditor5-paste-from-office';
import { RemoveFormat } from 'toannv-ckeditor5-remove-format';
import { SourceEditing } from 'toannv-ckeditor5-source-editing';
import { SpecialCharacters, SpecialCharactersEssentials } from 'toannv-ckeditor5-special-characters';
import { Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar } from 'toannv-ckeditor5-table';
import { TextTransformation } from 'toannv-ckeditor5-typing';

import { ArticlePluginSet } from 'toannv-ckeditor5-core/tests/_utils/articlepluginset.js';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Autoformat, BlockQuote, Bold, Heading, Image, ImageCaption,
			ImageStyle, ImageToolbar, Indent, Italic, Link, List, MediaEmbed,
			Paragraph, Table, TableToolbar, Alignment, AutoImage, AutoLink,
			CloudServices, Code, CodeBlock, Essentials, EasyImage,
			FindAndReplace, Font, Highlight, HorizontalLine,
			HtmlEmbed, GeneralHtmlSupport, ImageInsert, ImageResize, ImageUpload, IndentBlock,
			LinkImage, ListProperties, Mention, PageBreak, PasteFromOffice,
			PictureEditing, RemoveFormat, SourceEditing, SpecialCharacters,
			SpecialCharactersEssentials, Strikethrough, Subscript, Superscript,
			TableCaption, TableCellProperties, TableColumnResize,
			TableProperties, TextTransformation,
			Underline, ShowBlocks
		],
		toolbar: {
			items: [
				'showBlocks',
				'|',
				'undo', 'redo',
				'|',
				'sourceEditing',
				'|',
				'findAndReplace', 'selectAll',
				'|',
				'heading',
				'|',
				'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
				'-',
				'bold', 'italic', 'underline',
				{
					label: 'Formatting',
					icon: 'text',
					items: [ 'strikethrough', 'subscript', 'superscript', 'code', '|', 'removeFormat' ]
				},
				'|',
				'specialCharacters', 'horizontalLine', 'pageBreak',
				'|',
				'link', 'insertImage', 'insertTable',
				{
					label: 'Insert',
					icon: 'plus',
					items: [ 'highlight', 'blockQuote', 'mediaEmbed', 'codeBlock', 'htmlEmbed' ]
				},
				'|',
				'alignment',
				'|',
				'bulletedList', 'numberedList', 'outdent', 'indent'
			],
			shouldNotGroupWhenFull: true
		},
		fontFamily: {
			supportAllValues: true
		},
		fontSize: {
			options: [ 10, 12, 14, 'default', 18, 20, 22 ],
			supportAllValues: true
		},
		htmlEmbed: {
			showPreviews: true
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
					label: 'Original',
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
		list: {
			properties: {
				styles: true,
				startIndex: true,
				reversed: true
			}
		},
		link: {
			decorators: {
				addTargetToExternalLinks: true as any,
				defaultProtocol: 'https://' as any,
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
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
		root: {
			placeholder: 'Type or paste your content here!'
		},
		table: {
			contentToolbar: [
				'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'
			]
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			]
		},
		cloudServices: CS_CONFIG
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err );
	} );

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor-rtl' ) as HTMLElement,
		cloudServices: CS_CONFIG,
		plugins: [ ArticlePluginSet, ImageUpload, CloudServices, EasyImage, ShowBlocks ],
		toolbar: [
			'showBlocks',
			'|',
			'undo', 'redo',
			'|',
			'heading',
			'|',
			'bold', 'italic', 'numberedList', 'bulletedList',
			'|',
			'link', 'blockquote', 'uploadImage', 'insertTable', 'mediaEmbed'
		],
		language: 'ar'
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err );
	} );
