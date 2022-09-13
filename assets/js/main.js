// new Tasklist

function setNewTaskListButton(){
    const newTaskButton = document.querySelector('.header__new___button');
    newTaskButton.addEventListener('click', () => controlNewTaskListBar('open'));
}
function setCloseNewTaskList(){
    const closeNewTaskButton = document.querySelector('#close-new-task');
    closeNewTaskButton.addEventListener('click', () => controlNewTaskListBar('close'));
}
function controlNewTaskListBar(control){
    const newTaskListBar = document.querySelector('.header__new-task');
    if(control === 'open'){ 
        newTaskListBar.style.zIndex = 20;
    }
    if(control === 'close'){
        newTaskListBar.style.zIndex = 0;
    }    
}
// Add new Task
let taskLists = '';
function setLocalStorage(){
    const localStorageTaskLists = JSON.parse(localStorage.getItem('taskLists'));
    taskLists = localStorage.getItem('taskLists') !== null ? localStorageTaskLists : [];
    addListedItems();
    // if localStorage.getItem('taskLists') !== null => let taskLists = localStorageTaskLists
    // if localStorage.getItem('taskLists') === null => let taskLists = []   
}
function updateLocalStorage(){
    localStorage.setItem('taskLists', JSON.stringify(taskLists))
}
function setAddNewTaskList(){
    const newTaskForm = document.querySelector('[data-js="new-task__form"]');
    newTaskForm.addEventListener('submit',(data) => {
        data.preventDefault();
        addTaskList(data);
        updateLocalStorage();
    })
}
function addTaskList(data){
    const taskListName = data.target.newTaskList.value;
    const taskListId = `tasklist${taskLists.length}`
    const taskList = {
        priority: 0,
        id: taskListId,
        name: taskListName,
        tasks: []
    }
    taskLists.push(taskList);
}

// create Task
function createNewTask(data){
    const workSpaceContent = document.querySelector('.workspace__content');
    const taskList = openedTaskListObject.tasks;
    const task = data.target.newTaskInput.value;
    taskList.push(task);
    createsWorkSpaceLi(workSpaceContent,task);
    updateLocalStorage();
}

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
// side List taskLists
function addListedItems (){
    const sideListUl = document.querySelector('.side-list__ul');
    taskLists.forEach((taskList) => {
        const sideListLi = document.createElement('li');
        sideListLi.className = 'side-list__li';
        sideListLi.id = taskList.id;
        
        const sideListLiPriority = document.createElement('button');
        const sideListLiTitle = document.createElement('button');
        sideListLiPriority.className = 'side-list__li___priority';
        sideListLiTitle.className = 'side-list__li___title';
        sideListLiTitle.innerText = taskList.name;
        

        sideListLiTitle.addEventListener('click',(event)=>{
            const buttonParentNode = event.target.parentNode;
            const taskListId = buttonParentNode.id;
            openTaskList(taskListId);
        })
        
        sideListUl.appendChild(sideListLi);
        sideListLi.appendChild(sideListLiPriority);
        sideListLi.appendChild(sideListLiTitle);
    })    
}

// workspace 
let openedTaskListObject = '';
function openTaskList(taskListId){
    openedTaskListObject = taskLists.find(taskList => taskList.id == taskListId);   
    createsWorkSpace();      
}
function createsWorkSpace() {
    const workSpace = document.querySelector('.workspace');
    workSpace.innerHTML = '';   //clear workSpace
    createsTopBar(workSpace);
    createsWorkSpaceContent(workSpace);
}
function createsTopBar(workSpace){
    const topBar = document.createElement('div');
    topBar.className = 'workspace__top-bar';

    const topBarTitle = document.createElement('h3');
    topBarTitle.className = 'workspace__top-bar___title';
    topBarTitle.innerText = openedTaskListObject.name;
    const topBarForm = document.createElement('form');
    topBarForm.className = 'workspace__top-bar___form';
    topBarForm.addEventListener('submit',(data) => {
        data.preventDefault();
        createNewTask(data);
    })

    const topBarInput = document.createElement('input');
    topBarInput.className = 'workspace__top-bar___form--input';
    topBarInput.name = 'newTaskInput';
    topBarInput.placeholder = "Crie uma nova tarefa";
    const topBarButton = document.createElement('button');
    topBarButton.type = 'submit';

    workSpace.appendChild(topBar);
    topBar.appendChild(topBarTitle);
    topBar.appendChild(topBarForm);
    topBarForm.appendChild(topBarInput);
    topBarForm.appendChild(topBarButton);

}
function createsWorkSpaceContent(workSpace){
    const workSpaceContent = document.createElement('ul');
    workSpaceContent.className = 'workspace__content';

    workSpace.appendChild(workSpaceContent);  

    const openedTasks = openedTaskListObject.tasks;
    openedTasks.forEach(task => createsWorkSpaceLi(workSpaceContent,task))    
}
function createsWorkSpaceLi(workSpaceContent,task){
    
    const workSpaceLi = document.createElement('li');
    workSpaceLi.className = 'workspace__contente___item';
    workSpaceLi.innerText = task;
    workSpaceContent.appendChild(workSpaceLi);
}


// run functions

// sideList
setSideListButton();

// newTask
setNewTaskListButton();
setCloseNewTaskList();
setLocalStorage();
setAddNewTaskList();



