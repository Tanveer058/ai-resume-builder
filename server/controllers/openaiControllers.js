const axios = require('axios');
require('dotenv').config();

async function generateSummary(data) {
  const prompt = `Write a professional resume summary for:\nName: ${data.name}\nRole: ${data.role}\nExperience: ${data.experience}\nSkills: ${data.skills.join(', ')}`;

  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
    //   model: 'openai/gpt-3.5-turbo', // or grok, claude, mistral, etc.
        model: 'openai/gpt-3.5-turbo-16k',

      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that writes resume summaries.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost:3000', // optional, for ranking
        'X-Title': 'ResumeBuilder',              // optional, for ranking
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = { generateSummary };


