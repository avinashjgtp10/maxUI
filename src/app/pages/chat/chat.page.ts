import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import * as io from "socket.io-client";
// import { ChatServiceService } from "../../services/chatService/chat-service.service";
// import { ToasterService } from "../../services/toaster/toaster.service";
import { Storage } from "@ionic/storage";
import { Location } from "@angular/common";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  newMessage: string;
  messageList: string[] = [];
  currentUser = "";
  private showOptions: boolean = false;
  messages: Array<any> = [];
  chatStatus = 'Offline'

  private contactInfo: any = {
    name: "JOHN DOE",
    status: "Offline",
  };

  constructor( private storage: Storage,
    private location: Location,
    private socket: Socket ) { }

  ngOnInit() {
    this.socket.connect();
    let name = `${new Date().getTime()}`;
    this.currentUser = name;
    this.socket.emit("set-name", name);

    this.socket.fromEvent("user-changed").subscribe((data: any) => {
      let user = data["user"];
      if (data["event"] === "left") {
        this.contactInfo.status = 'Offline'
      } else {
        this.contactInfo.status = 'Online'
      }
    });

    this.socket.fromEvent("message").subscribe((message) => {

        message["type"] = message["withWhom"] == localStorage.getItem('c_id')? "received" : "send";
      this.messages.push(message);
     
    });

    // this.chatService.getMessages().subscribe((message: string) => {
      
    //   this.storage.get("LoginId").then(async (val) => {
    //     message["type"] = message["withWhom"] == val? "received" : "send";
    //   this.messages.push(message);
    //   }) 


    // });
  }


  showOptionsToggle(value?: boolean) {
    if (value !== undefined) {
      this.showOptions = value;
      return;
    }
    this.showOptions = !this.showOptions;
  }

  sendMessage() {
      this.socket.emit("send-messgae", {
        text: this.newMessage,
        type: "send",
        created: new Date(),
        user: localStorage.getItem('c_id'),
        withWhom: '12',
      });
      this.newMessage = "";
  }

  closeModal(){
    this.location.back()
  }

 


}
