//sideList
function setSideListButton(){
    const sideListButton = document.querySelector('.header__side-list');
    sideListButton.addEventListener('click', () => controlSideList());
}
function controlSideList(){
    const sideList = document.querySelector('.side-list');
    const workspace = document.querySelector('.workspace');
    if(sideList.classList.contains('side-list---showed')){
        sideList.classList.remove('side-list---showed');
        workspace.classList.remove('workspace---indented');
    }else{
        sideList.classList.add('side-list---showed');
        workspace.classList.add('workspace---indented');
    }
}
// new Task
function setNewTaskButton(){
    const newTaskButton = document.querySelector('.header__new___button');
    newTaskButton.addEventListener('click', () => controlNewTaskBar('open'));
}
function setCloseNewTask(){
    const closeNewTaskButton = document.querySelector('#close-new-task');
    closeNewTaskButton.addEventListener('click', () => controlNewTaskBar('close'));
}
function controlNewTaskBar(control){
    const newTaskBar = document.querySelector('.header__new-task');
    if(control === 'open'){ 
        newTaskBar.style.zIndex = 20;
    }
    if(control === 'close'){
        newTaskBar.style.zIndex = 0;
    }    
}
// Add new Task
let taskLists = '';
function setLocalStorage(){
    const localStorageTaskLists = JSON.parse(localStorage.getItem('taskLists'));
    taskLists = localStorage.getItem('taskLists') !== null ? localStorageTaskLists : [];
    // if localStorage.getItem('taskLists') !== null => let taskLists = localStorageTaskLists
    // if localStorage.getItem('taskLists') === null => let taskLists = []   
}
function updateLocalStorage(){
    localStorage.setItem('taskLists', JSON.stringify(taskLists))
}

function setAddNewTask(){
    const newTaskForm = document.querySelector('[data-js="new-task__form"]');
    newTaskForm.addEventListener('submit',(data) => {
        data.preventDefault();
        const taskListName = data.target.newTaskList.value;
        const taskList = {
            name: taskListName,
            tasks: []
        }
        taskLists.push(taskList);
        updateLocalStorage();
    })
}


// run functions
// sideList
setSideListButton();
// newTask
setNewTaskButton();
setCloseNewTask();
setLocalStorage();
setAddNewTask();



