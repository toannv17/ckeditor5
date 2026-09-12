/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from '@ckeditor-nonkey/ckeditor5-editor-classic';
import { Alignment } from '@ckeditor-nonkey/ckeditor5-alignment';
import { ArticlePluginSet } from '@ckeditor-nonkey/ckeditor5-core/tests/_utils/articlepluginset.js';
import { Code, Strikethrough, Subscript, Superscript, Underline } from '@ckeditor-nonkey/ckeditor5-basic-styles';
import { CodeBlock } from '@ckeditor-nonkey/ckeditor5-code-block';
import { EasyImage } from '@ckeditor-nonkey/ckeditor5-easy-image';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from '@ckeditor-nonkey/ckeditor5-font';
import { Highlight } from '@ckeditor-nonkey/ckeditor5-highlight';
import { HorizontalLine } from '@ckeditor-nonkey/ckeditor5-horizontal-line';
import { HtmlEmbed } from '@ckeditor-nonkey/ckeditor5-html-embed';
import { ImageResize, ImageUpload } from '@ckeditor-nonkey/ckeditor5-image';
import { IndentBlock } from '@ckeditor-nonkey/ckeditor5-indent';
import { LinkImage } from '@ckeditor-nonkey/ckeditor5-link';
import { ListProperties, TodoList } from '@ckeditor-nonkey/ckeditor5-list';
import { PageBreak } from '@ckeditor-nonkey/ckeditor5-page-break';
import { SourceEditing } from '@ckeditor-nonkey/ckeditor5-source-editing';
import { TableCellProperties, TableProperties, TableCaption, TableColumnResize } from '@ckeditor-nonkey/ckeditor5-table';
import { CloudServices } from '@ckeditor-nonkey/ckeditor5-cloud-services';
import { RemoveFormat } from '@ckeditor-nonkey/ckeditor5-remove-format';

import { GeneralHtmlSupport } from '../src/generalhtmlsupport.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			ArticlePluginSet, Underline, Strikethrough, Superscript, Subscript, Code,
			FontColor, FontBackgroundColor, FontFamily, FontSize, Highlight,
			CodeBlock, TodoList, ListProperties, TableProperties, TableCellProperties, TableCaption,
			TableColumnResize, EasyImage, ImageResize, LinkImage, HtmlEmbed,
			Alignment, IndentBlock,
			PageBreak, HorizontalLine,
			ImageUpload, CloudServices,
			RemoveFormat,
			SourceEditing,
			GeneralHtmlSupport
		],
		toolbar: [
			'sourceEditing',
			'|',
			'heading',
			'|',
			'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'link',
			'|',
			'highlight', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
			'|',
			'bulletedList', 'numberedList', 'todoList',
			'|',
			'blockQuote', 'uploadImage', 'insertTable', 'mediaEmbed', 'codeBlock',
			'|',
			'htmlEmbed',
			'|',
			'alignment', 'outdent', 'indent',
			'|',
			'pageBreak', 'horizontalLine',
			'|',
			'undo', 'redo',
			'|',
			'RemoveFormat'
		],
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			],
			allowEmpty: [ 'i' ]
		}
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
