/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Enter } from 'toannv-ckeditor5-enter';
import { Typing } from 'toannv-ckeditor5-typing';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Heading } from 'toannv-ckeditor5-heading';
import { Image } from '../src/image.js';
import { Undo } from 'toannv-ckeditor5-undo';
import { Clipboard } from 'toannv-ckeditor5-clipboard';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Enter, Typing, Paragraph, Heading, Image, Undo, Clipboard ],
		toolbar: [ 'heading', '|', 'undo', 'redo' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
