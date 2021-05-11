
const BLOCK_TAG_RULES = {
  // blocktag => [blockTagsAllowedInside]
  'EDITOR': undefined, // will have all BLOCK_TAG_RULES keys added (below)
  'P': [],
  'H1': [],
  'H2': [],
  'H3': [],
  'H4': [],
  'H5': [],
  'H6': [],
  'UL': ['UL', 'OL', 'LI'],
  'OL': ['UL', 'OL', 'LI'],
  'LI': ['UL', 'OL'],
  'DL': ['DT', 'DD'],
  'DD': [],
  'DT': [],
  'BLOCKQUOTE': [],
  'PRE': [],
  'HR': []
}
BLOCK_TAG_RULES.EDITOR = Object.keys(BLOCK_TAG_RULES)
const VOID_BLOCK_TAG_NAMES = [
  'HR'
]
const LEAF_BLOCK_TAG_NAMES = [
  'P',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'LI',
  'DD',
  'DT',
  'BLOCKQUOTE',
  'PRE'
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
  constructor ({tagName, content, blocks, attributes}) {
    this.id = `${Date.now()}-${Math.random()}`
    this.tagName = tagName
    this.attributes = attributes || {}
    this.content = content || ''
    this.blocks = blocks
  }

  get isVoidBlock () {
    return VOID_BLOCK_TAG_NAMES.includes(this.tagName.toUpperCase())
  }

  clone (props) {
    const dst = new CtznEditorBlockDefinition(Object.assign({}, this, props, {blocks: []}))
    for (let block of (this.blocks || [])) {
      dst.blocks.push(block.clone({}))
    }
    dst.attributes = Object.assign({}, this.attributes)
    return dst
  }

  convertTo (tagName) {
    const dst = this.clone({tagName})
    if (this.tagName === dst.tagName) {
      return dst
    }
    if (isList(this) && !isList(dst)) {
      dst.content = this.toText()
    } else if (!isList(this) && isList(dst)) {
      let items = (this.content || '').split(/([\r\n]|<br>)/g)
        .map(str => str.trim().replace(/^- /, ''))
        .filter(str => str && str !== '<br>')
      if (items.length === 0) items.push('')
      if (dst.tagName === 'dl') {
        dst.blocks = items.map((item, i) => new CtznEditorBlockDefinition({tagName: i % 2 === 0 ? 'dt' : 'dd', content: item}))
      } else {
        dst.blocks = items.map(item => new CtznEditorBlockDefinition({tagName: 'li', content: item}))
      }
    } else if (isList(this) && isList(dst)) {
      if (this.tagName === 'dl' && dst.tagName !== 'dl') {
        dst.blocks = this.blocks.map((block) => new CtznEditorBlockDefinition({tagName: 'li', content: block.content}))
      } else if (this.tagName !== 'dl' && dst.tagName === 'dl') {
        dst.blocks = this.blocks.map((block, i) => new CtznEditorBlockDefinition({tagName: i % 2 === 0 ? 'dt' : 'dd', content: block.content}))
      }
    }
    return dst
  }

  toText () {
    if (this.tagName === 'ul' || this.tagName === 'ol') {
      return this.blocks.map(block => `- ${block.content}`).join('<br>\n')
    }
    if (this.tagName === 'dl') {
      return this.blocks.map(block => `- ${block.content}`).join('<br>\n')
    }
    return this.content
  }

  toHTML () {
    if (this.tagName === 'editor') {
      return this.blocks.map(block => block.toHTML()).join('\n')
    }
    if (this.tagName === 'hr') return `<hr>\n`
    if (this.tagName === 'ul' || this.tagName === 'ol') {
      // handle indentation
      let currentDepth = -1
      let arr = []
      for (let block of this.blocks) {
        while (currentDepth < block.attributes.depth) {
          arr.push(`<${this.tagName}>\n`)
          currentDepth++
        }
        while (currentDepth > block.attributes.depth) {
          arr.push(`</${this.tagName}>`)
          currentDepth--
        }
        arr.push(`<li>${block.content}</li>`)
      }
      while (currentDepth > -1) {
        arr.push(`</${this.tagName}>`)
        currentDepth--
      }
      return arr.join('\n')
    }
    if (LEAF_BLOCK_TAG_NAMES.includes(this.tagName.toUpperCase())) {
      return `<${this.tagName}>${this.content}</${this.tagName}>\n`
    }
    return `<${this.tagName}>\n${this.blocks.map(block => block.toHTML()).join('\n')}\n</${this.tagName}>\n`
  }
}

function isList (def) {
  return def.tagName === 'ul' || def.tagName === 'ol' || def.tagName === 'dl'
}

export function fromHTML (html) {
  const container = document.createElement('div')
  container.innerHTML = html
  console.log(container.childNodes)
  const res = fromHTML_NodesToBlockDefinition('EDITOR', container.childNodes)
  fromHTML_FlattenIndentedLists(res)
  console.log(res)
  return res
}

function fromHTML_NodesToBlockDefinition (tagName, nodes) {
  const isLeaf = !BLOCK_TAG_RULES[tagName]?.length
  const isVoid = VOID_BLOCK_TAG_NAMES.includes(tagName)
  const contents = []
  const blocks = []
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (tagName === 'EDITOR') {
        // discard
      } else {
        contents.push(node.nodeValue)
      }
    } else {
      if (SUPPORTED_INLINE_TAG_NAMES.includes(node.tagName)) {
        contents.push(fromHTML_NodesToInlineContent(node.tagName, node.childNodes))
      } else if (BLOCK_TAG_RULES[tagName].includes(node.tagName)) {
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

function fromHTML_FlattenIndentedLists (node) {
  let currentListBlock = undefined
  let flattenedBlocks
  let depth = 0
  for (let {block, start, end} of traverseTree(node)) {
    if (start && (block.tagName === 'ul' || block.tagName === 'ol')) {
      if (!currentListBlock) {
        currentListBlock = block
        flattenedBlocks = []
        depth = 0
      } else {
        depth++
      }
    } else if (start && currentListBlock && block.tagName === 'li') {
      block.attributes.depth = depth
      flattenedBlocks.push(block)
    } else if (end) {
      if (block === currentListBlock) {
        currentListBlock.blocks = flattenedBlocks
        currentListBlock = undefined
      } else if ((block.tagName === 'ul' || block.tagName === 'ol')) {
        depth--
      }
    }
  }
}

function* traverseTree (node, depth = 0) {
  if (!node.blocks) return
  for (let block of node.blocks) {
    yield {block, depth, start: true, end: false}
    yield* traverseTree(block, depth+1)
    yield {block, depth, start: false, end: true}
  }
}