const addTask = document.querySelector(".add-task");
const modal = document.querySelector(".modal");
const input = document.querySelector(".input-task");
const addButton = document.querySelector(".add");
const tasksWrapper = document.querySelector(".tasks-wrapper");

addTask.addEventListener("click", () => {
  modal.style.display = "flex";
});

addButton.addEventListener("click", () => {
  modal.style.display = "none";
  if (input.value !== "") {
    if (addButton.innerHTML === "ADD") {
      fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify({
          text: input.value,
          check: false,
        }),
      });
    } else {
      fetch(`http://localhost:3000/tasks/${modal.getAttribute("taskId")}`, {
        method: "PUT",
        body: JSON.stringify({
          text: input.value,
          check: JSON.parse(modal.getAttribute("check")),
        }),
      });
    }
  }
  input.value = "";
});

const createTask = (description, id, check) => {
  modal.setAttribute("check", check);
  const task = document.createElement("div");
  task.classList.add("task");
  const textWrapper = document.createElement("div");
  textWrapper.classList.add("text-wrapper");
  const p = document.createElement("p");
  p.innerHTML = description;
  const btnWrapper = document.createElement("div");
  btnWrapper.classList.add("btn-wrapper");
  const checkBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  editBtn.innerHTML = "🖊️";
  deleteBtn.innerHTML = "🗑️";

  if (check === false) {
    checkBtn.innerHTML = "✔️";
    p.style.textDecorationLine = "inherit";
  } else {
    checkBtn.innerHTML = "🚫";
    p.style.textDecorationLine = "line-through";
  }

  deleteBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });
  });

  editBtn.addEventListener("click", () => {
    modal.setAttribute("taskId", id);
    modal.style.display = "flex";
    input.value = description;
    addButton.innerHTML = "UPDATE";
  });

  checkBtn.addEventListener("click", () => {
    if (check === false) {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          text: description,
          check: true,
        }),
      });
    } else if (check === true) {
      fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          text: description,
          check: false,
        }),
      });
    }
  });

  textWrapper.appendChild(p);
  btnWrapper.appendChild(checkBtn);
  btnWrapper.appendChild(editBtn);
  btnWrapper.appendChild(deleteBtn);
  task.appendChild(textWrapper);
  task.appendChild(btnWrapper);
  tasksWrapper.appendChild(task);
};

const showTasks = () => {
  fetch("http://localhost:3000/tasks")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        createTask(data[i].text, data[i].id, data[i].check);
      }
    })
    .catch((error) => {
      console.log("Ceva nu e bine");
    });
};

showTasks();
