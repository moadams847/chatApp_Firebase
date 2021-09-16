// dom queries
const chatList = document.querySelector(".chatList");

// dom events

// class instances
const chatRoom = new ChatRoom("Adams", "general");
const chatUi = new ChatUi(chatList);
// update ui
chatRoom.getChat((data) => {
  console.log(data);
});
