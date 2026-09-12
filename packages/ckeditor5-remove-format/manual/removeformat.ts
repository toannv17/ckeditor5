/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { global } from 'toannv-ckeditor5-utils';

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Bold, Italic, Underline } from 'toannv-ckeditor5-basic-styles';
import { Enter, ShiftEnter } from 'toannv-ckeditor5-enter';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Typing } from 'toannv-ckeditor5-typing';
import { Undo } from 'toannv-ckeditor5-undo';
import { Clipboard } from 'toannv-ckeditor5-clipboard';
import { Image, ImageCaption, ImageToolbar, ImageResize } from 'toannv-ckeditor5-image';
import { RemoveFormat } from '../src/removeformat.js';
import { Link } from 'toannv-ckeditor5-link';

ClassicEditor
	.create( {
		attachTo: global.document.querySelector( '#editor' ) as HTMLElement,
		image: { toolbar: [ 'toggleImageCaption', 'imageTextAlternative' ] },
		plugins: [
			Bold, Clipboard, Enter, Italic, Link, Paragraph, RemoveFormat, ShiftEnter, Typing,
			Underline, Undo, Image, ImageCaption, ImageToolbar, ImageResize
		],
		toolbar: [ 'removeFormat', '|', 'italic', 'bold', 'link', 'underline', '|', 'undo', 'redo' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
