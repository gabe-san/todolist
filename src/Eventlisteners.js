/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
import { saveToStorage } from './localstorage';
import ProjectControl from './ProjectManager';
import { addDropDown, addToDoItemFromDOM, createProject, createTask, updateAllToDo, updateProjectDOMDisplay, updateProjectSpecificToDo, updateTodayAllToDo, updateUpcomingToDo } from './TaskDOM';

export default function initializeAddListeners() {
  // STATIC BUTTONS
  const addTaskButton = document.querySelector('.add-task-btn');
  addTaskButton.addEventListener('click', () => {
    addTaskButton.style.visibility = 'hidden';
    const formAnchor = document.querySelector('.taskFormToggle');
    formAnchor.style.display = '';
    updateAllToDo();
  });

  const addProjectButton = document.querySelector('.add-projects');
  addProjectButton.addEventListener('click', () => {
    const formAnchor = document.querySelector('.projectFormToggle');
    addProjectButton.style.visibility = 'hidden';
    formAnchor.style.display = '';
    updateProjectDOMDisplay();
    addDropDown();
  });

  const inboxButton = document.querySelector('.showAllTasks');
  inboxButton.addEventListener('click', () => {
    event.preventDefault();
    updateAllToDo();
  })

  const todayButton = document.querySelector('.showTodayTasks');
  todayButton.addEventListener('click', () => {
    event.preventDefault();
    updateTodayAllToDo();
  })

  const upcomingButton = document.querySelector('.showTasksWeek');
  upcomingButton.addEventListener('click', () => {
    event.preventDefault();
    updateUpcomingToDo();
  })

  const projectNavWrapper = document.querySelector('.projectDisplay');
  // eslint-disable-next-line consistent-return
  projectNavWrapper.addEventListener('click', (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
      return false
    }
    updateProjectSpecificToDo();
  });

  const submitTaskButton = document.querySelector('.main');
  // eslint-disable-next-line consistent-return
  submitTaskButton.addEventListener('submit', () => {
    event.preventDefault();
    const priorityOutput = document.querySelector('#priority-task');
    const projectOutput = document.querySelector('.selectProject');
    const taskDisplay = document.querySelector('.taskDisplay');
    if (priorityOutput.value === 'Priority' || projectOutput.value === 'Choose project') {
      return false
    }
    taskDisplay.innerHTML = '';
    const item = addToDoItemFromDOM();
    createTask(item);

    const projectArray = ProjectControl.projectNameList;
    const toDoTarget = projectArray.filter(project => project.projectTitle === item.project);
    toDoTarget[0].projectTaskList.push(item);
    saveToStorage(ProjectControl);
    updateAllToDo();
  });

  const submitProjectButton = document.querySelector('.projectContainer');
  // eslint-disable-next-line consistent-return
  submitProjectButton.addEventListener('submit', () => {
    event.preventDefault();
    const projectInput = document.querySelector('#projectTitle');
    const projectNameInput = document.querySelector('#projectTitle').value;
    const project = ProjectControl.newProject(projectNameInput);
    if (projectInput.value === '') {
      return false
    }
    createProject(project)
    saveToStorage(ProjectControl);
    addDropDown();
  });
};