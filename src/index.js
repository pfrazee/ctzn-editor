import { LitElement, html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { fromHTML, toHTML } from './data-model.js'
import './toolbar.js'
import './blocks/richtext.js'
import './blocks/unknown.js'
import './blocks/ctzn-card.js'
import './blocks/ctzn-code.js'
import * as icons from './icons.js'

export class CtznEditor extends LitElement {
  static get properties () {
    return {
      blocks: {type: Object},
      editorState: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super()

    this.blocks = fromHTML('<p></p>')
    this.editorState = {
      appliedStates: {}
    }
  }

  fromHTML (str) {
    this.blocks = fromHTML(str)
    console.log(this.blocks)
  }

  toHTML () {
    return toHTML(this.blocks)
  }

  toJSON () {
    return this.blocks
  }

  // rendering
  // =

  render () {
    return html`
      <ctzn-editor-toolbar .editorState=${this.editorState}></ctzn-editor-toolbar>
      <div class="editor-blocks-container" @editor-state-change=${this.onEditorStateChange}>
        ${repeat(this.blocks, block => block.id, block => html`
          <div class="block-header">
            <span class="block-label">
              ${block.blockType}
            </span>
          </div>
          <div class="block-wrapper">
            <div class="block-ctrl">
              <span>${icons.gripVertical(14, 14)}</span>
            </div>
            <div class="menu-container"></div>
            <div class="block">${block.render()}</div>
          </div>
        `)}
      </div>
    `
  }

  // events
  // =

  onEditorStateChange (e) {
    // console.log(e.detail)
    this.editorState = e.detail
    this.editorState.focusedBlock = e.target
  }

  onToolbarCommand (e) {
    switch (e.detail.command) {
      case 'indent':
        let newEvent = new CustomEvent('change-indentation', {detail: {direction: e.detail.direction}})
        this.rootBlockEl.getFocusedBlock()?.dispatchEvent?.(newEvent)
        break
    }
  }
}
customElements.define('ctzn-editor', CtznEditor)
