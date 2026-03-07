/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list-multi-level/multilevellistediting
 */
import { Plugin, type Editor, Context } from 'ckeditor5/src/core.js';
import { UpcastWriter, Matcher } from 'ckeditor5/src/engine.js';
import MultiLevelListUI from "./multilevellistui.js";
import { ListEditing } from '@ckeditor/ckeditor5-list/src/index.js';
import MultiLevelListCommand from './multilevellistcommand.js';

export default class MultiLevelListEditing extends Plugin {
	public static get pluginName() {
		return 'MultiLevelListEditing' as const;
	}

	public static override get isOfficialPlugin() {
		return true;
	}

	public static get requires() {
		return [ ListEditing ] as const;
	}

	private _listDefinitions: any;

	constructor( editor: Editor ) {
		super( editor );

		// Lấy cấu hình danh sách đa cấp từ config của editor
		const customDefinitions: any = editor.config.get( 'listMultiLevel.listDefinitions' ) || [];

		// Khởi tạo danh sách định nghĩa mặc định kết hợp với cấu hình người dùng
		this._listDefinitions = [
			{
				listType: 'customNumbered',
				listMarkerStyle: 'legal',
				className: 'legal-list',
				listMarkers: [
					{ marker: ( index: any ) => index + '.' }
				]
			},
			...customDefinitions
		];
	}

	init(): void {
		const editor = this.editor;
		const model = editor.model;
		const schema = model.schema;
		const conversion = editor.conversion;

		// Đăng ký lệnh điều khiển danh sách đa cấp
		editor.commands.add('multiLevelList', new MultiLevelListCommand(editor, 'customNumbered', this._listDefinitions));

		// Cấu hình Schema: Cho phép các thuộc tính 'listMarkerStyle' và 'listItemId' trên phần tử 'listItem'
		schema.extend('listItem', {
			allowAttributes: ['listMarkerStyle', 'listItemId']
		});

		// Kiểm tra tính hợp lệ của thuộc tính trong schema
		schema.addAttributeCheck((context, attributeName) => {
			const item = context.last;
			if (attributeName == 'listItemId' || attributeName == 'listMarkerStyle') {
				// Kiểm tra xem phần tử có phải là danh sách đa cấp hợp lệ không
				if (!item.hasAttribute('listType')) return false;

				return this._listDefinitions.some(def => def.listType == item.getAttribute('listType'));
			}
		});

		// Thiết lập việc chuyển đổi dữ liệu (Downcast/Upcast) cho từng loại danh sách
		for (const definition of this._listDefinitions) {
			// Xử lý Downcast (Từ Model hiển thị ra View/HTML)
			editor.conversion.for('downcast').add(dispatcher => {
				dispatcher.on('attribute:listMarkerStyle', (evt, data, conversionApi) => {
					// Logic thay đổi class và style khi thuộc tính listMarkerStyle thay đổi
					if (data.attributeNewValue == definition.listMarkerStyle) {
						conversionApi.writer.addClass(['multi-level-list', definition.className], data.item);
						conversionApi.writer.setStyle('list-style-type', 'none', data.item);
					} else {
						conversionApi.writer.removeClass(['multi-level-list', definition.className], data.item);
						conversionApi.writer.removeStyle('list-style-type', data.item);
					}
				});
			});

			// Tạo các Marker (số thứ tự 1.1, 1.2...) hiển thị trong trình soạn thảo
			editor.conversion.for('editingDowncast').add(dispatcher => {
				dispatcher.on('insert:listItem', (evt, data, conversionApi) => {
					// Tạo phần tử <span> chứa số thứ tự nếu là danh sách đa cấp
					if (data.item.getAttribute('listMarkerStyle') === definition.listMarkerStyle) {
						const viewElement = conversionApi.writer.createUIElement('span', {
							class: 'multi-level-list__marker',
							contenteditable: 'false'
						}, function(domDocument) {
							const domElement = this.toDomElement(domDocument);
							// Logic tính toán số thứ tự (ví dụ: 1.1.2) dựa trên cấp độ
							domElement.innerText = "Calculated Marker ";
							return domElement;
						});
						// Chèn vào đầu dòng của item
						conversionApi.writer.insert(conversionApi.createPositionAt(data.item, 0), viewElement);
					}
				});
			});
		}
	}
	afterInit: void {

	}
}
