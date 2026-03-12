let tasks = [];

function addTask(){

    let name = document.getElementById("taskName").value;
    let priority = document.getElementById("priority").value;

    if(name === ""){
        alert("Please enter task name");
        return;
    }

    let task = {
        name: name,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    document.getElementById("taskName").value = "";

    displayTasks(tasks);
}

function displayTasks(list){

    let ul = document.getElementById("taskList");
    ul.innerHTML = "";

    list.forEach((task,index)=>{

        let li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML =
        task.name + " (" + task.priority + ") " +
        "<button onclick='completeTask("+index+")'>✓</button>" +
        "<button onclick='deleteTask("+index+")'>Delete</button>";

        ul.appendChild(li);

    });
}

function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    displayTasks(tasks);
}

function deleteTask(index){

    tasks.splice(index,1);

    displayTasks(tasks);
}

function filterTasks(type){

    if(type === "all"){
        displayTasks(tasks);
    }

    if(type === "completed"){
        let completed = tasks.filter(task => task.completed);
        displayTasks(completed);
    }

    if(type === "pending"){
        let pending = tasks.filter(task => !task.completed);
        displayTasks(pending);
    }

}