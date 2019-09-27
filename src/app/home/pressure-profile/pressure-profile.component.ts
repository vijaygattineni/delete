import { Component, OnInit, ViewEncapsulation} from '@angular/core';
declare let d3: any;

@Component({
  selector: 'app-pressure-profile',
  templateUrl: './pressure-profile.component.html',
  styleUrls: ['./pressure-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PressureProfileComponent implements OnInit {

  constructor() { }

  drawChart() {

    let pressureData = [[1, 2, 'Right Fetus'], [3, 5, 'Right Log'], [6, 9, 'Left Fetus'], [11, 12, 'Supine'], [3, 4, 'Prone']];

    let colors = ['#0066AE', '#0066AE', '#0066AE', '#0066AE', '#0066AE'];

    let grid = d3.range(25).map(function (i) {
      return {
        'x1': 0,
        'y1': 0,
        'x2': 0,
        'y2': 380
      };
    });


    let xscale = d3.scale.linear()
      .domain([0, d3.max(pressureData, function (d) { return d[1]; })])
      .range([0, 622]);

    let yscale = d3.scale.linear()
      .domain([0, pressureData.length])
      .range([0, 380]);

    let colorScale = d3.scale.quantize()
      .domain([0, pressureData.length])
      .range(colors);

    let canvas = d3.select('#wrapper')
      .append('svg')
      .attr({
        'width': 800,
        'height': 450
      });

    // let grids = canvas.append('g')
    //   .attr('id', 'grid')
    //   .attr('transform', 'translate(150,10)')
    //   .selectAll('line')
    //   .data(grid)
    //   .enter()
    //   .append('line')
    //   .attr({
    //     'x1': function (d, i) {
    //       return i * 25;
    //     },
    //     'y1': function (d) {
    //       return d.y1;
    //     },
    //     'x2': function (d, i) {
    //       return i * 25;
    //     },
    //     'y2': function (d) {
    //       return d.y2;
    //     },
    //   })
    //   .style({
    //     'stroke': '#adadad',
    //     'stroke-width': '1px'
    //   });

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
        if(pressureData && pressureData[i] && pressureData[i][2]){
          return pressureData[i][2];
        }
      })
      .tickValues(d3.range(17));

    let y_xis = canvas.append('g')
      .attr('transform', 'translate(150,10)')
      .attr('id', 'yaxis')
      .call(yAxis);

    let x_xis = canvas.append('g')
      .attr('transform', 'translate(150,380)')
      .attr('id', 'xaxis')
      .call(xAxis);

      var tooltip = d3.select("body").append("div")   
      .attr("class", "pressure-tooltip tooltip")               
      .style("opacity", 0);

    let chart = canvas.append('g')
      .attr('transform', 'translate(150,0)')
      .attr('id', 'bars')
      .selectAll('rect')
      .data(pressureData)
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
      })
      .on('mousemove', function (d) {
        d3.select(this).attr("fill", "blue").attr("r", 15);
        tooltip.html(d[2] + "<br> Time in " + d[0] + " <br> " + " Time Out "+ d[1])
          .style("opacity", 1)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on('mouseout', function () {
        tooltip.style("opacity", 0);
      });

    let transit = d3.select('svg').selectAll('rect')
      .data(pressureData)
      .transition()
      .duration(1000)
      .attr('width', function (d) {
        return xscale(d[1]) - xscale(d[0]);
      });
  }

  ngOnInit() {
    this.drawChart();
  }

}
