/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { ImageInsert } from '../src/imageinsert.js';
import { AutoImage } from '../src/autoimage.js';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { Autoformat } from 'toannv-ckeditor5-autoformat';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { Heading } from 'toannv-ckeditor5-heading';
import { ImageStyle } from '../src/imagestyle.js';
import { ImageToolbar } from '../src/imagetoolbar.js';
import { Indent } from 'toannv-ckeditor5-indent';
import { Link } from 'toannv-ckeditor5-link';
import { List } from 'toannv-ckeditor5-list';
import { MediaEmbed } from 'toannv-ckeditor5-media-embed';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Table, TableToolbar } from 'toannv-ckeditor5-table';
import { ImageInline } from '../src/imageinline.js';
import { CKFinder } from 'toannv-ckeditor5-ckfinder';
import { CKFinderUploadAdapter } from 'toannv-ckeditor5-adapter-ckfinder';

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Essentials,
			Autoformat,
			BlockQuote,
			Bold,
			Heading,
			ImageInline,
			ImageStyle,
			ImageToolbar,
			Indent,
			Italic,
			Link,
			List,
			MediaEmbed,
			Paragraph,
			Table,
			TableToolbar,
			ImageInsert,
			CKFinder,
			CKFinderUploadAdapter,
			AutoImage
		],
		toolbar: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'blockQuote',
			'imageInsert',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		],
		image: {
			toolbar: [ 'imageStyle:inline', 'imageStyle:wrapText', '|', 'imageTextAlternative' ]
		},
		ckfinder: {
			// eslint-disable-next-line @stylistic/max-len
			uploadUrl: 'https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json'
		}
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
