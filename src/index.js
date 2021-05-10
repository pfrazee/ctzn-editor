import { LitElement, html } from 'lit'
import { CtznEditorBlockDefinition, fromHTML } from './data-model.js'
import './blocks/base.js'
import './blocks/editor.js'
import './blocks/lists.js'
import './toolbar.js'

export class CtznEditor extends LitElement {
  static get properties () {
    return {
      rootBlock: {type: Object},
      richTextState: {type: Object}
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
    this.richTextState = {
      appliedStates: {}
    }
  }

  get toolbar () {
    return this.querySelector('ctzn-editor-toolbar')
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
        .richTextState=${this.richTextState}
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
    this.richTextState = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      superscript: document.queryCommandState('superscript'),
      subscript: document.queryCommandState('subscript')
    }
  }
}
customElements.define('ctzn-editor', CtznEditor)
