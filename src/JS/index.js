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

  // console.log(e.target);

  // const key = e.target.parentElement.parentElement.getAttribute("data-key");
  // var task_to_remove = firebase.database().ref("unfinished_task/" + key);
  // task_to_remove.remove();

  // e.preventDefault();
});
document.getElementById("task-list").addEventListener("click", (e) => {
  const taskTime = document.getElementById(`timer-${e.target.id}`);
  // console.log(taskTime.innerHTML, "que es el time");

  const dom = new DOM();
  dom.startTimer(e.target, e.target.id, taskTime.innerHTML);
  // debugger;
  console.log(e, "busco id");
  console.log(e.target.value, "busco que es");

  // e.preventDefault();
});

// //*************************** Drag and Drop  */

// const listTask = document.getElementById("task-list");

// // console.log(listTask);

// Sortable.create(listTask, {
//   animation: 150,
//   chosenClass: "taskSelect",
//   ghostClass: "fantasma",
//   dragClass: "drag",

//   // onEnd: () => {
//   //   console.log("se cambio el orden");
//   // },

//   group: "listask",
//   store: {
//     set: (sortable) => {
//       const orden = sortable.toArray();
//       // console.log(orden);
//       localStorage.setItem(sortable.options.group.name, orden.join("|"));
//     },

//     get: (sortable) => {
//       const orden = localStorage.getItem(sortable.options.group.name);
//       return orden ? orden.split("|") : [];
//     },
//   },
// });

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

// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Tasks"],
//         datasets: []
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// });

// const addData = (chart, label, data) => {
//     // chart.config.data.datasets.forEach(function(dataset, i) {
//     //     dataset.data.push({
//     //         x: label,
//     //         y: data
//     //     });
//     // });
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset, i) => {
//         dataset.data[0] = (data[0]);
//     });
//     chart.update();
// }

// const removeData = (chart) => {
//     // chart.data.labels.pop();
//     // chart.data.labels.pop();
//     // chart.data.datasets.forEach((dataset) => {
//     //     dataset.data.pop();
//     // });
//     chart.config.data.datasets.forEach(function(dataset) {
//         dataset.data.pop();
//         chart.update();
//     });

// }

// var chartColors = {
//     red: 'rgb(255, 99, 132)',
//     orange: 'rgb(255, 159, 64)',
//     yellow: 'rgb(255, 205, 86)',
//     green: 'rgb(75, 192, 192)',
//     blue: 'rgb(54, 162, 235)',
//     purple: 'rgb(153, 102, 255)',
//     grey: 'rgb(201, 203, 207)'
// };
// var color = Chart.helpers.color;
// var colorNames = Object.keys(chartColors);
// const onRefresh = (chart, data, ver) => {
//     var newColor = chartColors['orange'];
//     var newDataset = {
//         label: 'Dataset ' + (ver),
//         backgroundColor: newColor,
//         borderColor: chartColors['yellow'],
//         borderWidth: 1,
//         data: data
//     };

//     chart.config.data.datasets.push(newDataset);
//     chart.update();
// };
// let total = 0;
// firebase.database().ref('unfinished_task').on('value', (snap) => {
//     const taskFalse = [];
//     const taskTrue = [];
//     let obj = snap.val();
//     for (const prop in obj) {
//         if (obj[prop]["status"] === "false") {
//             taskFalse.push(obj);
//         } else {
//             taskTrue.push(obj);
//         }
//     }
//     let fals = taskArrayToNumber(taskFalse);
//     let trues = taskArrayToNumber(taskTrue);
// });
var database = firebase.database();
var starCountRef = firebase.database().ref("unfinished_task/");
starCountRef.on("value", (snapshot) => {
  const data = snapshot.val();
  console.log(data, "datos");
});
database
  .ref("unfinished_task")
  .get()
  .then(function (snapshot) {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch(function (error) {
    console.error(error);
  });
const taskArrayToNumber = (taskArray) => {
  return taskArray.length;
};

const tasksCanvas = document.getElementById("myChart");

var pendingTasksData = {
  label: "Pending tasks",
  data: [0],
  backgroundColor: "rgba(0, 99, 132, 0.6)",
  borderWidth: 0,
};

var doneTasksData = {
  label: "Done tasks",
  data: [0],
  backgroundColor: "rgba(99, 132, 0, 0.6)",
  borderWidth: 0,
};

var tasksData = {
  labels: ["Tasks"],
  datasets: [pendingTasksData, doneTasksData],
};

var chartOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

var barChart = new Chart(tasksCanvas, {
  type: "bar",
  data: tasksData,
  options: chartOptions,
});

//********************************************* Code Timer */

// const btn = document.querySelector(".btn-start__timer");
// console.log(btn);

// let timeSecond = 2400;
// const timeH = document.querySelector("span");

// const start = () => {
//   console.log("click");

//   displayTime(timeSecond);

//   const countDown = setInterval(() => {
//     timeSecond--;
//     displayTime(timeSecond);
//     if (timeSecond == 0 || timeSecond < 1) {
//       endCount();
//       clearInterval(countDown);
//     }
//   }, 1000);

//   function displayTime(second) {
//     const min = Math.floor(second / 60);
//     const sec = Math.floor(second % 60);
//     timeH.innerHTML = `
//   ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
//   `;
//   }

//   function endCount() {
//     timeH.innerHTML = "Time out";
//   }
// };

// btn.addEventListener("click", start);
