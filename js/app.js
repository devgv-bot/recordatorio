// Reemplaza con la URL de tu Web App desplegada
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbw0uq9WcrZyaY1jzLh1wOksKxG2f5UTAi6mgLwDXKPfhbvDLQqA0SuUJiLHCPy5W__1/exec";

let currentUser = "";

// LOGIN
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const url = `${WEB_APP_URL}?func=loginUser&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

  try {
    const response = await fetch(url);
    const result = await response.json();

    if(result.success){
      currentUser = username;
      document.getElementById("userLabel").textContent = result.nombre;
      document.getElementById("loginDiv").style.display = "none";
      document.getElementById("appDiv").style.display = "block";
      loadTasks();
    } else {
      document.getElementById("loginMsg").textContent = "Usuario o contraseña incorrectos";
    }
  } catch(err) {
    console.error(err);
    alert("Error al conectarse al servidor");
  }
}

// CARGAR TAREAS
async function loadTasks() {
  const url = `${WEB_APP_URL}?func=getTasksForUser&username=${encodeURIComponent(currentUser)}`;
  const response = await fetch(url);
  const tasks = await response.json();
  renderTasks(tasks);
}

// AGREGAR TAREA
async function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  if(!text) return alert("Ingrese una tarea");

  const url = `${WEB_APP_URL}?func=addTaskForUser&taskText=${encodeURIComponent(text)}&username=${encodeURIComponent(currentUser)}`;
  const response = await fetch(url);
  const tasks = await response.json();
  renderTasks(tasks);
  document.getElementById("taskInput").value = "";
}

// TOGGLE COMPLETADO
async function toggleTask(id) {
  const url = `${WEB_APP_URL}?func=toggleTaskForUser&taskId=${id}&username=${encodeURIComponent(currentUser)}`;
  const response = await fetch(url);
  const tasks = await response.json();
  renderTasks(tasks);
}

// ELIMINAR TAREA
async function deleteTask(id) {
  const url = `${WEB_APP_URL}?func=deleteTaskForUser&taskId=${id}&username=${encodeURIComponent(currentUser)}`;
  const response = await fetch(url);
  const tasks = await response.json();
  renderTasks(tasks);
}

// RENDERIZAR
function renderTasks(tasks){
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach(task=>{
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="complete-btn" onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}
