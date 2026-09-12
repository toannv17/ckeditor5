/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Enter } from 'toannv-ckeditor5-enter';
import { Typing } from 'toannv-ckeditor5-typing';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Link } from 'toannv-ckeditor5-link';
import { Bold } from 'toannv-ckeditor5-basic-styles';
import { Image } from '../../../src/image.js';
import { ImageCaption } from '../../../src/imagecaption.js';
import { Undo } from 'toannv-ckeditor5-undo';
import { BalloonToolbar } from 'toannv-ckeditor5-ui';
import { ImageToolbar } from '../../../src/imagetoolbar.js';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		image: { toolbar: [ 'toggleImageCaption', 'imageTextAlternative' ] },
		plugins: [ Enter, Typing, Paragraph, Link, Bold, Image, Undo, ImageToolbar, BalloonToolbar, ImageCaption ],
		toolbar: [ 'bold', 'undo', 'redo' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
