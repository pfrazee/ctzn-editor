import { CtznEditorBlock } from './base.js'

export class CtznEditorBlock_Editor extends CtznEditorBlock {
  constructor () {
    super()
  }

  get canChangeTag () {
    return false
  }

  get containsBlocks () {
    return true
  }
}
customElements.define('ctzn-editor-block--editor', CtznEditorBlock_Editor)