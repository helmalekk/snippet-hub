import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SnippetFeed from './SnippetFeed';

// Mock user data - replace with Firestore query
const mockUserData = {
  bio: "Full-stack developer passionate about React and clean code",
  location: "San Francisco, CA",
  joinDate: "2024-01-01",
  snippetsCount: 8,
  likesReceived: 124
};

function Profile() {
  const { user } = useAuth();
  const [userSnippets, setUserSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserSnippets = async () => {
      try {
        // TODO: Replace with actual Firestore query
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserSnippets([
          {
            id: 1,
            title: "React Custom Hook",
            code: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });
  return [value, setValue];
}`,
            author: user.username,
            date: "2024-02-15T10:30:00Z",
            likes: 12,
            comments: []
          }
        ]);
      } catch (err) {
        setError('Failed to load your snippets');
        console.error('Error fetching snippets:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserSnippets();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-details">
            <h1 className="profile-username">@{user.username}</h1>
            <p className="profile-bio">{mockUserData.bio}</p>
            <div className="profile-meta">
              <span>
                <i className="location-icon">📍</i> {mockUserData.location}
              </span>
              <span>
                <i className="calendar-icon">📅</i> Joined {new Date(mockUserData.joinDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{mockUserData.snippetsCount}</span>
            <span className="stat-label">Snippets</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{mockUserData.likesReceived}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <h2 className="section-title">My Snippets</h2>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your snippets...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <SnippetFeed snippets={userSnippets} />
        )}
      </div>
    </div>
  );
}

export default Profile; 