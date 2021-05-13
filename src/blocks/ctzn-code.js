import { LitElement, html } from 'lit'

export class CtznEditorBlock_CtznCode extends LitElement {
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
      <div>Code block todo</div>
    `
  }
}
customElements.define('ctzn-editor-block--ctzn-code', CtznEditorBlock_CtznCode)
