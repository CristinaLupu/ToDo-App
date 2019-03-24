//*local storage
//*verific daca e ceva in local storage, daca e nu e nimic, creez un array gol cu todo urile
const toDosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

const input = document.querySelector("#type-task");

//*construiesc todo urile/taskurile
function addToDo(toDo) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  const paragraph = document.createElement("p");
  const deleteBtn = document.createElement("img");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.setAttribute("src", "/assets/error.png");

  const checkedBox = document.createElement("div");
  checkedBox.classList.add("checked-box");

  //*daca obiectul meu todo e creat , initial nu e bifat,deci completed e fals
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
//*evenimentul de enter care imi creeaza todo urile pe interfata
input.addEventListener("keydown", function(event) {
  if (event.key.toLowerCase() == "enter") {
    if (this.value === "") {
      return;
    }
    //*aici creez obiectul todo cu valoarea din input si bifa(true sau false),initial e false
    const toDo = {
      label: this.value,
      completed: false
    };
    //*fac push la todo uri in local storage
    toDosArray.push(toDo);

    //*toate todo urile din local storage le convertesc in stringuri
    localStorage.setItem("todos", JSON.stringify(toDosArray));
    //*apelez functia care imi creaza todo urile de obiectul toDo
    addToDo(toDo);
    this.value = null;
  }
});
//*parcurg array ul din local storage si adaug pe interfata todo urile
toDosArray.forEach(todo => {
  addToDo(todo);
});
//*evenimentul de click pentru butonul de delete si pentru checked box
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
