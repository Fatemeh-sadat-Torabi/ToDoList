// selectors
const addButton = document.querySelector(".button-todo");
const todoInput = document.querySelector(".input-todo");
const todoList = document.querySelector(".todosContainer");
const filterOption = document.querySelector(".filter-todos");
// event listeners
addButton.addEventListener("click",addTodo);
todoList.addEventListener("click",checkRemoveEditStar);
filterOption.addEventListener("click",filterTodos);
document.addEventListener("DOMContentLoaded",getLocalTodos);
// functions
function addTodo(e){
    // get todo input
    // create todo div
    // add todo div to DOM
    // reset todo input
    e.preventDefault();
    console.log(e);
    const todo = `
        <li>
            ${todoInput.value}
        </li>
        <span>
            <i class="fa-solid fa-circle-check"></i>
        </span>
        <span>
            <i class="fa-solid fa-trash-can"></i>
        </span>
        <span>
            <i class="fa-solid fa-star"></i>
        </span>`
    const todoDiv = document.createElement("div");
    todoDiv.innerHTML=todo;
    todoDiv.classList.add("todo");
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value);
    todoInput.value="";
}
function checkRemoveEditStar(e){
    // console.log(e.target.classList);
    const classList =[...e.target.classList] ;
    const item = e.target;
    console.log(item);
    if (classList[1]==="fa-circle-check"){
        item.parentElement.parentElement.classList.toggle("completed");
    }else if(classList[1]==="fa-trash-can"){
        removeLocalTodos(item.parentElement.parentElement);
        item.parentElement.parentElement.remove();
    }else{
        item.parentElement.parentElement.classList.toggle("important");
    }
}
function filterTodos(e){
    // console.log(e.target.value);
    console.log(todoList.childNodes);
    todoChildList = todoList.childNodes;
    let allTodos=[]
    for(let i=3;i<todoChildList.length;i++){
        allTodos.push(todoChildList[i]);
    }
    allTodos.forEach(todo=>{
       switch(e.target.value){
            case "All":
                todo.style.display = "flex";
                break;
            case "Important":
                if(todo.classList.contains("important")){
                    todo.style.display="flex";
                }else{ todo.style.display="none";}
                break;
            case "Completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{todo.style.display="none";}
                break;
            case "Un-completed":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{todo.style.display="none";}
                break;        
       } 
    })
}        
// local storage
function saveLocalTodos(todo){
    //localStorage.getItem('todos');
    //localStorage.setItem('todos',JSON.stringify(todo));
    let savedTodos = localStorage.getItem("todos") ?
    JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedTodos));
}
function getLocalTodos(){
    let savedTodos = localStorage.getItem("todos") ?
    JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.forEach( todo=>{
        const newTodo = `
        <li>
            ${todo}
        </li>
        <span>
            <i class="fa-solid fa-circle-check"></i>
        </span>
        <span>
            <i class="fa-solid fa-trash-can"></i>
        </span>
        <span>
            <i class="fa-solid fa-star"></i>
        </span>`
    const todoDiv = document.createElement("div");
    todoDiv.innerHTML=newTodo;
    todoDiv.classList.add("todo");
    todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo){
    console.log(todo.children[0].innerText);
    let savedTodos=localStorage.getItem('todos') ?
    JSON.parse(localStorage.getItem('todos')) : [];
    const filteredTodos = savedTodos.filter(t => t!==todo.children[0].innerText);
    localStorage.setItem('todos',JSON.stringify(filteredTodos));
}
