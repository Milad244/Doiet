window.onload = function() {
    Load('loadAll');
};



let activeList;

const todoList = JSON.parse(localStorage.getItem('todoList')) || {
    General: {
        ToDo: [],
        Doing: [],
        Done: []
    }
};

const ToDoIDs = ['#ToDo-input', '#ToDo-div']
const DoingIDs = ['#Doing-input', '#Doing-div']
const DoneIDs = ['#Done-input', '#Done-div']

function enterStart(func, event, parameter){ 
    if (event.key === 'Enter') {
        func(parameter);
    }
}

function saveCookies() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function Load(type) {
    if (type === 'loadAll') {
        const listOutput = document.querySelector('#todo-lists');
        loadList(listOutput);
        addTodo('load');
    } else if(type === 'loadTodos'){
        addTodo('load');
    }
    
}

function loadTodoList(todoOutput, todoType) {
    todoOutput.innerHTML = '';
    for(let i = 0; i < todoList[activeList][todoType].length; i++) {
        const todoName = todoList[activeList][todoType][i];
        todoOutput.innerHTML += `<div class="text-container"><p>${todoName}</p> <div class="buttons-container"> <i onclick="removeTodo('${todoType}', '${i}');" class="fa-solid fa-trash fa-l trash-can"></i></div></div>`;
    }
    saveCookies();
}

function loadList(listOutput) {
    listOutput.innerHTML = '';
    for(let i = 0; i < Object.keys(todoList).length; i++) {
        const listName = Object.keys(todoList)[i];
        listOutput.innerHTML += `<div class="list-container"><li class="list" onclick="makeListActive('${i}')">${listName}</li> <div class="buttons-container"> <i onclick="removeList('${i}');" class="fa-solid fa-trash fa-l trash-can"></i></div></div>`;
    }
    saveCookies();
    makeListActive(0);
}

function makeListActive(list, type){
    if (type === 'name'){
        const listName = list;
        activeList = listName;
    } else{
        const listName = Object.keys(todoList)[parseInt(list)];
        activeList = listName;
    }
    const allLists = document.getElementsByClassName('list');
    for(i = 0; i < allLists.length; i++) {
        if (allLists[i].innerHTML === activeList) {
            allLists[i].classList.add('activeList');
        } else {
            allLists[i].classList.remove('activeList');
        }
    }
    Load('loadTodos');
}

function addTodoList() {
    const listInput = document.querySelector('#todo-List-Input');
    const allLists = document.getElementsByClassName('list');
    let duplicate = false;
    let onlySpace = false; 
    for(i = 0; i < allLists.length; i++) {
        if (allLists[i].innerHTML === listInput.value) {
            duplicate = true; 
        }
    }
    if (!listInput.value.replace(/\s/g, '').length) {
        onlySpace = true;
    }
    if (onlySpace != true && duplicate != true) {
        todoList[listInput.value] = {
            ToDo: [],
            Doing: [],
            Done: []
        };
        Load('loadAll');
        makeListActive(listInput.value, 'name');
        listInput.value = '';
    } else {
        listInput.value = '';
        alert('Error: The name you entered is either nothing or already exists')
    }
}

function addTodo(typeOftodo) {
    let todoInput;
    let todoOutput;
    let todoType;
    let duplicate = false;
    let onlySpace = false; 
    if (typeOftodo === 'ToDo') {
        todoInput = document.querySelector(ToDoIDs[0]);
        todoOutput = document.querySelector(ToDoIDs[1]);
        todoType = 'ToDo';
    }else if (typeOftodo === 'Doing') {
        todoInput = document.querySelector(DoingIDs[0]);
        todoOutput = document.querySelector(DoingIDs[1]);
        todoType = 'Doing';
    } else if (typeOftodo === 'Done') {
        todoInput = document.querySelector(DoneIDs[0]);
        todoOutput = document.querySelector(DoneIDs[1]);
        todoType = 'Done';
    } else if (typeOftodo === 'load') {
        todoOutput = document.querySelector(ToDoIDs[1]);
        todoType = 'ToDo';
        loadTodoList(todoOutput, todoType);
        todoOutput = document.querySelector(DoingIDs[1]);
        todoType = 'Doing';
        loadTodoList(todoOutput, todoType);
        todoOutput = document.querySelector(DoneIDs[1]);
        todoType = 'Done';
        loadTodoList(todoOutput, todoType);
        return;
    }

    for(i = 0; i < todoList[activeList]['ToDo'].length; i++) {
        if (todoList[activeList]['ToDo'][i] === todoInput.value) {
            duplicate = true; 
        }
    }
    for(i = 0; i < todoList[activeList]['Doing'].length; i++) {
        if (todoList[activeList]['Doing'][i] === todoInput.value) {
            duplicate = true; 
        }
    }
    for(i = 0; i < todoList[activeList]['Done'].length; i++) {
        if (todoList[activeList]['Done'][i] === todoInput.value) {
            duplicate = true; 
        }
    }

    if (!todoInput.value.replace(/\s/g, '').length) {
        onlySpace = true;
    }

    if (onlySpace != true && duplicate != true) {
        todoList[activeList][todoType].push(todoInput.value);
        loadTodoList(todoOutput, todoType);
        todoInput.value = '';
    } else{
        todoInput.value = '';
        alert('Error: The name you entered is either nothing or already exists')
    }
    
}

function removeTodo(todoType, todoIndex) {
    for(let i = 0; i < todoList[activeList][todoType].length; i++) {
        if (i === parseInt(todoIndex)) {
            todoList[activeList][todoType].splice(i, 1);
            break;    
        }
    }
    addTodo('load');
}

function removeList(listIndex) {
    const listName = Object.keys(todoList)[parseInt(listIndex)];
    delete todoList[listName];

    if (Object.keys(todoList).length === 0) {
        todoList['General'] = {
            ToDo: [],
            Doing: [],
            Done: []
        }
    } 
    Load('loadAll');
}

function deleteAll() {
    localStorage.removeItem('todoList');
}

