const CURSOR_API_ENDPOINT = 'YOUR_CURSOR_API_ENDPOINT';
const API_KEY = 'YOUR_API_KEY';

export const generateCode = async (prompt) => {
  try {
    const response = await fetch(CURSOR_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1000,
        temperature: 0.7,
        model: "composer" // or whichever model Cursor AI uses
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.code || data.text; // adjust based on actual API response structure
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}; 