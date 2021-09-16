class ChatUi {
  constructor(list) {
    this.list = list;
  }

  clear() {
    this.list.innerHTML = "";
  }

  render(data) {
    let html = `
      
      
      `;
    this.list.innerHTML += html;
  }
}
