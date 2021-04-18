import { Task } from "./task.js";
import { DOM } from "./DOM.js";

//***** firebase configuration code ***************** */
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz535g3lAKXWFX_Yj_Y5bbkQtjzuqcdn4",
  authDomain: "todo-platzimaster.firebaseapp.com",
  projectId: "todo-platzimaster",
  storageBucket: "todo-platzimaster.appspot.com",
  messagingSenderId: "229804248567",
  appId: "1:229804248567:web:9d033d0f00398511d472f2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//***** code of modal task ***************** */

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
  const dom = new DOM();
  dom.resetForm();
};

addTask.addEventListener("click", openModal);
closeModal.addEventListener("click", close_Modal);

window.addEventListener("click", (e) => {
  if (e.target == ModalContainer) {
    let timeModalGo = 600;
    modal.classList.toggle("modal-close");
    setTimeout(() => {
      ModalContainer.classList.toggle("modal-visivility");
    }, timeModalGo);
    const dom = new DOM();
    dom.resetForm();
  }
});

// ************************** Modal Statistics
//Variables of the statistic
const statistic = document.getElementById("btn_statistics");
const modalStatistic = document.querySelector(".modal-cantainer__statistics");
const statisticsModal = document.querySelector(".modal-statistics");
const btnCloseStatistic = document.getElementById("close_modal_statistics");

const openStatistics = () => {
  modalStatistic.classList.toggle("modal-visivility__statistics");
  statisticsModal.classList.toggle("modal-statistics__close");
};

const closeStatistics = () => {
  let timeModalGo = 600;
  statisticsModal.classList.toggle("modal-statistics__close");
  setTimeout(() => {
    modalStatistic.classList.toggle("modal-visivility__statistics");
  }, timeModalGo);
};

statistic.addEventListener("click", openStatistics);
btnCloseStatistic.addEventListener("click", closeStatistics);

window.addEventListener("click", (e) => {
  if (e.target == modalStatistic) {
    let timeModalGo = 600;
    statisticsModal.classList.toggle("modal-statistics__close");
    setTimeout(() => {
      modalStatistic.classList.toggle("modal-visivility__statistics");
    }, timeModalGo);
  }
});

//************************** Code of Tasks */

// DOM Events
document.getElementById("task-form").addEventListener("submit", function (e) {
  // Override the default Form behaviour

  // Getting Form Values
  const name = document.getElementById("name").value,
    // status = document.getElementById("status").value,
    status = false,
    time = document.getElementById("time").value,
    description = document.getElementById("description").value;

  // Create a new DOM instance
  const dom = new DOM();

  // Input User Validation
  if (name === "" || status === "" || time === "" || description === "") {
    e.preventDefault();
    return dom.showMessage("Please Insert data in all fields", "danger");
  }
  // Save Task

  let key = firebase.database().ref().child("unfinished_task").push().key;
  let updates = {};
  // Create a new Oject Task
  const task = new Task(key, name, status, time, description);
  updates["/unfinished_task/" + key] = task;
  firebase.database().ref().update(updates);

  dom.addTask(task);
  dom.showMessage("task Added Successfully", "success");
  dom.resetForm();
});

document.getElementById("task-list").addEventListener("click", (e) => {
  const dom = new DOM();
  dom.deleteTask(e.target);
  console.log(e.target);

  // const key = e.target.parentElement.parentElement.getAttribute("data-key");
  // var task_to_remove = firebase.database().ref("unfinished_task/" + key);
  // task_to_remove.remove();

  // e.preventDefault();
});

//*************************** Drag and Drop  */

const listTask = document.getElementById("task-list");

// console.log(listTask);

Sortable.create(listTask, {
  animation: 150,
  chosenClass: "taskSelect",
  ghostClass: "fantasma",
  dragClass: "drag",

  // onEnd: () => {
  //   console.log("se cambio el orden");
  // },

  group: "listask",
  store: {
    set: (sortable) => {
      const orden = sortable.toArray();
      // console.log(orden);
      localStorage.setItem(sortable.options.group.name, orden.join("|"));
    },

    get: (sortable) => {
      const orden = localStorage.getItem(sortable.options.group.name);
      return orden ? orden.split("|") : [];
    },
  },
});

function load_tasks() {
  // task_container = document.getElementById("task-list")[0];
  // task_container.innerHTML = "";
  const dom = new DOM();

  const task_array = [];
  firebase
    .database()
    .ref("unfinished_task")
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        task_array.push(Object.values(childData));
      });
      for (let i = 0; i < task_array.length; i++) {
        let task = new Task(
          task_array[i][1],
          task_array[i][2],
          task_array[i][3],
          task_array[i][4],
          task_array[i][0]
        );
        dom.addTask(task);
      }
    });
}

load_tasks();
