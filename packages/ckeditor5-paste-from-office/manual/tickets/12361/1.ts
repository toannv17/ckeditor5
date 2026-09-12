/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { ArticlePluginSet } from '@ckeditor-nonkey/ckeditor5-core/tests/_utils/articlepluginset.js';
import { Code, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { CodeBlock } from '@ckeditor-nonkey/ckeditor5-code-block';
import { EasyImage } from '@ckeditor-nonkey/ckeditor5-easy-image';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor-nonkey/ckeditor5-font';
import { GeneralHtmlSupport } from '@ckeditor-nonkey/ckeditor5-html-support';
import { ImageResize, ImageUpload } from '@ckeditor-nonkey/ckeditor5-image';
import { LinkImage } from '@ckeditor-nonkey/ckeditor5-link';
import { ListProperties, TodoList } from '@ckeditor-nonkey/ckeditor5-list';
import { PageBreak } from '@ckeditor-nonkey/ckeditor5-page-break';
import { TableCellProperties, TableProperties, TableCaption, TableColumnResize } from '@ckeditor-nonkey/ckeditor5-table';
import { CloudServices } from '@ckeditor-nonkey/ckeditor5-cloud-services';

import { PasteFromOffice } from '../../../src/pastefromoffice.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			ArticlePluginSet, Underline, Strikethrough, Superscript, Subscript, Code,
			FontColor, FontBackgroundColor, FontFamily, FontSize,
			CodeBlock, TodoList, ListProperties, TableProperties, TableCellProperties, TableCaption,
			TableColumnResize, EasyImage, ImageResize, LinkImage,
			PageBreak,
			ImageUpload, CloudServices,
			GeneralHtmlSupport,
			PasteFromOffice
		],
		toolbar: [
			'heading',
			'|',
			'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'link',
			'|',
			'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
			'|',
			'bulletedList', 'numberedList', 'todoList',
			'|',
			'blockQuote', 'uploadImage', 'insertTable', 'codeBlock',
			'|',
			'pageBreak',
			'|',
			'undo', 'redo'
		],
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			]
		},
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		}
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
