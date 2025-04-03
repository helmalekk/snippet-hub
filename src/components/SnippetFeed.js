import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

function SnippetFeed({ snippets = [] }) {
  const [likedSnippets, setLikedSnippets] = useState(new Set());

  const handleLike = (snippetId) => {
    setLikedSnippets(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(snippetId)) {
        newLiked.delete(snippetId);
      } else {
        newLiked.add(snippetId);
      }
      return newLiked;
    });
  };

  if (snippets.length === 0) {
    return (
      <div className="snippet-feed">
        <div className="snippet-placeholder">
          No snippets found. Be the first to share a snippet!
        </div>
      </div>
    );
  }

  return (
    <div className="snippet-feed">
      {snippets.map(snippet => (
        <div key={snippet.id} className="snippet-card">
          <div className="snippet-header">
            <h3 className="snippet-title">{snippet.title}</h3>
            <div className="snippet-meta">
              <span className="snippet-author">@{snippet.author}</span>
              <span className="snippet-date">
                {formatDistanceToNow(new Date(snippet.date), { addSuffix: true })}
              </span>
            </div>
          </div>

          <pre className="snippet-code">
            <code>{snippet.code}</code>
          </pre>

          <div className="snippet-footer">
            <button 
              className={`like-button ${likedSnippets.has(snippet.id) ? 'liked' : ''}`}
              onClick={() => handleLike(snippet.id)}
            >
              <span className="like-icon">♥</span>
              <span className="like-count">
                {snippet.likes + (likedSnippets.has(snippet.id) ? 1 : 0)}
              </span>
            </button>

            <div className="comment-count">
              <span className="comment-icon">💬</span>
              <span>{snippet.comments.length}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SnippetFeed; 