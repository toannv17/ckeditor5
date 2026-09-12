/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Bold, Italic, Strikethrough } from 'toannv-ckeditor5-basic-styles';
import { Heading } from 'toannv-ckeditor5-heading';
import { List } from 'toannv-ckeditor5-list';
import { Image } from 'toannv-ckeditor5-image';
import { Table, TableCaption } from 'toannv-ckeditor5-table';
import { SourceEditing } from 'toannv-ckeditor5-source-editing';

import { GeneralHtmlSupport } from '../src/generalhtmlsupport.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Bold,
			Essentials,
			GeneralHtmlSupport,
			Italic,
			Heading,
			List,
			Image,
			Paragraph,
			SourceEditing,
			Strikethrough,
			Table,
			TableCaption
		],
		toolbar: [ 'insertTable', '|', 'bold', 'italic', 'strikethrough', '|', 'sourceEditing' ],
		htmlSupport: {
			allow: [
				{
					name: /^(figure|table|tbody|thead|tr|th|td|caption|figcaption|span|p|img)$/,
					attributes: [ 'valign' ],
					styles: true,
					classes: true
				}
			]
		}
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
