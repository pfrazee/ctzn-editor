import { LitElement, html } from 'lit'
import * as icons from '../icons.js'
import * as contextMenu from '../context-menu.js'

export class CtznEditorBlockMenu extends LitElement {
  static get properties () {
    return {
      currentTag: {type: String, attribute: 'current-tag'},
      currentView: {type: String}
    }
  }

  constructor () {
    super()
    this.currentTag = ''
    this.currentView = undefined
  }

  setCurrentView (view) {
    this.currentView = view
  }

  // rendering
  // =

  render () {
    if (this.currentView === 'ui') {
      return this.renderUiMenu()
    }
    if (this.currentView === 'content') {
      return this.renderContentMenu()
    }
    return html`
      ${this.renderStyles()}
      <div class="sticky-heading">
        Add block
      </div>
      ${this.renderChangeViewOption('ui', html`<span class="heading-icon">H</span>`, 'UI Block')}
      ${this.renderChangeViewOption('content', html`<span class="heading-icon">H</span>`, 'Content Block')}
    `
  }

  renderUiMenu () {
    return html`
      ${this.renderStyles()}
      <div class="sticky-heading">
        <span class="back" @click=${e => this.setCurrentView(undefined)}>${icons.angleLeft()}</span>
        UI Block
      </div>
      ${this.renderBlockTagOption('ctzn-card', html`<span class="heading-icon">H1</span>`, 'Card Block')}
    `
  }

  renderContentMenu () {
    return html`
      ${this.renderStyles()}
      <div class="sticky-heading">
        <span class="back" @click=${e => this.setCurrentView(undefined)}>${icons.angleLeft()}</span>
        Content Block
      </div>
      ${this.renderBlockTagOption('ctzn-code', html`<span class="heading-icon">H1</span>`, 'Code Block')}
    `
  }

  renderBlockTagOption (tagName, icon, label) {
    const setBlockTag = (tagName) => this.dispatchEvent(new CustomEvent('add-block', {detail: {tagName}, bubbles: true}))
    return html`
      <div
        class="dropdown-item"
        @click=${() => { contextMenu.destroy(); setBlockTag(tagName) }}
      >
        <span class="block-tag-icon">${icon}</span>
        <span>${label}</span>
      </div>
    `
  }

  renderChangeViewOption (view, icon, label) {
    return html`
      <div
        class="dropdown-item"
        @click=${() => { this.setCurrentView(view) }}
      >
        <span class="block-tag-icon">${icon}</span>
        <span>${label}</span>
        <span class="submenu-icon">${icons.angleRight(16, 16)}</span>
      </div>
    `
  }

  renderStyles () {
    return html`
      <style>
        :host {
          display: block;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
          width: 200px;
          max-height: 300px;
          overflow-y: scroll;
          background: #fff;
          border: 1px solid #ccd;
          border-radius: 0.25rem;
          box-shadow: 0 1px 3px #0001;
        }
        .dropdown-item {
          cursor: pointer;
          padding: 0.5rem 0.6rem;
          font-size: 13px;
          font-weight: 500;
          border-bottom: 1px solid #dde;
        }
        .sticky-heading {
          position: sticky;
          top: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          padding: 0.5rem 0.6rem;
          border-bottom: 1px solid #dde;
          color: #556;
          font-size: 12px;
          font-weight: bold;
          background: #f5f5f7;
        }
        .sticky-heading .back {
          display: inline-block;
          cursor: pointer;
          padding: 0 0.3rem;
          margin-left: -0.4rem;
        }
        .sticky-heading .back svg {
          position: relative;
          top: 1px;
        }
        .block-tag-icon {
          display: inline-block;
          background: #eeeeef;
          border-radius: 0.2rem;
          margin-right: 0.3rem;
          width: 1.6rem;
          text-align: center;
          padding: 0.2rem 0;
          color: #667;
        }
        .dropdown-item:hover {
          background: #fafafd;
        }
        .dropdown-item.selected {
          background: #e8fce4;
          color: green;
        }
        .dropdown-item.selected .block-tag-icon {
          color: #098f22;
          background: #ace2ad;
        }
        .block-tag-icon svg {
          position: relative;
          top: 1px;
        }
        .block-tag-icon .heading-icon {
          font-size: 12px;
          font-weight: bold;
          position: relative;
          top: -1px;
        }
        .block-tag-icon .monospace-icon {
          font-size: 14px;
          font-weight: bold;
          font-family: monospace;
          position: relative;
          top: -1px;
        }
        .submenu-icon {
          float: right;
          color: #aab;
          padding: 0.2rem 0;
        }
      </style>
    `
  }

  // events
  // =
}
customElements.define('ctzn-editor-block-menu', CtznEditorBlockMenu)