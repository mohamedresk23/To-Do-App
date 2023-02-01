let input = document.querySelector(".input");
let submet = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();


submet.onclick = function() {
  if(input.value !== ""){
  addTaskToArray(input.value);
  input.value = "";
  }
}

function addTaskToArray(taskText) {
  const task = {
    id:Date.now(),
    title:taskText,
    completed:false,
  }

  arrayOfTasks.push(task);

  addElementToPageFrom(arrayOfTasks);

  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

tasksDiv.addEventListener("click",(e) => {
  if(e.target.classList.contains("del")){

    deleteTaskWith(e.target.parentElement.getAttribute("data-id"))

    e.target.parentElement.remove();
  }

  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

function addElementToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML="";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    
    div.className="task";
    div.setAttribute("data-id",task.id);
    div.appendChild(document.createTextNode(task.title));

    if (task.completed) {
      div.className = "task done";
      
    }

    let icone = document.createElement("img");
    icone.classList="del";
    icone.src="delete.png";
    div.appendChild(icone);
    tasksDiv.appendChild(div);
  });
}

  function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
  let data = window.localStorage.getItem("tasks");
  if(data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

function deleteTaskWith(task_id){
  arrayOfTasks = arrayOfTasks.filter((task)=>task.id != task_id);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}