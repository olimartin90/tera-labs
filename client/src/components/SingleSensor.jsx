const React = require('react');
const axios = require('axios');

const Component = React.Component;
const CanvasJSReact = require('../lib/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const updateInterval = 5000;
//initial values
let xValue = (new Date()).getTime();
let yValue = 0

class SingleSensor extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      data_type: "",
      userId: null,
      groupId: null,
      datapoints: []
    }
    this.getDataFromJSON();
  }
  componentDidMount(){
    this.updateChart();
    setInterval(this.updateChart, updateInterval);
  }
  // getSensorFromJSON(){
  //   axios
  //     .get(`http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors/1`)
  //     .then(response => {
  //       this.setState({
  //         data_type: response.data.data_type
  //       })
  //     })
  //     .catch(error => console.log(error));
  // }
  getDataFromJSON(){
    axios
      .get(`http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors/1/datapoints`)
      .then(response => {
        this.loadDatapointsFromDB(response.data)
      })
      .catch(error => console.log(error));
  }
  // sendSensorToJSON(sensorData){
  //   // TODO....
  //   axios
  //     .post("http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors")
  //     .then(response => {

  //     })
  //     .catch(error => console.log(error));
  // }
  loadDatapointsFromDB(inputArray){
    inputArray.forEach(data => {
      this.addDataToState(data.created_at, data.data_value)
    })
  }
  addDataToState(dateCreated, value) {
    let date = dateCreated;
    if(typeof dateCreated !== Number)
      date = new Date(dateCreated).getTime()
    this.state.datapoints.push({
      x: date,
      y: value,
      markerColor: 'black'
    });
    if (this.state.datapoints.length > 50 ) {
      this.state.datapoints.shift();
    }
  }
  updateChart() {
    // Soil moisture in awc
    yValue = Math.round(((Math.random()*-0.08)+0.2)*10)/10;
    // // Aeration in %
    // yValue2 = Math.round(((Math.random()*10.5)+15.5)*10)/10;
    // // Soil temp in oF
    // yValue3 = Math.floor(Math.random()*(350-340+1)+50);
    // // Nitrate in ppm
    // yValue4 = Math.floor(Math.random()*(350-340+1)+80);
    // // Phosphorus in ppm
    // yValue5 = Math.floor(Math.random()*(350-340+1)+80);
    // // Salinity in dS/m
    // yValue6 = Math.round(((Math.random()*0.5)+0.2)*10)/10;
    // // Respiration in %
    // yValue7 = Math.round(((Math.random()*0.05)+0.02)*100)/100;
    // // pH
    // yValue8 = Math.round(((Math.random()*3.2)+5.2)*10)/10;
    // // Potassium in ppm
    // yValue9 = Math.floor(Math.random()*(350-340+1)+80);

    xValue += 3600000

    this.addDataToState(xValue, yValue)
    // this.addSensorsToState(this.state.aeration, xValue, yValue2)
    // this.addSensorsToState(this.state.temp, xValue, yValue3)
    // this.addSensorsToState(this.state.nitrate, xValue, yValue4)
    // this.addSensorsToState(this.state.phosphorus, xValue, yValue5)
    // this.addSensorsToState(this.state.salinity, xValue, yValue6)
    // this.addSensorsToState(this.state.respiration, xValue, yValue7)
    // this.addSensorsToState(this.state.ph, xValue, yValue8)
    // this.addSensorsToState(this.state.potassium, xValue, yValue9)

    this.chart.options.data[0].legendText = ` Sensor: ${yValue} awc`;
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
        fontSize: 25,
        fontColor: "dimGrey",
      },
      data: [
        {
          type: "spline",
          lineColor: 'green',
          color: 'green',
          markerSize: 0,
          xValueType: "dateTime",
          xValueFormatString: "DD MMM hh:mm tt",
          yValueFormatString: "0.# 'awc'",
          showInLegend: true,
          name: "Soil Moisture",
          dataPoints: this.state.datapoints
        }
      ]
    }
    return (
      <div>
        <CanvasJSChart options = { options }
            onRef = { ref => this.chart = ref }/>
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}
export default SingleSensor;