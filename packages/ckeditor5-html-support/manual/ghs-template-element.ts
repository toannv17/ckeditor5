/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { ArticlePluginSet } from '@ckeditor-nonkey/ckeditor5-core/tests/_utils/articlepluginset.js';
import { Code, Strikethrough, Underline } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { CodeBlock } from '@ckeditor-nonkey/ckeditor5-code-block';
import { HorizontalLine } from '@ckeditor-nonkey/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor-nonkey/ckeditor5-html-embed';
import { LinkImage } from '@ckeditor-nonkey/ckeditor5-link';
import { SourceEditing } from '@ckeditor-nonkey/ckeditor5-source-editing';
import { ImageUpload } from '@ckeditor-nonkey/ckeditor5-image';
import { RemoveFormat } from '@ckeditor-nonkey/ckeditor5-remove-format';

import { GeneralHtmlSupport } from '../src/generalhtmlsupport.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			ArticlePluginSet, Underline, Strikethrough, Code, CodeBlock, LinkImage,
			HtmlEmbed, HorizontalLine, ImageUpload, RemoveFormat, SourceEditing, GeneralHtmlSupport
		],
		toolbar: [
			'sourceEditing',
			'|',
			'heading',
			'|',
			'bulletedList', 'numberedList',
			'|',
			'blockQuote', 'uploadImage', 'insertTable', 'mediaEmbed', 'codeBlock',
			'|',
			'htmlEmbed',
			'|',
			'undo', 'redo'
		],
		htmlSupport: {
			allow: [
				{
					name: /./,
					styles: true,
					attributes: true,
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
