class ChatRoom {
  constructor(username, room) {
    this.username = username;
    this.room = room;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  getChat(callback) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            //upadte ui
            callback(change.doc.data());
          }
        });
      });
  }

  updateUsername(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}

// // simulate user click action
// setTimeout(() => {
//   chatRoom.updateRoom("music");
//   chatRoom.getChat((data) => {
//     console.log(data);
//   });
//   chatRoom.updateUsername("Shamsu");
//   chatRoom.addChat("I love clb");
// }, 3000);
