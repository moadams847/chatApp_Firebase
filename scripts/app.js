// dom queries
const chatList = document.querySelector(".chatList");
const newChatForm = document.querySelector(".newChat");
const chatRooms = document.querySelector(".chatRooms");
const newName = document.querySelector(".newName");
const updateMssg = document.querySelector(".updateMssg");

// dom events
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatRoom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
      console.log("chat added");
    })
    .catch((e) => {
      console.log(e);
    });
});

newName.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = newName.name.value.trim();
  chatRoom.updateUsername(username);
  newName.reset();

  updateMssg.innerText = `Your name was updated to ${username}`;
  setTimeout(() => {
    updateMssg.innerText = "";
  }, 3000);
});

chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUi.clear();
    const room = e.target.getAttribute("id");
    chatRoom.updateRoom(room);
    chatRoom.getChat((chats) => chatUi.render(chats));
  }
});

// local storage logic
const username = localStorage.username ? localStorage.username : "anon";

// class instances
const chatRoom = new ChatRoom(username, "general");
const chatUi = new ChatUi(chatList);

// update ui
chatRoom.getChat((data) => chatUi.render(data));
