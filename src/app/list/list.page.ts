import { Component, OnInit } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

export class Message {
  constructor(
    public sender: string,
    public content: string,
    public isBroadcast = false,
  ) { }
}

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public items: Array<{ title: string; note: string; icon: string }> = [];
  public message: any;

  constructor() {
    const subject = webSocket('ws://192.168.238.201:3000');

    subject.subscribe(
      msg => {
        console.log('message received: ' + msg);
        debugger;
        this.message = msg;
      }, // Called whenever there is a message from the server.
      err => {
        console.log('error', err);
      }, // Called if at any point WebSocket API signals some kind of error.
      () => {
        debugger;
        console.log('complete');
      }// Called when connection is closed (for whatever reason).
    );

    subject.next({ message: 'hello world' });
  }

  ngOnInit() {
  }

}
