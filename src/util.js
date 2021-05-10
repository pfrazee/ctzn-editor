export function cursorTo (range) {
  const sel = window.getSelection()
  sel.removeAllRanges()
  sel.addRange(range)
}

export function getCurrentSelectionRange () {
  try {
    return window.getSelection().getRangeAt(0)
  } catch (e) {
    return undefined
  }
}

export function getPlainTextCaretOffset (el) {
  if (!el) return 0
  const range = getCurrentSelectionRange()
  if (!range) return 0
  const range2 = document.createRange()
  range2.selectNodeContents(el)
  range2.setEnd(range.startContainer, range.startOffset)
  return range2.cloneContents().textContent.trim().length
}

export function setPlainTextCaretOffset (el, offset) {
  function createRange (node, chars, range) {
    const isFirst = !range
    if (!range) {
      range = document.createRange()
      range.selectNode(node)
      range.setStart(node, 0)
    }
    
    if (chars.count === 0) {
      range.setEnd(node, chars.count)
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length
        } else {
          range.setEnd(node, chars.count)
          chars.count = 0
        }
      } else {
        let lastChild
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          lastChild = node.childNodes[lp]
          range = createRange(node.childNodes[lp], chars, range)
          if (chars.count === 0) {
            break
          }
        }
        if (chars.count > 0 && isFirst) {
          range.setEnd(lastChild, lastChild.textContent.length)
        }
      }
    } 
    
    return range
  }
  const range = createRange(el, {count: offset})
  if (range) {
    range.collapse(false)
    cursorTo(range)
  }
}

export function splitContentAtCursor (el) {
  const range = window.getSelection().getRangeAt(0)
  const rangeLeft = document.createRange()
  rangeLeft.selectNodeContents(el)
  rangeLeft.setEnd(range.startContainer, range.startOffset)
  const rangeRight = document.createRange()
  rangeRight.selectNodeContents(el)
  rangeRight.setStart(range.endContainer, range.endOffset)
  return {
    leftContent: fragToHTML(rangeLeft.cloneContents()),
    rightContent: fragToHTML(rangeRight.cloneContents())
  }
}

export function findParent (node, test) {
  if (typeof test === 'string') {
    // classname default
    var cls = test
    test = el => el.classList && el.classList.contains(cls)
  }

  while (node) {
    if (test(node)) {
      return node
    }
    node = node.parentNode
  }
}

export function fragToHTML (frag) {
  let div = document.createElement('div')
  div.append(frag)
  return div.innerHTML.replace(/<\!--.*?-->/g, "").trim()
}