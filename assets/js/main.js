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


// run functions

setSideListButton();
setNewTaskButton();
setCloseNewTask();


