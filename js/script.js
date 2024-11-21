
// SIDE BAR: MEDIA MODULE----------------------------------------------
// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('study-sidebar');
  const toggleButton = document.getElementById('toggle-button');

  // Function to update time and date
  function updateDateTime() {
      const now = new Date();
      // Format time as "Hour:Minute AM/PM"
      const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      // Format date as "Weekday Month Day, Year"
      const dateString = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      // Update the date and time elements
      document.getElementById('current-date').textContent = dateString;
      document.getElementById('current-time').textContent = timeString;
  }

  // Initial update and update every second
  updateDateTime();
  setInterval(updateDateTime, 1000); // Update every second

  // Toggle sidebar visibility when the toggle button is clicked
  toggleButton.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
      if (sidebar.classList.contains('collapsed')) {
          toggleButton.innerHTML = '&gt;'; // Change to '>'
      } else {
          toggleButton.innerHTML = '&lt;'; // Change to '<'
      }
  });
});


// END SIDE BAR: POMODORO TIMER --------------------------------------------------------
// Pomodoro Timer Functionality
const timer = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const tabs = document.querySelectorAll(".tab-button");

// Define the timer intervals in seconds
let timerIntervals = {
  pomodoro: 25 * 60,
  'short-break': 5 * 60,
  'long-break': 15 * 60,
};

let currentTab = 'pomodoro'; // Default tab
let timeRemaining = timerIntervals[currentTab];
let timerInterval;

// Initialize timer display
updateTimerDisplay();

function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (timerInterval) {
      return; // If timer is already running, do nothing
  }

  timerInterval = setInterval(() => {
      timeRemaining--;
      if (timeRemaining < 0) {
          clearInterval(timerInterval);
          showAlert();
          resetTimer();
      }
      updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timeRemaining = timerIntervals[currentTab];
  updateTimerDisplay();
}

function showAlert() {
  if (currentTab === 'pomodoro') {
      alert("Your Pomodoro session is over!");
  } else if (currentTab === 'short-break') {
      alert("Your short break is over!");
  } else if (currentTab === 'long-break') {
      alert("Your long break is over!");
  }
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

// Tab Switching Functionality
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
      tabs.forEach(tab => tab.classList.remove('active'));
      tab.classList.add('active');

      const tabId = tab.dataset.tab;

      currentTab = tabId;
      resetTimer(); // This ensures the timer display is updated correctly
  });
});





// END SIDE BAR: TO DO LIST ----------------------------------------------------------------------------

// To-Do List Functionality
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const todoList = document.getElementById("todo-list");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const listItem = document.createElement("li");

    const label = document.createElement("label");
    label.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";  
    checkbox.classList.add("task-checkbox");

    const taskName = document.createElement("span");
    taskName.classList.add("task-name");
    taskName.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    label.appendChild(checkbox);
    label.appendChild(taskName);

    listItem.appendChild(label);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);

    taskInput.value = "";

    checkbox.addEventListener("change", toggleTaskCompletion);
    deleteButton.addEventListener("click", deleteTask);
  }
}

function toggleTaskCompletion(event) {
  const checkbox = event.target;
  const listItem = checkbox.closest("li");
  const deleteButton = listItem.querySelector(".delete-button");

  // move the task to the end of the list when completed 
  if (checkbox.checked) {
    listItem.classList.add("completed");
    deleteButton.classList.add("hide");

    todoList.appendChild(listItem); // Move to end of the list
  } else {
    listItem.classList.remove("completed");
    deleteButton.classList.remove("hide");
  }

}


function deleteTask(event) {
  const listItem = event.target.parentElement;
  todoList.removeChild(listItem);
}

function clearTasks() {
  todoList.innerHTML = "";
}

// Event listeners
addButton.addEventListener("click", addTask); // Add task on button click
taskInput.addEventListener("keypress", (event) => { // Add task on Enter key press
if (event.key === "Enter") {
  addTask();
}
});

clearButton.addEventListener("click", clearTasks); 






