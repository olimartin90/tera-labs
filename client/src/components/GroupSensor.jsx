const React = require('react');
const axios = require('axios');

const Component = React.Component;
const CanvasJSReact = require('../lib/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const updateInterval = 5000;
//initial values
let yValue1, yValue2, yValue3, yValue4, yValue5,
    yValue6, yValue7, yValue8, yValue9 = 0
let xValue = (new Date()).getTime();

class GroupSensor extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.toggleDataSeries = this.toggleDataSeries.bind(this);
    this.getGroupFromJSON()
    this.getSensorsFromJSON()
    this.state = {
      group_name: "",
      moisture: [],
      aeration: [],
      temp: [],
      nitrate: [],
      phosphorus: [],
      salinity: [],
      respiration: [],
      ph: [],
      potassium: []
    }
  }
  componentDidMount(){
    this.updateChart();
    setInterval(this.updateChart, updateInterval);
  }
  toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" ||
      e.dataSeries.visible) {
        e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
  getGroupFromJSON(){
    axios
      .get(`http://localhost:3001/api/v1/users/1/group_sensors`)
      .then(response => {
        this.setState({
          group_name: response.data.name
        })
      })
      .catch(error => console.log(error));
  }
  getSensorsFromJSON(){
    axios
      .get(`http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors`)
      .then(response => {
        this.loadSensorsFromDB("Soil Moisture",
                                response.data,
                                this.state.moisture)
        this.loadSensorsFromDB("Aeration",
                                response.data,
                                this.state.aeration)
        this.loadSensorsFromDB("Soil Temp",
                                response.data,
                                this.state.temp)
        this.loadSensorsFromDB("Nitrate",
                                response.data,
                                this.state.nitrate)
        this.loadSensorsFromDB("Phosphorus",
                                response.data,
                                this.state.phosphorus)
        this.loadSensorsFromDB("Salinity",
                                response.data,
                                this.state.salinity)
        this.loadSensorsFromDB("Respiration",
                                response.data,
                                this.state.respiration)
        this.loadSensorsFromDB("pH",
                                response.data,
                                this.state.ph)
        this.loadSensorsFromDB("Potassium",
                                response.data,
                                this.state.potassium)
      })
      .catch(error => console.log(error));
  }
  sendSensorToJSON(sensorData){
    // TODO....
    axios
      .post("http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors")
      .then(response => {

      })
      .catch(error => console.log(error));
  }
  addSensorsToState(outputArray, dateCreated, value) {
    let date = dateCreated;
    if(typeof dateCreated !== Number)
      date = new Date(dateCreated).getTime()
    outputArray.push({
      x: date,
      y: value,
      markerColor: 'black'
    });
    if (outputArray.length > 50 ) {
      outputArray.shift();
    }
  }
  loadSensorsFromDB(dataType, inputArray, outputArray){
    const typeOfSensors = inputArray.filter(sensor => sensor.data_type === dataType)
    typeOfSensors.forEach(sensor => {
      this.addSensorsToState(outputArray, sensor.created_at, sensor.data_value)
    })
  }
  updateChart() {
    // Soil moisture in awc
    yValue1 = Math.round(((Math.random()*-0.08)+0.2)*10)/10;
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

    xValue += 3600000

    this.addSensorsToState(this.state.moisture, xValue, yValue1)
    this.addSensorsToState(this.state.aeration, xValue, yValue2)
    this.addSensorsToState(this.state.temp, xValue, yValue3)
    this.addSensorsToState(this.state.nitrate, xValue, yValue4)
    this.addSensorsToState(this.state.phosphorus, xValue, yValue5)
    this.addSensorsToState(this.state.salinity, xValue, yValue6)
    this.addSensorsToState(this.state.respiration, xValue, yValue7)
    this.addSensorsToState(this.state.ph, xValue, yValue8)
    this.addSensorsToState(this.state.potassium, xValue, yValue9)

    this.chart.options.data[0].legendText = " Soil Moisture: " + yValue1 + " awc";
    // this.chart.options.data[1].legendText = " Aeration: " + yValue2 + " %";
    // this.chart.options.data[2].legendText = " Soil Temp: " + yValue3 + " °F";
    // this.chart.options.data[3].legendText = " Nitrate: " + yValue4 + " ppm";
    // this.chart.options.data[4].legendText = " Phosphorus: " + yValue5 + " ppm";
    // this.chart.options.data[5].legendText = " Salinity: " + yValue6 + " dS/m";
    // this.chart.options.data[6].legendText = " Respiration: " + yValue7 + " %";
    // this.chart.options.data[7].legendText = " pH: " + yValue8;
    // this.chart.options.data[8].legendText = " Potassium: " + yValue9 + " ppm";
    this.chart.render();
  }
  render() {
    const options = {
      zoomEnabled: true,
      theme: "light2",
      animationEnabled: true,
      title: {
        text: `Soil Health - Probe #${this.state.group_name}`
      },
      axisX: {
        intervalType: "hour",
        valueFormatString: "DD MMM hh:mm tt"
      },
      axisY:{
        includeZero: false,
        stripLines: [
          {
            startValue: 0.2,
            endValue: 0.8,
            color: '#DCDDDD  '
          }
        ]
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor:"default",
        verticalAlign: "top",
        fontSize: 18,
        fontColor: "dimGrey",
      },
      data: [
        {
          type: "spline",
          lineColor: 'green',
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          yValueFormatString: "0.# 'awc'",
          showInLegend: true,
          name: "Soil Moisture",
          dataPoints: this.state.moisture
        }
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   yValueFormatString: "#.# '%'",
        //   showInLegend: true,
        //   name: "Aeration",
        //   dataPoints: this.state.aeration
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   yValueFormatString: "# '°F'",
        //   showInLegend: true,
        //   name: "Soil Temp",
        //   dataPoints: this.state.temp
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   yValueFormatString: "# 'ppm'",
        //   showInLegend: true,
        //   name: "Nitrate",
        //   dataPoints: this.state.nitrate
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   yValueFormatString: "# 'ppm'",
        //   showInLegend: true,
        //   name: "Phosphorus",
        //   dataPoints: this.state.phosphorus
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   yValueFormatString: "0.# 'dS/m'",
        //   showInLegend: true,
        //   name: "Salinity",
        //   dataPoints: this.state.salinity
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   yValueFormatString: "0.## '%'",
        //   showInLegend: true,
        //   name: "Respiration",
        //   dataPoints: this.state.respiration
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   showInLegend: true,
        //   name: "pH",
        //   dataPoints: this.state.ph
        // },
        // {
        //   type: "spline",
        //   markerSize: 0,
        //   xValueType: "dateTime",
        //   xValueFormatString: "DD MMM hh:mm tt",
        //   yValueFormatString: "# 'ppm'",
        //   showInLegend: true,
        //   name: "Potassium",
        //   dataPoints: this.state.potassium
        // }
      ]
    }
    return (
      <div>
        <CanvasJSChart options = {options}
            onRef={ref => this.chart = ref}/>
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
module.exports = GroupSensor;