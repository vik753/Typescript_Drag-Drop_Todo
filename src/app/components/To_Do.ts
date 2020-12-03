class To_Do {
  static renderDesk() {
    return `
      <div class="todo">
        <div class="todo__title">
          <h4 class="todo__title-text">Todo Title</h4>
          <span class="todo__title-created"><b>Created:</b> 4 March 2020 12:45</span>
          <hr />
        </div>
        <p class="todo__description">Todo description</p>
        <div class="todo__status">
          <button class="todo__status_btn todo__status_btn-prev">Prev</button>
          <span class="todo__status-text">Change status</span>
          <button class="todo__status_btn todo__status_btn-next">Next</button>
        </div>
      </div>
    `;
  }
}
