import { LitElement, html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import * as icons from '../icons.js'

export class CtznEditorBlock_CtznCard extends LitElement {
  static get properties () {
    return {
      block: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super()
    this.block = undefined
  }

  render () {
    return html`
      <div class="editor-blocks-container">
        ${repeat(this.block.blocks, block => block.id, block => html`
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
}
customElements.define('ctzn-editor-block--ctzn-card', CtznEditorBlock_CtznCard)
