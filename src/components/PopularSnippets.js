import React, { useState, useEffect } from 'react';
import SnippetFeed from './SnippetFeed';

// Mock data - replace with actual Firestore query
const mockSnippets = [
  {
    id: 1,
    title: "React Button Component",
    code: `function Button({ children, onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}`,
    author: "johndoe",
    date: "2024-02-15T10:30:00Z",
    likes: 42,
    comments: [
      { id: 1, text: "Great snippet!", author: "jane" }
    ]
  },
  {
    id: 2,
    title: "Custom React Hook",
    code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
    author: "sarah",
    date: "2024-02-14T15:20:00Z",
    likes: 38,
    comments: [
      { id: 1, text: "Very useful!", author: "mike" }
    ]
  }
];

function PopularSnippets() {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularSnippets = async () => {
      try {
        // TODO: Replace with actual Firestore query
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSnippets(mockSnippets);
      } catch (err) {
        setError('Failed to load popular snippets');
        console.error('Error fetching snippets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularSnippets();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading popular snippets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Popular Snippets</h1>
      <p className="subtitle text-center mb-4">
        Discover the most liked code snippets from our community
      </p>
      <SnippetFeed snippets={snippets} />
    </div>
  );
}

export default PopularSnippets; 