const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true
});
const box = [];
app.post('/api/initialize', async (req, res) => {
  const { coreData } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI agent initialized with the following core data." },
        { role: "user", content: `Initialize with core data: ${JSON.stringify(coreData)}` },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });
    box.push(response.choices[0].message["content"])
    res.json(response.choices[0].message["content"]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Other routes...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('RESPONSE: ', box);
});
