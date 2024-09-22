/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
import { UTCDate } from '@date-fns/utc';
import { format } from 'date-fns';
import ProjectControl from './ProjectManager';
import ToDoItem from './ToDo';
import { saveToStorage } from './localstorage';

// DYNAMIC ELEMENTS
function createTask(TaskItem) {
  const body = document.querySelector('.taskDisplay');
  const taskItem = document.createElement('div');
  taskItem.classList.add(`${TaskItem.id}`);

  const title = document.createElement('div');
  title.classList.add('taskName');
  title.textContent = TaskItem.title;

  const description = document.createElement('div');
  description.textContent = TaskItem.description;

  const dueDate = document.createElement('div');
  dueDate.textContent = TaskItem.dueDate;

  const priority = document.createElement('div');
  priority.textContent = TaskItem.priority;

  const project = document.createElement('div');
  project.classList.add(`${TaskItem.id}`);
  project.textContent = TaskItem.project;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    taskItem.remove();
    const projectArray = ProjectControl.projectNameList;
    const projectTarget = projectArray.filter(projects => projects.projectTitle === TaskItem.project);
    const index = projectTarget.findIndex(object => object.id === TaskItem.id);
    projectTarget[0].projectTaskList.splice(index, 1);
    saveToStorage(ProjectControl);
  })

  taskItem.appendChild(title);
  taskItem.appendChild(description);
  taskItem.appendChild(dueDate);
  taskItem.appendChild(priority);
  taskItem.appendChild(project);
  taskItem.appendChild(deleteButton);
  body.appendChild(taskItem);
}

function createProject(ProjectName) {
  const projectAnchor = document.querySelector('.projectDisplay');
  const projectButton = document.createElement('button');
  projectButton.addEventListener('dblclick', () => {
    projectButton.remove();
    const index = ProjectControl.projectNameList.findIndex(project => project.id === ProjectName.id);
    ProjectControl.removeProject(index);
    saveToStorage(ProjectControl);
    addDropDown();
    updateAllToDo();
  })
  projectButton.textContent = ProjectName.projectTitle;
  projectButton.setAttribute('id', `${ProjectName.projectTitle}`);
  projectAnchor.appendChild(projectButton);
}

// STATIC ELEMENTS
function renderInitialForms() {
  // Project Form
  const addProjectButton = document.querySelector('.projectContainer');
  const projectForm = document.createElement('form');
  projectForm.classList.add('projectFormToggle');
  projectForm.style.display = 'none';

  const projectTitle = document.createElement('input');
  projectTitle.required = true;
  projectTitle.setAttribute('id', 'projectTitle');
  projectTitle.setAttribute('type', 'text');
  projectTitle.setAttribute('name', 'project_title');
  projectTitle.setAttribute('placeholder', 'Add a project');

  const projectFormSubmit = document.createElement('button');
  projectFormSubmit.setAttribute('type', 'submit');
  projectFormSubmit.classList.add('submitProjectBtn')
  projectFormSubmit.textContent = 'Add project';

  const projectFormReset = document.createElement('button');
  projectFormReset.setAttribute('type', 'reset');
  projectFormReset.textContent = 'Clear';
  projectFormReset.classList.add('resetProjectBtn');

  const projectInformationDelete = document.createElement('div');
  projectInformationDelete.textContent = 'Doubleclick to delete';

  projectForm.appendChild(projectTitle);
  projectForm.appendChild(projectFormSubmit);
  projectForm.appendChild(projectFormReset);
  projectForm.appendChild(projectInformationDelete);
  addProjectButton.appendChild(projectForm);

  // To Do Details Form
  const addTaskBtn = document.querySelector('.main');
  const taskForm = document.createElement('form');
  taskForm.classList.add('taskFormToggle');
  taskForm.style.display = 'none';

  const titleTask = document.createElement('input');
  titleTask.required = true;
  titleTask.setAttribute('id', 'title-task')
  titleTask.setAttribute('type', 'text');
  titleTask.setAttribute('name', 'title_name');
  titleTask.setAttribute('placeholder', 'Task title');

  const descriptionTask = document.createElement('input');
  descriptionTask.required = true;
  descriptionTask.setAttribute('id', 'description-task')
  descriptionTask.setAttribute('type', 'text');
  descriptionTask.setAttribute('name', 'description_name');
  descriptionTask.setAttribute('placeholder', 'Describe your task');

  const dateTask = document.createElement('input');
  dateTask.required = true;
  dateTask.setAttribute('id', 'date-task')
  dateTask.setAttribute('type', 'date');
  dateTask.setAttribute('name', 'due_date');
  dateTask.setAttribute('placeholder', 'Choose a date');

  const priorityTask = document.createElement('select');
  priorityTask.required = true;
  priorityTask.setAttribute('id', 'priority-task')
  priorityTask.name = 'Priority';
  const priorityPlaceHolder = document.createElement('option');
  priorityPlaceHolder.textContent = 'Priority';
  priorityPlaceHolder.disabled = true;
  priorityPlaceHolder.selected = true;
  const priorityTaskLow = document.createElement('option');
  priorityTaskLow.setAttribute('value', 'low');
  priorityTaskLow.innerHTML = 'Low';
  const priorityTaskMed = document.createElement('option');
  priorityTaskMed.setAttribute('value', 'medium');
  priorityTaskMed.innerHTML = 'Medium';
  const priorityTaskHigh = document.createElement('option');
  priorityTaskHigh.setAttribute('value', 'high');
  priorityTaskHigh.innerHTML = 'High';

  priorityTask.appendChild(priorityPlaceHolder);
  priorityTask.appendChild(priorityTaskLow);
  priorityTask.appendChild(priorityTaskMed);
  priorityTask.appendChild(priorityTaskHigh);

  const selectProjectList = document.createElement('select');
  selectProjectList.required = true;
  selectProjectList.classList.add('selectProject');
  const projectPlaceHolder = document.createElement('option');
  projectPlaceHolder.textContent = 'Choose project';
  projectPlaceHolder.disabled = true;
  projectPlaceHolder.selected = true;

  const taskFormSubmit = document.createElement('button');
  taskFormSubmit.setAttribute('id', 'submitTaskBtn');
  taskFormSubmit.setAttribute('type', 'submit');
  taskFormSubmit.classList.add('submitTaskResetBtn')
  taskFormSubmit.innerText = '+';

  const taskFormReset = document.createElement('button');
  taskFormReset.setAttribute('type', 'reset');
  taskFormReset.innerText = 'R';

  selectProjectList.appendChild(projectPlaceHolder);
  taskForm.appendChild(titleTask);
  taskForm.appendChild(descriptionTask);
  taskForm.appendChild(dateTask);
  taskForm.appendChild(priorityTask);
  taskForm.appendChild(selectProjectList);
  taskForm.appendChild(taskFormSubmit);
  taskForm.appendChild(taskFormReset);

  addTaskBtn.appendChild(taskForm);
}

// DOM MANIPULATION
function addToDoItemFromDOM() {
  const title = document.getElementById('title-task').value;
  const description = document.getElementById('description-task').value;
  const dueDate = format(new UTCDate((document.getElementById('date-task').value)), 'MM/dd/yyyy');
  const priority = document.getElementById('priority-task').value;
  const project = document.querySelector('.selectProject').value;
  const newToDo = new ToDoItem(title, description, dueDate, priority, project);
  return newToDo;
}

function addDropDown() {
  const selectProject = document.querySelector('.selectProject');
  selectProject.innerHTML = '';
  const projectArray = ProjectControl.projectNameList;
  projectArray.forEach((arrayObject) => {
    const option = document.createElement('option');
    option.textContent = arrayObject.projectTitle;
    selectProject.appendChild(option);
  })
}

function updateProjectDOMDisplay() {
  const projectDisplay = document.querySelector('.projectDisplay');
  projectDisplay.innerHTML = '';
  const projectManagerArray = ProjectControl.projectNameList;
  projectManagerArray.forEach((arrayObject) => {
    createProject(arrayObject);
  })
}

function updateAllToDo() {
  const taskDisplay = document.querySelector('.taskDisplay');
  taskDisplay.innerHTML = '';
  const projectManagerArray = ProjectControl.projectNameList;
  const newArray = projectManagerArray.map(project => project.projectTaskList).flat(Infinity);
  newArray.forEach((toDoObject) => {
    createTask(toDoObject)
  })
}

function updateTodayAllToDo() {
  const taskDisplay = document.querySelector('.taskDisplay');
  taskDisplay.innerHTML = '';
  const projectManagerArray = ProjectControl.projectNameList;
  const filterDate = format(new UTCDate(), 'MM/dd/yyyy');
  const newArray = projectManagerArray.map(project => project.projectTaskList).flat(Infinity).filter((toDo) => toDo.dueDate === filterDate);
  newArray.forEach((toDoObject) => {
    createTask(toDoObject)
  })
}

function updateUpcomingToDo() {
  const taskDisplay = document.querySelector('.taskDisplay');
  taskDisplay.innerHTML = '';
  const projectManagerArray = ProjectControl.projectNameList;
  const filterDate = format(new UTCDate(), 'MM/dd/yyyy');
  const newArray = projectManagerArray.map(project => project.projectTaskList).flat(Infinity).filter((toDo) => toDo.dueDate > filterDate);
  newArray.forEach((toDoObject) => {
    createTask(toDoObject)
  })
}

function updateProjectSpecificToDo() {
  const taskDisplay = document.querySelector('.taskDisplay');
  taskDisplay.innerHTML = '';
  const projectManagerArray = ProjectControl.projectNameList;
  const newArray = projectManagerArray.map(project => project.projectTaskList).flat(Infinity).filter((toDo) => toDo.project === event.target.id);
  newArray.forEach((toDoObject) => {
    createTask(toDoObject)
  })
}

export { updateProjectSpecificToDo, updateUpcomingToDo, updateTodayAllToDo, updateAllToDo, addToDoItemFromDOM, createTask, createProject, renderInitialForms, addDropDown, updateProjectDOMDisplay };