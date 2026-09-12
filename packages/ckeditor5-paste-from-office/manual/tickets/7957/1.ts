/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { ArticlePluginSet } from 'toannv-ckeditor5-core/tests/_utils/articlepluginset.js';

import { Strikethrough, Underline } from 'toannv-ckeditor5-basic-styles';
import { Table, TableToolbar, TableProperties, TableCellProperties, TableColumnResize } from 'toannv-ckeditor5-table';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { FontColor, FontBackgroundColor } from 'toannv-ckeditor5-font';
import { PageBreak } from 'toannv-ckeditor5-page-break';

import { PasteFromOffice } from '../../../src/pastefromoffice.js';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';
import { ImageUpload } from 'toannv-ckeditor5-image';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		image: { toolbar: [ 'toggleImageCaption', 'imageTextAlternative' ] },
		plugins: [ ArticlePluginSet, Strikethrough, Underline, Table, TableToolbar, PageBreak, CloudServices, TableColumnResize,
			TableProperties, TableCellProperties, EasyImage, PasteFromOffice, FontColor, FontBackgroundColor, ImageUpload ],
		toolbar: [ 'heading', '|', 'bold', 'italic', 'strikethrough', 'underline', 'link',
			'bulletedList', 'numberedList', 'blockQuote', 'insertTable', 'pageBreak', 'undo', 'redo' ],
		table: {
			contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties' ]
		},
		cloudServices: CS_CONFIG
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
