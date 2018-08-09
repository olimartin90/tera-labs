const React = require('react');
const axios = require('axios');

const Component = React.Component;
const CanvasJSReact = require('../lib/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

//  Sets the interval for updating the chart
const updateInterval = 5000;

class SingleSensor extends Component {
  constructor(props) {
    super(props);
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      // This is where the chart takes its info from
      datapoints: [],
      yValue: 0,
      unit: '',
      format: ''
    }
    this.loadDatapointsFromProps()
  }

  componentDidMount(){
    this.updateChart();
    this.interval = setInterval(this.updateChart, updateInterval);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    this.chart.destroy();
  }

  // Loads all datapoints from db and adds them to the datapoints array
  loadDatapointsFromProps(){
    const fiftySensors = this.props.sensor.data_points
    const sliced = fiftySensors.slice(fiftySensors.length-50)
    sliced.forEach(data => {
      // Adds each datapoints but converts date into unix timestamp
      this.addDataPointToChart(data.date_epoch, data.data_value)
    })
  }

  // Adds datapoints to datapoints array
  addDataPointToChart(xValue, yValue) {
    this.state.datapoints.push({
      x: xValue,
      y: yValue,
      markerColor: 'green'
    });
  }

  // Adds datapoints into db as they are created
  AddDataPointsToDB(){
    this.setSensorProperties()
    if(this.props.group.id){
      // Gets last datapoint in array
      const last = this.state.datapoints.slice(this.state.datapoints.length-1)[0]
        axios
        .post(`http://localhost:3000/api/v1/users/${this.props.group.user_id}/group_sensors/${this.props.group.id}/single_sensors/${this.props.sensor.id}/datapoints`, {
          data_value: this.state.yValue,
          date_epoch: last.x + 3600000,
          single_sensor_id: this.props.sensor.id
        })
        .then(response => {
          this.addDataPointToChart(last.x + 3600000, this.state.yValue)
        })
        .catch(error => console.log(error));
    }
  }

  // Sets the properties of a sensor before displaying in chart
  setSensorProperties(){
    switch(this.props.sensor.data_type){
      case 'Soil Moisture':
        // Soil moisture in awc
        this.setState({
          unit: ' awc',
          format: '0.# awc',
          yValue: Math.round(((Math.random()*-0.08)+0.2)*10)/10
        });
        break
      case 'Aeration':
        // Aeration in %
        this.setState({
          unit: ' %',
          format: '0.# "%"',
          yValue: Math.round(((Math.random()*10.5)+15.5)*10)/10
        });
        break
      case 'Soil Temp':
        // Soil temp in °F
        this.setState({
          unit: ' °F',
          format: '# °F',
          yValue: Math.floor(Math.random()*(350-340+1)+50)
        });
        break
      case 'Nitrate':
        // Nitrate in ppm
        this.setState({
          unit: ' ppm',
          format: '# ppm',
          yValue: Math.floor(Math.random()*(350-340+1)+80)
        });
        break
      case 'Phosphorus':
        // Phosphorus in ppm
        this.setState({
          unit: ' ppm',
          format: '# ppm',
          yValue: Math.floor(Math.random()*(350-340+1)+80)
        });
        break
      case 'Salinity':
        // Salinity in dS/m
        this.setState({
          unit: ' dS/m',
          format: '0.# dS/m',
          yValue: Math.round(((Math.random()*0.5)+0.2)*10)/10
        });
        break
      case 'Respiration':
        // Respiration in %
        this.setState({
          unit: ' %',
          format: '0.## "%"',
          yValue: Math.round(((Math.random()*0.05)+0.02)*100)/100
        });
        break
      case 'pH':
        // pH
        this.setState({
          unit: '',
          format: '#.#',
          yValue: Math.round(((Math.random()*3.2)+5.2)*10)/10
        });
        break
      case 'Potassium':
        // Potassium in ppm
        this.setState({
          unit: ' ppm',
          format: '# ppm',
          yValue: Math.floor(Math.random()*(350-340+1)+80)
        });
        break
      default:
      break
    }
  }

  // Updates the chart based on a specific interval
  updateChart() {

    this.AddDataPointsToDB(this.state.yValue)

    this.chart.options.data[0].legendText = ` ${this.props.sensor.data_type}: ${this.state.yValue} ${this.state.unit}`;

    // if (this.state.datapoints.length > 50 ) {
    //   this.state.datapoints.shift();
    // }

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
            startValue: this.props.sensor.set_min,
            endValue: this.props.sensor.set_max,
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
          yValueFormatString: this.state.format,
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