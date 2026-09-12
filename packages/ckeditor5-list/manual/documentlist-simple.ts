/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Enter } from '@ckeditor-nonkey/ckeditor5-enter';
import { Typing } from '@ckeditor-nonkey/ckeditor5-typing';
import { Heading } from '@ckeditor-nonkey/ckeditor5-heading';
import { Paragraph } from '@ckeditor-nonkey/ckeditor5-paragraph';
import { Undo } from '@ckeditor-nonkey/ckeditor5-undo';
import { Clipboard } from '@ckeditor-nonkey/ckeditor5-clipboard';
import { Indent } from '@ckeditor-nonkey/ckeditor5-indent';
import { Alignment } from '@ckeditor-nonkey/ckeditor5-alignment';
import { SourceEditing } from '@ckeditor-nonkey/ckeditor5-source-editing';
import { GeneralHtmlSupport } from '@ckeditor-nonkey/ckeditor5-html-support';
import { Autoformat } from '@ckeditor-nonkey/ckeditor5-autoformat';

import { List } from '../src/list.js';
import { TodoList } from '../src/todolist.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Enter, Typing, Heading, Paragraph, Undo, List, TodoList, Indent, Clipboard, Alignment, SourceEditing,
			GeneralHtmlSupport, Autoformat
		],
		toolbar: [
			'heading', '|',
			'bulletedList', 'numberedList', 'todoList', '|',
			'outdent', 'indent', '|',
			'alignment', '|',
			'undo', 'redo', '|',
			'sourceEditing'
		],
		list: {
			multiBlock: false
		},
		htmlSupport: {
			allow: [
				{
					name: /./,
					styles: true,
					attributes: true,
					classes: true
				}
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
