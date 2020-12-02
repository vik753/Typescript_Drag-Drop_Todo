export default class AddForm {
  headerEl: HTMLElement;
  private static addFormEl: HTMLFormElement;
  private static titleInputEl: HTMLInputElement;
  private static descriptionInputEl: HTMLInputElement;
  constructor() {
    this.headerEl = document.getElementById('header')! as HTMLElement;
    this.headerEl.insertAdjacentHTML('beforeend', AddForm.render());
    AddForm.addFormEl = document.getElementById('addTodo')! as HTMLFormElement;
    AddForm.titleInputEl = document.getElementById('title')! as HTMLInputElement;
    AddForm.descriptionInputEl = document.getElementById('description')! as HTMLInputElement;

    AddForm.configure();
  }

  static configure() {
    this.addFormEl.addEventListener('submit', AddForm.submitHandler);
  }

  static submitHandler(e: Event) {
    e.preventDefault();
    const title = AddForm.titleInputEl.value;
    const description = AddForm.descriptionInputEl.value;
    console.log(title, description);

    const isTitleValid = AddForm.validate({ value: title, min: 1, max: 20 });
    const isDescriptionValid = AddForm.validate({ value: description, min: 5, max: 50 });
    // Validate inputs
    if (!isTitleValid || !isDescriptionValid) {
      alert('Your input is invalid! Please try again.');
      return;
    }
    // Todo - create new Todo and save

  }

  static validate<T extends { value: string; min?: number; max?: number }>(obj: T): boolean {
    const { value, min, max } = obj;
    let isValid = true;
    isValid = isValid && value.trim().length !== 0;
    isValid = isValid && !!min && value.length >= min;
    isValid = isValid && !!max && value.length <= max;
    return isValid;
  }

  static render() {
    return `
      <form id="addTodo" class="addTodo">
        <h3 class="addTodo__title">Add new todo</h3>
        <label for="title" class="addTodo__title_label">
          Title
          <input id="title" type="text" placeholder="todo title" />
        </label>
        <label for="description" class="addTodo__description_label">
          Description
          <input id="description" class="description" type="text" placeholder="todo description"/>
        </label>
        <button type="submit" class="submit">Submit</button>
      </form>
    `;
  }
}
