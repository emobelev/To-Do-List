const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

const tasksArchive = localStorage.getItem("oldTasks");
const completedArchive = localStorage.getItem("completedTasks");

const tasks = tasksArchive ? tasksArchive.split(",") : [];
const completedTasks = completedArchive ? completedArchive.split(",") : [];

function renderTasks() {
  taskList.innerHTML = "";

  const incomplete = tasks.filter((task) => !completedTasks.includes(task));
  const complete = tasks.filter((task) => completedTasks.includes(task));
  const orderedTasks = [...incomplete, ...complete];

  orderedTasks.forEach((task, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = completedTasks.includes(task);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        completedTasks.push(task);
        span.classList.add("completed");
      } else {
        const taskIndex = completedTasks.indexOf(task);
        if (taskIndex > -1) {
          completedTasks.splice(taskIndex, 1);
        }
        span.classList.remove("completed");
      }
      localStorage.setItem("completedTasks", completedTasks.join(","));
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    span.appendChild(document.createTextNode(task));

    if (completedTasks.includes(task)) {
      span.classList.add("completed");
    }
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "💩";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", () => {
      const originalIndex = tasks.indexOf(task);
      tasks.splice(originalIndex, 1);
      const completedIndex = completedTasks.indexOf(task);
      if (completedIndex > -1) {
        completedTasks.splice(completedIndex, 1);
      }
      localStorage.setItem("oldTasks", tasks.join(","));
      localStorage.setItem("completedTasks", completedTasks.join(","));
      renderTasks();
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

renderTasks();

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task && !tasks.includes(task)) {
    tasks.unshift(task);
    localStorage.setItem("oldTasks", tasks.join(","));
    taskInput.value = "";
    renderTasks();
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskButton.click();
  }
});

window.onload = () => {
  taskInput.focus();
};
