const taskList = [];
const calendar = document.getElementById("calendar");

function addTask() {
    const taskInput = document.getElementById("task-input").value;
    const dateInput = document.getElementById("date-input").value;
    const timeInput = document.getElementById("time-input").value;

    if (!taskInput || !dateInput || !timeInput) {
        showNotification("Please fill all fields!", "red");
        return;
    }

    const formattedTime = convertToAMPM(timeInput);
    taskList.push({ task: taskInput, date: dateInput, time: formattedTime });

    renderTasks();
    renderCalendar();
    showNotification("Task added successfully!", "green");
}

function convertToAMPM(time) {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${suffix}`;
}

function renderTasks() {
    const taskContainer = document.getElementById("task-list");
    taskContainer.innerHTML = '';

    taskList.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${task.task} - ${task.date} at ${task.time}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            taskList.splice(index, 1);
            renderTasks();
            renderCalendar();
        };

        li.appendChild(deleteBtn);
        taskContainer.appendChild(li);
    });
}

function renderCalendar() {
    calendar.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
        const day = document.createElement("div");
        day.classList.add("day");
        day.textContent = i;
        calendar.appendChild(day);
    }
}

function showNotification(message, color) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.background = color;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

renderCalendar();
