/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

/**
 * @module core/tests/_utils/articlepluginset
 */

import { Plugin } from 'toannv-ckeditor5-core';
import { Essentials } from 'toannv-ckeditor5-essentials';
import { Autoformat } from 'toannv-ckeditor5-autoformat';
import { BlockQuote } from 'toannv-ckeditor5-block-quote';
import { Bold, Italic } from 'toannv-ckeditor5-basic-styles';
import { Heading } from 'toannv-ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar } from 'toannv-ckeditor5-image';
import { Indent } from 'toannv-ckeditor5-indent';
import { Link } from 'toannv-ckeditor5-link';
import { List } from 'toannv-ckeditor5-list';
import { MediaEmbed } from 'toannv-ckeditor5-media-embed';
import { Paragraph } from 'toannv-ckeditor5-paragraph';
import { Table, TableToolbar } from 'toannv-ckeditor5-table';

/**
 * Set of plugins which create a simple article editor.
 *
 * This set of plugins follows [Editor Recommendations](https://github.com/ckeditor/editor-recommendations).
 *
 * It is maintained for **test and development purposes**. The core team uses it to simplify
 * creating typical editors in tests and documentation.
 *
 * @extends module:core/plugin~Plugin
 */
export class ArticlePluginSet extends Plugin {
	static get pluginName() {
		return 'ArticlePluginSet';
	}

	static get requires() {
		return [
			Essentials,
			Autoformat,
			BlockQuote,
			Bold,
			Heading,
			Image,
			ImageCaption,
			ImageStyle,
			ImageToolbar,
			Indent,
			Italic,
			Link,
			List,
			MediaEmbed,
			Paragraph,
			Table,
			TableToolbar
		];
	}
}
