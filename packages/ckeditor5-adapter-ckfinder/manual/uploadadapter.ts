/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Enter } from 'toannv-ckeditor5-enter';
import { Typing } from 'toannv-ckeditor5-typing';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Heading } from 'toannv-ckeditor5-heading';
import { Image, ImageCaption, ImageToolbar, ImageStyle, ImageUpload } from 'toannv-ckeditor5-image';
import { Undo } from 'toannv-ckeditor5-undo';
import { Clipboard } from 'toannv-ckeditor5-clipboard';
import { Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { List } from 'toannv-ckeditor5-list';
import { CKFinderUploadAdapter } from '../src/uploadadapter.js';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		image: { toolbar: [ 'toggleImageCaption', 'imageTextAlternative' ] },
		plugins: [
			Enter, Typing, Paragraph, Heading, Undo, Bold, Italic, Heading, List, Image, ImageToolbar, Clipboard,
			ImageCaption, ImageStyle, ImageUpload, CKFinderUploadAdapter
		],
		toolbar: [ 'heading', '|', 'undo', 'redo', 'bold', 'italic', 'bulletedList', 'numberedList', 'uploadImage' ],
		ckfinder: {
			// eslint-disable-next-line @stylistic/max-len
			uploadUrl: 'https://cksource.com/weuy2g4ryt278ywiue/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
		}
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
