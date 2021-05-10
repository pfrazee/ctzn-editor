const LEAF_BLOCK_TAG_NAMES = [
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'LI',
  'HR'
]
const VOID_BLOCK_TAG_NAMES = [
  'HR'
]
const SUPPORTED_BLOCK_TAG_NAMES = [
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'UL',
  'OL',
  'LI',
  'BLOCKQUOTE',
  // 'TABLE',
  // 'HR'
]
const SUPPORTED_INLINE_TAG_NAMES = [
  'STRONG',
  'EM',
  'I',
  'U',
  'STRIKE',
  'CODE',
  'SUP',
  'SUB',
  'A'
]

export class CtznEditorBlockDefinition {
  constructor ({tagName, content, blocks}) {
    this.id = `${Date.now()}-${Math.random()}`
    this.tagName = tagName
    this.content = content || ''
    this.blocks = blocks
  }

  get isVoidBlock () {
    return VOID_BLOCK_TAG_NAMES.includes(this.tagName.toUpperCase())
  }

  get isLeafBlock () {
    return LEAF_BLOCK_TAG_NAMES.includes(this.tagName.toUpperCase())
  }

  clone (props) {
    const dst = new CtznEditorBlockDefinition(Object.assign({}, this, props, {blocks: []}))
    for (let block of (this.blocks || [])) {
      dst.blocks.push(block.clone({}))
    }
    return dst
  }

  convertTo (tagName) {
    const dst = this.clone({tagName})
    if (this.tagName === dst.tagName) {
      return dst
    }
    if (isList(this) && !isList(dst)) {
      dst.content = this.blocks.map(block => `- ${block.content}`).join('<br>\n')
    } else if (!isList(this) && isList(dst)) {
      let items = (this.content || '').split(/([\r\n]|<br>)/g)
        .map(str => str.trim().replace(/^- /, ''))
        .filter(str => str && str !== '<br>')
      if (items.length === 0) items.push('')
      dst.blocks = items.map(item => new CtznEditorBlockDefinition({tagName: 'li', content: item}))
    }
    return dst
  }

  toHTML () {
    if (this.tagName === 'editor') {
      return this.blocks.map(block => block.toHTML()).join('\n')
    }
    if (this.tagName === 'hr') return `<hr>\n`
    if (LEAF_BLOCK_TAG_NAMES.includes(this.tagName.toUpperCase())) {
      return `<${this.tagName}>${this.content}</${this.tagName}>\n`
    }
    return `<${this.tagName}>\n${this.blocks.map(block => block.toHTML()).join('\n')}\n</${this.tagName}>\n`
  }
}

function isList (def) {
  return def.tagName === 'ul' || def.tagName === 'ol'
}

export function fromHTML (html) {
  const container = document.createElement('div')
  container.innerHTML = html
  console.log(container.childNodes)
  const res = fromHTML_NodesToBlockDefinition('editor', container.childNodes)
  console.log(res)
  return res
}

function fromHTML_NodesToBlockDefinition (tagName, nodes) {
  const isLeaf = LEAF_BLOCK_TAG_NAMES.includes(tagName)
  const isVoid = VOID_BLOCK_TAG_NAMES.includes(tagName)
  const contents = []
  const blocks = []
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (tagName === 'editor') {
        // discard
      } else {
        contents.push(node.nodeValue)
      }
    } else {
      if (SUPPORTED_INLINE_TAG_NAMES.includes(node.tagName)) {
        contents.push(fromHTML_NodesToInlineContent(node.tagName, node.childNodes))
      } else if (!isLeaf && SUPPORTED_BLOCK_TAG_NAMES.includes(node.tagName)) {
        blocks.push(fromHTML_NodesToBlockDefinition(node.tagName, node.childNodes))
      } else {
        if (isVoid) {
          // do nothing, can't contain children
        } else if (isLeaf) {
          contents.push(`<em>(Unsupported inline: &lt;${node.tagName}&gt;)</em>`)
        } else {
          blocks.push(new CtznEditorBlockDefinition({tagName: 'p', content: `<em>Unsupported block: ${node.tagName}</em>`}))
        }
      }
    }
  }
  return new CtznEditorBlockDefinition({tagName: tagName.toLowerCase(), content: contents.join(''), blocks})
}

function fromHTML_NodesToInlineContent (tagName, nodes) {
  const tag = tagName.toLowerCase()
  const contents = []
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      contents.push(node.nodeValue)
    } else {
      if (SUPPORTED_INLINE_TAG_NAMES.includes(node.tagName)) {
        contents.push(fromHTML_NodesToInlineContent(node.tagName, node.childNodes))
      } else {
        contents.push(`<em>(Unsupported inline: &lt;${node.tagName}&gt;)</em>`)
      }
    }
  }
  return `<${tag}>${contents.join('')}</${tag}>`
}