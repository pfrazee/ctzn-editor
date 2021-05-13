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

- Get TinyMCE working the way we want
  - Style the content
- Parser needs to support attributes (links)
- Select blocks
- Toolbar for non-richtext blocks
- Block drag & drop to reorder
- Block create
- Block delete
- Richtext split tool (into multiple blocks)
- Implement all ctzn-* blocks

## Attributions

Icons by Font Awesome https://fontawesome.com/license/free