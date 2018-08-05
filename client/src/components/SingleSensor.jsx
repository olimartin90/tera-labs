const React = require('react');
const axios = require('axios');

const Component = React.Component;
const CanvasJSReact = require('../lib/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// let xValue = (new Date()).getTime();

const updateInterval = 5000;

class SingleSensor extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      // This is where the chart takes its info from
      datapoints: [],
      datapoint: {}
    }
    this.loadDatapointsFromDB(this.props.sensor.data_points)
  }

  componentDidMount(){
    this.updateChart();
    this.interval = setInterval(this.updateChart, updateInterval);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  // Loads all datapoints from db and adds them to the datapoints array
  loadDatapointsFromDB(inputArray){
    debugger
    inputArray.forEach(data => {
      // Adds each datapoints but converts date into unix timestamp
      this.addDataPointToChart(data.date_epoch, data.data_value)
      // this.setState({ datapoint: data })
    })
  }

  // Gets last date from datapoints array and adds 1 hour
  // getLastDataPointsTimestamp(){
  //   const last = this.state.datapoints[this.state.datapoints.length-1]
  //   this.setState({ datapoint: 1533500729105 + 360000 }) //1533500729105 + 360000 //last.date_epoch + 3600000
  // }

  // Adds datapoints to datapoints array
  addDataPointToChart(xValue, yValue) {
    this.state.datapoints.push({
      x: xValue, //Date(xValue).getTime(), //
      y: yValue,
      markerColor: 'green'
    });
    if (this.state.datapoints.length > 50 ) {
      this.state.datapoints.shift();
    }
  }

  AddDataPointsToDB(yValue){
    if(this.props.group.id){
      const last = this.state.datapoints.slice(this.state.datapoints.length-1)[0]
        axios
        .post(`http://localhost:3000/api/v1/users/1/group_sensors/${this.props.group.id}/single_sensors/${this.props.sensor.id}/datapoints`, {
          data_value: yValue,
          date_epoch: last.x + 3600000,
          single_sensor_id: this.props.sensor.id
        })
        .then(response => {
          debugger
          this.addDataPointToChart(last.x + 3600000, yValue)
        })
        .catch(error => console.log(error));
    }
  }

  updateChart() {

    // Soil moisture in awc
    let yValueMoisture = Math.round(((Math.random()*-0.08)+0.2)*10)/10;
    // Aeration in %
    let yValueAeration = Math.round(((Math.random()*10.5)+15.5)*10)/10;
    // Soil temp in oF
    let yValueTemp = Math.floor(Math.random()*(350-340+1)+50);
    // Nitrate in ppm
    let yValueNitrate = Math.floor(Math.random()*(350-340+1)+80);
    // Phosphorus in ppm
    let yValuePhosphorus = Math.floor(Math.random()*(350-340+1)+80);
    // Salinity in dS/m
    let yValueSalinity = Math.round(((Math.random()*0.5)+0.2)*10)/10;
    // Respiration in %
    let yValueRespiration = Math.round(((Math.random()*0.05)+0.02)*100)/100;
    // pH
    let yValuePh = Math.round(((Math.random()*3.2)+5.2)*10)/10;
    // Potassium in ppm
    let yValuePotassium = Math.floor(Math.random()*(350-340+1)+80);

    // xValue += 3600000

    this.AddDataPointsToDB(yValueMoisture)
    // this.AddDataPointsToDB(yValueAeration)
    // this.AddDataPointsToDB(yValueTemp)
    // this.AddDataPointsToDB(yValueNitrate)
    // this.AddDataPointsToDB(yValuePhosphorus)
    // this.AddDataPointsToDB(yValueSalinity)
    // this.AddDataPointsToDB(yValueRespiration)
    // this.AddDataPointsToDB(yValuePh)
    // this.AddDataPointsToDB(yValuePotassium)

    // this.addDataPointsToChart(xValue, yValueMoisture)
    // this.addDataPointsToChart(xValue, yValueAeration)
    // this.addDataPointsToChart(xValue, yValueTemp)
    // this.addDataPointsToChart(xValue, yValueNitrate)
    // this.addDataPointsToChart(xValue, yValuePhosphorus)
    // this.addDataPointsToChart(xValue, yValueSalinity)
    // this.addDataPointsToChart(xValue, yValueRespiration)
    // this.addDataPointsToChart(xValue, yValuePh)
    // this.addDataPointsToChart(xValue, yValuePotassium)

    this.chart.options.data[0].legendText = ` ${this.props.sensor.data_type}: ${yValueMoisture} awc`;
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
        valueType: "dateTime",
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
          name: this.props.sensor.data_type,
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