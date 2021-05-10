import { LitElement, html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { classMap } from 'lit/directives/class-map.js'
import * as icons from './icons.js'

export class CtznEditorToolbar extends LitElement {
  static get properties () {
    return {
      richTextState: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super()
    this.richTextState = {}
    this.TOOLBAR_ITEMS = [
      new ToolbarCtrl_History(-1),
      new ToolbarCtrl_History(1),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Formatting('bold'),
      new ToolbarCtrl_Formatting('italic'),
      new ToolbarCtrl_Formatting('underline'),
      new ToolbarCtrl_Formatting('strikeThrough'),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Link(),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Formatting('superscript'),
      new ToolbarCtrl_Formatting('subscript'),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_Indent(1),
      new ToolbarCtrl_Indent(-1),
      new ToolbarCtrl_Separator(),
      new ToolbarCtrl_ClearFormatting()
    ]
  }

  get editorEl () {
    return this.parentElement
  }

  // rendering
  // =

  render () {
    return html`
      <div class="controls">
        ${repeat(this.TOOLBAR_ITEMS, (item, i) => `${i}-${item.id}`, item => item.render(this.richTextState))}
      </div>
    `
  }

  // events
  // =
}
customElements.define('ctzn-editor-toolbar', CtznEditorToolbar)

class ToolbarCtrl {
  get id () {
    return 'base'
  }

  render () {
    return html`
      <div class="disabled">${icons.questionMark()}</div>
    `
  }
}

class ToolbarCtrl_Separator extends ToolbarCtrl {
  get id () {
    return 'sep'
  }

  render () {
    return html`<div class="sep">|</div>`
  }
}

class ToolbarCtrl_Formatting extends ToolbarCtrl {
  constructor (formattingCommand) {
    super()
    this.formattingCommand = formattingCommand
  }

  get id () {
    return this.formattingCommand
  }

  render (richTextState) {
    const pressed = richTextState[this.formattingCommand]
    const icon = ({
      'bold': icons.bold(),
      'italic': icons.italic(),
      'underline': icons.underline(),
      'strikeThrough': icons.strike(),
      'superscript': icons.superscript(),
      'subscript': icons.subscript()
    })[this.formattingCommand] || icons.questionMark()
    return html`
      <div
        class=${classMap({btn: true, disabled: this.isDisabled, pressed})}
        @mousedown=${this.onMousedown.bind(this)}
      >
        ${icon}
      </div>
    `
  }

  onMousedown (e) {
    e.preventDefault()
    e.stopPropagation()
    document.execCommand(this.formattingCommand, false, '')
  }
}

class ToolbarCtrl_Link extends ToolbarCtrl_Formatting {
  get id () {
    return 'link'
  }

  render () {
    return html`
      <div class="btn disabled">${icons.link()}</div>
    `
  }
}

class ToolbarCtrl_History extends ToolbarCtrl {
  constructor (direction) {
    super()
    this.direction = direction
  }

  get id () {
    return this.direction === 1 ? 'redo' : 'undo'
  }

  render () {
    return html`
      <div class="btn disabled">${this.direction < 0 ? icons.undo() : icons.redo()}</div>
    `
  }
}

class ToolbarCtrl_Indent extends ToolbarCtrl {
  constructor (direction) {
    super()
    this.direction = direction
  }

  get id () {
    return this.direction === 1 ? 'indent' : 'deindent'
  }

  render () {
    return html`
      <div class="btn disabled">${this.direction < 0 ? icons.deindent() : icons.indent()}</div>
    `
  }
}

class ToolbarCtrl_ClearFormatting extends ToolbarCtrl {
  constructor () {
    super()
  }

  get id () {
    return 'clear-formatting'
  }

  render () {
    return html`
      <div class="btn" @mousedown=${this.onMousedown.bind(this)}>${icons.clearFormatting()}</div>
    `
  }

  onMousedown (e) {
    e.preventDefault()
    e.stopPropagation()
    document.execCommand('removeFormat', false, '')
  }
}