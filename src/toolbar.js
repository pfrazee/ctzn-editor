import { LitElement, html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { classMap } from 'lit/directives/class-map.js'
import * as icons from './icons.js'

const CTRL_ICONS = {
  bold: icons.bold,
  italic: icons.italic,
  underline: icons.underline,
  strikethrough: icons.strike,
  link: icons.link,
  superscript: icons.superscript,
  subscript: icons.subscript,
  indent: icons.indent,
  outdent: icons.outdent,
  removeformat: icons.clearFormatting
}
const STATELESS_CTRLS = ['indent', 'outdent', 'removeformat']
const CTRL_COMMANDS = {
  link: 'mceLink'
}

export class CtznEditorToolbar extends LitElement {
  static get properties () {
    return {
      editorState: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super()
    this.editorState = {}
  }

  get editorEl () {
    return this.parentElement
  }

  checkDisabled (ctrl) {
    if (ctrl === 'bold') {
      switch (this.editorState.currentBlock) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
        case 'dt':
          return true
      }
    }
    if (ctrl === 'indent' || ctrl === 'outdent') {
      return !this.editorState.ol && !this.editorState.ul
    }
    return false
  }

  checkPressed (ctrl) {
    if (STATELESS_CTRLS.includes(ctrl)) return false
    return this.editorState[ctrl]
  }

  // rendering
  // =

  render () {
    const btn = (ctrl) => html`
      <div
        class=${classMap({
          btn: true,
          disabled: this.checkDisabled(ctrl),
          pressed: this.checkPressed(ctrl)
        })}
        @mousedown=${e => this.onMousedown(e, ctrl)}
      >
        ${(CTRL_ICONS[ctrl] || icons.questionMark)(18, 18)}
      </div>
    `
    if (this.editorState.currentBlockType === 'richtext') {
      return html`
        <div class="controls">
          ${btn('bold')}
          ${btn('italic')}
          ${btn('underline')}
          ${btn('strikethrough')}
          <div class="sep"></div>
          ${btn('link')}
          <div class="sep"></div>
          ${btn('superscript')}
          ${btn('subscript')}
          <div class="sep"></div>
          ${btn('indent')}
          ${btn('outdent')}
          <div class="sep"></div>
          ${btn('removeformat')}
        </div>
      `
    }
    return html`
      <div class="controls">
      </div>
    `
  }

  // events
  // =

  onMousedown (e, ctrl) {
    e.preventDefault()
    e.stopPropagation()
    if (this.checkDisabled(ctrl)) return
    this.editorState.focusedBlock.editor.execCommand(CTRL_COMMANDS[ctrl] || ctrl)
  }
}
customElements.define('ctzn-editor-toolbar', CtznEditorToolbar)
