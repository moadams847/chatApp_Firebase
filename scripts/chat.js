class ChatRoom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChats(message) {
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };
    const response = await this.chats.add(chat);
    return response;
  }

  //   real time listener
  // will be listening every time
  // hence not an async task

  getChats(callback) {
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

  updateName(username) {
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

// // emulate user click
// setTimeout(() => {
//   chatRoom.updateRoom("gaming");
//   //   chatRoom.updateName("Shaun");
//   chatRoom.getChats((data) => {
//     console.log(data);
//   });
//   //   chatRoom.addChats("hello");
// }, 3000);
