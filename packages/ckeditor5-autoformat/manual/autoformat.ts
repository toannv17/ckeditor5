/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Autoformat } from '../src/autoformat.js';
import { Enter, ShiftEnter } from '@ckeditor-nonkey/ckeditor5-enter';
import { List, TodoList } from '@ckeditor-nonkey/ckeditor5-list';
import { BlockQuote } from '@ckeditor-nonkey/ckeditor5-block-quote';
import { Typing } from '@ckeditor-nonkey/ckeditor5-typing';
import { Heading } from '@ckeditor-nonkey/ckeditor5-heading';
import { Paragraph } from '@ckeditor-nonkey/ckeditor5-paragraph';
import { Undo } from '@ckeditor-nonkey/ckeditor5-undo';
import { Bold, Code, Strikethrough, Italic } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { CodeBlock } from '@ckeditor-nonkey/ckeditor5-code-block';
import { HorizontalLine } from '@ckeditor-nonkey/ckeditor5-horizontal-line';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Enter,
			Typing,
			Paragraph,
			Undo,
			Bold,
			Italic,
			Code,
			Strikethrough,
			Heading,
			List,
			TodoList,
			Autoformat,
			BlockQuote,
			CodeBlock,
			ShiftEnter,
			HorizontalLine
		],
		toolbar: [
			'heading',
			'|',
			'numberedList',
			'bulletedList',
			'todoList',
			'blockQuote',
			'codeBlock',
			'horizontalLine',
			'bold',
			'italic',
			'code',
			'strikethrough',
			'undo',
			'redo'
		]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
