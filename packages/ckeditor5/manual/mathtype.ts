/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { ArticlePluginSet } from 'toannv-ckeditor5-core/tests/_utils/articlepluginset.js';
import { Alignment } from 'toannv-ckeditor5-alignment';
import { Underline, Code, Strikethrough, Subscript, Superscript } from 'toannv-ckeditor5-basic-styles';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { Font } from 'toannv-ckeditor5-font';
import { Highlight } from 'toannv-ckeditor5-highlight';
import { Indent } from 'toannv-ckeditor5-indent';
import { Mention } from 'toannv-ckeditor5-mention';
import { PasteFromOffice } from 'toannv-ckeditor5-paste-from-office';
import { RemoveFormat } from 'toannv-ckeditor5-remove-format';
import { ImageUpload } from 'toannv-ckeditor5-image';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';

import MathType from '@wiris/mathtype-ckeditor5/dist/index.js';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		cloudServices: CS_CONFIG,
		plugins: [
			ArticlePluginSet,
			Alignment,
			Underline,
			Strikethrough,
			Code,
			Subscript,
			Superscript,
			ImageUpload,
			CloudServices,
			EasyImage,
			Font,
			Highlight,
			Indent,
			Mention,
			PasteFromOffice,
			RemoveFormat,
			MathType
		],
		toolbar: [
			'MathType', 'ChemType', '|', 'heading', 'fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor',
			'highlight', 'alignment', '|', 'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript',
			'superscript', 'removeFormat', '|', 'bulletedList', 'numberedList', 'outdent', 'indent', '|', 'link',
			'blockQuote', 'uploadImage', 'mediaEmbed', 'insertTable', '|', 'undo', 'redo'
		],
		image: {
			toolbar: [ 'imageStyle:inline', 'imageStyle:block', 'imageStyle:wrapText', '|', 'imageTextAlternative' ]
		},
		mediaEmbed: {
			previewsInData: true,
			toolbar: [ 'blockQuote' ]
		},
		mention: {
			feeds: [ {
				marker: '@',
				feed: [ '@Barney', '@Lily', '@Marshall', '@Robin', '@Ted' ]
			} ]
		},
		table: {
			contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ],
			tableToolbar: [ 'bold', 'italic' ]
		}
	} )
	.then( newEditor => {
		window.editor = newEditor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
