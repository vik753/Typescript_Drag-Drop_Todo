import { STATUS } from '../state/State';

class Desk {
  private static instance: Desk;
  private static titles: Array<string>;
  private static mainWrapperEl: HTMLElement;
  private static todosParents: NodeListOf<HTMLElement>;

  private constructor() {
    Desk.titles = ['TO DO', 'IN PROGRESS', 'DONE'];
    Desk.mainWrapperEl = document.getElementById('mainWrapper')! as HTMLElement;
    Desk.renderDesk();
    Desk.todosParents = document.querySelectorAll('[id^=todos-]')! as NodeListOf<HTMLElement>;
  }

  static getInstance(): Desk {
    if (Desk.instance) {
      return Desk.instance;
    }
    return (Desk.instance = new Desk());
  }

  static renderDesk() {
    Desk.titles.forEach((deskTitle, index) => {
      Desk.mainWrapperEl.insertAdjacentHTML('beforeend', Desk.getHtml(deskTitle, index));
    });
  }

  clearDescs() {
    Desk.todosParents.forEach((parent) => {
      parent.innerHTML = '';
    });
  }

  static getHtml(title: string, index: number) {
    return `
      <div class="desc desc${index + 1}">
        <h3 class="desc__title">${title}</h3>
        <div class="todos" id="todos-${STATUS[index]}"></div>
      </div>
    `;
  }
}

export default Desk;
