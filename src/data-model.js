import { html } from 'lit'

const SUPPORTED_RICH_TEXT_TAG_NAMES = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'hr',
  'blockquote',
  'pre',
  'dl',
  'dt',
  'dd',
  'table',
  'tbody',
  'tr',
  'th',
  'td',
  'ul',
  'ol',
  'li',
  'strong',
  'em',
  'i',
  'u',
  'strike',
  'code',
  'kbd',
  'sup',
  'sub',
  'a'
]

export class CtznEditorBlock {
  constructor (opts) {
    this.id = `${Date.now()}-${(Math.random() * 1e6)|0}`
    this.content = opts?.content || ''
  }

  get blockType () {
    return undefined // overrideme
  }

  toHTML () {
    // override me
  }

  render () {
    return html`
      <div>Unable to render: base block has no renderer</div>
    `
  }
}

export class CtznEditorBlock_RichText extends CtznEditorBlock {
  get blockType () {
    return 'richtext'
  }

  toHTML () {
    return this.content
  }

  render () {
    return html`
      <ctzn-editor-block--richtext .block=${this}></ctzn-editor-block--richtext>
    `
  }
}

export class CtznEditorBlock_Unknown extends CtznEditorBlock {
  get blockType () {
    return 'unknown'
  }

  static fromDOM (node) {
    return new CtznEditorBlock_Unknown({
      content: node.tagName
    })
  }

  toHTML () {
    return ''
  }

  render () {
    return html`
      <ctzn-editor-block--unknown .block=${this}></ctzn-editor-block--unknown>
    `
  }
}

export class CtznEditorBlock_Card extends CtznEditorBlock {
  constructor ({blocks} = {}) {
    super()
    this.blocks = blocks || []
  }

  get blockType () {
    return 'ctzn-card'
  }

  static fromDOM (node) {
    return new CtznEditorBlock_Card(fromDOM(node))
  }

  toHTML () {
    return this.content
  }

  render () {
    return html`
      <ctzn-editor-block--ctzn-card .block=${this}></ctzn-editor-block--ctzn-card>
    `
  }
}

export class CtznEditorBlock_Code extends CtznEditorBlock {
  get blockType () {
    return 'ctzn-code'
  }

  static fromDOM (node) {
    return new CtznEditorBlock_Code({
      content: 'todo'
    })
  }

  toHTML () {
    return this.content
  }

  render () {
    return html`
      <ctzn-editor-block--ctzn-code .block=${this}></ctzn-editor-block--ctzn-code>
    `
  }
}

export function toHTML (blocks) {
  const acc = []
  for (let block of blocks) {
    acc.push(block.toHTML())
  }
  return acc.join('')
}

export function fromHTML (html) {
  const container = document.createElement('div')
  container.innerHTML = html
  return fromDOM(container)
}

export function fromTagName (tagName, ...args) {
  switch (tagName) {
    case 'richtext':
      return new CtznEditorBlock_RichText(...args)
    case 'ctzn-card':
      return new CtznEditorBlock_Card(...args)
    case 'ctzn-code':
      return new CtznEditorBlock_Code(...args)
    default:
      return new CtznEditorBlock_Unknown(...args)
  }
}

function fromDOM (container) {
  const blocks = []
  const richTextAcc = []
  const addRichTextBlock = () => {
    if (richTextAcc.length) {
      const content = richTextAcc.join('')
      if (content.trim()) {
        blocks.push(new CtznEditorBlock_RichText({content}))
      }
      richTextAcc.length = 0
    }
  }
  for (const node of container.childNodes) {
    let nodeTagName = node.tagName?.toLowerCase?.()
    if (node.nodeType === Node.TEXT_NODE) {
      richTextAcc.push(node.nodeValue)
    } else {
      if (SUPPORTED_RICH_TEXT_TAG_NAMES.includes(nodeTagName)) {
        richTextAcc.push(fromDOM_NodesToRichTextContent(nodeTagName, node.childNodes))
      } else {
        addRichTextBlock()
        switch (nodeTagName) {
          case 'ctzn-card':
            blocks.push(CtznEditorBlock_Card.fromDOM(node))
            break
          case 'ctzn-code':
            blocks.push(CtznEditorBlock_Code.fromDOM(node))
            break
          default:
            blocks.push(CtznEditorBlock_Unknown.fromDOM(node))
        }
      }
    }
  }
  addRichTextBlock()
  return blocks
}

function fromDOM_NodesToRichTextContent (tagName, nodes) {
  const tag = tagName
  const contents = []
  for (const node of nodes) {
    const nodeTagName = node?.tagName?.toLowerCase?.()
    if (node.nodeType === Node.TEXT_NODE) {
      contents.push(node.nodeValue)
    } else {
      if (SUPPORTED_RICH_TEXT_TAG_NAMES.includes(nodeTagName)) {
        contents.push(fromDOM_NodesToRichTextContent(nodeTagName, node.childNodes))
      } else {
        contents.push(`<em>(Unsupported inline: &lt;${nodeTagName}&gt;)</em>`)
      }
    }
  }
  return `<${tag}>${contents.join('')}</${tag}>`
}

function* traverseTree (node, depth = 0) {
  if (!node.blocks) return
  for (let block of node.blocks) {
    yield {block, depth, start: true, end: false}
    yield* traverseTree(block, depth+1)
    yield {block, depth, start: false, end: true}
  }
}

/*
p
h1
h2
h3
h4
h5
strong
em
u
strike
code
a
img
video
audio
ul
li
(indent)
(undo/redo)
blockquote
table
(clear formatting)
sup
sub
hr

ctzn-card
ctzn-code
ctzn-comment-view
ctzn-comments-view
ctzn-community-members-list
ctzn-community-memberships-list
ctzn-dbmethods-feed
ctzn-followers-list
ctzn-following-list
ctzn-iframe
ctzn-item-classes-list
ctzn-owned-items-list
ctzn-pages-list
ctzn-post-view
ctzn-posts-feed
*/