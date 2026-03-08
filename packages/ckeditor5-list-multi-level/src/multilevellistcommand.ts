/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list-multi-level/multilevellistcommand
 * @publicApi
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
import type { MultiLevelListDefinition } from './multilevellist.js';
import { first } from 'ckeditor5/src/utils.js';
import { type ListUtils } from 'ckeditor5/src/index.js';

/**
 * The multi-level list command. It changes `listMarkerStyle` attribute of the selected list items, letting the user
 * choose styles for the list item markers. It also changes `listType` attribute to `customNumbered` or `customBulleted`.
 */
export default class MultiLevelListCommand extends Command {
	/**
     * If the first selected block is a list item, its `listMarkerStyle` value is set in this property.
     *
     * @observable
     * @readonly
     */
	declare public value: string | null;

	/**
     * The default type of the list marker style.
     */
	private readonly defaultListMarkerStyle: string;

	declare private _listDefinitions: Array<MultiLevelListDefinition>;
	private _listUtils: ListUtils;

	/**
     * Creates an instance of the command.
     *
     * @param editor The editor instance.
     * @param defaultListMarkerStyle The list marker style that will be used by default if the value was not specified
     * during the command execution.
     * @param listDefinitions The list of multi-level list definitions.
     */
	constructor( editor: Editor, defaultListMarkerStyle: string, listDefinitions: Array<MultiLevelListDefinition> ) {
		super( editor );
		this.defaultListMarkerStyle = defaultListMarkerStyle;
		this._listDefinitions = listDefinitions;
		this._listUtils = this.editor.plugins.get( 'ListUtils' );

		this.set( 'value', null );
	}

	/**
     * @inheritDoc
     */
	public override refresh(): void {
		this.value = this._getValue();
		this.isEnabled = this._checkEnabled();
	}

	/**
     * Executes the command.
     *
     * @fires execute
     * @param options.listMarkerStyle The multi-level list marker style. If not specified, the default style will be applied.
     */
	public override execute( options?: {
        listMarkerStyle?: string;
    } ): void {
		const model = this.editor.model;
		const listMarkerStyle = options?.listMarkerStyle || this.defaultListMarkerStyle;
		model.change( () => {
			const listType = this._getListTypeFromListMarkerStyle( listMarkerStyle );
			if ( !listType ) {
				return;
			}
			const _0x3df981 = listType + 'List';
			this.editor.execute( _0x3df981, { 'additionalAttributes': { listMarkerStyle } } );
		} );
	}

	public _getValue(): any {
		const _0x55c521 = first( this.editor.model.document.selection.getSelectedBlocks() );
		return this._listUtils.isListItemBlock( _0x55c521 ) ? _0x55c521!.getAttribute( 'listMarkerStyle' ) : null;
	}

	public _checkEnabled(): boolean {
		const editor = this.editor;
		const _0x323e04 = editor.commands.get( 'customNumberedList' );
		const _0x62ba47 = editor.commands.get( 'customBulletedList' );
		return _0x323e04!.isEnabled || _0x62ba47!.isEnabled;
	}

	public _getListTypeFromListMarkerStyle( _0x36486f: any ): any {
		const _0x582859 = this._listDefinitions.find( _0x4a1519 => _0x4a1519.listMarkerStyle == _0x36486f );
		return _0x582859 ? _0x582859.listType : null;
	}
}
