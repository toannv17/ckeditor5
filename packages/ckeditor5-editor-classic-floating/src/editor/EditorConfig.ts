import {
	EditorConfig as EditorConfigBase
} from 'ckeditor5/src/core';

export interface EditorConfig extends EditorConfigBase {
	containerElement?: HTMLElement;
	panelAbsolute?: boolean
}
