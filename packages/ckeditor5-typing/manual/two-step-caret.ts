/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Underline, Bold, Italic } from 'toannv-ckeditor5-basic-styles';

import { TwoStepCaretMovement } from '../src/twostepcaretmovement.js';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor-ltr' ) as HTMLElement,
		plugins: [ Essentials, Paragraph, Underline, Bold, Italic, TwoStepCaretMovement ],
		toolbar: [ 'undo', 'redo', '|', 'bold', 'underline', 'italic' ]
	} )
	.then( editor => {
		const twoStepCaretMovement = editor.plugins.get( TwoStepCaretMovement );

		twoStepCaretMovement.registerAttribute( 'italic' );
		twoStepCaretMovement.registerAttribute( 'underline' );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor-rtl' ) as HTMLElement,
		language: {
			content: 'he'
		},
		plugins: [ Essentials, Paragraph, Underline, Bold, Italic, TwoStepCaretMovement ],
		toolbar: [ 'undo', 'redo', '|', 'bold', 'underline', 'italic' ]
	} )
	.then( editor => {
		const twoStepCaretMovement = editor.plugins.get( TwoStepCaretMovement );

		twoStepCaretMovement.registerAttribute( 'italic' );
		twoStepCaretMovement.registerAttribute( 'underline' );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
