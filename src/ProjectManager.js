import Project from './Project';

class ProjectManager {
  constructor(name) {
    this.name = name;
    this.projectNameList = [];
  }

  newProject(projectTitle) {
    const project = new Project(projectTitle);
    this.projectNameList.push(project);
    return project
  }

  removeProject(index) {
    // this.taskList = this.taskList.filter((task) => task.name !== taskName);
    this.projectNameList.splice(index, 1);
  }
}

const ProjectControl = new ProjectManager('ProjectControl');

export default ProjectControl;