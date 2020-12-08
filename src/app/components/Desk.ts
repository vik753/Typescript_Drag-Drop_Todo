import { state, STATUS } from '../state/State';
import { Desks } from '../helpers/helpers';

class Desk {
  public mainWrapperEl: HTMLElement;
  public desk: HTMLElement;

  constructor(public title: Desks) {
    this.mainWrapperEl = document.getElementById('mainWrapper')! as HTMLElement;
    this.renderDesk();
    this.desk = document.querySelector(`.desc${title + 1}`)! as HTMLElement;
    this.configure();
  }

  configure() {
    this.desk.addEventListener('drop', (e) => {
      const todoId = e.dataTransfer!.getData('text/plain');
      if (!todoId) {
        return;
      }
      const targetTodo = state.getTodos().filter((todo) => todo.id === todoId)[0];
      targetTodo.status = +this.title;
      state.updateTodo(targetTodo);
    });

    this.desk.addEventListener('dragover', (e) => {
      if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
        e.preventDefault();
        if (!this.desk.classList.contains('dropArea')) {
          this.desk.classList.add('dropArea');
        }
      }
    });

    this.desk.addEventListener('dragleave', (e: DragEvent) => {
      if (this.desk.classList.contains('dropArea')) {
        this.desk.classList.remove('dropArea');
      }
    });
  }

  renderDesk() {
    this.mainWrapperEl.insertAdjacentHTML('beforeend', Desk.getHtml(Desks[this.title], this.title));
  }

  static getHtml(title: string, index: number) {
    return `
      <div class="desc desc${index + 1}" id="desc">
        <h3 class="desc__title">${title}</h3>
        <div class="todos" id="todos-${STATUS[index]}"></div>
      </div>
    `;
  }
}

export default Desk;
