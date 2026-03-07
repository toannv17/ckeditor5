/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import type { Locale } from 'ckeditor5/src/utils.js';
export function getTranslation( locale: Locale, id: string ): string {
	const t = locale.t;

	switch ( id ) {
		case 'Start\x20at':
			return t( 'Start\x20at' );
		case 'Start\x20index\x20must\x20be\x20greater\x20than\x200.':
			return t( 'Start\x20index\x20must\x20be\x20greater\x20than\x200.' );
		case 'Invalid\x20start\x20index\x20value.':
			return t( 'Invalid\x20start\x20index\x20value.' );
		case 'List\x20properties':
			return t( 'List\x20properties' );
		case 'Multi-level\x20List':
			return t( 'Multi-level\x20List' );
		case 'Multi-level\x20list\x20styles\x20toolbar':
			return t( 'Multi-level\x20list\x20styles\x20toolbar' );
		default:
			return id;
	}
}
