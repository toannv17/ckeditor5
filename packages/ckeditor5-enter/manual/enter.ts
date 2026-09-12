/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Enter } from '../src/enter.js';
import { ShiftEnter } from '../src/shiftenter.js';
import { Typing } from '@ckeditor-nonkey/ckeditor5-typing';
import { Heading } from '@ckeditor-nonkey/ckeditor5-heading';
import { Undo } from '@ckeditor-nonkey/ckeditor5-undo';
import { Bold, Italic } from '@ckeditor-nonkey/ckeditor5-basic-styles';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Enter, ShiftEnter, Typing, Heading, Undo, Bold, Italic ],
		toolbar: [ 'heading', '|', 'bold', 'italic', 'undo', 'redo' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
