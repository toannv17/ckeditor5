/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import { ClassicEditor as ClassicEditorBase } from 'ckeditor5-editor-classic-floating';

import { Essentials } from '@ckeditor/ckeditor5-essentials';
// import { CKFinderUploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
// import { CKBox } from '@ckeditor/ckeditor5-ckbox';
// import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { AutoImage,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
// import { AutoLink, Link, LinkImage } from 'ckeditor5-link-2';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { MultiLevelList } from 'ckeditor5-list-multi-level-3';

export default class ClassicEditor extends ClassicEditorBase {
	public static override builtinPlugins = [
		Essentials,
		// CKFinderUploadAdapter,
		Autoformat,
		AutoImage,
		// AutoLink,
		Bold,
		Italic,
		BlockQuote,
		// CKBox,
		// CKFinder,
		CloudServices,
		EasyImage,
		Heading,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		ImageInsert,
		ImageResize,
		Indent,
		// Link,
		// LinkImage,
		List,
		MultiLevelList,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		Table,
		TableToolbar,
		TextTransformation
	];

	public static override defaultConfig = {
		toolbar: {
			items: [
				'undo', 'redo',
				'|', 'heading',
				'|', 'bold', 'italic',
				'|', 'uploadImage', 'insertTable', 'blockQuote', 'mediaEmbed',
				// '|', 'link', 'uploadImage', 'insertTable', 'blockQuote', 'mediaEmbed',
				'|', 'bulletedList', 'numberedList', 'outdent', 'indent', 'multiLevelList'
			]
		},
		image: {
			styles: {
				options: [
					'inline',
					'alignLeft',
					'alignRight',
					'alignCenter',
					'alignBlockLeft',
					'alignBlockRight',
					'block',
					'side'
				]
			},
			toolbar: [
				'toggleImageCaption',
				// 'linkImage',
				'imageTextAlternative',
				'|',
				'resizeImage',
				'|',
				{
					name: 'imageStyle:icons',
					title: 'Style',
					items: [
						'imageStyle:inline',
						'imageStyle:block',
						'imageStyle:side',
						'imageStyle:alignLeft',
						'imageStyle:alignRight',
						'imageStyle:alignCenter',
						'imageStyle:alignBlockLeft',
						'imageStyle:alignBlockRight'
					],
					defaultItem: 'imageStyle:block'
				}
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		// This value must be kept in sync with the language defined in webpack.config.js.
		language: 'en'
	};
}
