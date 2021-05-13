import { LitElement, html, css } from 'lit'

export class CtznEditorBlock_Unknown extends LitElement {
  static get properties () {
    return {
      block: {type: Object}
    }
  }

  static get styles () {
    return css`
      .bg {
        padding: 0.5rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAH0lEQVQYV2NkQAX/GZH4/xkYGBhhAmAOSBJEwDkgAQCCrgQEjpMcPgAAAABJRU5ErkJggg==) repeat;
      }
      .fg {
        padding: 0.25rem;
        background: #fff;
      }
    `
  }

  constructor () {
    super()
    this.block = undefined
  }

  render () {
    return html`
      <div class="bg">
        <div class="fg">Unsupported block type: ${this.block.content}</div>
      </div>
    `
  }
}
customElements.define('ctzn-editor-block--unknown', CtznEditorBlock_Unknown)
