//*local storage
const toDosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const input = document.querySelector("#type-task");

function addToDo(toDo) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  const paragraph = document.createElement("p");
  const deleteBtn = document.createElement("img");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("src", "/assets/error.png");

  const checkedBox = document.createElement("div");
  checkedBox.classList.add("checked-box");

  if (toDo.completed) {
    const checkedSign = document.createElement("img");
    checkedSign.classList.add("checked-sign");
    checkedSign.setAttribute("src", "/assets/checked.png");
    checkedBox.append(checkedSign);
  }

  paragraph.innerHTML = toDo.label;

  taskDiv.append(paragraph);
  taskDiv.append(deleteBtn);

  taskDiv.append(checkedBox);
  document.querySelector("#todo-container").append(taskDiv);
}

input.addEventListener("keydown", function(event) {
  if (event.key.toLowerCase() == "enter") {
    const toDo = {
      label: this.value,
      completed: false
    };
    toDosArray.push(toDo);

    localStorage.setItem("todos", JSON.stringify(toDosArray));
    addToDo(toDo);
    this.value = null;
  }
});

toDosArray.forEach(todo => {
  addToDo(todo);
});

document.addEventListener("click", function(event) {
  if (event.target && event.target.classList.contains("delete-btn")) {
    const todosHtml = event.target.parentElement.parentElement.children;
    const nodes = Array.prototype.slice.call(todosHtml);
    const indexTask = nodes.indexOf(event.target.parentElement);
    event.target.parentElement.remove();

    toDosArray.splice(indexTask, 1);
    localStorage.setItem("todos", JSON.stringify(toDosArray));
  }

  if (event.target && event.target.classList.contains("checked-box")) {
    const checkedBox = event.target;
    const checkedSign = document.createElement("img");
    checkedSign.classList.add("checked-sign");
    checkedSign.setAttribute("src", "/assets/checked.png");
    checkedBox.append(checkedSign);

    const todosHtml = event.target.parentElement.parentElement.children;
    const nodes = Array.prototype.slice.call(todosHtml);
    const indexTask = nodes.indexOf(event.target.parentElement);
    toDosArray[indexTask].completed = true;
    localStorage.setItem("todos", JSON.stringify(toDosArray));
  }
  if (event.target && event.target.classList.contains("checked-sign")) {
    const todosHtml =
      event.target.parentElement.parentElement.parentElement.children;
    const nodes = Array.prototype.slice.call(todosHtml);
    const indexTask = nodes.indexOf(event.target.parentElement.parentElement);
    toDosArray[indexTask].completed = false;
    localStorage.setItem("todos", JSON.stringify(toDosArray));
    event.target.remove();
  }
});
