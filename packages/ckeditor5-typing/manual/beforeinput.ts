/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

import { ClassicEditor } from 'toannv-ckeditor5-editor-classic';

import { Essentials } from 'toannv-ckeditor5-essentials';
import { Autoformat } from 'toannv-ckeditor5-autoformat';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { Heading } from 'toannv-ckeditor5-heading';
import { Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar } from 'toannv-ckeditor5-image';
import { Indent } from 'toannv-ckeditor5-indent';
import { Link } from 'toannv-ckeditor5-link';
import { List } from 'toannv-ckeditor5-list';
import { MediaEmbed } from 'toannv-ckeditor5-media-embed';
import { Mention } from 'toannv-ckeditor5-mention';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Table, TableToolbar } from 'toannv-ckeditor5-table';

for ( const input of document.querySelectorAll( 'input[name=logEvents]' ) as NodeListOf<HTMLInputElement> ) {
	if ( sessionStorage.getItem( input.value ) === null ) {
		sessionStorage.setItem( input.value, JSON.stringify( input.checked ) );
	}

	( window as any )[ input.value ] = input.checked = JSON.parse( sessionStorage.getItem( input.value )! );

	input.addEventListener( 'change', ( { target } ) => {
		( window as any )[ ( target as HTMLInputElement ).value ] = ( target as HTMLInputElement ).checked;
		sessionStorage.setItem( input.value, JSON.stringify( input.checked ) );
	} );
}

// Importing native event listeners after the above window properties are initialized.
import './beforeinput-contenteditable.js';

declare global {
	interface Window { editor: any }
}

ClassicEditor
	.create( {
		attachTo: document.querySelector( '#editor' ) as HTMLElement,
		plugins: [
			Essentials,
			Autoformat,
			BlockQuote,
			Bold,
			Heading,
			Image,
			ImageCaption,
			ImageStyle,
			ImageToolbar,
			ImageResize,
			Indent,
			Italic,
			Link,
			List,
			MediaEmbed,
			Mention,
			Paragraph,
			Table,
			TableToolbar
		],
		toolbar: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo'
		],
		image: {
			toolbar: [
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:wrapText',
				'|',
				'toggleImageCaption',
				'imageTextAlternative'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		},
		mention: {
			feeds: [
				{
					marker: '@',
					feed: [ '@Barney', '@Lily', '@Marshall', '@Robin', '@Ted' ]
				},
				{
					marker: '#',
					feed: [
						'#a01', '#a02', '#a03', '#a04', '#a05', '#a06', '#a07', '#a08', '#a09', '#a10',
						'#a11', '#a12', '#a13', '#a14', '#a15', '#a16', '#a17', '#a18', '#a19', '#a20'
					]
				},
				{
					marker: ':',
					feed: [
						':+1:', ':-1:', ':@(at-sign):', ':$(dollar-sign):', ':#(hash-sign):'
					]
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
