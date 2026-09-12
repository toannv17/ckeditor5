/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';
import { Enter } from 'toannv-ckeditor5-enter';
import { Typing } from 'toannv-ckeditor5-typing';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Undo } from 'toannv-ckeditor5-undo';
import { Heading } from 'toannv-ckeditor5-heading';
import { global } from 'toannv-ckeditor5-utils';
import { enableViewPlaceholder, type PlaceholderableViewElement } from '../src/view/placeholder.js';

ClassicEditor
	.create( {
		attachTo: global.document.querySelector( '#editor' ) as HTMLElement,
		plugins: [ Enter, Typing, Paragraph, Undo, Heading ],
		toolbar: [ 'heading', '|', 'undo', 'redo' ]
	} )
	.then( editor => {
		const view = editor.editing.view;
		const viewDoc = view.document;
		const header = viewDoc.getRoot()!.getChild( 0 ) as PlaceholderableViewElement;
		const paragraph = viewDoc.getRoot()!.getChild( 1 ) as PlaceholderableViewElement;

		enableViewPlaceholder( {
			view,
			element: header,
			text: 'Type some header text...'
		} );

		enableViewPlaceholder( {
			view,
			element: paragraph,
			text: 'Type some paragraph text...'
		} );

		( view as any )._render();
	} )
	.catch( err => {
		console.error( err.stack );
	} );
