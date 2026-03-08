/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import {
	View,
	ViewCollection,
	FocusCycler,
	LabeledFieldView,
	createLabeledInputNumber,
	addKeyboardHandlingForGrid,
	CollapsibleView, type FocusableView
} from 'ckeditor5/src/ui.js';

import {
	FocusTracker,
	KeystrokeHandler,
	global,
	type Locale
} from 'ckeditor5/src/utils.js';
import { getTranslation } from '../utils/common-translations.js';
import '../../theme/multilevellistview.css';
import { type ListPropertiesConfig } from 'ckeditor5/src/index.js';

export default class MultiLevelListView extends View {
	private additionalPropertiesCollapsibleView: any;
	private focusTracker: FocusTracker;
	private keystrokes: KeystrokeHandler;
	private focusables: ViewCollection<FocusableView>;
	private focusCycler: FocusCycler;

	private stylesView: any;
	private children: ViewCollection<View<HTMLElement>>;

	public startIndexFieldView: LabeledFieldView;

	constructor( locale: Locale, options: {
		enabledProperties: ListPropertiesConfig;
		styleButtonViews: any;
		styleGridAriaLabel: string;
	} ) {
		super( locale );

		const enabledProperties = options.enabledProperties;
		const styleButtonViews = options.styleButtonViews;
		const styleGridAriaLabel = options.styleGridAriaLabel;

		this.stylesView = null;
		this.additionalPropertiesCollapsibleView = null;
		this.startIndexFieldView = null;
		this.focusTracker = new FocusTracker();
		this.keystrokes = new KeystrokeHandler();
		this.focusables = new ViewCollection();
		const classList = [ 'ck', 'ck-multi-level-list-properties' ];

		this.children = this.createCollection();
		this.focusCycler = new FocusCycler( {
			'focusables': this.focusables,
			'focusTracker': this.focusTracker,
			'keystrokeHandler': this.keystrokes,
			'actions': { 'focusPrevious': 'shift + tab', 'focusNext': 'tab' }
		} );

		if ( enabledProperties.styles ) {
			this.stylesView = this._createStylesView( styleButtonViews, styleGridAriaLabel );
			this.children.add( this.stylesView );
		} else {
			classList.push( 'ck-multi-level-list-properties_without-styles' );
		}

		if ( enabledProperties.startIndex ) {
			this._addListPropertyViews( enabledProperties );
			classList.push( 'ck-multi-level-list-properties_with-multi-level-properties' );
		}

		this.setTemplate( {
			'tag': 'div',
			'attributes': { 'class': classList },
			'children': this.children
		} );
	}

	public override render(): void {
		super.render();
		if ( this.stylesView ) {
			this.focusables.add( this.stylesView );
			this.focusTracker.add( this.stylesView.element );
			if ( this.startIndexFieldView ) {
				this.focusables.add( this.children.last.buttonView );
				this.focusTracker.add( this.children.last.buttonView.element );
			}
			// this.startIndexFieldView && ( this.focusables.add( this.children.last.buttonView ),
			// this.focusTracker.add( this.children['last']['buttonView']['element'] ) );
			for ( const _0x52095d of this.stylesView.children ) {
				this.stylesView.focusTracker.add( _0x52095d.element );
			}
			addKeyboardHandlingForGrid( {
				'keystrokeHandler': this.stylesView.keystrokes,
				'focusTracker': this.stylesView.focusTracker,
				'gridItems': this.stylesView.children,
				'numberOfColumns': () => global.window.getComputedStyle( this.stylesView.element )
					.getPropertyValue( 'grid-template-columns' ).split( '\x20' ).length,
				'uiLanguageDirection': this.locale && this.locale.uiLanguageDirection
			} );
		}
		if ( this.startIndexFieldView ) {
			this.focusables.add( this.startIndexFieldView );
			this.focusTracker.add( this.startIndexFieldView.element );
			const _0x13a57a = _0x2e4f70 => _0x2e4f70.stopPropagation();
			this.keystrokes.set( 'arrowright', _0x13a57a );
			this.keystrokes.set( 'arrowleft', _0x13a57a );
			this.keystrokes.set( 'arrowup', _0x13a57a );
			this.keystrokes.set( 'arrowdown', _0x13a57a );
		}
		this.keystrokes.listenTo( this.element );
	}

	public focus(): void {
		this.focusCycler.focusFirst();
	}

	public focusLast(): void {
		this.focusCycler.focusLast();
	}

	public override destroy(): void {
		super.destroy();
		this.focusTracker.destroy();
		this.keystrokes.destroy();
	}

	public _createStylesView( _0x4da6c9: any, _0x285632: any ) {
		const view = new View( this.locale );
		view.children = view.createCollection();
		view.children.addMany( _0x4da6c9 );
		view.setTemplate( {
			'tag': 'div',
			'attributes': { 'aria-label': _0x285632, 'class': [ 'ck', 'ck-multi-level-list-styles' ] },
			'children': view.children
		} );
		view.children.delegate( 'execute' ).to( this );
		view.focus = () => {
			this.children.first.focus();
		};
		view.focusTracker = new FocusTracker();
		view.keystrokes = new KeystrokeHandler();
		view.render();
		view.keystrokes.listenTo( view.element );
		return view;
	}

	public _addListPropertyViews( _0x5944c8 ) {
		const _0x53ba58 = [];
		if ( _0x5944c8.startIndex ) {
			this.startIndexFieldView = this._createStartIndexField();
			_0x53ba58.push( this.startIndexFieldView );
		}

		if ( _0x5944c8.styles ) {
			this.additionalPropertiesCollapsibleView = new CollapsibleView( this.locale, _0x53ba58 );
			this.additionalPropertiesCollapsibleView.set( {
				'label': getTranslation( this.locale!, 'List properties' ),
				'isCollapsed': !0
			} );
			this.additionalPropertiesCollapsibleView.buttonView.bind( 'isEnabled' )
				.toMany(
					_0x53ba58,
					'isEnabled',
					( ..._0x582868: any ) => _0x582868.some( _0x3d18f9 => _0x3d18f9 )
				);

			this.additionalPropertiesCollapsibleView.buttonView.on(
				'change:isEnabled',
				( _0x3f3d8e: any, _0x5b8230: any, _0x11dbef: any ) => {
					if ( !_0x11dbef ) {
						this.additionalPropertiesCollapsibleView.isCollapsed = !0;
					}
					// _0x11dbef || ( this.additionalPropertiesCollapsibleView.isCollapsed = !0x0 );
				} );
			this.children.add( this.additionalPropertiesCollapsibleView );
		} else {
			this.children.addMany( _0x53ba58 );
		}

		// _0x5944c8.styles ? (
		// 	this['additionalPropertiesCollapsibleView'] = new CollapsibleView( this['locale'], _0x53ba58 ), this['additionalPropertiesCollapsibleView']['set']( {
		// 	'label': getTranslation( this['locale'], 'List properties' ),
		// 	'isCollapsed': !0x0
		// } ), this['additionalPropertiesCollapsibleView']['buttonView']['bind']( 'isEnabled' )['toMany']( _0x53ba58, 'isEnabled', ( ..._0x582868 ) => _0x582868['some']( _0x3d18f9 => _0x3d18f9 ) ), this['additionalPropertiesCollapsibleView']['buttonView']['on']( 'change:isEnabled', ( _0x3f3d8e, _0x5b8230, _0x11dbef ) => {
		// 	_0x11dbef || ( this['additionalPropertiesCollapsibleView']['isCollapsed'] = !0x0 );
		// } ), this['children']['add']( this['additionalPropertiesCollapsibleView'] )
		// ) : this['children']['addMany']( _0x53ba58 );
	}

	public _createStartIndexField() {
		const _0x54af3e = new LabeledFieldView( this.locale, createLabeledInputNumber );
		_0x54af3e.set( {
			'label': getTranslation( this.locale, 'Start at' ),
			'class': 'ck-multi-level-list-properties__start-index'
		} );
		_0x54af3e.fieldView.set( {
			'min': 0x0,
			'step': 0x1,
			'value': 0x1,
			'inputMode': 'numeric'
		} );
		_0x54af3e.fieldView.on( 'input', () => {
			const _0x972623 = _0x54af3e.fieldView.element;
			const _0x5b9c4f = _0x972623!.valueAsNumber;
			if ( Number.isNaN( _0x5b9c4f ) ) {
				_0x54af3e.errorText = getTranslation( this.locale, 'Invalid start index value.' );
			} else {
				if ( _0x972623.checkValidity() ) {
					this.fire( 'listStart', { 'startIndex': _0x5b9c4f } );
				} else {
					_0x54af3e.errorText = getTranslation( this.locale, 'Start index must be greater than 0.' );
				}
			}
			// Number.isNaN( _0x5b9c4f ) ?
			// _0x54af3e.errorText = getTranslation( this.locale, 'Invalid start index value.' )
			// :
			// _0x972623.checkValidity() ? this['fire']( 'listStart', { 'startIndex': _0x5b9c4f } )
			// 	:
			// 	_0x54af3e['errorText'] = getTranslation( this['locale'], 'Start index must be greater than 0.' );
		} );
		return _0x54af3e;
	}
}

// _0xe3454.startIndexFieldView.bind( 'isEnabled' ).to( _0x2532e6 );
// _0xe3454.startIndexFieldView.fieldView.bind( 'value' ).to( _0x2532e6 );
// _0xe3454.on( 'listStart', ( _0x16c200, _0x266ea7 ) => _0x45b374.execute( 'listStart', _0x266ea7 ) );
// }
// _0xe3454.delegate( 'execute' ).to( _0xb06d87 );
