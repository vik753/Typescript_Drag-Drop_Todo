import { CreatedData, Desks } from '../helpers/helpers';
import Desk from '../components/Desk';
import { To_Do } from '../components/To_Do';

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
  public desks: Array<Desk> = [];

  private constructor() {
    State.appealToLocalStorage();
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
      todos.forEach((todo) => {
        new To_Do(todo);
      });
    });
  }

  private static appealToLocalStorage(todos?: Array<TODO>) {
    let savedTodos: Array<TODO>;
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
      return;
    }

    const rawTodos = localStorage.getItem('todos');
    if (rawTodos && rawTodos !== 'null') {
      savedTodos = JSON.parse(rawTodos);
      State.todosState = savedTodos;
    }
  }

  restartListeners() {
    State.listeners.forEach((listener) => {
      listener(State.todosState);
    });
  }

  setListener(listener: Function) {
    State.listeners = [...State.listeners, listener];
  }

  clearDesc() {
    this.desks?.forEach((d) => {
      const deskWrapperEl = d.desk.querySelector(`[id^=todos-]`)!;
      deskWrapperEl.innerHTML = '';
    });
  }

  setTodo(todoObj: TODO) {
    this.desks && this.clearDesc();
    State.todosState = [...State.todosState, todoObj];
    this.restartListeners();
    State.appealToLocalStorage(State.todosState);
  }

  updateTodo(todo: TODO) {
    let prevState = [...State.todosState];
    prevState = prevState.filter((targetTodo) => targetTodo.id !== todo.id);
    State.todosState = [...prevState, todo];
    this.desks && this.clearDesc();
    State.appealToLocalStorage(State.todosState);
    this.restartListeners();
  }

  removeTodo(id: string) {
    this.desks && this.clearDesc();
    const currentState = State.todosState;
    State.todosState = currentState.filter((todo) => todo.id !== id);
    State.appealToLocalStorage(State.todosState);
  }

  getTodos(): Array<TODO> {
    return State.todosState;
  }
}

const state = State.getInstance();

export { state, STATUS, TODO };
