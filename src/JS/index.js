import { Task } from "./task.js";
import { UI } from "./DOM.js";

//***** firebase configuration code ***************** */
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBz535g3lAKXWFX_Yj_Y5bbkQtjzuqcdn4",
    authDomain: "todo-platzimaster.firebaseapp.com",
    projectId: "todo-platzimaster",
    storageBucket: "todo-platzimaster.appspot.com",
    messagingSenderId: "229804248567",
    appId: "1:229804248567:web:9d033d0f00398511d472f2"
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
    const ui = new UI();
    ui.resetForm();
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
        const ui = new UI();
        ui.resetForm();
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
document.getElementById("task-form").addEventListener("submit", function(e) {
    // Override the default Form behaviour
    e.preventDefault();

    // Getting Form Values
    const name = document.getElementById("name").value,
        status = document.getElementById("status").value,
        time = document.getElementById("time").value,
        description = document.getElementById("description").value;



    // Create a new UI instance
    const ui = new UI();

    // Input User Validation
    if (name === "" || status === "" || time === "" || description === "") {
        return ui.showMessage("Please Insert data in all fields", "danger");
    }

    // Save Task

    var key = firebase.database().ref().child("unfinished_task").push().key;
    var updates = {};
    // Create a new Oject Task
    const task = new Task(key, name, status, time, description);
    updates["/unfinished_task/" + key] = task;
    firebase.database().ref().update(updates);

    ui.addTask(task);
    ui.showMessage("task Added Successfully", "success");
    ui.resetForm();
});

document.getElementById("task-list").addEventListener("click", (e) => {
    const ui = new UI();
    console.log(e);
    ui.deleteTask(e.target);
    const key = e.target.parentElement.parentElement.getAttribute("data-key");
    var task_to_remove = firebase.database().ref("unfinished_task/" + key);
    task_to_remove.remove();

    e.preventDefault();
});


//*************************** Drag and Drop  */

const listTask = document.getElementById("task-list");

console.log(listTask);

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