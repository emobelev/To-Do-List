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
    li.className =
      "grid grid-cols-[auto_1fr_auto] gap-1.5 items-center border-b border-gray-100 dark:border-stone-900/20 p-2.5 bg-white dark:bg-stone-900/50 last-of-type:border-none even:bg-gray-100 dark:even:bg-stone-900/20";
    const span = document.createElement("span");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = `checkbox-${index}`;
    checkbox.className = "task-checkbox mr-1.5 ";
    checkbox.checked = completedTasks.includes(task);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        completedTasks.push(task);
        span.classList.add("line-through", "text-gray-500");
      } else {
        const taskIndex = completedTasks.indexOf(task);
        if (taskIndex > -1) {
          completedTasks.splice(taskIndex, 1);
        }
        span.classList.remove("line-through", "text-gray-500");
      }
      localStorage.setItem("completedTasks", completedTasks.join(","));
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    span.appendChild(document.createTextNode(task));

    if (completedTasks.includes(task)) {
      span.classList.add("line-through", "text-gray-500");
    }
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 hover: cursor-pointer stroke-stone-950 dark:stroke-white" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192M192 320l128-128"/></svg>';
    deleteButton.className = "delete-button flex";

    deleteButton.addEventListener("click", () => {
      if (confirm(`Are you sure you want to delete the task:\n "${task}"?`)) {
        const originalIndex = tasks.indexOf(task);
        tasks.splice(originalIndex, 1);
        const completedIndex = completedTasks.indexOf(task);
        if (completedIndex > -1) {
          completedTasks.splice(completedIndex, 1);
        }
        localStorage.setItem("oldTasks", tasks.join(","));
        localStorage.setItem("completedTasks", completedTasks.join(","));
        renderTasks();
      }
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

renderTasks();

addTaskButton.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (!task) return;
  if (tasks.includes(task)) {
    alert("Task is already in the list!");
    return;
  }
  tasks.unshift(task);
  localStorage.setItem("oldTasks", tasks.join(","));
  taskInput.value = "";
  renderTasks();
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskButton.click();
  }
});

window.onload = () => {
  taskInput.focus();
};
