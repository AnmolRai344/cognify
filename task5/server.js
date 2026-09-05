const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('frontend'));

let todos = [{ id: 1, text: 'Learn REST APIs' }];
let nextId = 2;

app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const todo = { id: nextId++, text: req.body.text };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).send('Not found');
  todo.text = req.body.text;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.status(204).send();
});

app.listen(3000, () => console.log('Server running on port 3000'));