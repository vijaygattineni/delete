import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
declare let d3: any;
import { HomeService } from '../home.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-pressure-profile',
  templateUrl: './pressure-profile.component.html',
  styleUrls: ['./pressure-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PressureProfileComponent implements OnInit, OnDestroy {

  profileChartLoading: boolean;
  patientDetails: any;
  pressureChartData: Array<object>;
  noData: any;

  constructor(public homeService: HomeService, public toast: ToastService) {
    if (localStorage.getItem('dataSource')) {
      this.patientDetails = JSON.parse(localStorage.getItem('dataSource'));
    }
  }

  formatISOtoUnix(iso) {
    return (Date.parse(iso) / 1000);
  }

  drawChart() {
    let pressureData = this.pressureChartData;
    let colors = ['#0066AE', '#0066AE', '#0066AE', '#0066AE', '#0066AE'];

    const timeFormat = (unixTimestamp: any) => {
      let date = new Date(unixTimestamp * 1000);
      let hours = date.getHours();
      let minutes = '0' + date.getMinutes();
      // let seconds = '0' + date.getSeconds();
      let formattedTime = hours + ':' + minutes.substr(-2);
      return formattedTime;
    };

    let grid = d3.range(25).map(function (i) {
      return { x1: 0, y1: 0, x2: 0, y2: 380 };
    });

    let xscale = d3.scale.linear()
      .domain([d3.min(pressureData, function (d) { return d.created_at; }), d3.max(pressureData, function (d) { return d.updated_at; })])
      .range([0, 622]);

    let yscale = d3.scale.linear()
      .domain([0, pressureData.length])
      .range([0, 380]);

    let colorScale = d3.scale.quantize()
      .domain([0, pressureData.length])
      .range(colors);

    let ele = document.getElementById("wrapper"),
    eleStyle = window.getComputedStyle(ele);
    let eleWidth = eleStyle.width;

    let canvas = d3.select('#wrapper')
      .append('svg')
      .attr({
        'width': eleWidth,
        'height': 450
      });

    let xAxis = d3.svg.axis();
    xAxis
      .orient('bottom')
      // .ticks(4)
      .tickFormat(function (d, i) {
        return timeFormat(d);
      })
      .scale(xscale);

    let yAxis = d3.svg.axis();
    yAxis
      .orient('left')
      .scale(yscale)
      .tickSize(2)
      .tickFormat(function (d, i) {
        if (pressureData && pressureData[i] && pressureData[i]['risk_area']) {
          return pressureData[i]['risk_area'];
        }
      })
      .tickValues(d3.range(17));

    let y_xis = canvas.append('g')
      .attr('transform', 'translate(75,10)')
      .attr('id', 'yaxis')
      .call(yAxis);

    let x_xis = canvas.append('g')
      .attr('transform', 'translate(75,380)')
      .attr('id', 'xaxis')
      .call(xAxis);

    var tooltip = d3.select('body').append('div')
      .attr('class', 'pressure-tooltip tooltip')
      .style('opacity', 0);

    let chart = canvas.append('g')
      .attr('transform', 'translate(75,0)')
      .attr('id', 'bars')
      .selectAll('rect')
      .data(pressureData)
      .enter()
      .append('rect')
      .attr('height', 19)
      .attr({
        'x': function (d) {
          return xscale(d.created_at);
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
        d3.select(this).attr('fill', 'blue').attr('r', 15);
        tooltip.html(d.risk_area + '<br> Time in ' + timeFormat(d.created_at) + ' <br> ' + ' Time Out ' + timeFormat(d.updated_at))
          .style('opacity', 1)
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    let transit = d3.select('svg').selectAll('rect')
      .data(pressureData)
      .transition()
      .duration(1000)
      .attr('width', function (d) {
        return xscale(d.updated_at) - xscale(d.created_at);
      });
  }

  ngOnDestroy() {
    d3.select('.pressure-tooltip').remove();
  }

  ngOnInit() {
    this.profileChartLoading = true;
    this.noData = false;
    this.pressureChartData = [];
    this.homeService.getCurrentRiskRecommendations(this.patientDetails.id)
      .subscribe((response) => {
        this.profileChartLoading = false;
        response = [{
          risk_area: 'Right Fetus',
          created_at: '2019-10-16T09:25:00.663684Z',
          updated_at: '2019-10-16T10:25:00.663715Z',
        }, {
          risk_area: 'Right Log',
          created_at: '2019-10-16T11:25:00.667892Z',
          updated_at: '2019-10-16T12:25:00.667924Z',
        },
        {
          risk_area: 'Left Fetus',
          created_at: '2019-10-16T12:25:00.667892Z',
          updated_at: '2019-10-16T13:25:00.667892Z',
        }, {
          risk_area: 'Spine',
          created_at: '2019-10-16T15:25:00.667892Z',
          updated_at: '2019-10-16T19:25:00.667892Z',
        }
        ];
        response.forEach(element => {
          element.created_at = this.formatISOtoUnix(element.created_at);
          element.updated_at = this.formatISOtoUnix(element.updated_at);
          this.pressureChartData.push(element);
        });
        if (this.pressureChartData.length > 0) {
          this.drawChart();
        } else {
          this.noData = true;
        }
      }, (errorResponse) => {
        this.toast.toastPopup('Error while fetching pressure profile data.', 2000, 'danger');
      });
  }

}
