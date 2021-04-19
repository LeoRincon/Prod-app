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

    task_done(task, task_tool) {
        // finished_task_container = document.getElementsByClassName("container")[1];
        // task.removeChild(task_tool);
        // finished_task_container.append(task);

        var key = task.getAttribute("data-key");
        var task_obj = {
            title: task.childNodes[0].childNodes[0].innerHTML,
            date: task.childNodes[0].childNodes[1].innerHTML,
            key: key
        };

        var updates = {};
        updates["/finished_task/" + key] = task_obj;
        firebase.database().ref().update(updates);

        // delete our task from unfinished
        // task_delete(task);
        // create_finished_task();
    }

}