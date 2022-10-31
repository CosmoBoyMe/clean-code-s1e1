const taskInput = document.querySelector(".add-task__input");
const addButton = document.querySelector(".add-task__button");

const todoElement = document.querySelector(".todo");
const todoListElement = todoElement.querySelector(".task-list__items");
const completedElement = document.querySelector(".completed");
const completedListElement = completedElement.querySelector(".task-list__items");

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");
  listItem.classList.add("task-list__item");

  const checkBox = document.createElement("input");
  checkBox.classList.add("task-list__checkbox");

  const span = document.createElement("span");
  span.classList.add("task-list__task-text");

  const editInput = document.createElement("input");
  editInput.classList.add("task-list__task-text-input");

  const editButton = document.createElement("button");
  editButton.classList.add("task-list__button-edit");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("task-list__button-delete");

  const deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("task-list__button-icon");

  span.innerText = taskString;

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.value = taskString;

  editButton.innerText = "Edit";

  deleteButtonImg.src = "./remove.svg";
  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox, span, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoListElement.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector(".task-list__task-text-input");
  const span = listItem.querySelector(".task-list__task-text");
  const editBtn = listItem.querySelector(".task-list__button-edit");
  const containsClass = listItem.classList.contains(
    "task-list__item_mode_edit"
  );
  if (containsClass) {
    span.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = span.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task-list__item_mode_edit");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  completedListElement.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  todoListElement.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector(".task-list__checkbox");
  const editButton = taskListItem.querySelector(".task-list__button-edit");
  const deleteButton = taskListItem.querySelector(".task-list__button-delete");

  checkBox.onchange = checkBoxEventHandler;
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
};

[...todoListElement.children].forEach((item) => {
  bindTaskEvents(item, taskCompleted);
});

[...completedListElement.children].forEach((item) => {
  bindTaskEvents(item, taskIncomplete);
});