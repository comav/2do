var tasks;
var tasksRaw;
var wrapper = document.getElementById('wrapper')
var body = document.Body
var addButton = document.getElementById('addButton')
var today = new Date();
var time = today.getHours();
var sunData;
var sunset;

var xttp = new XMLHttpRequest();
xttp.open('GET', 'https://api.sunrise-sunset.org/json?lat=49.4447888&lng=32.0587805&date=today', true);
xttp.responseType = 'json';
xttp.send();
xttp.onload = () => {
    sunData = xttp.response;
    sunset = sunData.results.sunset;
    if (sunset.length == 10) {
        sunset = sunset.slice(0, 1);
        sunset = parseInt(sunset);
        console.log(sunset)
        sunset = sunset + 12 + 3;
        console.log(sunset)
    }

    if (sunset < time) {
        document.body.style.backgroundColor['#000']
    } else {
        document.body.style.backgroundColor['#fff']
    }
}

var localStorageItems = {
    ...localStorage
};

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
    var newTask = document.getElementById('createNewTaskBlock')
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
    submitButton.setAttribute('onclick', 'submitItem()')
    addButton.setAttribute('onclick', '')
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
    addButton.setAttribute('onclick', 'addItem()')
}

function removeItem(itemId) {
    localStorage.removeItem(itemId);
    renderItems();
}

function getSunsetSunrise() {

}