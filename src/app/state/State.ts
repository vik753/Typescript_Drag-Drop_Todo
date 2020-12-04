import {CreatedData} from '../helpers/helpers';
import Desk from '../components/Desk';
import {To_Do} from '../components/To_Do';

enum STATUS {
  created,
  inProgress,
  done,
}

interface TODO {
  id: string;
  title: string;
  description: string;
  created: CreatedData;
  status: STATUS;
}

class State {
  private static todosState: Array<TODO> = [];
  private static listeners: Array<Function> = [];
  private static instance: State;
  public desks: null | Desk = null;

  private constructor() {
    this.configure();
  }

  static getInstance() {
    if (State.instance) {
      return State.instance;
    }
    return (State.instance = new State());
  }

  private configure() {
    this.setListener((todos: Array<TODO>) => {
      todos.forEach(todo => {
        new To_Do(todo);
      })
    });
  }

  static restartListeners() {
    this.listeners.forEach((listener) => listener(State.todosState));
    console.log('restartListeners', this.todosState)
  }

  setListener(listener: Function) {
    State.listeners = [...State.listeners, listener];
    console.log('setListener', State.todosState)
  }

  setTodo(todoObj: TODO) {
    this.desks && this.desks.clearDescs();
    State.todosState = [...State.todosState, todoObj];
    State.restartListeners();
    console.log('setTodo', State.todosState)
  }

  updateTodo(todo: TODO) {
    let prevState = [...State.todosState];
    prevState = prevState.filter(targetTodo => targetTodo.id !== todo.id);
    State.todosState = [...prevState, todo];
    this.desks?.clearDescs();
    State.restartListeners();
    console.log('updateTodo', State.todosState)
  }

  removeTodo(id: string) {
    this.desks && this.desks.clearDescs();
    const currentState = State.todosState;
    State.todosState = currentState.filter((todo) => todo.id !== id);
    console.log('removeTodo', State.todosState)
  }

  getTodos(): Array<TODO> {
    return State.todosState;
  }
}

const state = State.getInstance();

export { state, STATUS, TODO };
