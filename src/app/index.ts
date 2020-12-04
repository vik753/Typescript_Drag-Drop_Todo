import AddForm from './components/AddForm';
import Desk from './components/Desk';
import { state } from './state/State';

const addForm = new AddForm();
const desks = Desk.getInstance();
state.desks = desks;
