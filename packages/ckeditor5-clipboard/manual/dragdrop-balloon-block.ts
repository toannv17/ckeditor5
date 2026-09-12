/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { Essentials } from 'toannv-ckeditor5-essentials';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { Bold, Italic, Code } from 'toannv-ckeditor5-basic-styles';
import { Heading, HeadingButtonsUI } from 'toannv-ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageResize, ImageInsert, AutoImage, ImageUpload } from 'toannv-ckeditor5-image';
import { Link, LinkImage, AutoLink } from 'toannv-ckeditor5-link';
import { List, ListProperties } from 'toannv-ckeditor5-list';
import { Paragraph, ParagraphButtonUI } from 'toannv-ckeditor5-paragraph';
import { Table, TableToolbar, TableProperties, TableCellProperties, TableCaption, TableColumnResize } from 'toannv-ckeditor5-table';
import { CodeBlock } from 'toannv-ckeditor5-code-block';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { HtmlEmbed } from 'toannv-ckeditor5-html-embed';
import { Alignment } from 'toannv-ckeditor5-alignment';
import { PageBreak } from 'toannv-ckeditor5-page-break';
import { HorizontalLine } from 'toannv-ckeditor5-horizontal-line';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
import { BalloonEditor } from 'toannv-ckeditor5-editor-balloon';
import { BlockToolbar } from 'toannv-ckeditor5-ui';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';
declare const CKEditorInspector: any;

declare global {
	interface Window { editorBalloon: any }
}

BalloonEditor
	.create( {
		root: {
			element: document.querySelector( '#editor-balloon' ) as HTMLElement
		},
		plugins: [
			Essentials, List, Paragraph, Heading, BlockQuote, Bold, Italic, Code,
			Image, ImageResize, ImageStyle, ImageToolbar, ImageCaption, HorizontalLine,
			HeadingButtonsUI, ParagraphButtonUI, BlockToolbar, Table, TableToolbar,
			CloudServices, ImageUpload, EasyImage, ImageInsert, AutoImage, PageBreak,
			Link, LinkImage, AutoLink, ListProperties, CodeBlock, HtmlEmbed, Alignment,
			TableProperties, TableCellProperties, TableCaption, TableColumnResize
		],
		cloudServices: CS_CONFIG,
		blockToolbar: [
			'heading', '|',
			'bold', 'italic', 'code', 'link', '|',
			'bulletedList', 'numberedList', '|',
			'blockQuote', 'insertImage', 'insertTable', 'codeBlock', 'htmlEmbed', '|',
			'alignment', '|',
			'pageBreak', 'horizontalLine', '|',
			'undo', 'redo'
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
				'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties', 'toggleTableCaption'
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
