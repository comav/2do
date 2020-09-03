var tasks;
var tasksRaw;
var wrapper = document.getElementById('wrapper')
var body = document.Body

var localStorageItems = { ...localStorage };

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return values;
}

renderItems()

function renderItems() {
    wrapper.innerHTML = '';
    var items = allStorage()

    items.forEach((item) => {
        displayTask(item);
    })
}

function displayTask(task) {
    console.log(task)
    var newTask = document.createElement('div');
    newTask.setAttribute('id', `task-${task.id}`)
    newTask.setAttribute('class', 'taskClass')
    var checkbox = document.createElement('input')
    if (task.done) {
        checkbox.setAttribute('checked', '')
    }
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('class', 'checkboxDone')
    var title = document.createElement('div')
    title.innerHTML = task.title
    newTask.appendChild(checkbox)
    newTask.appendChild(title)
    var deleteButton = document.createElement('button');
    deleteButton.setAttribute('onclick', `removeItem('${task.id}')`);
    deleteButton.setAttribute('class', 'mdc-icon-button material-icons')
    deleteButton.innerHTML = 'delete_forever';
    wrapper.appendChild(newTask);
    newTask.appendChild(deleteButton);
}

function addItem() {
    var newTask = document.createElement('div');
    newTask.setAttribute('id', 'createNewTaskBlock')
    var input = document.createElement('input');
    input.setAttribute('id', 'newTaskTitle');
    var submitButton = document.createElement('button');
    submitButton.innerText = 'submit';
    var overlay = document.createElement('div')
    overlay.setAttribute('class', 'overlay')
    overlay.setAttribute('id', 'overlay')
    overlay.style.position['fixed']
    overlay.style.display['block']
    newTask.appendChild(input);
    newTask.appendChild(submitButton)
    document.body.appendChild(overlay);
    document.body.appendChild(newTask);
    submitButton.setAttribute('onclick', 'submitItem()')

}

function idName() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    for (var i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result;
}

function submitItem() {
    var newItem = {};
    var taskTitle = document.getElementById('newTaskTitle').value;
    newItem.title = taskTitle
    newItem.done = false;
    var itemId = idName();
    newItem.id = itemId;
    localStorage.setItem(itemId, JSON.stringify(newItem))
    document.getElementById('createNewTaskBlock').remove();
    //delete overlay
    document.body.setAttribute('class', '')
    renderItems();
}

function removeItem(itemId) {
    localStorage.removeItem(itemId);
    renderItems();
}
