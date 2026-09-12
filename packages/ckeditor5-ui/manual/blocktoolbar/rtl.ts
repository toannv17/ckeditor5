/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { BalloonEditor } from 'toannv-ckeditor5-editor-balloon';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { List } from 'toannv-ckeditor5-list';
import { Image, ImageCaption } from 'toannv-ckeditor5-image';
import { Paragraph, ParagraphButtonUI } from 'toannv-ckeditor5-paragraph';
import { Heading, HeadingButtonsUI } from 'toannv-ckeditor5-heading';
import { BlockToolbar } from '../../src/toolbar/block/blocktoolbar.js';

BalloonEditor
	.create( {
		root: {
			element: document.querySelector( '#editor' ) as HTMLElement
		},
		plugins: [ Essentials, List, Paragraph, Heading, Image, ImageCaption, HeadingButtonsUI, ParagraphButtonUI, BlockToolbar ],
		blockToolbar: [
			'paragraph', 'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList', 'paragraph',
			'heading1', 'heading2', 'heading3', 'bulletedList', 'numberedList', 'paragraph', 'heading1', 'heading2', 'heading3',
			'bulletedList', 'numberedList'
		],
		language: 'ar'
	} )
	.then( editor => {
		window.editor = editor;
	} )
	.catch( err => {
		console.error( err.stack );
	} );
