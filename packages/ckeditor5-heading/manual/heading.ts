/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Enter } from '@ckeditor-nonkey/ckeditor5-enter';
import { Typing } from '@ckeditor-nonkey/ckeditor5-typing';
import { Heading } from '../src/heading.js';
import { Paragraph } from '@ckeditor-nonkey/ckeditor5-paragraph';
import { Undo } from '@ckeditor-nonkey/ckeditor5-undo';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Enter, Typing, Undo, Heading, Paragraph ],
		toolbar: [ 'heading', '|', 'undo', 'redo' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
