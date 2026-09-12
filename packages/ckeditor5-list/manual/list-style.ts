/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { Code, Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { Heading } from 'toannv-ckeditor5-heading';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Table, TablePropertiesEditing, TableCellPropertiesEditing } from 'toannv-ckeditor5-table';
import { LegacyList } from '../src/legacylist.js';
import { LegacyListProperties } from '../src/legacylistproperties.js';
import { Indent, IndentBlock } from 'toannv-ckeditor5-indent';
import { LegacyTodoList } from '../src/legacytodolist.js';
import { RemoveFormat } from 'toannv-ckeditor5-remove-format';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Essentials,
			Bold,
			Italic,
			Code,
			Heading,
			LegacyList,
			LegacyTodoList,
			Paragraph,
			LegacyListProperties,
			Table,
			TablePropertiesEditing,
			TableCellPropertiesEditing,
			Indent,
			IndentBlock,
			RemoveFormat
		],
		toolbar: [
			'heading',
			'|',
			'bold',
			'italic',
			'|',
			'removeFormat',
			'|',
			'bulletedList', 'numberedList', 'todoList',
			'|',
			'outdent',
			'indent',
			'|',
			'undo', 'redo'
		]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
