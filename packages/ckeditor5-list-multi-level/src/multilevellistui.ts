/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list-multi-level/multilevellistui
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';

// import { CKEditorError } from 'ckeditor5/src/utils.js';
import {
	ButtonView,
	SplitButtonView,
	createDropdown,
	MenuBarMenuListItemButtonView
} from 'ckeditor5/src/ui.js';

import MultiLevelListView from './ui/multilevellistview.js';
import buttonIcon from '../theme/icons/multi-level-list.svg';
import { getTranslation } from './utils/common-translations.js';

/**
 * The multi-level list UI plugin. It introduces the `multiLevelList` toolbar button that allows users
 * to apply user-defined list markers. The default style is `legal` numbering.
 */
export default class MultiLevelListUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'MultiLevelListUI' as const;
	}

	/**
	 * @inheritDoc
	 */
	public static override get isOfficialPlugin(): true {
		return true;
	}

	private _licenseKeyCheckInterval: any;
	private licenseKey: any;

	constructor( editor: Editor ) {
		super( editor );
		this._licenseKeyCheckInterval = null;
	}
	public init(): void {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'multiLevelList', ( ( {
			editor,
			parentCommandName,
			buttonLabel,
			buttonIcon,
			styleGridAriaLabel,
			styleDefinitions
		} ) => {
			const _0x412a71 = editor.commands.get( parentCommandName );
			const _0x123c30 = editor.config.get( 'list.properties' ) || {};
			const _0x24a754 = editor.plugins.has( 'ListProperties' );
			const _0x11e59f = _0x123c30.startIndex;

			if ( !_0x24a754 || !_0x11e59f ) {
				return _0x5ce958 => {
					const _0x18686a = new ButtonView( _0x5ce958 );
					_0x18686a.set( {
						'label': buttonLabel,
						'icon': buttonIcon,
						'tooltip': !0x0,
						'isToggleable': !0x0
					} );
					_0x18686a.bind( 'isOn' ).to( _0x412a71!, 'value', _0x5d328f => !!_0x5d328f );
					_0x18686a.on( 'execute', () => {
						editor.execute( parentCommandName );
						editor.editing.view.focus();
					} );
					return _0x18686a;
				};
			}
			return _0x455eb1 => {
				const _0x4c4d13 = createDropdown( _0x455eb1, SplitButtonView );
				const _0x5e82f2 = _0x4c4d13.buttonView;

				_0x4c4d13.bind( 'isEnabled' ).to( _0x412a71! );
				_0x4c4d13.class = 'ck-list-styles-dropdown';
				_0x5e82f2.on( 'execute', () => {
					editor.execute( parentCommandName );
					editor.editing.view.focus();
				} );
				_0x5e82f2.set( {
					'label': buttonLabel,
					'icon': buttonIcon,
					'tooltip': !0x0,
					'isToggleable': !0x0
				} );
				_0x5e82f2.bind( 'isOn' ).to( _0x412a71!, 'value', _0x31f799 => !!_0x31f799 );
				_0x4c4d13.once( 'change:isOpen', () => {
					const _0x3d9eb3 = ( ( {
						editor: _0x45b374,
						dropdownView: _0xb06d87,
						styleDefinitions: _0xce7190,
						styleGridAriaLabel: _0x2cbca3
					} ) => {
						const _0x15b984 = _0x45b374.locale;
						const _0x1ef114 = _0x45b374.config.get( 'list.properties' );
						const _0x58b226 = null;

						_0x1ef114!.reversed = !1;

						if ( _0xce7190.length ) {
							_0x1ef114!.styles = !1;
						}
						// _0xce7190.length || ( _0x1ef114.styles = !1 );
						const _0xe3454 = new MultiLevelListView( _0x15b984, {
							'styleGridAriaLabel': _0x2cbca3,
							'enabledProperties': _0x1ef114!,
							'styleButtonViews': _0x58b226
						} );
						if ( _0x1ef114!.startIndex ) {
							const _0x2532e6 = _0x45b374.commands.get( 'listStart' );
							_0xe3454.startIndexFieldView.bind( 'isEnabled' ).to( _0x2532e6 );
							_0xe3454.startIndexFieldView!.fieldView.bind( 'value' ).to( _0x2532e6 );
							_0xe3454.on( 'listStart', ( _0x16c200, _0x266ea7 ) => _0x45b374.execute( 'listStart', _0x266ea7 ) );
						}
						_0xe3454.delegate( 'execute' ).to( _0xb06d87 );
						return _0xe3454;
					} )( {
						editor,
						'dropdownView': _0x4c4d13,
						parentCommandName,
						styleGridAriaLabel,
						styleDefinitions
					} );
					_0x4c4d13.panelView.children.add( _0x3d9eb3 );
				} );
				_0x4c4d13.on( 'execute', () => {
					editor.editing.view.focus();
				} );
				return _0x4c4d13;
			};
		} )( {
			editor,
			'parentCommandName': 'multiLevelList',
			'buttonLabel': getTranslation( editor.locale, 'Multi-level List' ),
			buttonIcon,
			'styleGridAriaLabel': getTranslation( editor.locale, 'Multi-level list styles toolbar' ),
			'styleDefinitions': []
		} ) );

		editor.ui.componentFactory.add( 'menuBar:multiLevelList', () => {
			const multiLevelListCommand = editor.commands.get( 'multiLevelList' );
			const button = new MenuBarMenuListItemButtonView( editor.locale );
			button.set( {
				'label': getTranslation( editor.locale, 'Multi-level List' ),
				'icon': buttonIcon
			} );
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			button.bind( 'isEnabled' ).to( multiLevelListCommand );
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			button.bind( 'isOn' ).to( multiLevelListCommand, 'value', _0x5184a9 => !!_0x5184a9 );
			button.on( 'execute', () => {
				editor.execute( 'multiLevelList' );
				editor.editing.view.focus();
			} );
			return button;
		} );

		this.licenseKey = editor.config.get( 'licenseKey' );
		// this._licenseKeyCheckInterval = setInterval( () => {
		// 	let _0x51a6f0;
		// 	for ( const _0x575a5a in editor ) {
		// 		const _0x2a450b = _0x575a5a;
		// 		const _0x568897 = editor[ _0x2a450b ];
		// 		if ( _0x568897 === 'multiLevelListLicenseKeyTrial' ||
		// 			_0x568897 === 'multiLevelListLicenseKeyInvalid' ||
		// 			_0x568897 === 'multiLevelListLicenseKeyValid' ||
		// 			_0x568897 === 'multiLevelListLicenseKeyTrialLimit:operations'
		// 		) {
		// 			delete editor[ _0x2a450b ];
		// 			_0x51a6f0 = _0x568897;
		// 			break;
		// 		}
		// 	}
		// 	if ( _0x51a6f0 === 'multiLevelListLicenseKeyInvalid' ) {
		// 		throw clearInterval( this._licenseKeyCheckInterval ), new CKEditorError( 'multi-level-list-invalid-license-key', null );
		// 	}
		// 	if ( _0x51a6f0 === 'multiLevelListLicenseKeyTrial' &&
		// 	console.info( 'You are using the trial version of CKEditor 5 multi level list plugin' +
		// 		' with limited usage. Make sure you will not use it in the production environment.' ),
		// 	'multiLevelListLicenseKeyTrialLimit:operations' === _0x51a6f0
		// 	) {
		// 		throw clearInterval( this._licenseKeyCheckInterval );
		// 		new CKEditorError( 'multi-level-list-trial-license-key-reached-limit-changes', null );
		// 	}
		// 	'multiLevelListLicenseKeyValid' === _0x51a6f0 && clearInterval( this._licenseKeyCheckInterval );
		// }, 1000 );
	}

	/**
     * @inheritDoc
     */
	public override destroy(): void {
		if ( this._licenseKeyCheckInterval ) {
			clearInterval( this._licenseKeyCheckInterval );
		}
	}
}
