import { CtznEditorBlock } from './base.js'

export class CtznEditorBlock_ULOL extends CtznEditorBlock {
  get containsBlocks () {
    return true
  }

  get canChangeTag () {
    return true
  }

  get defaultSubBlockTag () {
    return 'li'
  }

  // events
  // =

  async onAppendNewBlock (e) {
    if (e.target === this) return
    e.stopPropagation()

    const focusedBlock = this.getFocusedSubBlock()
    if (focusedBlock) {
      const focusedBlockIndex = +focusedBlock.dataset.index
      if (focusedBlockIndex === this.definition.blocks.length - 1 && focusedBlock.definition.content.trim().length === 0) {
        this.definition.blocks = this.definition.blocks.slice(0, this.definition.blocks.length - 1)
        this.requestUpdate()
        this.dispatchEvent(new CustomEvent('append-new-block', {bubbles: true}))
        return
      }
    }
    super.onAppendNewBlock(e)
  }
}
class CtznEditorBlock_UL extends CtznEditorBlock_ULOL {}
customElements.define('ctzn-editor-block--ul', CtznEditorBlock_UL)
class CtznEditorBlock_OL extends CtznEditorBlock_ULOL {}
customElements.define('ctzn-editor-block--ol', CtznEditorBlock_OL)

export class CtznEditorBlock_LI extends CtznEditorBlock {
  get containsBlocks () {
    return false
  }

  get canChangeTag () {
    return false
  }

  get customBufferStyles () {
    const depth = this.definition?.attributes?.depth || 0
    if (depth) {
      return `margin-left: ${depth}rem`
    }
  }
}
customElements.define('ctzn-editor-block--li', CtznEditorBlock_LI)

export class CtznEditorBlock_DL extends CtznEditorBlock {
  get containsBlocks () {
    return true
  }

  get canChangeTag () {
    return true
  }

  get defaultSubBlockTag () {
    const focusedBlock = this.getFocusedSubBlock()
    if (focusedBlock.definition?.tagName === 'dd') return 'dt'
    if (focusedBlock.definition?.tagName === 'dt') return 'dd'
    return 'dt'
  }

  // events
  // =

  async onAppendNewBlock (e) {
    if (e.target === this) return
    e.stopPropagation()

    const focusedBlock = this.getFocusedSubBlock()
    if (focusedBlock) {
      const focusedBlockIndex = +focusedBlock.dataset.index
      if (focusedBlockIndex === this.definition.blocks.length - 1 && focusedBlock.definition.content.trim().length === 0) {
        this.definition.blocks = this.definition.blocks.slice(0, this.definition.blocks.length - 1)
        this.requestUpdate()
        this.dispatchEvent(new CustomEvent('append-new-block', {bubbles: true}))
        return
      }
    }
    super.onAppendNewBlock(e)
  }
}
customElements.define('ctzn-editor-block--dl', CtznEditorBlock_DL)

export class CtznEditorBlock_DT extends CtznEditorBlock {
  get containsBlocks () {
    return false
  }

  get canChangeTag () {
    return false
  }
}
customElements.define('ctzn-editor-block--dt', CtznEditorBlock_DT)

export class CtznEditorBlock_DD extends CtznEditorBlock {
  get containsBlocks () {
    return false
  }

  get canChangeTag () {
    return false
  }
}
customElements.define('ctzn-editor-block--dd', CtznEditorBlock_DD)