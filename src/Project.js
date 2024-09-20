export default class Project {
  constructor(projectTitle) {
    this.projectTitle = projectTitle;
    this.projectTaskList = [];
  }

  setName(projectTitle) {
    this.projectTitle = projectTitle;
  }

  getName() {
    return this.projectTitle;
  }

  addToDo(ToDoItem) {
    this.projectTaskList.push(ToDoItem);
  }

  removeToDo(index) {
    this.projectTaskList.splice(index, 1);
  }
}

