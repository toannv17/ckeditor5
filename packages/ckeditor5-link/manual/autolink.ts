/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';

import { Enter, ShiftEnter } from 'toannv-ckeditor5-enter';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Typing } from 'toannv-ckeditor5-typing';
import { Undo } from 'toannv-ckeditor5-undo';

import { Link } from '../src/link.js';
import { AutoLink } from '../src/autolink.js';
import { Bold } from 'toannv-ckeditor5-basic-styles';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Bold, Typing, Paragraph, Undo, Enter, ShiftEnter, Link, AutoLink ],
		toolbar: [ 'link', 'undo', 'redo' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
