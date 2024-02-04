import {
	EditorConfig as EditorConfigBase,
} from 'ckeditor5/src/core.js';

export interface EditorConfig extends EditorConfigBase {
	containerEl?: HTMLElement
	panelAbsolute?: boolean
}
