import React from 'react';
import axios from 'axios';
import { Map, Circle, Tooltip, TileLayer } from 'react-leaflet';
import BusMarker from './BusMarker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        buses: [],
        lat: 40.756410,
        lng: -73.845301
    };
  }

  BusLocations() {
    var data;
    this.serverRequest =
      axios
       .get("https://localhost:5000/api/")
       .then((result) => {
         data = result['data']['Siri']['ServiceDelivery']['VehicleMonitoringDelivery'][0]['VehicleActivity'];
         this.setState({
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
    const { lat, lng, buses } = this.state;

    return (
      <div>
        <Map style={{height: "100vh", margin: "0"}} center={[lat, lng]} zoom={12}>
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution="Mom" />
          {buses.map(bus => {
            if (bus.MonitoredVehicleJourney.MonitoredCall) {
              return(
                <BusMarker key={ bus.MonitoredVehicleJourney.VehicleRef }
                           data={ bus } />
              );
            }
          })}
        </Map>
      </div>
    );
  }
}

export default App
