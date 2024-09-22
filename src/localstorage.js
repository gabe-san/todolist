import ProjectControl from './ProjectManager';

function saveToStorage(object) {
  localStorage.setItem('ProjectControl', JSON.stringify(object));
}

function loadFromStorage(objectkey) {
  const sessionData = localStorage.getItem(objectkey);
  if (sessionData) {
    const parsedSessionData = JSON.parse(sessionData);
    Object.assign(ProjectControl, parsedSessionData);
  } else {
    console.log('Object not found');
  }
}

export { saveToStorage, loadFromStorage }