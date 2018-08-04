// import SingleSensor from "./SingleSensor";

// const React = require('react');
// const axios = require('axios');

// const Component = React.Component;

// class GroupSensor extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       sensors: [],
//       sensor: {}
//     }
//   }
//   componentDidMount(){

//   }
//   getSensorsFromJSON(){
//     axios
//       .get(`http://localhost:3001/api/v1/users/1/group_sensors/${this.props.sensor.group_sensor_id}/single_sensors`)
//       .then(response => {
//         this.setState({
//           sensors: response.data
//         })
//       })
//       .catch(error => console.log(error));
//   }
//   render(){
//     return (
//       <div>
//         {/*<SingleSensor sensor={this.state.sensors[this.props.sensor]} />*/}
//       </div>
//     );
//   }
// }
// export default GroupSensor;