// UI Constructor
export class UI {
    // Add a new Product
    addTask(task) {
        const taskList = document.getElementById("task-list");
        const element = document.createElement("div");
        element.setAttribute("data-key", task.key);
        element.classList.add("task-list--wrap");
        // element.setAttribute("data-id", `1`);
        element.innerHTML = `
                  <div class="card-body">
                    <h4>task: <span>${task.name}</span></h4> 
                    <h4>status: <span>${task.status}</span></h4> 
                    <h4>time: <span>${task.time}</span></h4>
                    <h4>Description: <span>${task.description}</span></h4>
                    <button type="button" class="btn__delete-task" name="delete">Delete</button>
                  </div>
        `;
        taskList.appendChild(element);
    }

    resetForm() {
        document.getElementById("task-form").reset();
    }

    deleteTask(element) {
        if (element.name === "delete") {
            element.parentElement.parentElement.remove();
            // this.showMessage("Task Deleted Succsssfully", "success");
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
        setTimeout(function() {
            document.querySelector(".alert").remove();
        }, timeMessageSucces);
    }

    // load_tasks() {
    //     // task_container = document.getElementById("task-list")[0];
    //     // task_container.innerHTML = "";
    //     const ui = new UI();

    //     var task_array = [];
    //     firebase.database().ref("unfinished_task").once('value', function(snapshot) {
    //         snapshot.forEach(function(childSnapshot) {
    //             var childKey = childSnapshot.key;
    //             var childData = childSnapshot.val();
    //             task_array.push(Object.values(childData));
    //         });
    //         for (var i, i = 0; i < task_array.length; i++) {
    //             var taskf_from_array = task_array[i][1]
    //             ui.addTask(taskf_from_array);
    //         }
    //     });
    // }
}