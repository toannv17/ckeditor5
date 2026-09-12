/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';

import { Essentials } from 'toannv-ckeditor5-essentials';
import { Autoformat } from 'toannv-ckeditor5-autoformat';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { Heading } from 'toannv-ckeditor5-heading';
import { Link, LinkImage } from 'toannv-ckeditor5-link';
import { MediaEmbed } from 'toannv-ckeditor5-media-embed';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Table, TableToolbar } from 'toannv-ckeditor5-table';
import { FontSize } from 'toannv-ckeditor5-font';
import { Indent } from 'toannv-ckeditor5-indent';
import { SourceEditing } from 'toannv-ckeditor5-source-editing';
import { GeneralHtmlSupport } from 'toannv-ckeditor5-html-support';
import { Alignment } from 'toannv-ckeditor5-alignment';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { Image, ImageResize, ImageInsert } from 'toannv-ckeditor5-image';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';

import { List } from '../src/list.js';
import { TodoList } from '../src/todolist.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Essentials,
			Autoformat,
			BlockQuote,
			Bold,
			Heading,
			Italic,
			Link,
			MediaEmbed,
			Paragraph,
			Table,
			TableToolbar,
			FontSize,
			Indent,
			List,
			TodoList,
			SourceEditing,
			GeneralHtmlSupport,
			Alignment,
			Image,
			CloudServices,
			EasyImage,
			ImageResize,
			ImageInsert,
			LinkImage
		],
		toolbar: [
			'heading',
			'|',
			'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
			'|',
			'bold', 'link', 'fontSize', 'alignment',
			'|',
			'insertTable', 'insertImage',
			'|',
			'undo', 'redo', '|', 'sourceEditing'
		],
		cloudServices: CS_CONFIG,
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		htmlSupport: {
			allow: [ { name: /.*/, attributes: true, classes: true, styles: true } ]
		}
	} )
	.then( editor => {
		window.editor = editor;

		const contentPreviewBox = document.getElementById( 'preview' );

		contentPreviewBox!.innerHTML = editor.getData();

		editor.model.document.on( 'change:data', () => {
			contentPreviewBox!.innerHTML = editor.getData();
		} );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
