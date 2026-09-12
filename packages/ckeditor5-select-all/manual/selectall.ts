/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor-nonkey/ckeditor5-essentials';
import { Heading } from '@ckeditor-nonkey/ckeditor5-heading';
import { Paragraph } from '@ckeditor-nonkey/ckeditor5-paragraph';
import { Bold, Italic } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { Image, ImageCaption } from '@ckeditor-nonkey/ckeditor5-image';
import { Table } from '@ckeditor-nonkey/ckeditor5-table';

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
