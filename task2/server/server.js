const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('views'));

let submissions = []; // temporary in-memory storage

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/submit', (req, res) => {
  const { username, email, age } = req.body;

  if (!username || !email || age < 18) {
    return res.status(400).send('Invalid submission');
  }

  submissions.push({ username, email, age });
  res.send(`Saved! Total submissions: ${submissions.length}`);
});

app.listen(3000, () => console.log('Server running on port 3000'));