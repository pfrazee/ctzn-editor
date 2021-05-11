import { LitElement, html } from 'lit'
import { CtznEditorBlockDefinition, fromHTML } from './data-model.js'
import './blocks/base.js'
import './blocks/editor.js'
import './blocks/lists.js'
import './blocks/hr.js'
import './toolbar.js'

export class CtznEditor extends LitElement {
  static get properties () {
    return {
      rootBlock: {type: Object},
      editorState: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super()

    this.rootBlock = new CtznEditorBlockDefinition({tagName: 'editor', blocks: [
      new CtznEditorBlockDefinition({tagName: 'p', content: ''})
    ]})
    this.editorState = {
      appliedStates: {}
    }
  }

  get toolbarEl () {
    return this.querySelector('ctzn-editor-toolbar')
  }

  get rootBlockEl () {
    return this.querySelector('ctzn-editor-block--editor')
  }

  fromHTML (str) {
    this.rootBlock = fromHTML(str)
  }

  toHTML () {
    return this.rootBlock.toHTML()
  }

  toJSON () {
    return this.rootBlock
  }

  // rendering
  // =

  render () {
    return html`
      <ctzn-editor-toolbar
        .editorState=${this.editorState}
        @toolbar-command=${this.onToolbarCommand}
      ></ctzn-editor-toolbar>
      <ctzn-editor-block--editor
        .definition=${this.rootBlock}
        @state-changed=${this.onEditorStateChanged}
      ></ctzn-editor-block--editor>
    `
  }

  // events
  // =

  onEditorStateChanged (e) {
    this.editorState = {
      currentBlock: this.rootBlockEl.getFocusedBlock()?.definition?.tagName,
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      superscript: document.queryCommandState('superscript'),
      subscript: document.queryCommandState('subscript')
    }
  }

  onToolbarCommand (e) {
    switch (e.detail.command) {
      case 'indent':
        let newEvent = new CustomEvent('change-block-indentation', {bubbles: true, detail: {direction: e.detail.direction}})
        this.rootBlockEl.getFocusedBlock()?.dispatchEvent?.(newEvent)
        break
    }
  }
}
customElements.define('ctzn-editor', CtznEditor)
