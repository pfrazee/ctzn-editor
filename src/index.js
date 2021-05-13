import { LitElement, html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { fromHTML, toHTML, fromTagName } from './data-model.js'
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
      <ctzn-editor-toolbar
        .editorState=${this.editorState}
        @insert-block=${this.onInsertBlock}
        @split-focused-block=${this.onSplitFocusedBlock}
        @delete-focused-block=${this.onDeleteFocusedBlock}
      ></ctzn-editor-toolbar>
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

  onInsertBlock (e) {
    const focusedBlock = this.editorState.focusedBlock
    console.log()
    if (focusedBlock) {
      const index = this.blocks.findIndex(block => block ===  this.editorState.focusedBlock.block)
      if (focusedBlock.block.blockType === 'richtext') {
        const {leftContent, middleContent, rightContent} = this.editorState.focusedBlock.splitContentAtCursor()
        console.log({leftContent, middleContent, rightContent})
        const newBlocks = [
          leftContent.trim() ? fromTagName('richtext', {content: leftContent}) : undefined,
          fromTagName(e.detail.tagName, {content: middleContent}),
          rightContent.trim() ? fromTagName('richtext', {content: rightContent}) : undefined,
        ]
        console.log(index, newBlocks)
        this.blocks = [
          ...this.blocks.slice(0, index),
          ...newBlocks.filter(Boolean),
          ...this.blocks.slice(index + 1)
        ]
      } else {
        this.blocks = [
          ...this.blocks.slice(0, index),
          fromTagName(e.detail.tagName),
          ...this.blocks.slice(index)
        ]
      }
    } else {
      this.blocks = [
        ...this.blocks,
        new CtznEditorBlock_RichText({content: 'TODO: ' + e.detail.tagName})
      ]
    }
    
  }

  // TODO needed?
  /*onSplitFocusedBlock (e) {
    if (!this.editorState.focusedBlock) return
    if (this.editorState.focusedBlock.block.blockType !== 'richtext') return
    const index = this.blocks.findIndex(block => block ===  this.editorState.focusedBlock.block)
    const {leftContent, middleContent, rightContent} = this.editorState.focusedBlock.splitContentAtCursor()
    const newBlocks = [
      new CtznEditorBlock_RichText({content: leftContent}),
      middleContent ? new CtznEditorBlock_RichText({content: middleContent}) : undefined,
      new CtznEditorBlock_RichText({content: rightContent}),
    ].filter(Boolean)
    this.blocks = [
      ...this.blocks.slice(0, index),
      ...newBlocks,
      ...this.blocks.slice(index + 1)
    ]
  }*/
  
  onDeleteFocusedBlock (e) {
    if (!this.editorState.focusedBlock) return
    this.blocks = this.blocks.filter(block => block !== this.editorState.focusedBlock.block)
  }
}
customElements.define('ctzn-editor', CtznEditor)
