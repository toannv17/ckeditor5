/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { ArticlePluginSet } from 'toannv-ckeditor5-core/tests/_utils/articlepluginset.js';
import { Indent, IndentBlock } from 'toannv-ckeditor5-indent';
import { Code } from 'toannv-ckeditor5-basic-styles';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
import { ImageResize } from '../src/imageresize.js';
import { ImageSizeAttributes } from '../src/imagesizeattributes.js';
import { ImageUpload } from '../src/imageupload.js';
import { PasteFromOffice } from 'toannv-ckeditor5-paste-from-office';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';

const commonConfig = {
	attachTo: document.querySelector( '#editor-width-height-attributes' ) as HTMLElement,
	plugins: [
		ArticlePluginSet,
		ImageResize,
		Code,
		ImageSizeAttributes,
		ImageUpload,
		Indent,
		IndentBlock,
		CloudServices,
		EasyImage,
		PasteFromOffice
	],
	toolbar: [ 'heading', '|', 'bold', 'italic', 'link',
		'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'undo', 'redo', 'outdent', 'indent' ],
	image: {
		toolbar: [ 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'toggleImageCaption', 'resizeImage' ]
	},
	table: {
		contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ],
		tableToolbar: [ 'bold', 'italic' ]
	},
	cloudServices: CS_CONFIG
};

ClassicEditor
	.create( commonConfig )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
