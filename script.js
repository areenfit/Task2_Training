let array_tasks = [];

// Function to add a new item
function addItem(name) {
    if (name.length === 0 || typeof name !== 'string') {
        document.getElementById("completed-note").style.display = 'none';
        document.getElementById("header-note").style.display = 'none';
        document.getElementById("added-note").style.display = 'none';
        document.getElementById("error-note").style.display = 'flex';

        // Hide the error note after 3 seconds
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

// Function to clear all items
function clearItem() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';
    array_tasks = [];
    document.getElementById("input-bar").value = '';
}

// Function to update the displayed items
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
                                        <i id="edit-icon" class="far fa-edit text-secondary" onclick="editItem(${index})"></i>   
                                        <i id="delete-icon" class="far fa-times-circle item-icon text-danger" onclick="deleteItem(${index})"></i>
                                    </div>
                                </div>`;
    });
}

// Function to delete an item by index
function deleteItem(index) {
    array_tasks.splice(index, 1);
    updateItems();
}

// Function to edit an item by index
function editItem(index) {
    document.getElementById("input-bar").value=array_tasks[index].taskName;
    const div = document.getElementById('tasks-container').querySelector(`div[data-id="${index}"]`);
    if (div) {
        div.remove(); 
        array_tasks.splice(index, 1);
    }
}

function completeItem(index) {
    const div = document.querySelector(`div[data-id="${index}"]`);
    const task = div.querySelector('.num-name');
    let condition=array_tasks[index].taskCondition;
    if(condition=="added"){
        document.getElementById("input-bar").value = '';
        document.getElementById("completed-note").style.display = 'flex';
        document.getElementById("header-note").style.display = 'none';
        document.getElementById("error-note").style.display = 'none';
        document.getElementById("added-note").style.display = 'none';
        array_tasks[index].taskCondition="completed";

        setTimeout(() => {
            document.getElementById("completed-note").style.display = 'none';
            document.getElementById("header-note").style.display = 'flex';
        }, 3000);
        document.getElementById("header-note").innerHTML = "Write value for Item";

        
        task.style.color = 'lightgrey'; 
        task.style.textDecoration = 'line-through'; 
    }else if(condition=="completed"){
        task.style.color = 'black'; 
        task.style.textDecoration = 'none'; 
    }
}
