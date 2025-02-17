const HF_API_ENDPOINT = 'https://api-inference.huggingface.co/models/bigcode/starcoder';
const API_KEY = process.env.REACT_APP_HF_API_KEY;

export const generateCode = async (prompt) => {
  try {
    if (!API_KEY) {
      throw new Error('HuggingFace API key is not configured. Please check your .env file.');
    }

    console.log('Making API request to HuggingFace...');
    const response = await fetch(HF_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        inputs: `Generate React component: ${prompt}`,
        parameters: {
          max_length: 500,
          temperature: 0.9,
          top_p: 0.95,
          return_full_text: false,
          num_return_sequences: 1,
          timestamp: Date.now()
        }
      })
    });

    const data = await response.json();

    // Check if model is loading
    if (data.error && data.error.includes('Model is loading')) {
      // Wait for 5 seconds and try again
      await new Promise(resolve => setTimeout(resolve, 5000));
      return generateCode(prompt); // Recursive call
    }

    if (!response.ok) {
      console.error('API Error Response:', data);
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    if (!data[0]?.generated_text) {
      throw new Error('Invalid response format from API');
    }

    return data[0].generated_text;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error(`Failed to generate code: ${error.message}`);
  }
}; 