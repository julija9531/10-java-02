const taskInput = document.getElementById("task__input");
const tasksAdd = document.getElementById("tasks__add");
const tasksList = document.querySelector(".tasks__list");
const splitKey = "|301360181|";


//Добавление новой задачи:
function addTask(text) {
    tasksList.innerHTML += `<div class="task">
    <div class="task__title">
    ${text}
    </div>
    <a href="#" class="task__remove">&times;</a>
    </div>`

    //Добавление действия для удаления задачи:
    removeTask();
    //Сохранение в localStorage
    saveLocalStorage();
}

//Удаление задач
function removeTask () {
    let tasksArray = Array.from(tasksList.querySelectorAll(".task"));
    let xArray = Array.from(tasksList.querySelectorAll(".task__remove"));
    //т.к. после добавления нового элемента все старые обработчики перестают работать (видимо элементы изменяются и привзка слетает)
    //пересоздаем слушателей на все кнопки удаления
    for (let i = 0; i < tasksArray.length; i++) {
        xArray.at(i).onclick = function (event) {
            tasksArray.at(i).remove();
            //Сохранение в localStorage
            saveLocalStorage();
            return false;   
        }
    }
}

//Сохранение в localStorage
function saveLocalStorage () {
    let strArr = "";
    let tasks = Array.from(tasksList.querySelectorAll(".task__title")).map(item => item.textContent);
    for (let i = 0; i < tasks.length; i++) {
        tasks[i] = tasks[i].replace("\n", "").trim();  
    }
    strArr = (tasks.join(splitKey));
    localStorage.setItem("strArr", strArr);
}

//Загрузка данных из localStorage
function loadLocalStorage () {
    let strArr = localStorage.getItem("strArr").split(splitKey);
    for (let i= 0; i < strArr.length; i++) {
        addTask(strArr[i]);
    }
}

//Сброс localStorage
if (0) {
    localStorage.setItem("strArr", "");
}

//Загрузка данных из localStorage
if (localStorage.getItem("strArr")) {
    loadLocalStorage();
    removeTask();
}

tasksAdd.onclick = function(event) {
    if (taskInput.value.trim()) {
        addTask(taskInput.value);
        taskInput.value = "";
    } else {taskInput.value = "";}
    return false;
}