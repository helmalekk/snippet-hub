import React from 'react';

function SnippetDetail({ snippet }) {
  return (
    <div className="snippet-detail">
      <h2>Snippet Details</h2>
      <div className="snippet-content">
        <pre>
          <code>
            {/* TODO: Add syntax highlighting */}
            {snippet?.code || 'No snippet selected'}
          </code>
        </pre>
      </div>
      <div className="snippet-actions">
        <button>Edit</button>
        <button>Delete</button>
        <button>Copy</button>
      </div>
      <div className="snippet-comments">
        {/* TODO: Add comments section */}
      </div>
    </div>
  );
}

export default SnippetDetail; 