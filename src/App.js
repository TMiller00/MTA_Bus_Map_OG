import React from 'react';
import axios from 'axios';
import { Map, Circle, Tooltip, TileLayer } from 'react-leaflet';
// const mtakey = config.mtakey;
const mapkey = config.mapkey;
// const mtaURL = 'https://bustime.mta.info/api/siri/vehicle-monitoring.json?key=' + mtakey;
const mapURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + mapkey;
const position = [40.756410, -73.845301];

function BusMarker(props) {
  let latitude = props['locations']['MonitoredVehicleJourney']['VehicleLocation']['Latitude'];
  let longitude = props['locations']['MonitoredVehicleJourney']['VehicleLocation']['Longitude'];

  return(
    <Circle center={[latitude, longitude]} radius={20}>
      <BusInfo info={props.locations}/>
    </Circle>
  );
}

function BusInfo(props) {
  let lineName = props.info['MonitoredVehicleJourney']['PublishedLineName'];
  let destName = props.info['MonitoredVehicleJourney']['DestinationName'];
  let time = props.info['RecordedAtTime'].split('T')[1].split('.')[0];

  if (props.info['MonitoredVehicleJourney']['MonitoredCall']) {
    let stopPoint = props.info['MonitoredVehicleJourney']['MonitoredCall']['StopPointName'];
    let presentableDistance = props.info['MonitoredVehicleJourney']['MonitoredCall']['Extensions']['Distances']['PresentableDistance'];
    let vehicleRef = props.info['MonitoredVehicleJourney']['VehicleRef'].split('_')[1];

    return(
      <Tooltip>
        <div>
          <h3>{lineName} / {destName}</h3>
          <p><span>Vehicle #{vehicleRef}</span> | <span>Data updated at {time}</span></p>
          <p>Next stop: {stopPoint}, {presentableDistance}</p>
        </div>
      </Tooltip>
    );
  } else {
    return(
      <Tooltip>
        <div>
          <h3>{lineName} / {destName}</h3>
        </div>
      </Tooltip>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        buses: []
    };
  }

  ConfigVars() {

  }

  BusLocations() {
    var _this = this;
    var data;
    this.serverRequest =
      axios
       .get("http://localhost:5000/") // for development, use "http://localhost:3333/api/"
       .then(function(result) {
         data = result['data']['Siri']['ServiceDelivery']['VehicleMonitoringDelivery'][0]['VehicleActivity'];
         _this.setState({
           buses: data
         });
       })
  }

  componentDidMount() {
    this.BusLocations();
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div>
        <Map style={{height: "100vh", margin: "0"}} center={position} zoom={12}>
          <TileLayer url={mapURL} attribution="Mom" />
          {this.state.buses.map(bus => {
            return(
              <BusMarker key={ bus['MonitoredVehicleJourney']['VehicleRef'] }
                         locations={ bus } />
            );
          })}
        </Map>
      </div>
    );
  }

}

export default App
