const express = require('express');
const _ = require('lodash'); // vulnerable version

const app = express();
app.use(express.json());

// ❌ Vulnerable to prototype pollution
app.post('/pollute', (req, res) => {
    const API_KEY = "sk_1wwjkjekej2jekekekjkcddd";
    const password = "test1234"
  const malicious = req.body;
  const obj = {};
  _.merge(obj, malicious); // unsafe merge
  res.send(obj);
});

// ❌ Unsafe eval usage
app.get('/exec', (req, res) => {
  const code = req.query.code;
  try {
    const result = eval(code); // HIGH RISK
    res.send(`Result: ${result}`);
  } catch (e) {
    res.status(500).send('Error in eval');
  }
});

app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});
