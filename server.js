require('dotenv').config();
const express   = require ('express')
const cors      = require ('cors')

const app       = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post ('/chat', async (req, res) => {
const {messages} = req.body;
try {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GROQ_API_KEY
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: messages
    })
  });
const data = await response.json();
res.json (data);
} catch (err) {
  res.status(500). json ({ error: 'Server error'});
}
});

app.listen(3000, () => {
  console.log('Server Nusantara Properti jalan di port 3000!');
});