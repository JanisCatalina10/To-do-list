const taskList = document.getElementById("tareas");
const taskForm = document.getElementById("form");
const taskInput = document.getElementById("input");
const label = document.getElementById("label");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");

let tasks = [
  { id: 5, description: "Ir al supermercado", check: false },
  { id: 10, description: "Estudiar para la prueba", check: false },
  { id: 15, description: "Pasear a Shippo", check: false },
];

let editingTaskId = null;

document.addEventListener("DOMContentLoaded", () => {
  initialTasks();
  countTasks();
});

//LIMPIA EL MENSAJE DE ERROR AL ESCRIBIR
taskInput.addEventListener("input", () => {
  if (!editingTaskId) {
    label.innerHTML = "";
  } else {
    label.innerHTML = "Editando tarea...";
  }
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTaskDescription = taskInput.value.trim();
  //VERIFICA SI LA TAREA ESTA DUPLICADA
  if (isDuplicateTask(newTaskDescription)) {
    label.innerHTML = "Esta tarea ya existe.";
    label.style.color = "red";
    label.style.fontSize = "1rem";
    return;
  }
  if (newTaskDescription) {
    if (editingTaskId) {
      //ACTUALIZA LA TAREA EXISTENTE
      const taskIndex = tasks.findIndex((t) => t.id === editingTaskId);
      tasks[taskIndex].description = newTaskDescription;
      editingTaskId = null;
      taskInput.style.border = "";
      label.innerHTML = "";
    } else {
      //CREA UNA NUEVA TAREA
      const newTask = {
        id: Date.now(),
        description: newTaskDescription,
        check: false,
      };
      tasks.push(newTask);
    }
    initialTasks();
    countTasks();
    label.innerHTML = "";
  }
  taskForm.reset();
});

//INICIALIZA TAREAS
const initialTasks = () => {
  let template = "";
  for (const task of tasks) {
    template += createElements(task);
  }
  taskList.innerHTML = template;
};

//CREA ELEMENTOS
function createElements(task) {
  return `
    <div style="background-color: ${task.checked ? "#77dd77" : "#f0f0f0"}">
        <div class="edit-description">
            <span class="edit-id"><strong> ${task.id}</strong></span>
            <p>${task.description}</p>
            <h3>
                <i class="fa-solid fa-square-check" role="button" onclick="checkedTask(${
                  task.id
                })"
                style="color: #77dd77;"></i>
                <i class="fa-solid fa-pencil-alt" role="button" onclick="editTask(${
                  task.id
                })"
                style="color: #191970;"></i>
                <i class="fa-solid fa-square-xmark" role="button" onclick="deleteTask(${
                  task.id
                })"
                style="color: #dc143c;"></i>
            </h3>
        </div>
    </div>`;
}

//MARCAR TAREAS COMPLETADAS
function checkedTask(id) {
  const indexTask = tasks.findIndex((task) => task.id == id);
  tasks[indexTask].checked = tasks[indexTask].checked ? false : true;
  initialTasks();
  countTasks();
}

//BORRAR TAREAS
function deleteTask(id) {
  const confirmDelete = confirm(
    "¿Estás seguro que deseas eliminar esta tarea?"
  );
  if (confirmDelete) {
    const indexTask = tasks.findIndex((task) => task.id == id);
    tasks.splice(indexTask, 1);
    initialTasks();
    countTasks();
  }
}

//CONTAR TAREAS
function countTasks() {
  totalTasks.innerHTML = `Total: ${tasks.length}`;
  const totalTasksChecked = tasks.filter((task) => task.checked == true);
  completedTasks.innerHTML = `Realizadas: ${totalTasksChecked.length}`;
}

//FUNCION PARA EDITAR TAREAS
function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  taskInput.value = task.description;
  editingTaskId = id;
  label.innerHTML = "Editando tarea...";
  taskInput.style.border = "2px solid orange";
}

//FUNCION PARA TAREA DUPLICADA
function isDuplicateTask(description) {
  return tasks.some(
    (task) => task.description.toLowerCase() === description.toLowerCase()
  );
}
