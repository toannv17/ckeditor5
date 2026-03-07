/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list-multi-level/multilevellistediting
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { UpcastWriter, Matcher } from 'ckeditor5/src/engine.js';
// import MultiLevelListUI from "./multilevellistui.js";
import { ListEditing } from 'ckeditor5/src/index.js';
import MultiLevelListCommand from './multilevellistcommand.js';

export default class MultiLevelListEditing extends Plugin {
	public static get pluginName() {
		return 'MultiLevelListEditing' as const;
	}

	public static override get isOfficialPlugin(): true {
		return true;
	}

	public static get requires() {
		return [ ListEditing ] as const;
	}

	private _listDefinitions: any;

	constructor( editor: Editor ) {
		super( editor );
		console.log( this );
		console.log( this._listDefinitions );

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

	public init(): void {
		const editor = this.editor;
		const model = editor.model;
		const editing = editor.editing;
		const listEditing = editor.plugins.get( ListEditing );

		editor.commands.add( 'multiLevelList', new MultiLevelListCommand( editor, 'legal', this._listDefinitions ) );
		// editor["commands"]["add"]( "multiLevelList", new MultiLevelListCommand( editor, "legal", this._listDefinitions ) ),

		model.schema.extend( '$listItem', { 'allowAttributes': [ 'listMarkerStyle', 'listMarker' ] } );
		// model["schema"]["extend"]( "$listItem", { 'allowAttributes': [ "listMarkerStyle", "listMarker" ] } ),

		model.schema.addAttributeCheck( ( context, attributeName ) => {
			const item = context.last;
			if ( attributeName == 'listMarker' || attributeName == 'listMarkerStyle' ) {
				return !( !item.getAttribute( 'listItemId' ) ||
					!this._listDefinitions.find( ( _0x3f6e76: any ) => _0x3f6e76.listType == item.getAttribute( 'listType' ) )
				) && undefined;
			}
		} );
		// model["schema"]["addAttributeCheck"]( ( context, attributeName ) => {
		// 	const _0xad82e0 = context["last"];
		// 	if ("listMarker" == attributeName || "listMarkerStyle" == attributeName) {
		// 		return !( !_0xad82e0["getAttribute"]( "listItemId" ) ||
		// 		!this._listDefinitions["find"]( _0x3f6e76 => _0x3f6e76["listType"] == _0xad82e0["getAttribute"]( "listType" ) )
		// 		) && void 0x0;
		// 	}
		// }
		// );

		for ( const definition of this._listDefinitions ) {
			editor.conversion.for( 'upcast' ).add( dispatcher => dispatcher.on(
				'element:' + ( definition.listType == 'customNumbered' ? 'ol' : 'ul' ),
				y( definition, model.schema ), { 'priority': 'low' } )
			);

			listEditing.registerDowncastStrategy( {
				'scope': 'list',
				'attributeName': 'listMarkerStyle',
				setAttributeOnDowncast( writer, value, element ) {
					if ( value == definition.listMarkerStyle ) {
						writer.addClass( [ 'multi-level-list', definition.className ], element );
						writer.setStyle( 'list-style-type', 'none', element );
					} else {
						writer.removeClass( [ 'multi-level-list', definition.className ], element );
						writer.removeStyle( 'list-style-type', element );
					}
				}
			} );
			// writer, listStyle, element

			listEditing.registerDowncastStrategy( {
				'scope': 'itemMarker',
				'attributeName': 'listMarker',
				createElement( writer, modelElement, { dataPipeline: _0x1d403d } ) {
					if ( !modelElement.hasAttribute( 'listMarker' ) ) {
						return null;
					}
					if ( modelElement.getAttribute( 'listType' ) != definition.listType ||
						modelElement.getAttribute( 'listMarkerStyle' ) != definition.listMarkerStyle
					) {
						return null;
					}
					return writer.createUIElement(
						'span',
						{ 'class': 'multi-level-list__marker', ...!_0x1d403d && { 'contenteditable': 'false' } },
						function( domDocument ): any {
							const domElement = this.toDomElement( domDocument );
							return domElement.appendChild(
								domDocument.createTextNode( modelElement.getAttribute( 'listMarker' ) + '\x20' )
							);
						}
					);
				},
				canInjectMarkerIntoElement( listItem ) {
					return model.schema.checkChild( listItem, '$text' ) &&
						model.schema.checkChild( listItem, '$inlineObject' ) &&
						!model.schema.isLimit( listItem ) &&
						listItem.getAttribute( 'listType' ) == definition.listType &&
						listItem.getAttribute( 'listMarkerStyle' ) == definition.listMarkerStyle;
				}
			} );
		}

		editor.conversion.for( 'upcast' ).add( dispatcher => {
			dispatcher.on( 'element:span', ( view => {
				return ( emitter, ev, { writer, consumable } ) => {
					const modelCursor = ev.modelCursor;
					const parent = modelCursor.parent;
					const viewItem = ev.viewItem;

					if ( consumable.consume( viewItem, {
						'name': !0,
						'classes': 'multi-level-list__marker'
					} ) && modelCursor.isAtStart && parent.hasAttribute( 'listType' ) && viewItem.childCount > 0 ) {
						const range = view.createRangeIn( viewItem );
						let listMarker = '';
						for ( const item of range.getItems() ) {
							if ( item.is( '$textProxy' ) ) {
								listMarker += item.data.trim();
								consumable.consume( item.textNode );
							}
						}
						writer.setAttribute( 'listMarker', listMarker.trim(), parent );
					}
				};
			} )( editing.view ) );
		} );

		listEditing.on( 'postFixer', ( evt, { listNodes, writer } ) => {
			const indentMap = [];
			for ( const { node, previousNodeInList } of listNodes ) {
				const listType = node.getAttribute( 'listType' );
				const listMarkerStyle = node.getAttribute( 'listMarkerStyle' ) || ( listType == 'customNumbered' ? 'legal' : undefined );
				const definition = this._listDefinitions.find(
					( definition: any ) => definition.listType == listType && definition.listMarkerStyle == listMarkerStyle
				);

				if ( listType != 'customNumbered' &&
					listType != 'customBulleted' &&
					( node.hasAttribute( 'listMarker' ) &&
						( writer.removeAttribute( 'listMarker', node ), evt.return = true ),
					node.hasAttribute( 'listMarkerStyle' ) &&
					( writer.removeAttribute( 'listMarkerStyle', node ), evt.return = true )
					) || !definition
				) {
					// if ( listType == 'customBulleted' && !listMarkerStyle ) {
					// 	writer.setAttribute( 'listType', 'bulleted', node );
					// 	evt.return = !0;
					// }

					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					listType != 'customBulleted' || listMarkerStyle || (
						writer.setAttribute( 'listType', 'bulleted', node ), evt.return = true
					);
					continue;
				}

				if ( !node.hasAttribute( 'listMarkerStyle' ) ) {
					writer.setAttribute( 'listMarkerStyle', listMarkerStyle, node );
					evt.return = true;
				}

				// node.hasAttribute( 'listMarkerStyle' ) || (
				// 	writer.setAttribute( 'listMarkerStyle', listMarkerStyle, node ), evt.return = true
				// );

				const listIndent = node.getAttribute( 'listIndent' );
				if ( previousNodeInList && previousNodeInList.getAttribute( 'listItemId' ) == node.getAttribute( 'listItemId' ) ) {
					continue;
				}

				indentMap.length = listIndent + 0x1;

				if ( previousNodeInList || indentMap[ listIndent ] ) {
					if ( previousNodeInList && previousNodeInList.getAttribute( 'listType' ) != definition.listType ) {
						indentMap[ listIndent ] = 0x1;
					} else {
						indentMap[ listIndent ]++;
					}
				} else {
					indentMap[ listIndent ] = node.getAttribute( 'listStart' );
				}

				// previousNodeInList || indentMap[ listIndent ] ?
				// 	previousNodeInList && previousNodeInList.getAttribute( 'listType' ) != definition.listType ?
				// 		indentMap[ listIndent ] = 0x1 :
				// 		indentMap[ listIndent ]++ :
				// 	indentMap[ listIndent ] = node.getAttribute( 'listStart' ) || 0x1;

				const listMarker = a( listIndent, definition, indentMap );
				if ( node.getAttribute( 'listMarker' ) != listMarker ) {
					writer.setAttribute( 'listMarker', listMarker, node );
					evt.return = true;
				}
				// node.getAttribute( 'listMarker' ) != listMarker &&
				// ( writer.setAttribute( 'listMarker', listMarker, node ), evt.return = true );
			}
		} );
		const _0x18192b = editor.editing.view.document;
		this.listenTo( _0x18192b, 'clipboardOutput', ( _0x2fd22c, _0x2d9766 ) => {
			const _0x242ed1 = new Matcher( { 'name': 'span', 'classes': 'multi-level-list__marker' } );
			const _0x272a5b = new Matcher( {
				'name': 'ol',
				'classes': 'multi-level-list',
				'styles': { 'list-style-type': 'none' }
			} );

			const _0x41f1f8 = new UpcastWriter( _0x2d9766.content.document );
			const _0x4fac99 = [];

			for ( const _0x2a903c of _0x41f1f8.createRangeIn( _0x2d9766.content ).getItems() ) {
				if ( _0x2a903c.is( 'element' ) && _0x242ed1.match( _0x2a903c ) ) {
					_0x4fac99.push( _0x2a903c );
				}

				if ( _0x2a903c.is( 'element' ) && _0x272a5b.match( _0x2a903c ) ) {
					_0x41f1f8.removeStyle( 'list-style-type', _0x2a903c );
				}
			}

			for ( const _0x4546ab of _0x4fac99 ) {
				_0x41f1f8.remove( _0x4546ab );
			}
		} );
	}

	// afterInit(): void {
	//
	// }
}

function a( _0xe4b2da: any, _0x337c7e: any, _0x3a4e0d: any ) {
	let _0x38ee54 = _0x337c7e.listMarkers[ _0xe4b2da % _0x337c7e.listMarkers.length ];
	if ( undefined === _0x38ee54.showMarkerPath || _0x38ee54.showMarkerPath ) {
		return _0x3a4e0d.slice( 0, _0xe4b2da + 1 )
			.map(
				( _0x51d252: any, _0x1e12f9: any ) =>
					( _0x38ee54 = _0x337c7e.listMarkers[ _0x1e12f9 % _0x337c7e.listMarkers.length ], m( _0x38ee54.marker, _0x51d252 ) )
			).join( '' );
	}
	const _0x11f844 = _0x3a4e0d[_0x3a4e0d.length - 0x1];
	return m( _0x38ee54.marker, _0x11f844 );
}

function m( _0x20a83d: any, _0x2aed5c: any ) {
	return typeof _0x20a83d == 'function' ? _0x20a83d( _0x2aed5c ) : _0x20a83d;
}

function y( _0x3e7f38: any, _0x1f701d: any ) {
	return ( _0x48fa2b: any, _0x575269: any, _0x34cade: any ) => {
		const _0x1ae241 = _0x575269.viewItem;
		if ( _0x575269.modelRange ||
			Object.assign( _0x575269, _0x34cade.convertChildren( _0x575269.viewItem, _0x575269.modelCursor ) ) ||
		!_0x34cade.consumable.test( _0x1ae241, { 'classes': _0x3e7f38.className } )
		) {
			return;
		}
		const _0xc496ee = Array.from( _0x575269.modelRange.getItems( { 'shallow': true } ) )
			.filter( _0x205c0b => _0x1f701d.checkAttribute( _0x205c0b, 'listItemId' ) );
		if ( !_0xc496ee.length ) {
			return;
		}
		_0x34cade.consumable.consume( _0x1ae241, { 'classes': _0x3e7f38.className } );
		_0x34cade.consumable.consume( _0x1ae241, { 'classes': 'multi-level-list' } );
		_0x34cade.consumable.consume( _0x1ae241, { 'styles': 'list-style-type' } );

		const _0x58b4e5 = _0xc496ee[0].getAttribute( 'listIndent' );
		for ( const _0x402de9 of _0xc496ee ) {
			if ( _0x402de9.getAttribute( 'listIndent' ) == _0x58b4e5 ) {
				_0x34cade.writer.setAttribute( 'listType', _0x3e7f38.listType, _0x402de9 );
				_0x34cade.writer.setAttribute( 'listMarkerStyle', _0x3e7f38.listMarkerStyle, _0x402de9 );
			}
			// _0x402de9.getAttribute( 'listIndent' ) == _0x58b4e5 &&
			// ( _0x34cade.writer.setAttribute( 'listType', _0x3e7f38.listType, _0x402de9 );
			//
			// 	_0x34cade.writer.setAttribute( 'listMarkerStyle', _0x3e7f38.listMarkerStyle, _0x402de9 ) );
		}
	};
}
