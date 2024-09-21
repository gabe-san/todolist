export default class ToDoItem {
  static lastId = 0;

  constructor(title, description, dueDate, priority, project) {
    this.id = ++ToDoItem.lastId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.complete = false;
  }

  toggleIncomplete() {
    this.complete = !this.complete
  }
}

