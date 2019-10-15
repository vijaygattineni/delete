import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RiskMonitorService } from './risk-monitor.service';

declare let d3: any;

@Component({
  selector: 'app-risk-monitor',
  templateUrl: './risk-monitor.component.html',
  styleUrls: ['./risk-monitor.component.scss', '../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class RiskMonitorComponent implements OnInit {

  options;
  data;
  riskData;
  color: string;
  risktypeData;
  localStorageId: any;
  getData: any;
  riskDataInProgress:boolean;
  noRiskData: boolean;
  graphData: any;
  linedata: any;

  constructor(private riskmonitorService: RiskMonitorService) { }

  ngOnInit() {
    this.riskDataInProgress=true;
    this.noRiskData = false;

    this.localStorageId = JSON.parse(localStorage.getItem('dataSource'));

    this.getRiskmonitorDetails(this.localStorageId.id);

    this.options = {
      chart: {
        type: 'lineChart',
        height: 250,
        forceY: 0,
        margin: {
          top: 20,
          right: 20,
          bottom: 40,
          left: 100
        },
        x: function (d) { return d.time_stamp; },
        y: function (d) { return d.risk_percentage; },
        useInteractiveGuideline: true,
        xAxis: {
          axisLabel: 'Time (hour)'
        },
        yAxis: {
          tickFormat: function (d: any) {
            let riskLabel = '';
            switch (true) {
              case d <= 20:
                riskLabel = 'No Risk';
                break;
              case d > 20 && d <= 40:
                riskLabel = 'Risk';
                break;
              case d > 40 && d <= 60:
                riskLabel = 'Medium Risk';
                break;
              case d > 60 && d <= 80:
                riskLabel = 'High Risk';
                break;
              case d > 80 && d <= 100:
                riskLabel = 'Very High Risk';
                break;
            }
            return riskLabel;
          },
          axisLabelDistance: -10
        }
      }
    };

    this.data = [{
      values: [{
        "time_stamp": 10,
        "risk_percentage": 20
      }, {
        "time_stamp": 12,
        "risk_percentage": 40
      }, {
        "time_stamp": 14,
        "risk_percentage": 60
      }, {
        "time_stamp": 16,
        "risk_percentage": 80
      }, {
        "time_stamp": 18,
        "risk_percentage": 50
      }, {
        "time_stamp": 20,
        "risk_percentage": 30
      }],
      key: 'Risk',
      color: '#7777ff',
      area: true      //area - set to true if you want this line to turn into a filled area chart.
    }
    ];
  }

  pickColor(risk: string) {
    if (risk === 'very high risk') this.color = 'red';
    else if (risk === 'At risk') this.color = 'orangered';
    else if (risk === 'No risk') this.color = 'green'
    else this.color = 'yellow';
  }
  getRiskmonitorDetails(id: string) {
    this.riskmonitorService.getRiskmonitorDetails(id).subscribe((result) => {
      this.riskDataInProgress = false;
      this.riskData = result;
      console.log('graph',this.riskData)
      if(this.riskData.length === 0){
        this.noRiskData = true;
      }
    });
  }
}
