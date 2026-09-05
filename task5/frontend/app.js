async function loadTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();

  const list = document.getElementById('todoList');
  list.innerHTML = todos.map(t => `
    <li>
      ${t.text}
      <button onclick="deleteTodo(${t.id})">Delete</button>
    </li>
  `).join('');
}

async function addTodo() {
  const input = document.getElementById('todoInput');
  if (!input.value.trim()) return;

  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input.value }),
  });

  input.value = '';
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  loadTodos();
}

loadTodos();