// UI Constructor
export class DOM {
  // Add a new Product
  addTask(task) {
    const taskList = document.getElementById("task-list");
    const element = document.createElement("div");
    element.setAttribute("data-key", task.key);
    element.classList.add("task-list--wrap");
    if (task.status === false) {
      element.innerHTML = `
                  <div class="card-body">
                    <h4>task: <span>${task.name}</span></h4> 
                    <h4>time: <span>${task.time}  min.</span></h4>
                    <h4>Description: <span>${task.description}</span></h4>
                    <i class="fas fa-pen icons-task icon-edit" id="btn-edit"></i>
                    <i class="fas fa-check icons-task icon-check" id="btn-finish"></i>
                    <i class="fas fa-trash icons-task icon-delete" id="btn-delete"></i>
                    <span class="timer" id=timer-${task.key}>${task.time}</span>
                    <i class="fas fa-play btn-start__timer" id=${task.key}></i>
                  </div>
        `;
    } else {
      element.innerHTML = `
      <div class="card-body">
                    <h4>task: <span>${task.name}</span></h4> 
                    <h4>time: <span>${task.time}  min.</span></h4>
                    <h4>Description: <span>${task.description}</span></h4>
                    <i class="fas fa-pen icons-task icon-edit" id="btn-edit"></i>
                    <i style="color: #008000;" class="fas fa-check icons-task icon-check" id="btn-finish"></i>
                    <i class="fas fa-trash icons-task icon-delete" id="btn-delete"></i>
                    <span class="timer" id=timer-${task.key}>${task.time}</span>
                    <i class="fas fa-play btn-start__timer" id=${task.key}></i>
                  </div>
        `;
    }
    taskList.appendChild(element);
    console.log(task.status);
  }

  resetForm() {
    document.getElementById("task-form").reset();
  }

  deleteTask(element) {
    if (element.id === "btn-delete") {
      // debugger;

      // console.log(element.id);

      // debugger;
      element.parentElement.parentElement.remove();
      // this.showMessage("Task Deleted Succsssfully", "success");
      const key = element.parentElement.parentElement.getAttribute("data-key");
      var task_to_remove = firebase.database().ref("unfinished_task/" + key);
      task_to_remove.remove();
    }
  }

  startTimer(element, key, time) {
    // debugger;
    // console.log(element);
    // debugger;
    // const idTask =

    if (element.id === key) {
      // console.log(element);

      const btn = document.getElementById(key);
      // debugger;

      // debugger;
      // console.log(btn);

      let timeSecond = parseInt(time);
      let timetask = timeSecond * 60;
      const timeH = document.getElementById(`timer-${key}`);

      const start = () => {
        // console.log("click");

        displayTime(timetask);

        const countDown = setInterval(() => {
          timetask--;
          // debugger;
          displayTime(timetask);
          if (timetask == 0 || timetask < 1) {
            endCount();
            clearInterval(countDown);
          }
        }, 1000);

        function displayTime(second) {
          const hours = Math.floor(second / 3600);
          // debugger;
          const min = Math.floor((second / 60) % 60);
          // debugger;
          const sec = Math.floor(second % 60);
          // debugger;
          timeH.innerHTML = `
            ${hours < 10 ? "0" : ""}${hours}:${min < 10 ? "0" : ""}${min}:${
            sec < 10 ? "0" : ""
          }${sec}
  `;
          timeH.style.color = "black";
        }

        function endCount() {
          timeH.innerHTML = "Time out";
          timeH.style.color = "red";
        }
      };

      btn.addEventListener("click", start);
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    // Show in The DOM
    const container = document.querySelector(".card-container");
    const app = document.querySelector("#task-form");
    // Insert Message in the UI
    container.insertBefore(div, app);
    // Remove the Message after 3 seconds
    let timeMessageSucces = 3000;
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, timeMessageSucces);
  }

  load_tasks() {
    // const task_array = [];
    // firebase
    //   .database()
    //   .ref("unfinished_task")
    //   .once("value", function (snapshot) {
    //     snapshot.forEach(function (childSnapshot) {
    //       let childKey = childSnapshot.key;
    //       let childData = childSnapshot.val();
    //       task_array.push(Object.values(childData));
    //     });
    //     for (let i = 0; i < task_array.length; i++) {
    //       addTask(task_array[i]);
    //     }
    //   });
  }

  task_done(element) {
    if (element.id === "btn-finish") {
      // finished_task_container = document.getElementsByClassName("container")[1];
      // task.removeChild(task_tool);
      // finished_task_container.append(task);
      // console.log(element);
      const key = element.parentElement.parentElement.getAttribute("data-key");
      // console.log(element.parentElement.parentElement);
      var ref = firebase.database().ref("unfinished_task/" + key);
      ref.once("value").then(function (snapshot) {
        // var name = snapshot.child("name").val(); // {first:"Ada",last:"Lovelace"}
        // var firstName = snapshot.child("name/first").val(); // "Ada"
        var status = snapshot.child("status").val();
        var name = snapshot.child("name").val();
        var time = snapshot.child("time").val();
        var description = snapshot.child("description").val();
        console.log(status);
        if (status != true) {
          var task_obj = {
            name: name,
            description: description,
            key: key,
            time: time,
            status: true,
          };
          var updates = {};
          updates["/unfinished_task/" + key] = task_obj;
          firebase.database().ref().update(updates);
          element.style.color = "#008000";
        }
      });
    }
  }
}
