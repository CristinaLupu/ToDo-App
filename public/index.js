//*local storage
const toDosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const input = document.querySelector("#type-task");

function addToDo(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  const paragraph = document.createElement("p");
  const deleteBtn = document.createElement("img");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("src", "/assets/error.png");

  paragraph.innerHTML = task;

  taskDiv.append(paragraph);
  taskDiv.append(deleteBtn);
  document.querySelector("#todo-container").append(taskDiv);
}

input.addEventListener("keydown", function(event) {
  if (event.key.toLowerCase() == "enter") {
    toDosArray.push(this.value);
    localStorage.setItem("todos", JSON.stringify(toDosArray));
    addToDo(this.value);
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
});
