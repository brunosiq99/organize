//general Functions
function removeFromArrayByValue(value,array){
    const indexOfValue = array.indexOf(value);
    array.splice(indexOfValue,1);
}
function newId(){
    return Math.floor(Date.now() * Math.random()).toString(36);
}
function removeNodeById(taskListId){
    const taskListNode = document.getElementById(taskListId);
    const taskListUl = taskListNode.parentNode;
    taskListUl.removeChild(taskListNode); 
} 
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
// Add new TaskList
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
        
        controlNewTaskListBar('close')
        updateLocalStorage();
    })
}
function addTaskList(data){
    const taskListName = data.target.newTaskList.value;
    const taskListId = newId();
    const taskList = {
        priority: 0,
        id: taskListId,
        name: taskListName,
        tasks: []
    }
    taskLists.push(taskList);
    addSideListItem(taskList);
}

// Control taskLists
function increasesPriority(taskListId){
    const tasklistIncreased = findTaskListById(taskListId)
    tasklistIncreased.priority++;
    if (tasklistIncreased.priority > 4){
        tasklistIncreased.priority = 0;
    }
    updateLocalStorage();
}
function findTaskListById(taskListId){
    return taskLists.find(taskList => taskList.id === taskListId );
}
function deleteTaskList(taskListId){
    const tasklistDeleted = findTaskListById(taskListId);
    console.log(tasklistDeleted)
    removeFromArrayByValue(tasklistDeleted,taskLists);
}



// create Task
function createNewTask(data){
    const workSpaceContent = document.querySelector('.workspace__content');
    const taskList = openedTaskListObject.tasks;
    const taskName = data.target.newTaskInput.value;
    const taskId = 't' + newId();
    const task = {
        name: taskName,
        id: taskId,
        finished: false
    }
    taskList.push(task);
    createsWorkSpaceLi(workSpaceContent,task);
    updateLocalStorage();
}
function removeTask(task){
    const tasksArray = openedTaskListObject.tasks
    removeFromArrayByValue(task,tasksArray)
    removeNodeById(task.id)
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
    taskLists.forEach((taskList) => {
        addSideListItem(taskList);
    })    
}
function addSideListItem(taskList){
    const sideListUl = document.querySelector('.side-list__ul');
    const sideListLi = document.createElement('li');
    sideListLi.className = 'side-list__li';
    sideListLi.id = taskList.id;

        
    const sideListLiPriority = document.createElement('button');
    const sideListLiTitle = document.createElement('button');
    const sideListLiExclude = document.createElement('button')
    sideListLiPriority.className = 'side-list__li___priority';
    sideListLiTitle.className = 'side-list__li___title';
    sideListLiExclude.className = 'side-list__li___exclude';
    sideListLiTitle.innerText = taskList.name;
    sideListLiExclude.innerHTML = '<i class="fa-solid fa-x">';
    
    sideListLiPriority.addEventListener('click',(event)=>{
        const taskListId = getButtonParentNodeId(event.target);
        increasesPriority(taskListId);
        sideListPriorityBack(event.target,taskListId);
    });
    sideListLiTitle.addEventListener('click',(event)=>{
        const taskListId = getButtonParentNodeId(event.target);
        updateActiveButton(event.target);
        openTaskList(taskListId);
    });
    sideListLiExclude.addEventListener('click',(event)=>{
        const confirmed = confirm('Deseja escluir esta lista?')
        if(confirmed == true ){
            const deleteButton = event.target.parentNode;
            const taskListId = getButtonParentNodeId(deleteButton);
            deleteTaskList(taskListId);
            removeNodeById(taskListId);
            updateLocalStorage()
        }
    });
    
    sideListUl.appendChild(sideListLi);
    sideListLi.appendChild(sideListLiPriority);
    sideListLi.appendChild(sideListLiTitle);
    sideListLi.appendChild(sideListLiExclude)

    sideListPriorityBack(sideListLiPriority,sideListLi.id);
}
function sideListPriorityBack(priorityButton,taskListId){  
    const taskListPriority = (findTaskListById(taskListId)).priority;
    priorityButton.style.backgroundColor = `var(--priority${taskListPriority})`;
}
function updateActiveButton(button){
    const currentActiveButton = document.querySelector('.side-list__li___title--active');
    if(currentActiveButton !== null){
        currentActiveButton.classList.remove('side-list__li___title--active')
    }
    button.classList.add('side-list__li___title--active');
}
function getButtonParentNodeId(button){
    const buttonParentNode = button.parentNode;
    return buttonParentNode.id;
}

// workspace 
let openedTaskListObject = '';
function openTaskList(taskListId){
    openedTaskListObject = findTaskListById(taskListId)  
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
    topBarButton.className = 'workspace__top-bar___form--button';
    topBarButton.innerText = 'OK';
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
    const taskLi = document.createElement('li');
    taskLi.className = 'workspace__task';
    taskLi.id = task.id; 

    workSpaceContent.appendChild(taskLi);
    
    const taskTitle = document.createElement('p');
    taskTitle.className = 'workspace__task___p';
    taskTitle.innerText = task.name;
    
    taskLi.appendChild(taskTitle);
    setTaskLiDeleteButton(taskLi, task);
    setWorkSpaceCheckBoxes(taskLi,task);
    
}
function setWorkSpaceCheckBoxes(taskLi,task){
    const taskFinished = document.createElement('div');
    taskFinished.className = 'workspace__task___finished';
    const taskFinishedCheckBox = document.createElement('input');
    taskFinishedCheckBox.className = 'workspace__task___finished--input';
    taskFinishedCheckBox.type = 'checkbox';
    taskFinishedCheckBox.id = 'check' + taskLi.id;
    taskFinishedCheckBox.checked = task.finished;
    const taskFinishedLabel = document.createElement('label'); 
    taskFinishedLabel.className = 'workspace__task___finished--label';
    taskFinishedLabel.htmlFor = taskFinishedCheckBox.id;
    taskFinishedLabel.innerHTML = '<i class="fa-solid fa-check"></i>';

    taskFinishedCheckBox.addEventListener('change',()=>{
        if(taskFinishedCheckBox.checked){
            task.finished = true;
        }else{
            task.finished = false;
        }
        updateLocalStorage();
    })

    taskLi.appendChild(taskFinished);
    taskFinished.appendChild(taskFinishedCheckBox);
    taskFinished.appendChild(taskFinishedLabel);
}
function setTaskLiDeleteButton(taskLi,task){
    const taskLiDeleteBtn = document.createElement('button');
    taskLiDeleteBtn.innerHTML = '<i class="fa-solid fa-x">';
    taskLiDeleteBtn.className = 'workspace__task___delete side-list__li___exclude';
    taskLiDeleteBtn.addEventListener('click', ()=>{
        removeTask(task)

    })
    taskLi.appendChild(taskLiDeleteBtn)
}

// run functions

// sideList
setSideListButton();

// newTask
setNewTaskListButton();
setCloseNewTaskList();
setLocalStorage();
setAddNewTaskList();



