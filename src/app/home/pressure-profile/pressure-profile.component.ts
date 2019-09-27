import { Component, OnInit } from '@angular/core';
declare let d3: any;

@Component({
  selector: 'app-pressure-profile',
  templateUrl: './pressure-profile.component.html',
  styleUrls: ['./pressure-profile.component.scss'],
})
export class PressureProfileComponent implements OnInit {

  constructor() { }

  drawChart() {

    let categories = [ 'Right Fetus', 'Right Log', 'Left Fetus', 'Supine', 'Prone'];

    let dollars = [[75, 209], [50, 190], [100, 179], [140, 156], [138, 209]];

    let colors = ['#0066AE', '#0066AE', '#0066AE', '#0066AE', '#0066AE'];

    let grid = d3.range(25).map(function (i) {
      return {
        'x1': 0,
        'y1': 0,
        'x2': 0,
        'y2': 480
      };
    });


    let xscale = d3.scale.linear()
      .domain([10, 250])
      .range([0, 722]);

    let yscale = d3.scale.linear()
      .domain([0, categories.length])
      .range([0, 480]);

    let colorScale = d3.scale.quantize()
      .domain([0, categories.length])
      .range(colors);

    let canvas = d3.select('#wrapper')
      .append('svg')
      .attr({
        'width': 800,
        'height': 550
      });

    let grids = canvas.append('g')
      .attr('id', 'grid')
      .attr('transform', 'translate(150,10)')
      .selectAll('line')
      .data(grid)
      .enter()
      .append('line')
      .attr({
        'x1': function (d, i) {
          return i * 30;
        },
        'y1': function (d) {
          return d.y1;
        },
        'x2': function (d, i) {
          return i * 30;
        },
        'y2': function (d) {
          return d.y2;
        },
      })
      .style({
        'stroke': '#adadad',
        'stroke-width': '1px'
      });

    let xAxis = d3.svg.axis();
    xAxis
      .orient('bottom')
      .scale(xscale)

    let yAxis = d3.svg.axis();
    yAxis
      .orient('left')
      .scale(yscale)
      .tickSize(2)
      .tickFormat(function (d, i) {
        return categories[i];
      })
      .tickValues(d3.range(17));

    let y_xis = canvas.append('g')
      .attr("transform", "translate(150,0)")
      .attr('id', 'yaxis')
      .call(yAxis);

    let x_xis = canvas.append('g')
      .attr("transform", "translate(150,480)")
      .attr('id', 'xaxis')
      .call(xAxis);

    let chart = canvas.append('g')
      .attr("transform", "translate(150,0)")
      .attr('id', 'bars')
      .selectAll('rect')
      .data(dollars)
      .enter()
      .append('rect')
      .attr('height', 19)
      .attr({
        'x': function (d) {
          return xscale(d[0]);
        },
        'y': function (d, i) {
          return yscale(i) + 19;
        }
      })
      .style('fill', function (d, i) {
        return colorScale(i);
      })
      .attr('width', function (d) {
        return 0;
      });


    let transit = d3.select("svg").selectAll("rect")
      .data(dollars)
      .transition()
      .duration(1000)
      .attr("width", function (d) {
        return xscale(d[1]) - xscale(d[0]);
      });
  }

  ngOnInit() {
    this.drawChart();
  }

}
