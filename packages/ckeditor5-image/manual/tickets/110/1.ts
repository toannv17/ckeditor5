/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Enter } from 'toannv-ckeditor5-enter';
import { Typing } from 'toannv-ckeditor5-typing';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Heading } from 'toannv-ckeditor5-heading';
import { Image } from '../../../src/image.js';
import { Undo } from 'toannv-ckeditor5-undo';
import { BalloonToolbar } from 'toannv-ckeditor5-ui';
import { ImageToolbar } from '../../../src/imagetoolbar.js';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Enter, Typing, Paragraph, Heading, Image, Undo, ImageToolbar, BalloonToolbar ],
		balloonToolbar: [ 'heading', '|', 'undo', 'redo' ],
		image: {
			toolbar: [ 'imageTextAlternative' ]
		}
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
