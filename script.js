let array_tasks = [];

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    array_tasks = savedTasks ? JSON.parse(savedTasks) : [];
    updateItems();  
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(array_tasks));
}

function addItem(name) {
    alert("Add item to the list");
    if (name.length === 0 || typeof name !== 'string') {
        document.getElementById("completed-note").style.display = 'none';
        document.getElementById("header-note").style.display = 'none';
        document.getElementById("added-note").style.display = 'none';
        document.getElementById("error-note").style.display = 'flex';

        setTimeout(() => {
            document.getElementById("error-note").style.display = 'none';
            document.getElementById("header-note").style.display = 'flex';
        }, 3000);
        document.getElementById("header-note").innerHTML = "Write value for Item";

        return;
    }

    let myObj = {
        taskName: name,
        taskCondition: "added"
    };
    array_tasks.push(myObj);
    saveTasks();  

    updateItems();

    document.getElementById("input-bar").value = '';
    document.getElementById("completed-note").style.display = 'none';
    document.getElementById("header-note").style.display = 'none';
    document.getElementById("error-note").style.display = 'none';
    document.getElementById("added-note").style.display = 'flex';

    setTimeout(() => {
        document.getElementById("added-note").style.display = 'none';
        document.getElementById("header-note").style.display = 'flex';
    }, 3000);
    document.getElementById("header-note").innerHTML = "Write value for Item";
}

function clearItem() {
    alert("Clear all items from the list");

    const container = document.getElementById('tasks-container');
    container.innerHTML = '';
    array_tasks = [];
    saveTasks(); 
    document.getElementById("input-bar").value = '';
}

function updateItems() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';

    array_tasks.forEach((task, index) => {
        container.innerHTML += `<div class="task" data-id="${index}">
                                    <div class="num-name">
                                        <span class="counter">${index}</span>${task.taskName}
                                    </div>
                                    <div class="icons">
                                        <i id="check-icon" class="far fa-check-circle text-success" onclick="completeItem(${index})"></i>   
                                        <i id="edit-icon" class="far fa-edit text-secondary" onclick="showAlert(${index})"></i>   
                                        <i id="delete-icon" class="far fa-times-circle item-icon text-danger" onclick="deleteItem(${index})"></i>
                                    </div>
                                </div>`;
        if (task.taskCondition === 'completed') {
            const div = container.querySelector(`div[data-id="${index}"]`);
            if (div) {
                const taskText = div.querySelector('.num-name');
                taskText.style.color = 'lightgrey';
                taskText.style.textDecoration = 'line-through';
            }
        }
    });
}

function deleteItem(index) {
    alert("Delete item from the list");
    array_tasks.splice(index, 1);
    saveTasks();  
    updateItems();
}
let edit_index=0;

function editItem(newName) {
    alert("Edit the item");
    document.getElementById('alertBackground').style.display = 'none';

    array_tasks[edit_index].taskName = newName;
    
    const div = document.querySelector(`#tasks-container div[data-id="${edit_index}"]`);

    if (div) {
        const numNameDiv = div.querySelector('.num-name');
        if (numNameDiv) {
            numNameDiv.innerHTML = `<span class="counter">${edit_index}</span>${newName}`;
        } else {
            console.log(`Element with data-id="${edit_index}" does not have the class "num-name".`);
        }
    } else {
        console.log(`Element with data-id="${edit_index}" not found.`);
    }

    saveTasks(); 
    document.getElementById("input-edit-bar").value='';

}


function completeItem(index) {
    const div = document.querySelector(`div[data-id="${index}"]`);
    const task = div.querySelector('.num-name');
    let condition = array_tasks[index].taskCondition;
    if (condition === "added") {
        document.getElementById("input-bar").value = '';
        document.getElementById("completed-note").style.display = 'flex';
        document.getElementById("header-note").style.display = 'none';
        document.getElementById("error-note").style.display = 'none';
        document.getElementById("added-note").style.display = 'none';
        array_tasks[index].taskCondition = "completed";
        saveTasks();  

        setTimeout(() => {
            document.getElementById("completed-note").style.display = 'none';
            document.getElementById("header-note").style.display = 'flex';
        }, 3000);
        document.getElementById("header-note").innerHTML = "Write value for Item";

        task.style.color = 'lightgrey'; 
        task.style.textDecoration = 'line-through'; 
    } else if (condition === "completed") {
        task.style.color = 'black'; 
        task.style.textDecoration = 'none'; 
        array_tasks[index].taskCondition = "added";
        saveTasks();  
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();  
});

function showAlert(index) {
    document.getElementById('alertBackground').style.display = 'flex';
    edit_index=index;
}

function hideAlert() {
    document.getElementById('alertBackground').style.display = 'none';
}
