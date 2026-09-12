/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
import { CodeBlock } from 'toannv-ckeditor5-code-block';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { Heading } from 'toannv-ckeditor5-heading';
import { Image, ImageUpload, ImageInsert } from 'toannv-ckeditor5-image';
import { Link, LinkImage } from 'toannv-ckeditor5-link';
import { List } from 'toannv-ckeditor5-list';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Table } from 'toannv-ckeditor5-table';

import { Bookmark } from '../src/bookmark.js';

import { CS_CONFIG } from 'toannv-ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor-with-output' ) as HTMLElement,
		plugins: [
			Essentials, Link, List, LinkImage, Paragraph, Table, Image, ImageUpload, CodeBlock,
			BlockQuote, EasyImage, CloudServices, ImageInsert, Heading, Bold, Italic, Bookmark
		],
		toolbar: [
			'bookmark', '|',
			'undo', 'redo', '|',
			'heading', '|',
			'bold', 'italic', '|',
			'link', 'insertImage', 'insertTable', 'codeBlock', 'blockQuote', '|',
			'bulletedList', 'numberedList'
		],
		cloudServices: CS_CONFIG,
		menuBar: {
			isVisible: true
		}
	} )
	.then( editor => {
		window.editor = editor;

		const iframe = document.querySelector( '#iframe' ) as HTMLIFrameElement;

		iframe!.srcdoc = `<!doctype html>${ editor.getData() }`;

		editor.model.document.on( 'change', () => {
			iframe!.srcdoc = `<!doctype html>${ editor.getData() }`;
		} );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
