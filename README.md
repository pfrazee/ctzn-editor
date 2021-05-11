# CTZN Editor

Goals:

- Designed for CTZN HTML
- Easy to use on mobile and desktop
- "Rich Text" and "User Interface" construction modes
- Simple for maintainers to develop
  - Existing WYSIWYG frameworks tend to be plugin-oriented, making them more complex compared to an editor constructed from the top down by a team

## Design

This is a blocks-oriented WYSIWYG editor geared towards building user interfaces and/or rich text documents. Blocks may contain other blocks or inline rich text (using content-editable).

## TODOs

- Content
  - All HTML block types
    - Table
  - All HTML inline formatting
  - All CTZN block types
  - Handle HTML that's not wrapped at the top level in a block tag
  - Allow blocks inside blockquote?
  - Support &lt;kbd&gt;?
  - Parser handle attributes?
- Behaviors
  - Popup/hover UIs for configuring elements
  - Copy/paste handling
  - Undo/redo stack
  - Selecting multiple blocks
  - Drag & drop to rearrange blocks
  - Handle up/down keys within multiline block (has &lt;br&gt;s)
- Various
  - Mobile

## Attributions

Icons by Font Awesome https://fontawesome.com/license/free