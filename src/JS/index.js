import { Task } from "./task.js";
import { UI } from "./DOM.js";

//***** code of modal ***************** */

const closeModal = document.getElementById("close_modal");
const addTask = document.getElementById("add_task");
const modal = document.getElementById("modal");
const ModalContainer = document.querySelector(".modal-cantainer");

const openModal = () => {
  ModalContainer.classList.toggle("modal-visivility");
  modal.classList.toggle("modal-close");
};

const close_Modal = () => {
  let timeModalGo = 600;
  modal.classList.toggle("modal-close");
  setTimeout(() => {
    ModalContainer.classList.toggle("modal-visivility");
  }, timeModalGo);
};

addTask.addEventListener("click", openModal);
closeModal.addEventListener("click", close_Modal);

// DOM Events
document.getElementById("task-form").addEventListener("submit", function (e) {
  // Override the default Form behaviour
  e.preventDefault();

  // Getting Form Values
  const name = document.getElementById("name").value,
    status = document.getElementById("status").value,
    time = document.getElementById("time").value,
    description = document.getElementById("description").value;

  // Create a new Oject Product
  const task = new Task(name, status, time, description);
  // debugger;

  // Create a new UI instance
  const ui = new UI();

  // Input User Validation
  // if (name === "" || status === "" || time === "") {
  //   return ui.showMessage("Please Insert data in all fields", "danger");
  // }

  // Save Product
  ui.addTask(task);
  // ui.showMessage("task Added Successfully", "success");
  ui.resetForm();
});

document.getElementById("task-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteTask(e.target);
  e.preventDefault();
});
