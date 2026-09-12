/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Alignment } from 'toannv-ckeditor5-alignment';
import { ArticlePluginSet } from 'toannv-ckeditor5-core/tests/_utils/articlepluginset.js';
import { Code, Strikethrough, Subscript, Superscript, Underline } from 'toannv-ckeditor5-basic-styles';
import { CodeBlock } from 'toannv-ckeditor5-code-block';
import { EasyImage } from 'toannv-ckeditor5-easy-image';
import { FontBackgroundColor, FontColor, FontFamily, FontSize } from 'toannv-ckeditor5-font';
import { Highlight } from 'toannv-ckeditor5-highlight';
import { HorizontalLine } from 'toannv-ckeditor5-horizontal-line';
import { HtmlEmbed } from 'toannv-ckeditor5-html-embed';
import { ImageResize, ImageUpload } from 'toannv-ckeditor5-image';
import { IndentBlock } from 'toannv-ckeditor5-indent';
import { LinkImage } from 'toannv-ckeditor5-link';
import { ListProperties, TodoList } from 'toannv-ckeditor5-list';
import { PageBreak } from 'toannv-ckeditor5-page-break';
import { SourceEditing } from 'toannv-ckeditor5-source-editing';
import { TableCellProperties, TableProperties, TableCaption, TableColumnResize } from 'toannv-ckeditor5-table';
import { CloudServices } from 'toannv-ckeditor5-cloud-services';
import { RemoveFormat } from 'toannv-ckeditor5-remove-format';

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
