import SingleSensor from "./SingleSensor";

const React = require('react');
const axios = require('axios');

const Component = React.Component;

class GroupSensor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group_name: "",
      sensors: []
    }
    console.log('Props', this.props)
  }
  componentDidMount(){

  }
  // getGroupFromJSON(){
  //   axios
  //     .get(`http://localhost:3001/api/v1/users/1/group_sensors/1`)
  //     .then(response => {
  //       this.setState({
  //         group_name: response.data.name
  //       })
  //     })
  //     .catch(error => console.log(error));
  // }
  // getSensorsFromJSON(){
  //   axios
  //     .get(`http://localhost:3001/api/v1/users/1/group_sensors/1/single_sensors`)
  //     .then(response => {
  //       this.setState({
  //         sensors: response.data
  //       })
  //     })
  //     .catch(error => console.log(error));
  // }
  render(){
    return (
      <div>
        {/*<SingleSensor sensors={ this.state.sensors } />*/}
      </div>
    );
  }
}
export default GroupSensor;