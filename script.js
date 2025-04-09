document.addEventListener('DOMContentLoaded',()=>{



let input = document.getElementById("input");
let btn = document.getElementById("add-btn");
const todolist = document.getElementById("listItem")

let tasks = JSON.parse(localStorage.getItem("task")) || [];

tasks.forEach(task => {
    renderTask(task)
});

input.addEventListener("keypress", (e)=>{
    if(e.key === 'Enter'){
        let taskValue = input.value.trim();
    if(taskValue === ""){
       return
    }
    else{
        const newTask = {
            id: Date.now(),
            text: taskValue,
            completed: false 
        }
        tasks.push(newTask)
        renderTask(newTask);
        saveTask();
        input.value = "";
    }
    }
})
;
btn.addEventListener('click',()=>{
    let taskValue = input.value.trim();
    if(taskValue === ""){
       return
    }
    else{
        const newTask = {
            id: Date.now(),
            text: taskValue,
            completed: false 
        }
        tasks.push(newTask)
        renderTask(newTask);
        saveTask();
        input.value = "";
    }
    
}) 

function saveTask(){
     localStorage.setItem("task",JSON.stringify(tasks))
}

function renderTask(task){
   const li = document.createElement("li");
   li.setAttribute("Data-Id", task.id)
   if(task.completed) li.classList.add("completed");
   li.innerHTML=`
   <span>${task.text}</span><button>Delete</button>
   `;
   li.addEventListener('click',(e)=>
{
    if(e.target.tagName === "Button") return;
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTask();
})
li.querySelector('button').addEventListener('click', (e)=>{
    e.stopPropagation();
    console.log(task.id)
    tasks = tasks.filter((t) => t.id !== task.id);
    li.remove();
    saveTask();
})
   todolist.appendChild(li); 
   console.log(task)
   console.log(task.text);
}
})
