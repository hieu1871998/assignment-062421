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
    var themeColor = document.querySelector('meta[name="theme-color"]');

    body.style.background = 'url('+image.href+') center center / cover no-repeat';
    header.classList.add('acrylic', 'ms-depth-4');
    headerTitle.style.color = '#323130';
    themeColor.setAttribute('content', '#323130')

    var themeData = {
        background: body.style.background,
        header: header.className,
        headerText: headerTitle.style.color,
        themeColor: themeColor.getAttribute('content'),
    };

    storeTheme(themeData);
}

function themeSolidColor(txtColor, bgColor) {
    var body = document.body;
    var header = document.getElementById('header');
    var headerTitle = document.getElementById('headerTitle');
    var themeColor = document.querySelector('meta[name="theme-color"]');

    body.style.background = bgColor;
    header.classList.remove('acrylic', 'ms-depth-4');
    headerTitle.style.color = txtColor;
    themeColor.setAttribute('content', bgColor);

    var themeData = {
        background: body.style.background,
        header: header.className,
        headerText: headerTitle.style.color,
        themeColor: themeColor.getAttribute('content'),
    };

    storeTheme(themeData);
}

function storeTheme(theme) {localStorage.setItem('theme', JSON.stringify(theme));}

function loadTheme() {
    var theme = localStorage.getItem('theme');
    var body = document.body;
    var header = document.getElementById('header');
    var headerTitle = document.getElementById('headerTitle');
    var themeColor = document.querySelector('meta[name="theme-color"]');

    if (!theme) {return null}

    body.style.background = JSON.parse(theme).background;
    header.className = JSON.parse(theme).header;
    headerTitle.style.color = JSON.parse(theme).headerText;
    themeColor.setAttribute('content', JSON.parse(theme).themeColor);
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
    task.className = ('list-element acrylic rounded-corners--5px ms-depth-4 ms-motion-scaleDownIn');
    task.appendChild(taskText);
    task.appendChild(delBtn);
    taskList.appendChild(task);
    
    delBtn.addEventListener('click', function (event) {
        var delBtn = event.target;
        var tsk = delBtn.parentElement;

        tsk.classList.remove('ms-motion-scaleDownIn');
        tsk.classList.add('ms-motion-scaleDownOut');

        setTimeout(function () {
            tsk.remove();
            storeTask(taskList);            
        }, 200);
        
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

    if (!taskData) {
        taskData = 
        '<li class="list-element acrylic rounded-corners--5px ms-depth-4 ms-motion-scaleDownIn"><button class="task-complete-button"><span><i class="ms-Icon ms-Icon--CompletedSolid"></i></span></button><span>Enter text into the input field to add items to your list &#8593;</span><button class="task-delete-button"><span><i class="ms-Icon ms-Icon--Delete"></i></span></button></li>' +
        '<li class="list-element acrylic rounded-corners--5px ms-depth-4 ms-motion-scaleDownIn list-element__completed"><button class="task-complete-button task-complete-button__completed"><span><i class="ms-Icon ms-Icon--CompletedSolid"></i></span></button><span>Click the item to mark it as complete</span><button class="task-delete-button"><span><i class="ms-Icon ms-Icon--Delete"></i></span></button></li>' +
        '<li class="list-element acrylic rounded-corners--5px ms-depth-4 ms-motion-scaleDownIn"><button class="task-complete-button"><span><i class="ms-Icon ms-Icon--CompletedSolid"></i></span></button><span>Click the "trash can" icon to remove the item from your list &#8594;</span><button class="task-delete-button"><span><i class="ms-Icon ms-Icon--Delete"></i></span></button></li>';
    }
    taskList.innerHTML = taskData;

    var task = taskList.getElementsByClassName('list-element');
    var delBtn = taskList.getElementsByClassName('task-delete-button');

    for (var i = 0; i < task.length; i++) {
        delBtn[i].addEventListener('click', function (event) {
            var delBtn = event.target;
            var tsk = delBtn.parentElement;
    
            tsk.classList.remove('ms-motion-scaleDownIn');
            tsk.classList.add('ms-motion-scaleDownOut');

            setTimeout(function () {
                tsk.remove();
                storeTask(taskList);            
            }, 200);
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
