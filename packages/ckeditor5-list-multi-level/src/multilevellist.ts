/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list-multi-level/multilevellist
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import MultiLevelListEditing from './multilevellistediting.js';
import MultiLevelListUI from './multilevellistui.js';
import '../theme/multilevellist.css';

/**
 * The Multi-level List feature.
 *
 * For a detailed overview, check the {@glink features/lists/multi-level-lists Multi-level list} feature guide.
 */
export default class MultiLevelList extends Plugin {
	// static get isPremiumPlugin(): true;

	/**
	 * @inheritDoc
	 */
	public static get pluginName() {
		return 'MultiLevelList' as const;
	}

	/**
	 * @inheritDoc
	 */
	public static override get isOfficialPlugin(): true {
		return true;
	}

	/**
	 * @inheritDoc
	 */
	public static get requires() {
		return [ MultiLevelListEditing, MultiLevelListUI ] as const;
	}
	//
	// /**
	//  * @inheritDoc
	//  */
	// public init(): void {
	// 	const editor = this.editor;
	// 	const view = editor.editing.view;
	//
	// 	view.addObserver( ClipboardObserver );
	//
	// 	this._setupPasteDrop();
	// 	this._setupCopyCut();
	// }
	//
	// /**
	//  * Fires Clipboard `'outputTransformation'` event for given parameters.
	//  *
	//  * @internal
	//  */
	// public _fireOutputTransformationEvent(
	// 	dataTransfer: DataTransfer,
	// 	selection: Selection | DocumentSelection,
	// 	method: 'copy' | 'cut' | 'dragstart'
	// ): void {
	// 	const clipboardMarkersUtils: ClipboardMarkersUtils = this.editor.plugins.get( 'ClipboardMarkersUtils' );
	//
	// 	this.editor.model.enqueueChange( { isUndoable: method === 'cut' }, () => {
	// 		const documentFragment = clipboardMarkersUtils._copySelectedFragmentWithMarkers( method, selection );
	//
	// 		this.fire<ClipboardOutputTransformationEvent>( 'outputTransformation', {
	// 			dataTransfer,
	// 			content: documentFragment,
	// 			method
	// 		} );
	// 	} );
	// }
	//
	// /**
	//  * The clipboard paste pipeline.
	//  */
	// private _setupPasteDrop(): void {
	// 	const editor = this.editor;
	// 	const model = editor.model;
	// 	const view = editor.editing.view;
	// 	const viewDocument = view.document;
	// 	const clipboardMarkersUtils: ClipboardMarkersUtils = this.editor.plugins.get( 'ClipboardMarkersUtils' );
	//
	// 	// Pasting is disabled when selection is in non-editable place.
	// 	// Dropping is disabled in drag and drop handler.
	// 	this.listenTo<ViewDocumentClipboardInputEvent>( viewDocument, 'clipboardInput', ( evt, data ) => {
	// 		if ( data.method == 'paste' && !editor.model.canEditAt( editor.model.document.selection ) ) {
	// 			evt.stop();
	// 		}
	// 	}, { priority: 'highest' } );
	//
	// 	this.listenTo<ViewDocumentClipboardInputEvent>( viewDocument, 'clipboardInput', ( evt, data ) => {
	// 		const dataTransfer = data.dataTransfer;
	// 		let content: ViewDocumentFragment;
	//
	// 		// Some feature could already inject content in the higher priority event handler (i.e., codeBlock).
	// 		if ( data.content ) {
	// 			content = data.content;
	// 		} else {
	// 			let contentData = '';
	//
	// 			if ( dataTransfer.getData( 'text/html' ) ) {
	// 				contentData = normalizeClipboardHtml( dataTransfer.getData( 'text/html' ) );
	// 			} else if ( dataTransfer.getData( 'text/plain' ) ) {
	// 				contentData = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );
	// 			}
	//
	// 			content = this.editor.data.htmlProcessor.toView( contentData );
	// 		}
	//
	// 		const eventInfo = new EventInfo( this, 'inputTransformation' );
	//
	// 		this.fire<ClipboardInputTransformationEvent>( eventInfo, {
	// 			content,
	// 			dataTransfer,
	// 			targetRanges: data.targetRanges,
	// 			method: data.method as 'paste' | 'drop'
	// 		} );
	//
	// 		// If CKEditor handled the input, do not bubble the original event any further.
	// 		// This helps external integrations recognize this fact and act accordingly.
	// 		// https://github.com/ckeditor/ckeditor5-upload/issues/92
	// 		if ( eventInfo.stop.called ) {
	// 			evt.stop();
	// 		}
	//
	// 		view.scrollToTheSelection();
	// 	}, { priority: 'low' } );
	//
	// 	this.listenTo<ClipboardInputTransformationEvent>( this, 'inputTransformation', ( evt, data ) => {
	// 		if ( data.content.isEmpty ) {
	// 			return;
	// 		}
	//
	// 		const dataController = this.editor.data;
	//
	// 		// Convert the pasted content into a model document fragment.
	// 		// The conversion is contextual, but in this case an "all allowed" context is needed
	// 		// and for that we use the $clipboardHolder item.
	// 		const modelFragment = dataController.toModel( data.content, '$clipboardHolder' );
	//
	// 		if ( modelFragment.childCount == 0 ) {
	// 			return;
	// 		}
	//
	// 		evt.stop();
	//
	// 		// Fire content insertion event in a single change block to allow other handlers to run in the same block
	// 		// without post-fixers called in between (i.e., the selection post-fixer).
	// 		model.change( () => {
	// 			this.fire<ClipboardContentInsertionEvent>( 'contentInsertion', {
	// 				content: modelFragment,
	// 				method: data.method,
	// 				dataTransfer: data.dataTransfer,
	// 				targetRanges: data.targetRanges
	// 			} );
	// 		} );
	// 	}, { priority: 'low' } );
	//
	// 	this.listenTo<ClipboardContentInsertionEvent>( this, 'contentInsertion', ( evt, data ) => {
	// 		data.resultRange = clipboardMarkersUtils._pasteFragmentWithMarkers( data.content );
	// 	}, { priority: 'low' } );
	// }
	//
	// /**
	//  * The clipboard copy/cut pipeline.
	//  */
	// private _setupCopyCut(): void {
	// 	const editor = this.editor;
	// 	const modelDocument = editor.model.document;
	// 	const view = editor.editing.view;
	// 	const viewDocument = view.document;
	//
	// 	const onCopyCut = ( evt: EventInfo<'copy' | 'cut'>, data: DomEventData<ClipboardEvent> & ClipboardEventData ) => {
	// 		const dataTransfer = data.dataTransfer;
	//
	// 		data.preventDefault();
	//
	// 		this._fireOutputTransformationEvent( dataTransfer, modelDocument.selection, evt.name );
	// 	};
	//
	// 	this.listenTo<ViewDocumentCopyEvent>( viewDocument, 'copy', onCopyCut, { priority: 'low' } );
	// 	this.listenTo<ViewDocumentCutEvent>( viewDocument, 'cut', ( evt, data ) => {
	// 		// Cutting is disabled when selection is in non-editable place.
	// 		// See: https://github.com/ckeditor/ckeditor5-clipboard/issues/26.
	// 		if ( !editor.model.canEditAt( editor.model.document.selection ) ) {
	// 			data.preventDefault();
	// 		} else {
	// 			onCopyCut( evt, data );
	// 		}
	// 	}, { priority: 'low' } );
	//
	// 	this.listenTo<ClipboardOutputTransformationEvent>( this, 'outputTransformation', ( evt, data ) => {
	// 		const content = editor.data.toView( data.content );
	//
	// 		viewDocument.fire<ViewDocumentClipboardOutputEvent>( 'clipboardOutput', {
	// 			dataTransfer: data.dataTransfer,
	// 			content,
	// 			method: data.method
	// 		} );
	// 	}, { priority: 'low' } );
	//
	// 	this.listenTo<ViewDocumentClipboardOutputEvent>( viewDocument, 'clipboardOutput', ( evt, data ) => {
	// 		if ( !data.content.isEmpty ) {
	// 			data.dataTransfer.setData( 'text/html', this.editor.data.htmlProcessor.toData( data.content ) );
	// 			data.dataTransfer.setData( 'text/plain', viewToPlainText( data.content ) );
	// 		}
	//
	// 		if ( data.method == 'cut' ) {
	// 			editor.model.deleteContent( modelDocument.selection );
	// 		}
	// 	}, { priority: 'low' } );
	// }
}
