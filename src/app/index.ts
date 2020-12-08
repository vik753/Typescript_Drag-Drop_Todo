import AddForm from './components/AddForm';
import Desk from './components/Desk';
import { state } from './state/State';
import {Desks} from './helpers/helpers';

const addForm = new AddForm();
const desk1 = new Desk(Desks.Created);
const desk2 = new Desk(Desks['To Do']);
const desk3 = new Desk(Desks.Done);
state.desks = [desk1, desk2, desk3];
state.restartListeners();
