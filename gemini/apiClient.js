import axios from 'axios';
import { GEMINI_API_KEY } from './.env';

const client = axios.create({
  baseURL: 'https://api.generativeai.google.com/v1',
  headers: {
    'Authorization': `Bearer ${GEMINI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default {
  generateText: async ({ model, prompt }) => {
    try {
      const response = await client.post(`/models/${model}:generateText`, { prompt });
      return response;
    } catch (error) {
      throw error;
    }
  },
};


