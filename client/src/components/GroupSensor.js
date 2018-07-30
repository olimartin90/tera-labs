const React = require('react');
const Component = React.Component;
const CanvasJSReact = require('../lib/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const moisture = [];
const aeration = [];
const temp = [];
const nitrate = [];
const phosphorus = [];
const salinity = [];
const respiration = [];
const ph = [];
const potassium = [];
const updateInterval = 5000;
//initial values
let yValue1, yValue2, yValue3, yValue4, yValue5,
    yValue6, yValue7, yValue8, yValue9 = 0
let xValue = 1532728195000;
class GroupSensor extends Component {
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
  }
  componentDidMount(){
    this.updateChart(50);
    setInterval(this.updateChart, updateInterval);
  }
  toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  setSensor(sensor, x, y) {
    sensor.push({
      x: x,
      y: y
    });
    if (sensor.length > 50 ) {
      sensor.shift();
    }
  }
  updateChart(count) {
    count = count || 1;
    for (let i = 0; i < count; i++) {
      xValue += 3600000; // 1 hour
      // Soil moisture in awc
      yValue1 = Math.round(((Math.random()*0.5)+0.2)*10)/10;
      // Aeration in %
      yValue2 = Math.round(((Math.random()*10.5)+15.5)*10)/10;
      // Soil temp in oF
      yValue3 = Math.floor(Math.random()*(350-340+1)+50);
      // Nitrate in ppm
      yValue4 = Math.floor(Math.random()*(350-340+1)+80);
      // Phosphorus in ppm
      yValue5 = Math.floor(Math.random()*(350-340+1)+80);
      // Salinity in dS/m
      yValue6 = Math.round(((Math.random()*0.5)+0.2)*10)/10;
      // Respiration in %
      yValue7 = Math.round(((Math.random()*0.05)+0.02)*100)/100;
      // pH
      yValue8 = Math.round(((Math.random()*3.2)+5.2)*10)/10;
      // Potassium in ppm
      yValue9 = Math.floor(Math.random()*(350-340+1)+80);

      this.setSensor(moisture, xValue, yValue1)
      this.setSensor(aeration, xValue, yValue2)
      this.setSensor(temp, xValue, yValue3)
      this.setSensor(nitrate, xValue, yValue4)
      this.setSensor(phosphorus, xValue, yValue5)
      this.setSensor(salinity, xValue, yValue6)
      this.setSensor(respiration, xValue, yValue7)
      this.setSensor(ph, xValue, yValue8)
      this.setSensor(potassium, xValue, yValue9)
    }
    this.chart.options.data[0].legendText = " Soil Moisture: " + yValue1 + " awc";
    this.chart.options.data[1].legendText = " Aeration: " + yValue2 + " %";
    this.chart.options.data[2].legendText = " Soil Temp: " + yValue3 + " F";
    this.chart.options.data[3].legendText = " Nitrate: " + yValue4 + " ppm";
    this.chart.options.data[4].legendText = " Phosphorus: " + yValue5 + " ppm";
    this.chart.options.data[5].legendText = " Salinity: " + yValue6 + " dS/m";
    this.chart.options.data[6].legendText = " Respiration: " + yValue7 + " %";
    this.chart.options.data[7].legendText = " pH: " + yValue8;
    this.chart.options.data[8].legendText = " Potassium: " + yValue9 + " ppm";
    this.chart.render();
  }
  render() {
    const options = {
      zoomEnabled: true,
      theme: "light2",
      animationEnabled: true,
      title: {
        text: "Soil Health - Probe #0521"
      },
      axisX: {
        title: "chart updates every hour",
        intervalType: "hour",
        valueFormatString: "DD MMM hh:mm tt"
      },
      axisY:{
        suffix: " %",
        includeZero: false,
        maximum: 100
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor:"pointer",
        verticalAlign: "top",
        fontSize: 18,
        fontColor: "dimGrey",
        itemclick : this.toggleDataSeries
      },
      data: [
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          percentFormatString: "#,#",
          showInLegend: true,
          name: "Soil Moisture",
          dataPoints: moisture
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          percentFormatString: "#,#",
          showInLegend: true,
          name: "Aeration",
          dataPoints: aeration
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          yValueFormatString: "# F",
          showInLegend: true,
          name: "Soil Temp",
          dataPoints: temp
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          showInLegend: true,
          name: "Nitrate",
          dataPoints: nitrate
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          showInLegend: true,
          name: "Phosphorus",
          dataPoints: phosphorus
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          percentFormatString: "#,#",
          showInLegend: true,
          name: "Salinity",
          dataPoints: salinity
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          percentFormatString: "#,0#",
          showInLegend: true,
          name: "Respiration",
          dataPoints: respiration
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          showInLegend: true,
          name: "pH",
          dataPoints: ph
        },
        {
          type: "spline",
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          showInLegend: true,
          name: "Potassium",
          dataPoints: potassium
        }
      ]
    }
    return (
      <div>
        <CanvasJSChart options = {options}
          onRef={ref => this.chart = ref}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
module.exports = GroupSensor;