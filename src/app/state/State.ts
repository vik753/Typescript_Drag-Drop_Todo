import {CreatedData} from '../helpers/helpers';

enum STATUS {
  created,
  inProcess,
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

  private constructor() {}

  static getInstance() {
    if (State.instance) {
      return State.instance;
    }
    return (State.instance = new State());
  }

  static restartListeners() {
    this.listeners.forEach((listener) => listener(State.todosState));
  }

  setListener(listener: Function) {
    State.listeners = [...State.listeners, listener];
  }

  setTodo(todoObj: TODO) {
    State.todosState = [...State.todosState, todoObj];
    State.restartListeners();
  }

  removeTodo(id: string) {
    const currentState = State.todosState;
    State.todosState = currentState.filter((todo) => todo.id !== id);
  }

  getTodos(): Array<TODO> {
    return State.todosState;
  }
}

const state = State.getInstance();

export { state, STATUS, TODO };
