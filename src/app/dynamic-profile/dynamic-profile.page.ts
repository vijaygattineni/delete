import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { webSocket } from 'rxjs/webSocket';
declare let d3: any;
import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';

export class Message {
  constructor(
    public sender: string,
    public content: string,
    public isBroadcast = false,
  ) { }
}

@Component({
  selector: 'app-dynamic-profile',
  templateUrl: './dynamic-profile.page.html',
  styleUrls: ['./dynamic-profile.page.scss'],
})
export class DynamicProfilePage implements OnInit {

  public message: any;
  // public d3v4: any;

  constructor(public toastController: ToastController) {
    //d3 = d3;

    const ws = new $WebSocket('ws://192.168.239.95:8080');
    ws.send('hello');
    // set received message callback
    ws.onMessage(
      (msg: MessageEvent) => {
        console.log('onMessage ', msg.data);
        this.message = msg.data;
        this.drawChart();
      },
      { autoApply: false }
    );

    // set received message stream
    ws.getDataStream().subscribe(
      (msg) => {
        console.log('next', msg.data);
      },
      (msg) => {
        console.log('error', msg);
      },
      () => {
        console.log('complete');
      }
    );

    const onErrorCB = async () => {
      const toast = await toastController.create({
        message: 'Error in connection. Unable to connect to device.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    };

    const onConnectionOpenCB = async () => {
      const toast = await toastController.create({
        message: 'Connected to device',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    };

    ws.onError(onErrorCB);
    ws.onOpen(onConnectionOpenCB);
  }

  drawChart() {

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 30, left: 30 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    document.getElementById('wrapper').innerHTML = '';

    var svg = d3.select('#wrapper')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')');

    var myGroups = ['1', '2', '3', '4', '5'];
    var myVars = ['1', '2', '3', '4', '5'];



    // Build X scales and axis:

    var x = d3.scale.ordinal().domain(myGroups).rangeBands([0, width]);
    var y = d3.scale.ordinal().domain(myVars).rangeBands([height, 0]);

    var myColor = d3.scale.linear()
      .range(['red', 'black'])
      .domain([1, 5])

    var test = this.message.split('');

    var data = [];
    var ind = 0;
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        data.push({ 'group': i, 'variable': j, 'value': test[ind] })
        ind++;
      }
    }

    svg.selectAll()
      .data(data, function (d) { return d.group + ':' + d.variable; })
      .enter()
      .append('rect')
      .attr('x', function (d) { return x(d.group) })
      .attr('y', function (d) { return y(d.variable) })
      .attr('width', x.rangeBand())
      .attr('height', y.rangeBand())
      .style('fill', function (d) { return myColor(d.value) })

    //})
  }

  ngOnInit() {
  }
}
