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

export function isCursorInsideElementOfTagName (el, tagName) {
  const range = getCurrentSelectionRange()
  if (range) {
    let node = range.startContainer
    while (node && node.nodeType !== el) {
      if (node.tagName === tagName) return true
      node = node.parentElement
    }
    return false
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

export function insertTextAtCursor (text) {
  const range = getCurrentSelectionRange()
  if (range) {
    range.deleteContents()
    range.insertNode(document.createTextNode(text))
    range.collapse()
  }
}

export function insertNewlineAtCursor (el) {
  const range = getCurrentSelectionRange()
  if (range) {
    range.deleteContents()

    const rangeRight = document.createRange()
    rangeRight.selectNodeContents(el)
    rangeRight.setStart(range.endContainer, range.endOffset)
    const requires2ndBreakline = rangeRight.cloneContents().textContent.length === 0

    range.insertNode(document.createElement('br'))
    range.collapse(false)
    if (requires2ndBreakline) {
      range.insertNode(document.createElement('br'))
      range.collapse()
    }
  }
}

export function insertParagraphAtCursor () {
  const range = getCurrentSelectionRange()
  if (!range) return

  // find the element the cursor is within
  let currentEl = nodeToParentEl(range.startContainer)
  if (!currentEl) return

  // choose the new 'paragraph' element based on the context
  let newElTagName = 'p'
  if (currentEl.tagName === 'LI' || currentEl.tagName === 'UL' || currentEl.tagName === 'OL') {
    newElTagName = 'li'
  }

  // split the content at the cursor (selected text will be deleted)
  let {leftContent, rightContent} = splitContentAtCursor(currentEl)

  // create the new element and put the cursor in it
  const newEl = document.createElement(newElTagName)
  newEl.innerHTML = rightContent
  currentEl.insertAdjacentElement('afterend', newEl)
  currentEl.innerHTML = leftContent
  range.selectNode(newEl)
  range.collapse(true)
}

export function wrapCursorWithElement (tagName) {
  const range = getCurrentSelectionRange()
  if (!range) return

  // grab all the <li>s in the current selection range
  let start = nodeToParentEl(range.startContainer)
  let end = nodeToParentEl(range.endContainer)
  if (!start || !end) return

  // create a range selecting those <li>s
  const range2 = document.createRange()
  range2.setStartBefore(start)
  range2.setEndAfter(end)

  // move the selected range nodes into the new element
  const frag = range2.extractContents()
  range2.collapse(false)
  const newEl = document.createElement(tagName)
  newEl.append(frag)
  range2.insertNode(newEl)
  range2.collapse(false)

  // put the cursor at the end
  range.selectNodeContents(newEl)
  range.collapse(false)
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

function nodeToParentEl (node) {
  while (node && node.nodeType === Node.TEXT_NODE) {
    node = node.parentElement
  }
  return node
}