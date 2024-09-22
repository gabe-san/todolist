import initializeAddListener from './Eventlisteners';
import './style.css'
import { loadFromStorage, renderInitialForms } from './TaskDOM';

renderInitialForms();
initializeAddListener();

const jsonKey = 'ProjectControl';
loadFromStorage(jsonKey);











