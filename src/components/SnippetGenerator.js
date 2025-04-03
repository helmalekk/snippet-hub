import React, { useState } from 'react';
import { generateCode } from '../services/codeApi';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function SnippetGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [title, setTitle] = useState('');
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedCode('');
    setSaveStatus(null);
    setLoadingMessage('Generating code...');

    try {
      const result = await generateCode(prompt);
      setGeneratedCode(result);
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to generate code. Please try again.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleSaveSnippet = async () => {
    if (!title.trim() || !generatedCode) return;

    setLoading(true);
    setSaveStatus(null);
    try {
      const snippetRef = collection(db, 'snippets');
      await addDoc(snippetRef, {
        title: title.trim(),
        code: generatedCode,
        createdAt: serverTimestamp(),
      });

      setSaveStatus({ type: 'success', message: 'Snippet saved successfully!' });
      setTitle('');
      setShowTitleInput(false);
      
      // Optional: Clear the form after successful save
      setPrompt('');
      setGeneratedCode('');
    } catch (err) {
      console.error('Save error:', err);
      setSaveStatus({ type: 'error', message: 'Failed to save snippet. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card snippet-generator">
      <div className="card-header">
        <h2>Generate New Snippet</h2>
        <p className="subtitle">Describe your code needs and let AI do the work</p>
      </div>

      <form onSubmit={handleSubmit} className="card-content">
        <div className="input-group">
          <label htmlFor="prompt">Your Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the code you want to generate... (e.g., 'Create a React button component with hover effects')"
            disabled={loading}
            rows="4"
          />
        </div>

        <button 
          type="submit" 
          className="generate-button"
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Generating...' : 'Generate Code'}
        </button>
      </form>

      {loadingMessage && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{loadingMessage}</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>{error}</p>
        </div>
      )}

      {saveStatus && (
        <div className={`save-status ${saveStatus.type}`}>
          <p>{saveStatus.message}</p>
        </div>
      )}

      {generatedCode && (
        <div className="code-container">
          <h3>Generated Code</h3>
          <pre className="code-block">
            <code>{generatedCode}</code>
          </pre>
          
          {!showTitleInput ? (
            <div className="code-actions">
              <button 
                onClick={() => setShowTitleInput(true)}
                className="action-button"
              >
                Save Snippet
              </button>
              <button 
                onClick={() => navigator.clipboard.writeText(generatedCode)}
                className="action-button"
              >
                Copy Code
              </button>
              <button 
                onClick={() => setGeneratedCode('')}
                className="action-button secondary"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="save-snippet-form">
              <div className="input-group">
                <label htmlFor="snippet-title">Snippet Title</label>
                <input
                  id="snippet-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your snippet"
                  className="title-input"
                  autoFocus
                />
              </div>
              <div className="code-actions">
                <button
                  onClick={handleSaveSnippet}
                  className="action-button"
                  disabled={loading || !title.trim()}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setShowTitleInput(false);
                    setTitle('');
                  }}
                  className="action-button secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SnippetGenerator;
