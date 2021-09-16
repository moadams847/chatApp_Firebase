// dom queries
const chatList = document.querySelector(".chatList");
const newChatForm = document.querySelector(".newChat");
const newNameForm = document.querySelector(".newName");
const updateMssg = document.querySelector(".updateMssg");
const chatRooms = document.querySelector(".chatRooms");
// add new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatRoom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch((e) => {
      console.log(e);
    });
});

// update user name
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //   update name via chatroom class
  const newName = newNameForm.name.value.trim();
  chatRoom.updateName(newName);

  //   reset form
  newNameForm.reset();

  //   show and hide the update msg
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => {
    updateMssg.innerText = "";
  }, 3000);
});

// update the chat room
chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUi.clear();
    chatRoom.updateRoom(e.target.getAttribute("id"));
    chatRoom.getChat((chat) => chatUi.render(chat));
    console.log("local");
  }
});

// check local storage for name
const username = localStorage.getItem("username")
  ? localStorage.getItem("username")
  : "anon";

// class instances
const chatUi = new Chatui(chatList);
const chatRoom = new Chatroom("general", username);

// gets chats and render
chatRoom.getChat((data) => chatUi.render(data));
console.log("global");
