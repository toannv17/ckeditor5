/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { Heading } from 'toannv-ckeditor5-heading';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { Image, ImageCaption } from 'toannv-ckeditor5-image';
import { Table } from 'toannv-ckeditor5-table';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Essentials, Paragraph, Bold, Italic, Heading, Image, ImageCaption, Table ],
		toolbar: [ 'heading', '|', 'bold', 'italic', '|', 'insertTable', '|', 'selectAll' ]
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
