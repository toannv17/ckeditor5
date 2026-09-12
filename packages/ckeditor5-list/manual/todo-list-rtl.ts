/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Enter } from '@ckeditor-nonkey/ckeditor5-enter';
import { Typing } from '@ckeditor-nonkey/ckeditor5-typing';
import { Heading } from '@ckeditor-nonkey/ckeditor5-heading';
import { Bold } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { Highlight } from '@ckeditor-nonkey/ckeditor5-highlight';
import { Table } from '@ckeditor-nonkey/ckeditor5-table';
import { Paragraph } from '@ckeditor-nonkey/ckeditor5-paragraph';
import { Undo } from '@ckeditor-nonkey/ckeditor5-undo';
import { Clipboard } from '@ckeditor-nonkey/ckeditor5-clipboard';
import { LegacyList } from '../src/legacylist.js';
import { LegacyTodoList } from '../src/legacytodolist.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Enter, Typing, Heading, Highlight, Table, Bold, Paragraph, Undo, LegacyList, LegacyTodoList, Clipboard ],
		language: 'ar',
		toolbar: [
			'heading', '|', 'bulletedList', 'numberedList', 'todoList', '|', 'bold', 'highlight', 'insertTable', '|', 'undo', 'redo'
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
	} )
	.catch( err => {
		console.error( err.stack );
	} );
