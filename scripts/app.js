// dom query
const listGroup = document.querySelector(".listGroup");
const newChatForm = document.querySelector(".newChat");
const newNameForm = document.querySelector(".newName");
const updateMSG = document.querySelector(".updateMssg");
const chatRooms = document.querySelector(".chatRooms");

// add a new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatRoom
    .addChats(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch((e) => {
      console.log(e);
    });
});

// update username
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatRoom.updateName(newName);
  updateMSG.innerText = `Your name was updated to ${newName}`;
  newNameForm.reset();

  setTimeout(() => {
    updateMSG.innerText = "";
  }, 3000);
});

// update rooms
chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUi.clear();
    chatRoom.updateRoom(e.target.getAttribute("id"));
    chatRoom.getChats((chats) => chatUi.render(chats));
  }
});

// check local storage for name
const username = localStorage.username ? localStorage.username : "anon";

// class instances
const chatUi = new ChatUi(listGroup);
const chatRoom = new ChatRoom("general", username);

// get chats and render
chatRoom.getChats((data) => chatUi.render(data));
