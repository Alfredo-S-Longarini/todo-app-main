let task = document.getElementById('newTask');
let listSection = document.getElementById('tasks');
let checkbox = "";
let count;
let arrayTasks;

task.addEventListener('keyup', (event) => {

    if (event.key === 'Enter') {
        addTask(task.value);
        loadTask(arrayTasks);
        task.value = "";
    }
});

const saveTasks = (tasks) => {
    localStorage.setItem("userTasks", JSON.stringify(tasks));
}

const readTasks = () => {

    let tasksLocal = JSON.parse(localStorage.getItem("userTasks"));

    if (tasksLocal !== null) {
        count = tasksLocal[tasksLocal.length - 1].id
        console.log(count);
        return tasksLocal;

    } else {
        count = 0;
        return [];

    }

};

arrayTasks = readTasks();

// Función que se encarga de eliminar las tareas.
const addTask = (task) => {
    count++
    arrayTasks.push({ id: count, task: task, complete: false })
    saveTasks(arrayTasks);
};

// Función que se encarga de eliminar las tareas.
const deleteTask = (task) => {
    return arrayTasks.filter((element) => element.task !== task.task);
};



const searchObject = (object) => {
    return arrayTasks.findIndex((e) => e.task == object.task);
};
const checkTask = (item) => {

    let itemParse = JSON.parse(item.value);
    let indexItem = searchObject(itemParse);
    let idObject = "item" + (indexItem + 1);
    let element = document.getElementById(idObject);

    if (item.checked) {

        arrayTasks[indexItem].complete = true;

        element.classList.add("completeTask");
        item.setAttribute("checked", "");

    } else {

        arrayTasks[indexItem].complete = false;

        element.classList.remove("completeTask");
        item.removeAttribute("checked", "");
    }
};
const selectInputs = () => {

    checkbox = document.querySelectorAll('input[name="task"]');

    checkbox.forEach(item => {
        item.addEventListener('change', () => {

            console.log(item);
            checkTask(item);

        });
    });

};

const selectBtnDelete = () => {
    let btnDelete = document.querySelectorAll('button[name="deleteBtn"]');

    btnDelete.forEach(element => {
        element.addEventListener('click', () => {
            loadTask(arrayTasks.filter((e) => e.id != element.value))
        })
    });
};

// Funcíon que se encarga de listar y mostrar las tareas.
const loadTask = (tasks) => {

    if (tasks.length > 0) {

        let contenido = "";

        for (let i = 0; i < tasks.length; i++) {

            if (tasks[i].complete) {
                contenido += `<li id="item${tasks[i].id}" class="completeTask">
                    <input id="checkbox${tasks[i].id}"  class="checkTask" type="checkbox" value='${JSON.stringify(tasks[i])}' name='task' checked>${tasks[i].task}</input>
                    <button name="deleteBtn" id="deleteBtn${tasks[i].id}" class="btnDeleteTask">
                        <img src="./images/icon-cross.svg" alt="deleteIcon">
                    </button>
                </li>`
            } else {
                contenido += `<li id="item${tasks[i].id}" class="">
                    <input id="checkbox${tasks[i].id}" class="checkTask" type="checkbox" value='${JSON.stringify(tasks[i])}' name='task' >${tasks[i].task}</input>
                    <button name="deleteBtn" value="${tasks[i].id}" id="deleteBtn${tasks[i].id}" class="btnDeleteTask">
                        <img src="./images/icon-cross.svg" alt="deleteIcon">
                    </button>
                </li>`
            }

        }

        listSection.innerHTML = contenido;

        document.getElementById('tasksActive').innerHTML = `${tasks.length} items left`

    } else {

        listSection.innerHTML = `<li><p>No hay tareas</p></li>`

    };

    selectInputs();
    selectBtnDelete();
};


let btnAll = document.getElementById('btnAll');
btnAll.addEventListener('click', () => {
    console.log(arrayTasks);
    loadTask(arrayTasks);
});


let btnActive = document.getElementById('btnActive');
btnActive.addEventListener('click', () => {
    loadTask(arrayTasks.filter((e) => e.complete === false));
});


let btnCompleted = document.getElementById('btnCompleted');
btnCompleted.addEventListener('click', () => {
    loadTask(arrayTasks.filter((e) => e.complete === true));
});

loadTask(arrayTasks);








