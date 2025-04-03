import React, { useState } from 'react';
import { generateCode } from '../../services/codeApi';
import { saveSnippet } from '../../firebase/snippetService';

function SnippetGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaveStatus('');

    try {
      const result = await generateCode(prompt);
      setGeneratedCode(result);
    } catch (err) {
      console.error('Generation error:', err);
      setError(`Failed to generate code: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaveStatus('Saving...');
      console.log('Starting save process...'); // Debug log

      if (!generatedCode || !prompt) {
        throw new Error('Missing code or prompt');
      }

      const snippetId = await saveSnippet({
        code: generatedCode,
        prompt: prompt
      });

      console.log('Save completed, snippet ID:', snippetId); // Debug log
      setSaveStatus('Saved successfully!');

      // Clear save status after 3 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);

    } catch (err) {
      console.error('Save error in component:', err);
      setSaveStatus(`Failed to save snippet: ${err.message}`);
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    }
  };

  return (
    <div className="snippet-generator">
      <h2>Generate New Snippet</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the code you want to generate..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !prompt.trim()}>
          {loading ? 'Generating...' : 'Generate Snippet'}
        </button>
      </form>

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
            <button onClick={handleSave}>
              Save Snippet
            </button>
          </div>
          {saveStatus && (
            <div className={`save-status ${saveStatus.includes('Failed') ? 'error' : 'success'}`}>
              {saveStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SnippetGenerator; 