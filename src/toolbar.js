import { LitElement, html } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import * as icons from './icons.js'
import * as contextMenu from './context-menu.js'
import './menus/html-block.js'

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
  quote: icons.quote,
  table: icons.table,
  hr: () => html`<span>&mdash;</span>`,
  removeformat: icons.clearFormatting
}
const STATELESS_CTRLS = ['indent', 'outdent', 'removeformat']
const CTRL_COMMANDS = {
  link: 'mceLink',
  quote: 'mceBlockQuote',
  hr: 'InsertHorizontalRule'
}
const HTML_BLOCK_LABELS = {
  p: 'Paragraph',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  ul: 'Bulleted List',
  ol: 'Numbered List',
  pre: 'Monospace'
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
        @mousedown=${e => this.onMousedownBtn(e, ctrl)}
      >
        ${(CTRL_ICONS[ctrl] || icons.questionMark)(18, 18)}
      </div>
    `
    if (this.editorState.currentBlockType === 'richtext') {
      return html`
        <div class="controls">
          <div
            class="select"
            @click=${this.onClickHTMLBlockMenu}
            @mousedown=${e => /* dont steal focus */ e.preventDefault()}
          >
            ${HTML_BLOCK_LABELS[this.editorState.currentHtmlBlock] || 'Paragraph'} ${icons.caretDown()}
          </div>
          <div class="sep"></div>
          ${btn('bold')}
          ${btn('italic')}
          ${btn('underline')}
          ${btn('strikethrough')}
          <div class="sep"></div>
          ${btn('link')}
          <div class="sep"></div>
          ${btn('indent')}
          ${btn('outdent')}
          <div class="sep"></div>
          ${btn('quote')}
          ${btn('table')}
          ${btn('hr')}
          <div class="sep"></div>
          ${btn('superscript')}
          ${btn('subscript')}
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

  async onClickHTMLBlockMenu (e) {
    e.preventDefault()
    e.stopPropagation()
    const onSetHtmlBlockTag = e => {
      switch (e.detail.tagName) {
        case 'ul':
          this.editorState.focusedBlock.editor.execCommand('InsertUnorderedList')
          break
        case 'ol':
          this.editorState.focusedBlock.editor.execCommand('InsertOrderedList')
          break
        default:
          this.editorState.focusedBlock.editor.execCommand('RemoveList')
          this.editorState.focusedBlock.editor.execCommand('FormatBlock', null, e.detail.tagName)
          break
      }
    }
    const el = e.currentTarget
    if (el.classList.contains('pressed')) {
      contextMenu.destroy()
      return
    }
    const rect = el.getClientRects()[0]
    el.classList.add('pressed')
    await contextMenu.create({
      x: rect.left,
      y: rect.bottom,
      noBorders: true,
      render: () => {
        return html`
          <ctzn-editor-html-block-menu
            @set-html-block-tag=${onSetHtmlBlockTag}
          ></ctzn-editor-html-block-menu>
        `
      }
    })
    el.classList.remove('pressed')
  }

  onMousedownBtn (e, ctrl) {
    e.preventDefault()
    e.stopPropagation()
    if (this.checkDisabled(ctrl)) return
    const editor = this.editorState.focusedBlock.editor
    if (!editor) return
    if (ctrl === 'table') {
      editor.execCommand('mceInsertTable', false, {rows: 2, columns: 2})
    } else {
      editor.execCommand(CTRL_COMMANDS[ctrl] || ctrl)
    }
  }
}
customElements.define('ctzn-editor-toolbar', CtznEditorToolbar)
