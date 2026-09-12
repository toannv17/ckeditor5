/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { global } from '@ckeditor-nonkey/ckeditor5-utils';

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Bold, Italic, Underline } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { Enter, ShiftEnter } from '@ckeditor-nonkey/ckeditor5-enter';
import { Paragraph } from '@ckeditor-nonkey/ckeditor5-paragraph';
import { Typing } from '@ckeditor-nonkey/ckeditor5-typing';
import { Undo } from '@ckeditor-nonkey/ckeditor5-undo';
import { Clipboard } from '@ckeditor-nonkey/ckeditor5-clipboard';
import { Image, ImageCaption, ImageToolbar, ImageResize } from '@ckeditor-nonkey/ckeditor5-image';
import { RemoveFormat } from '../src/removeformat.js';
import { Link } from '@ckeditor-nonkey/ckeditor5-link';

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
