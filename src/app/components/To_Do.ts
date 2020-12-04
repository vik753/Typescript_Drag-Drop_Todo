import { state, STATUS, TODO } from '../state/State';

class To_Do {
  public todo: TODO;
  static parent: HTMLElement;
  public btnPrev: HTMLButtonElement;
  public btnNext: HTMLButtonElement;
  constructor(todo: TODO) {
    this.todo = todo;
    To_Do.parent = document.getElementById(`todos-${STATUS[todo.status]}`)! as HTMLElement;
    To_Do.parent.insertAdjacentHTML('beforeend', this.renderDesk());
    this.btnPrev = document.querySelector(`[data-prevId="${this.todo.id}"]`)! as HTMLButtonElement;
    this.btnNext = document.querySelector(`[data-nextId="${this.todo.id}"]`)! as HTMLButtonElement;
    this.configure();
  }

  configure() {
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', this.changeStatusHandler.bind(this));
    }
    if (this.btnNext) {
      this.btnNext.addEventListener('click', this.changeStatusHandler.bind(this));
    }
  }

  changeStatusHandler(e: Event) {
    e.preventDefault();
    const btn = e.target as HTMLButtonElement;
    let key;
    Object.keys({ ...btn.dataset }).forEach((k) => (key = k));

    if (key === 'nextid') {
      this.todo.status += 1;
      state.updateTodo(this.todo);
    } else if (key === 'previd') {
      this.todo.status -= 1;
      state.updateTodo(this.todo);
    }
  }

  renderDesk() {
    return `
      <div class="todo" id="todo" data-id="${this.todo.id}">
        <div class="todo__title">
          <h4 class="todo__title-text">${this.todo.title}</h4>
          <span class="todo__title-created"><b>Created: </b>${this.todo.created.rawDate.toLocaleString()}</span>
          <hr />
        </div>
        <p class="todo__description">${this.todo.description}</p>
        <div class="todo__status">
          ${
            this.todo.status !== STATUS.created
              ? `<button id="btnPrev" data-previd="${this.todo.id}" class="todo__status_btn todo__status_btn-prev">Prev</button>`
              : ''
          }
          <span class="todo__status-text">Change status</span>
          ${
            this.todo.status !== STATUS.done
              ? `<button id="btnNext" data-nextid="${this.todo.id}" class="todo__status_btn todo__status_btn-next">Next</button>`
              : ''
          }
        </div>
      </div>
    `;
  }
}

export { To_Do };
