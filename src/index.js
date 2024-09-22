import initializeAddListener from './Eventlisteners';
import './style.css'
import { renderInitialForms } from './TaskDOM';
import { loadFromStorage } from './localstorage';

renderInitialForms();
initializeAddListener();

const jsonKey = 'ProjectControl';
window.onload = loadFromStorage(jsonKey);











