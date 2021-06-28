function openTheme() {
    var themeMenu = document.querySelectorAll('#contextualMenu');

    for (var i = 0; i < themeMenu.length; i++) {
        var themeButton = themeMenu[i].querySelector('.ms-Button');
        var themeMenuElement = themeMenu[i].querySelector('.ms-ContextualMenu');
        new fabric['ContextualMenu'](themeMenuElement, themeButton);
    }

    loadTheme();
}

function themeImage(image) {
    var body = document.body;
    var header = document.getElementById('header');
    var headerTitle = document.getElementById('headerTitle');

    body.style.background = 'url('+image.href+') center center / cover no-repeat';
    header.classList.add('acrylic', 'ms-depth-4');
    headerTitle.style.color = '#323130';

    var themeData = {
        background: body.style.background,
        header: header.className,
        headerText: headerTitle.style.color,
    };

    storeTheme(themeData);
}

function themeSolidColor(txtColor, bgColor) {
    var body = document.body;
    var header = document.getElementById('header');
    var headerTitle = document.getElementById('headerTitle');

    body.style.background = bgColor;
    header.classList.remove('acrylic', 'ms-depth-4');
    headerTitle.style.color = txtColor;

    var themeData = {
        background: body.style.background,
        header: header.className,
        headerText: headerTitle.style.color,
    };

    storeTheme(themeData);
}

function storeTheme(theme) {localStorage.setItem('theme', JSON.stringify(theme));}

function loadTheme() {
    var theme = localStorage.getItem('theme');
    var body = document.body;
    var header = document.getElementById('header');
    var headerTitle = document.getElementById('headerTitle');

    if (!theme) {return null}

    body.style.background = JSON.parse(theme).background;
    header.className = JSON.parse(theme).header;
    headerTitle.style.color = JSON.parse(theme).headerText;
}

function addTask() {
    var taskList = document.getElementById('taskList');
    var task = document.createElement('li');
    var taskText = document.createElement('span');
    var taskInput = document.getElementById('inputText').value;
    var cmpBtn = completeButton();
    var delBtn = deleteButton();

    if (taskInput === '') {return false;}

    task.appendChild(cmpBtn);
    taskText.innerText = taskInput;
    document.getElementById('inputText').value = '';
    task.classList.add('list-element', 'acrylic', 'rounded-corners--5px');
    task.appendChild(taskText);
    task.appendChild(delBtn);
    taskList.appendChild(task);
    
    delBtn.addEventListener('click', function (event) {
        var delBtn = event.target;
        var tsk = delBtn.parentElement;

        tsk.remove();
        storeTask(taskList);
    }, false);

    task.addEventListener('click', function (event) {
        var tsk = event.target;
        var tskCmpBtn = event.target.getElementsByClassName('task-complete-button');

        if (tskCmpBtn[0] === undefined) {return false;}

        tsk.classList.toggle('list-element__completed');
        tskCmpBtn[0].classList.toggle('task-complete-button__completed');
        storeTask(taskList);
    }, false);

    storeTask(taskList);
}

function completeButton() {
    var completeButton = document.createElement('button');
    var completeSpan = document.createElement('span');
    var completeIcon = document.createElement('i');
    
    completeButton.className = 'task-complete-button';
    completeIcon.className = 'ms-Icon ms-Icon--CompletedSolid';
    completeSpan.appendChild(completeIcon);
    completeButton.appendChild(completeSpan);

    return completeButton;
}

function deleteButton() {
    var deleteButton = document.createElement('button');
    var deleteSpan = document.createElement('span');
    var deleteIcon = document.createElement('i');

    deleteButton.className = 'task-delete-button';
    deleteIcon.className = 'ms-Icon ms-Icon--Delete';
    deleteSpan.appendChild(deleteIcon);
    deleteButton.appendChild(deleteSpan)
    
    return deleteButton;
}

function storeTask(list) {localStorage.setItem('tasks', list.innerHTML);}

function loadTasks() {
    var taskList = document.getElementById('taskList');
    var taskData = localStorage.getItem('tasks');

    if (!taskData) {return false;}
    taskList.innerHTML = taskData;

    var task = taskList.getElementsByClassName('list-element');
    var delBtn = taskList.getElementsByClassName('task-delete-button');

    for (var i = 0; i < task.length; i++) {
        delBtn[i].addEventListener('click', function (event) {
            var delBtn = event.target;
            var tsk = delBtn.parentElement;
    
            tsk.remove();
            storeTask(taskList);
        }, false);
    
        task[i].addEventListener('click', function (event) {
            var tsk = event.target;
            var tskCmpBtn = event.target.getElementsByClassName('task-complete-button');
    
            
            if (tskCmpBtn[0] === undefined) {return false;}
    
            tsk.classList.toggle('list-element__completed');
            tskCmpBtn[0].classList.toggle('task-complete-button__completed');
            storeTask(taskList);
        }, false);
    } 
}

window.onload = function () {
    openTheme();
    loadTasks();    
};
