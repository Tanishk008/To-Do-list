let totalTasks = 0;
let completedTasks = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const startTimeInput = document.getElementById('startTimeInput');
    const endTimeInput = document.getElementById('endTimeInput');
    const taskList = document.getElementById('taskList');

    const taskValue = taskInput.value.trim();
    const dateValue = dateInput.value;
    const startTimeValue = startTimeInput.value;
    const endTimeValue = endTimeInput.value;

    if (taskValue === '' || dateValue === '' || startTimeValue === '' || endTimeValue === '') {
        alert('Please fill out task, date, and time range.');
        return;
    }

    if (startTimeValue >= endTimeValue) {
        alert('Start time must be earlier than end time.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    taskItem.innerHTML = `
        <input type="checkbox" onclick="updateProgress(this)" class="task-checkbox">
        <span>${dateValue} | ${startTimeValue} - ${endTimeValue}: ${taskValue}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(taskItem);

    totalTasks++;
    updateProgress();

    taskInput.value = '';
    dateInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    const checkbox = taskItem.querySelector('.task-checkbox');
    if (checkbox.checked) {
        completedTasks--;
    }
    totalTasks--;
    taskItem.remove();
    updateProgress();
}

function refreshTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    totalTasks = 0;
    completedTasks = 0;
    updateProgress();
}

function updateProgress(checkbox) {
    if (checkbox && checkbox.checked) {
        completedTasks++;
    } else if (checkbox && !checkbox.checked) {
        completedTasks--;
    }

    const progress = document.getElementById('progress');
    const efficiency = document.getElementById('efficiency');

    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    progress.innerHTML = `Progress: ${completedTasks}/${totalTasks} tasks completed (${percentage}%)`;

    if (percentage === 100) {
        efficiency.innerHTML = `Great job! Your day's efficiency is 100%. 🎉`;
    } else if (percentage > 0) {
        efficiency.innerHTML = `Your day's efficiency so far is ${percentage}%. Keep it up!`;
    } else {
        efficiency.innerHTML = '';
    }
}

function completeDay() {
    if (completedTasks === totalTasks && totalTasks > 0) {
        alert('Congratulations! You completed all your tasks for the day! 🎉');
    } else {
        alert('You still have incomplete tasks. Finish them to complete your day.');
    }
}
