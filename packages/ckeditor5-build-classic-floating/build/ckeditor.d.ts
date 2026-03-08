/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { ClassicEditor as ClassicEditorBase } from 'ckeditor5-editor-classic-floating';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { CKFinderUploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { AutoImage, Image, ImageCaption, ImageInsert, ImageResize, ImageStyle, ImageToolbar, ImageUpload, PictureEditing } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { AutoLink, Link, LinkImage } from 'ckeditor5-link-2';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { MultiLevelList } from 'ckeditor5-list-multi-level';
export default class ClassicEditor extends ClassicEditorBase {
    static builtinPlugins: (typeof TextTransformation | typeof Essentials | typeof CKFinderUploadAdapter | typeof Paragraph | typeof Heading | typeof Autoformat | typeof Bold | typeof Italic | typeof BlockQuote | typeof AutoImage | typeof Image | typeof ImageCaption | typeof ImageInsert | typeof ImageResize | typeof ImageStyle | typeof ImageToolbar | typeof ImageUpload | typeof CloudServices | typeof CKBox | typeof CKFinder | typeof EasyImage | typeof List | typeof Indent | typeof AutoLink | typeof Link | typeof LinkImage | typeof MediaEmbed | typeof PasteFromOffice | typeof Table | typeof TableToolbar | typeof MultiLevelList | typeof PictureEditing)[];
    static defaultConfig: {
        toolbar: {
            items: string[];
        };
        image: {
            styles: {
                options: string[];
            };
            toolbar: (string | {
                name: string;
                title: string;
                items: string[];
                defaultItem: string;
            })[];
        };
        table: {
            contentToolbar: string[];
        };
        language: string;
    };
}
