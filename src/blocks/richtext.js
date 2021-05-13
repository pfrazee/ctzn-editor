import { LitElement, html } from 'lit'

export class CtznEditorBlock_Richtext extends LitElement {
  static get properties () {
    return {
      block: {type: Object}
    }
  }

  createRenderRoot () {
    return this
  }

  constructor () {
    super()
    this.block = undefined
    this.editor = undefined
  }

  firstUpdated () {
    tinymce.init({
      selector: `#richtext-${this.block.id}`,
      // inline: true,
      menubar: false,
      statusbar: false,
      toolbar: false,
      plugins: ['advlist', 'autoresize', 'link', 'lists'],
      autoresize_bottom_margin: 0,
      content_style: `
      body {
        margin: 0.25rem 0.25rem;
        background: #FFF;
      }
      body > :first-child {
        margin-top: 0;
      }
      body > :last-child {
        margin-bottom: 0;
      }
      `,

      setup: (editor) => {
        this.editor = editor
        editor.on('init', () => {
          editor.setContent(this.block.content, {format: 'html'})
        })
        editor.on('change', () => {
          this.block.content = editor.getContent()
          this.emitEditorStateChange()
        })
        editor.on('selectionchange', () => {
          this.emitEditorStateChange()
        })
      }
    })
  }

  emitEditorStateChange () {
    if (!this.editor) return
    const detail = {
      currentBlockType: 'richtext',
      bold: !!this.editor.queryCommandState('Bold'),
      dl: !!this.editor.queryCommandState('InsertDefinitionList'),
      ol: !!this.editor.queryCommandState('InsertOrderedList'),
      ul: !!this.editor.queryCommandState('InsertUnorderedList'),
      italic: !!this.editor.queryCommandState('Italic'),
      blockquote: !!this.editor.queryCommandState('mceBlockQuote'),
      outdent: !!this.editor.queryCommandState('Outdent'),
      strikethrough: !!this.editor.queryCommandState('Strikethrough'),
      subscript: !!this.editor.queryCommandState('Subscript'),
      superscript: !!this.editor.queryCommandState('Superscript'),
      underline: !!this.editor.queryCommandState('Underline'),
    }
    this.dispatchEvent(new CustomEvent('editor-state-change', {bubbles: true, detail}))
  }

  render () {
    return html`
      <div id="richtext-${this.block.id}" class="tinymce-editor">
        <p></p>
      </div>
    `
  }
}
customElements.define('ctzn-editor-block--richtext', CtznEditorBlock_Richtext)
