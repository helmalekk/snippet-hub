import React, { useState } from 'react';
import { generateCode } from '../services/codeApi';

function SnippetGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedCode('');
    setLoadingMessage('Initializing code generation...');

    let attempts = 0;
    const maxAttempts = 3;

    try {
      while (attempts < maxAttempts) {
        attempts++;
        setLoadingMessage(`Attempting to generate code (try ${attempts}/${maxAttempts})...`);
        
        const result = await generateCode(prompt);
        if (result) {
          setGeneratedCode(result);
          break;
        }
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(`Failed to generate code: ${err.message}`);
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  // Clear generated code when prompt changes
  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    if (generatedCode) {
      setGeneratedCode('');
    }
  };

  return (
    <div className="snippet-generator">
      <h2>Generate New Snippet</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Describe the code you want to generate... (e.g., 'Create a React navigation bar with Home, About, and Contact links')"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? loadingMessage : 'Generate Snippet'}
        </button>
      </form>

      {loading && (
        <div className="loading-message">
          {loadingMessage}
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {generatedCode && (
        <div className="generated-code-preview">
          <h3>Generated Code</h3>
          <pre>
            <code>{generatedCode}</code>
          </pre>
          <div className="code-actions">
            <button onClick={() => navigator.clipboard.writeText(generatedCode)}>
              Copy Code
            </button>
            <button onClick={() => setGeneratedCode('')}>Clear</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SnippetGenerator;
