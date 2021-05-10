import { LitElement, html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import { getCurrentSelectionRange, splitContentAtCursor, getPlainTextCaretOffset, setPlainTextCaretOffset } from '../util.js'
import * as contextMenu from '../context-menu.js'
import { CtznEditorBlockDefinition } from '../data-model.js'
import * as icons from '../icons.js'
import '../block-menu.js'

export class CtznEditorBlock extends LitElement {
  static get properties () {
    return {
      definition: {type: Object}, // a CtznEditorBlockDefinition
      _isBlockSelected: {type: Boolean}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super()
    this.isBufferFocused = false
    this.definition = undefined
    this._isBlockSelected = false
    this.$onGlobalKeydown = this.onGlobalKeydown.bind(this)
    if (this.containsBlocks) {
      this.addEventListener('select-prev-block', this.onSelectPrevBlock.bind(this))
      this.addEventListener('select-next-block', this.onSelectNextBlock.bind(this))
      this.addEventListener('append-new-block', this.onAppendNewBlock.bind(this))
      this.addEventListener('set-block-tag', this.onSetBlockTag.bind(this))
      this.addEventListener('delete-block', this.onDeleteBlock.bind(this))
      this.addEventListener('split-block', this.onSplitBlock.bind(this))
      this.addEventListener('join-block', this.onJoinBlock.bind(this))
    }
  }

  connectedCallback () {
    super.connectedCallback()
    window.addEventListener('keydown', this.$onGlobalKeydown)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    window.removeEventListener('keydown', this.$onGlobalKeydown)
  }

  get buffer () {
    return this.querySelector('.buffer')
  }

  get subBlocks () {
    if (this.canChangeTag) {
      return Array.from(this.querySelectorAll(':scope > .block-wrapper > .block-content > *[is-block]'))
    }
    return Array.from(this.querySelectorAll(':scope > .block-content > *[is-block]'))
  }

  get containsBlocks () {
    return false
  }

  get defaultSubBlockTag () {
    return 'p'
  }

  get canChangeTag () {
    return true
  }

  get isBlockSelected () {
    return this._isBlockSelected
  }

  set isBlockSelected (v) {
    if (v) this.classList.add('block-selected')
    else this.classList.remove('block-selected')
    this._isBlockSelected = v
    this.emitStateChanged()
  }

  isCursorAtStart () {
    const buffer = this.buffer
    if (!buffer) return false
    const sel = window.getSelection()
    if (!sel || !sel.isCollapsed) return false

    const range = sel.getRangeAt(0)
    const range2 = document.createRange()
    range2.selectNodeContents(this.buffer)
    range2.setEnd(range.startContainer, range.startOffset)
    return range2.cloneContents().textContent.trim().length === 0
  }

  isCursorAtEnd () {
    const buffer = this.buffer
    if (!buffer) return
    const sel = window.getSelection()
    if (!sel || !sel.isCollapsed) return
    
    const range = sel.getRangeAt(0)
    const range2 = document.createRange()
    range2.selectNodeContents(this.buffer)
    range2.setStart(range.endContainer, range.endOffset)
    return range2.cloneContents().textContent.trim().length === 0
  }

  checkIfCursorMoved () {
    let didMove = false
    const currentRange = getCurrentSelectionRange()
    if (!currentRange) return
    if (this.lastSelectionRange) {
      if (currentRange.compareBoundaryPoints(Range.START_TO_START, this.lastSelectionRange) !== 0) {
        didMove = true
      } else if (currentRange.compareBoundaryPoints(Range.END_TO_END, this.lastSelectionRange) !== 0) {
        didMove = true
      }
    }
    this.lastSelectionRange = currentRange
    if (didMove) this.emitStateChanged()
    return didMove
  }

  async focusBuffer (direction, cursorPos) {
    if (this.definition?.isVoidBlock) {
      this.isBlockSelected = true
      document.activeElement.blur()
    } else if (this.containsBlocks) {
      if (!this.definition?.blocks?.length) {
        return
      }
      if (direction === 'up') {
        this.subBlocks[this.definition.blocks.length - 1].focusBuffer(direction, cursorPos)
      } else {
        this.subBlocks[0]?.focusBuffer(direction, cursorPos)
      }
    } else {
      if (!this.buffer) {
        await this.updateComplete
        if (!this.buffer) return
      }

      if (typeof cursorPos === 'number') {
        setPlainTextCaretOffset(this.buffer, cursorPos)
      } else {
        this.buffer.focus()
      }
    }
  }

  getFocusedBlock () {
    if (!this.subBlocks?.length) return undefined
    for (let block of this.subBlocks) {
      if (block.isBufferFocused || block.isBlockSelected) return block
      let subFocused = block.getFocusedBlock()
      if (subFocused) return subFocused
    }
    return undefined
  }

  getFocusedSubBlock () {
    return this.subBlocks.find(b => b.isBufferFocused)
  }
  
  // rendering
  // =

  render () {
    if (!this.definition) return html``
    if (!this.canChangeTag) {
      return html`
        <div
          class="block-content as-${this.definition.tagName}"
          @click=${this.onClickContent}
        >${this.renderContent()}</div>`
    }
    return html`
      <div class="block-wrapper">
        <div class="block-ctrl" @click=${this.onClickMenu}>
          <span>${icons.gripVertical(14, 14)}</span>
        </div>
        <div class="menu-container"></div>
        <div
          class="block-content as-${this.definition.tagName}"
          @click=${this.onClickContent}
        >${this.renderContent()}</div>
      </div>
    `
  }

  renderContent () {
    if (this.containsBlocks) {
      return this.renderSubBlocks()
    } else {
      return this.renderBuffer()
    }
  }

  renderSubBlocks () {
    return html`
      ${repeat(this.definition.blocks, block => block.id, this.renderSubBlock.bind(this))}
    `
  }

  renderSubBlock (block, index) {
    switch (block.tagName) {
      case 'ul': return html`<ctzn-editor-block--ul is-block .definition=${block} data-index=${index}></ctzn-editor-block--ul>`
      case 'ol': return html`<ctzn-editor-block--ol is-block .definition=${block} data-index=${index}></ctzn-editor-block--ol>`
      case 'li': return html`<ctzn-editor-block--li is-block .definition=${block} data-index=${index}></ctzn-editor-block--li>`
      case 'hr': return html`<ctzn-editor-block--hr is-block .definition=${block} data-index=${index}></ctzn-editor-block--hr>`
      case 'dd': return html`<ctzn-editor-block--dd is-block .definition=${block} data-index=${index}></ctzn-editor-block--dd>`
      case 'dt': return html`<ctzn-editor-block--dt is-block .definition=${block} data-index=${index}></ctzn-editor-block--dt>`
      case 'dl': return html`<ctzn-editor-block--dl is-block .definition=${block} data-index=${index}></ctzn-editor-block--dl>`
      default: return html`<ctzn-editor-block is-block .definition=${block} data-index=${index}></ctzn-editor-block>`
    }
  }
  
  renderBuffer () {
    return html`
      <div
        class="buffer"
        contenteditable
        @keydown=${this.onKeydownBuffer}
        @keyup=${this.onKeyupBuffer}
        @click=${this.onClickBuffer}
        @input=${this.onInputBuffer}
        @focus=${this.onFocusBuffer}
        @blur=${this.onBlurBuffer}
      >${unsafeHTML(this.definition.content || '')}</div>
    `
  }

  // events
  // =

  emitStateChanged () {
    this.dispatchEvent(new Event('state-changed', {bubbles: true}))
  }

  async onClickMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    this.classList.add('is-menu-open')
    const onSetBlockTag = e => {
      this.dispatchEvent(new CustomEvent('set-block-tag', {detail: e.detail, bubbles: true}))
    }
    await contextMenu.create({
      parent: this.querySelector('.menu-container'),
      x: 0,
      y: 0,
      noBorders: true,
      render: () => {
        return html`
          <ctzn-editor-block-menu
            current-tag=${this.definition.tagName}
            @set-block-tag=${onSetBlockTag}
          ></ctzn-editor-block-menu>
        `
      }
    })
    this.classList.remove('is-menu-open')
  }

  onGlobalKeydown (e) {
    const redispatch = (eventName, detail) => {
      e.preventDefault()
      e.stopPropagation()
      this.dispatchEvent(new CustomEvent(eventName, {bubbles: true, detail}))
    }
    if (this.definition?.isVoidBlock && this.isBlockSelected) {
      switch (e.code) {
        case 'ArrowUp': return redispatch('select-prev-block')
        case 'ArrowDown': return redispatch('select-next-block')
        case 'Enter':
        case 'NumpadEnter': return redispatch('append-new-block')
        case 'Backspace':
        case 'Delete': return redispatch('delete-block')
      }
    }
  }

  onClickContent (e) {
    if (this.definition?.isVoidBlock && !this.isBlockSelected) {
      blurSelectedBlock()
      this.isBlockSelected = true
    }
  }

  onKeydownBuffer (e) {
    const redispatch = (eventName, detail) => {
      e.preventDefault()
      e.stopPropagation()
      this.dispatchEvent(new CustomEvent(eventName, {bubbles: true, detail}))
    }
    switch (e.code) {
      case 'ArrowUp': return redispatch('select-prev-block')
      case 'ArrowDown': return redispatch('select-next-block')
      case 'Enter':
      case 'NumpadEnter':
        if (this.definition.content && !this.isCursorAtEnd()) {
          return redispatch('split-block')
        } else {
          return redispatch('append-new-block')
        }
      case 'Backspace':
      case 'Delete':
        if (!this.definition.content) {
          return redispatch('delete-block')
        } else if (e.code === 'Backspace' && this.isCursorAtStart()) {
          return redispatch('join-block', {dir: -1})
        } else if (e.code === 'Delete' && this.isCursorAtEnd()) {
          return redispatch('join-block', {dir: 1})
        }
        return
    }
  }

  onKeyupBuffer (e) {
    this.checkIfCursorMoved()
  }

  onClickBuffer (e) {
    this.emitStateChanged()
  }

  onInputBuffer (e) {
    this.definition.content = this.buffer.innerHTML.replace(/<\!--.*?-->/g, "").trim()
    this.emitStateChanged()
  }

  onFocusBuffer (e) {
    blurSelectedBlock()
    this.isBufferFocused = true
    this.classList.add('focused')
  }

  onBlurBuffer (e) {
    this.isBufferFocused = false
    this.classList.remove('focused')
  }

  onSelectPrevBlock (e) {    
    e.stopPropagation()
    if (e.target.previousElementSibling?.hasAttribute('is-block')) {
      if (e.target.definition?.isVoidBlock) {
        e.target.previousElementSibling.focusBuffer('up')
      } else {
        const cursorPos = getPlainTextCaretOffset(this.getFocusedSubBlock()?.buffer)
        e.target.previousElementSibling.focusBuffer('up', cursorPos)
      }
      this.emitStateChanged()
    } else if (this.definition.tagName !== 'editor') {
      this.dispatchEvent(new CustomEvent('select-prev-block', {bubbles: true}))
    }
  }

  onSelectNextBlock (e) {
    e.stopPropagation()
    if (e.target.nextElementSibling?.hasAttribute('is-block')) {
      if (this.definition?.isVoidBlock) {
        e.target.nextElementSibling.focusBuffer('up')
      } else {
        const cursorPos = getPlainTextCaretOffset(this.getFocusedSubBlock()?.buffer)
        e.target.nextElementSibling.focusBuffer('down', cursorPos)
      }
      this.emitStateChanged()
    } else if (this.definition.tagName !== 'editor') {
      this.dispatchEvent(new CustomEvent('select-next-block', {bubbles: true}))
    }
  }

  async onAppendNewBlock (e) {
    e.stopPropagation()
    
    const index = +e.target.dataset.index
    const newBlock = new CtznEditorBlockDefinition({tagName: this.defaultSubBlockTag, content: ''})
    if (this.definition.blocks[index + 1]) {
      this.definition.blocks = [
        ...this.definition.blocks.slice(0, index + 1),
        newBlock,
        ...this.definition.blocks.slice(index + 1)
      ]
    } else {
      this.definition.blocks = [
        ...this.definition.blocks,
        newBlock
      ]
    }
    this.requestUpdate()
    await this.updateComplete
    this.subBlocks[index + 1].focusBuffer('down')
    this.emitStateChanged()
  }

  async onSetBlockTag (e) {
    if (e.target === this) return // bubble up to parent
    e.stopPropagation()
    
    const index = +e.target.dataset.index
    this.definition.blocks = [
      ...this.definition.blocks.slice(0, index),
      this.definition.blocks[index].convertTo(e.detail.tagName),
      ...this.definition.blocks.slice(index + 1)
    ]
    this.requestUpdate()
    await this.updateComplete
    this.subBlocks[index].focusBuffer()
    this.emitStateChanged()
  }

  async onDeleteBlock (e) {
    if (e.target === this) return // bubble up to parent
    e.stopPropagation()

    const index = +e.target.dataset.index
    this.definition.blocks = [
      ...this.definition.blocks.slice(0, index),
      ...this.definition.blocks.slice(index + 1)
    ]
    this.requestUpdate()
    await this.updateComplete

    if (this.definition.blocks.length === 0) {
      this.dispatchEvent(new CustomEvent('delete-block', {bubbles: true}))
    } else {
      this.subBlocks[Math.max(0, index - 1)].focusBuffer('up')
    }
    this.emitStateChanged()
  }

  async onSplitBlock (e) {
    e.stopPropagation()
    
    const srcIndex = +e.target.dataset.index
    const srcBlock = this.definition.blocks[srcIndex]
    const {leftContent, rightContent} = splitContentAtCursor(this.subBlocks[srcIndex].buffer)
    const newBlock1 = new CtznEditorBlockDefinition({tagName: srcBlock.tagName, content: leftContent})
    const newBlock2 = new CtznEditorBlockDefinition({tagName: srcBlock.tagName, content: rightContent})
    this.definition.blocks = [
      ...this.definition.blocks.slice(0, srcIndex),
      newBlock1,
      newBlock2,
      ...this.definition.blocks.slice(srcIndex + 1)
    ]
    this.requestUpdate()
    await this.updateComplete
    this.subBlocks[srcIndex + 1].focusBuffer('down')
    this.emitStateChanged()
  }

  async onJoinBlock (e) {
    if (e.target === this) return // bubble up to parent
    e.stopPropagation()

    let srcIndex = +e.target.dataset.index
    let srcBlock = this.definition.blocks[srcIndex]
    let dstIndex = srcIndex + e.detail.dir
    let dstBlock = this.definition.blocks[dstIndex]
    if (!srcBlock || !dstBlock) return

    if (dstBlock.isVoidBlock) {
      this.definition.blocks = this.definition.blocks.filter(block => block !== dstBlock)
      this.requestUpdate()
      await this.updateComplete
      if (dstIndex < srcIndex) {
        this.subBlocks[srcIndex - 1].focusBuffer('up')
      }
    } else {
      // TODO
      // handle joins between branches and leafs

      const minIndex = Math.min(srcIndex, dstIndex)
      const content = (e.detail.dir < 0)
        ? `${dstBlock.content}${srcBlock.content}`
        : `${srcBlock.content}${dstBlock.content}`

      this.definition.blocks = [
        ...this.definition.blocks.slice(0, minIndex),
        dstBlock.clone({content}),
        ...this.definition.blocks.slice(minIndex + 2)
      ]
      this.requestUpdate()
      await this.updateComplete
      this.subBlocks[minIndex].focusBuffer(
        e.detail.dir > 0 ? 'down' : 'up',
        e.detail.dir > 0 ? srcBlock.content.length : dstBlock.content.length
      )
    }
    this.emitStateChanged()
  }
}
customElements.define('ctzn-editor-block', CtznEditorBlock)

function blurSelectedBlock () {
  Array.from(document.body.querySelectorAll('[is-block].block-selected'), el => {el.isBlockSelected = false})
}