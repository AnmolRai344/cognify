const app = document.getElementById('app');

const routes = {
  '/signup': renderSignup,
  '/profile': renderProfile,
};

function router() {
  const path = location.hash.slice(1) || '/signup';
  (routes[path] || renderSignup)();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

function renderSignup() {
  app.innerHTML = `
    <form id="signupForm">
      <input name="username" placeholder="Username" required>
      <input name="password" type="password" placeholder="Password" required>
      <div class="strength" id="strengthMsg"></div>
      <button type="submit">Sign Up</button>
    </form>
  `;

  const password = document.querySelector('[name="password"]');
  const strengthMsg = document.getElementById('strengthMsg');

  password.addEventListener('input', () => {
    strengthMsg.textContent = getStrengthLabel(password.value);
    strengthMsg.className = `strength ${getStrengthClass(password.value)}`;
  });

  document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (getStrengthClass(password.value) === 'weak') {
      alert('Password too weak');
      return;
    }
    localStorage.setItem('username', e.target.username.value);
    location.hash = '/profile';
  });
}

function renderProfile() {
  const name = localStorage.getItem('username') || 'Guest';
  app.innerHTML = `<h2>Welcome, ${name}!</h2>`;
}

function getStrengthClass(pw) {
  if (pw.length < 6) return 'weak';
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw) && pw.length >= 8) return 'strong';
  return 'medium';
}

function getStrengthLabel(pw) {
  const map = { weak: 'Weak password', medium: 'Medium strength', strong: 'Strong password' };
  return map[getStrengthClass(pw)];
}