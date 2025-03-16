document.addEventListener("DOMContentLoaded", () => {
  // Select the form and the tasks list
const taskForm = document.querySelector('#create-task-form');
const taskList = document.querySelector('#tasks');

// Event listener for form submission
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page refresh

  // Get the task description input value
  const taskDescription = document.querySelector('#new-task-description').value;

  // If input is not empty, create a new task item
  if (taskDescription.trim() !== '') {
    addTaskToList(taskDescription);
    taskForm.reset(); // Clear the input field after adding a task
  }
});

// Function to create and append a new task
function addTaskToList(description) {
  const taskItem = document.createElement('li'); // Create list item element
  taskItem.textContent = description; // Set the task description as text content

  // Add a priority dropdown
  const prioritySelect = document.createElement('select');
  ['High', 'Medium', 'Low'].forEach(priority => {
    const option = document.createElement('option');
    option.value = priority.toLowerCase();
    option.textContent = priority;
    prioritySelect.appendChild(option);
  });

  // Change text color based on priority
  prioritySelect.addEventListener('change', function() {
    setTaskColor(taskItem, prioritySelect.value);
  });

  // Add a delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.addEventListener('click', function() {
    taskItem.remove(); // Remove the task when delete button is clicked
  });

  // Add an edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    const newDescription = prompt('Edit your task:', taskItem.textContent.replace('XEdit', '').trim());
    if (newDescription) {
      taskItem.childNodes[0].textContent = newDescription;
    }
  });

  // Append elements to the task item
  taskItem.appendChild(prioritySelect);
  taskItem.appendChild(deleteButton);
  taskItem.appendChild(editButton);

  // Append task item to the task list
  taskList.appendChild(taskItem);

  // Set initial color based on priority
  setTaskColor(taskItem, prioritySelect.value);
}

// Function to set the task color based on priority
function setTaskColor(taskItem, priority) {
  switch (priority) {
    case 'high':
      taskItem.style.color = 'red';
      break;
    case 'medium':
      taskItem.style.color = 'orange';
      break;
    case 'low':
      taskItem.style.color = 'green';
      break;
    default:
      taskItem.style.color = 'black';
  }
}

});
