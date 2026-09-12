/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';

import { Essentials } from '@ckeditor-nonkey/ckeditor5-essentials';
import { Autoformat } from '@ckeditor-nonkey/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor-nonkey/ckeditor5-block-quote';
import { Bold, Italic } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { Heading } from '@ckeditor-nonkey/ckeditor5-heading';
import { Link } from '@ckeditor-nonkey/ckeditor5-link';
import { MediaEmbed } from '@ckeditor-nonkey/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor-nonkey/ckeditor5-paragraph';
import { Table, TableToolbar } from '@ckeditor-nonkey/ckeditor5-table';
import { FontSize } from '@ckeditor-nonkey/ckeditor5-font';
import { Indent } from '@ckeditor-nonkey/ckeditor5-indent';
import { SourceEditing } from '@ckeditor-nonkey/ckeditor5-source-editing';
import { Alignment } from '@ckeditor-nonkey/ckeditor5-alignment';

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
			Alignment
		],
		language: 'ar',
		toolbar: [
			'heading',
			'|',
			'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
			'|',
			'bold', 'link', 'insertTable', 'fontSize', 'alignment',
			'|',
			'undo', 'redo', '|', 'sourceEditing'
		],
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
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
