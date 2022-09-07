//sideList
function setSideListButton(){
    const sideListButton = document.querySelector('.header__side-list');
    sideListButton.addEventListener('click',()=>controlSideList());
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


// run functions

setSideListButton();


