// UI Constructor
export class DOM {
    // Add a new Product
    addTask(task) {
        const taskList = document.getElementById("task-list");
        const element = document.createElement("div");
        element.setAttribute("data-key", task.key);
        element.classList.add("task-list--wrap");
        // element.setAttribute("data-id", `1`);
        if (task.status === false) {
            element.innerHTML = `
                  <div class="card-body">
                    <h4>task: <span>${task.name}</span></h4> 
                    <h4>time: <span>${task.time}</span></h4>
                    <h4>Description: <span>${task.description}</span></h4>
                    <i class="fas fa-pen icons-task icon-edit" id="btn-edit"></i>
                    <i class="fas fa-check icons-task icon-check" id="btn-finish"></i>
                    <i class="fas fa-trash icons-task icon-delete" id="btn-delete"></i>
                  </div>
        `;
        } else {
            element.innerHTML = `
                  <div class="card-body">
                    <h4>task: <span>${task.name}</span></h4> 
                    <h4>time: <span>${task.time}</span></h4>
                    <h4>Description: <span>${task.description}</span></h4>
                    <i class="fas fa-pen icons-task icon-edit" id="btn-edit"></i>
                    <i style="color: #008000;" class="fas fa-check icons-task icon-check" id="btn-finish"></i>
                    <i class="fas fa-trash icons-task icon-delete" id="btn-delete"></i>
                  </div>
        `;
        }

        taskList.appendChild(element);
    }

    // llamado = (element) => {
    //     console.log(element);
    //     firebase.database().ref('unfinished_task').on('value', (snap) => {
    //         const taskFalse = [];
    //         const taskTrue = [];
    //         let obj = snap.val();
    //         for (const prop in obj) {
    //             if (obj[prop]["status"] === false) {
    //                 taskFalse.push(obj);
    //             } else {
    //                 taskTrue.push(obj);
    //             }
    //         }
    //         let fals = taskArrayToNumber(taskFalse);
    //         let trues = taskArrayToNumber(taskTrue);
    //         return fals;
    //     });
    // }

    resetForm() {
        document.getElementById("task-form").reset();
    }

    deleteTask(element) {
        if (element.id === "btn-delete") {
            // console.log(element.id);

            // debugger;
            element.parentElement.parentElement.remove();
            // this.showMessage("Task Deleted Succsssfully", "success");
            const key = element.parentElement.parentElement.getAttribute("data-key");
            var task_to_remove = firebase.database().ref("unfinished_task/" + key);
            task_to_remove.remove();
        }
    }

    task_done(element) {
        if (element.id === "btn-finish") {
            // finished_task_container = document.getElementsByClassName("container")[1];
            // task.removeChild(task_tool);
            // finished_task_container.append(task);
            console.log(element);
            const key = element.parentElement.parentElement.getAttribute("data-key");
            // console.log(element.parentElement.parentElement);
            var ref = firebase.database().ref("unfinished_task/" + key);
            ref.once("value")
                .then(function(snapshot) {
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
                        element.style.color = "#008000"
                    }
                    // var age = snapshot.child("age").val(); // null
                });
            // var task_to_finish = firebase.database().ref('unfinished_task/')
            // console.log(task_to_finish);
            // var task_obj = {
            //     title: task.childNodes[0].childNodes[0].innerHTML,
            //     description: task.childNodes[0].childNodes[1].innerHTML,
            //     key: key
            // };

            // var updates = {};
            // updates["/finished_task/" + key] = task_obj;
            // firebase.database().ref().update(updates);

            // delete our task from unfinished
            // task_delete(task);
            // create_finished_task();
        }

    }

    load_tasks() {
        const task_array = [];
        firebase.database().ref("unfinished_task").once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val();
                task_array.push(Object.values(childData));
            });
            for (let i = 0; i < task_array.length; i++) {
                addTask(task_array[i]);
            }
        });
    }





}