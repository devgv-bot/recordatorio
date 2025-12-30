// Reemplaza con la URL de tu Web App desplegada
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx3lC3udxBMr4ae_2l_eatjK3NocfvCzDdAY2Q-Bmn_fb6snYdV5DtDL5sF5FSCtIuV/exec";
let currentUser = "";

async function login() {
  const u = username.value.trim();
  const p = password.value.trim();

  const r = await fetch(`${WEB_APP_URL}?func=loginUser&username=${u}&password=${p}`)
    .then(r => r.json());

  if (r.success) {
    currentUser = u;
    loginDiv.style.display = "none";
    appDiv.style.display = "block";
    loadTasks();
  } else {
    loginMsg.textContent = "Credenciales incorrectas";
  }
}

async function loadTasks() {
  render(await fetch(`${WEB_APP_URL}?func=getTasks&user=${currentUser}`).then(r=>r.json()));
}

async function addTask() {
  const t = taskInput.value.trim();
  if (!t) return;
  render(await fetch(`${WEB_APP_URL}?func=addTask&user=${currentUser}&text=${encodeURIComponent(t)}`).then(r=>r.json()));
  taskInput.value = "";
}

async function toggleTask(id) {
  render(await fetch(`${WEB_APP_URL}?func=toggleTask&user=${currentUser}&id=${id}`).then(r=>r.json()));
}

async function deleteTask(id) {
  render(await fetch(`${WEB_APP_URL}?func=deleteTask&user=${currentUser}&id=${id}`).then(r=>r.json()));
}

function render(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = t.completed ? "completed" : "";
    li.innerHTML = `
      <span>${t.text}</span>
      <div class="actions">
        <button class="complete-btn" onclick="toggleTask(${t.id})">✔</button>
        <button onclick="deleteTask(${t.id})">🗑</button>
      </div>`;
    taskList.appendChild(li);
  });
}
