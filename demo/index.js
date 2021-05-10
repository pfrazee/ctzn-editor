import { CtznEditor } from '/build.js'

window.toHTML = () => {
  return document.querySelector('ctzn-editor').toHTML()
}
window.toJSON = () => {
  return document.querySelector('ctzn-editor').toJSON()
}

window.addEventListener('load', () => {
  document.querySelector('ctzn-editor').fromHTML(`
    <dl>
      <dt>One</dt><dd>Definition</dd>
      <dt>One</dt><dd>Definition</dd>
      <dt>One</dt><dd>Definition</dd>
    </dl>
    <h1>Heading 1</h1>
    <p>Content</p>
    <hr>
    <p>More content</p>
    <h2>Heading 2</h2>
    <p>Content</p>
    <h3>Heading 3</h3>
    <p>Content</p>
    <h4>Heading 4</h4>
    <p>Content</p>
    <h5>Heading 5</h5>
    <p>Content</p>
    <h6>Heading 6</h6>
    <p>Content</p>
    <ul>
      <li>One<ul>
        <li>Two</li>
      </ul>
      <li>Three</li>
      <li>Four</li>
    </ul>
    <ol>
      <li>One<ol>
        <li>Two</li>
      </ol>
      <li>Three</li>
      <li>Four</li>
    </ol>
    <blockquote>
      This is a fancy quote
    </blockquote>
    <pre>this is some
  pre text</pre>
    <p>This is <code>code</code> and a <kbd>shift+s</kbd></p>
    <p>And <strong>bold</strong> <i>italic</i> <u>underline</u> and <strike>strike</strike></p>
    <a href="https://example.com">Link outside containing element</a>
    <p>A <a href="https://example.com">Link</a></p>
    <dl>
      <dt>One</dt><dd>Definition</dd>
      <dt>One</dt><dd>Definition</dd>
      <dt>One</dt><dd>Definition</dd>
    </dl>
    <h3>Table</h3>
    <table>
      <tr><td>One</td><td>Two</td><td>Three</td></tr>
      <tr><td>One</td><td>Two</td><td>Three</td></tr>
      <tr><td>One</td><td>Two</td><td>Three</td></tr>
    </table>
    <h3>Code</h3>
    <ctzn-code>This is some
  custom code</ctzn-code>
    <h3>Post</h3>
    <ctzn-post-view src="http://localhost:4000/pfrazee@dev1.localhost/ctzn.network/post/ff080bc59b95a9d0"></ctzn-post-view>
    <h3>Post expanded</h3>
    <ctzn-post-view mode="expanded" src="http://localhost:4000/pfrazee@dev1.localhost/ctzn.network/post/ff080bc59b95a9d0"></ctzn-post-view>
    <h3>Post content-only</h3>
    <ctzn-post-view mode="content-only" src="http://localhost:4000/pfrazee@dev1.localhost/ctzn.network/post/ff080bc59b95a9d0"></ctzn-post-view>
    <h3>Comment</h3>
    <ctzn-comment-view src="http://localhost:4000/pfrazee@dev1.localhost/ctzn.network/comment/ff080bc63c67dac0"></ctzn-comment-view>
    <h3>Comment content-only</h3>
    <ctzn-comment-view mode="content-only" src="http://localhost:4000/pfrazee@dev1.localhost/ctzn.network/comment/ff080bc63c67dac0"></ctzn-comment-view>
    <h3>Iframe</h3>
    <ctzn-iframe src="https://example.com"></ctzn-iframe>
    <h3>Card</h3>
    <ctzn-card>
      <h3>This is inside a card</h3>
      <p>Looks good.</p>
      <ctzn-post-view src="http://localhost:4000/pfrazee@dev1.localhost/ctzn.network/post/ff080bc59b95a9d0"></ctzn-post-view>
      <ctzn-iframe src="https://example.com"></ctzn-iframe>
      <ctzn-code>This is some
  custom code</ctzn-code>
    </ctzn-card>
    <h3>Posts feed</h3>
    <ctzn-posts-feed limit="3"></ctzn-posts-feed>
    <h3>ctzn-followers-list</h3>
    <ctzn-followers-list></ctzn-followers-list>
    <h3>ctzn-following-list</h3>
    <ctzn-following-list></ctzn-following-list>
    <h3>ctzn-community-memberships-list</h3>
    <ctzn-community-memberships-list></ctzn-community-memberships-list>
    <h3>ctzn-community-members-list</h3>
    <ctzn-community-members-list user-id="invite-only@dev1.localhost"></ctzn-community-members-list>
    <h3>ctzn-dbmethods-feed</h3>
    <ctzn-dbmethods-feed limit="3"></ctzn-dbmethods-feed>
    <h3>ctzn-owned-items-list</h3>
    <ctzn-owned-items-list></ctzn-owned-items-list>
    <h3>ctzn-item-classes-list</h3>
    <ctzn-item-classes-list user-id="invite-only@dev1.localhost"></ctzn-item-classes-list>
    <h3>ctzn-comments-feed</h3>
    <ctzn-comments-feed limit="3"></ctzn-comments-feed>
  `)
})
