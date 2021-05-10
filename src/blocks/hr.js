import { html } from 'lit'
import { CtznEditorBlock } from './base.js'

export class CtznEditorBlock_HR extends CtznEditorBlock {
  get containsBlocks () {
    return false
  }

  get canChangeTag () {
    return true
  }

  renderBuffer () {
    return html`
      <hr>
    `
  }
}
customElements.define('ctzn-editor-block--hr', CtznEditorBlock_HR)