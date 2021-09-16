// adding new chat document
// set up a real time listener to get new chats
// update username
// update room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    //   format a chat object
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
    };

    // save chat docs
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
            console.log("live");

            callback(change.doc.data());
          }
        });
      });
  }

  updateName(userName) {
    this.username = userName;
    localStorage.setItem("username", userName);
  }

  updateRoom(room) {
    this.room = room;
    console.log("room updated");
    if (this.unsub) {
      this.unsub();
    }
  }
}
