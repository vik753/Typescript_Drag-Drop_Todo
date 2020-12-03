class Desk {
  private static titles: Array<string>;
  private static mainWrapperEl: HTMLElement;

  constructor(titles?: Array<string>) {
    Desk.titles = titles ? titles : ['TO DO', 'IN PROGRESS', 'DONE'];
    Desk.mainWrapperEl = document.getElementById('mainWrapper')! as HTMLElement;
    Desk.renderDesk();
  }

  static renderDesk() {
    Desk.titles.forEach((deskTitle) => {
      Desk.mainWrapperEl.insertAdjacentHTML('beforeend', Desk.getHtml(deskTitle));
    });
  }

  static getHtml(title: string) {
    return `
      <div class="desc desc1">
        <h3 class="desc__title">${title}</h3>
        <div class="todos" id="todos"></div>
      </div>
    `;
  }
}

export default Desk;
