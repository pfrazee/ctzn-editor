import { CtznEditorBlock } from './base.js'

export class CtznEditorBlock_UL extends CtznEditorBlock {
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
    console.log(focusedBlock)
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
customElements.define('ctzn-editor-block--ul', CtznEditorBlock_UL)

export class CtznEditorBlock_OL extends CtznEditorBlock {
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
customElements.define('ctzn-editor-block--ol', CtznEditorBlock_OL)

export class CtznEditorBlock_LI extends CtznEditorBlock {
  get containsBlocks () {
    return false
  }

  get canChangeTag () {
    return false
  }
}
customElements.define('ctzn-editor-block--li', CtznEditorBlock_LI)