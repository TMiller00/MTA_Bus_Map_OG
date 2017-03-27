import React from 'react';
import {Circle, Tooltip} from 'react-leaflet';

export default class BusMarker extends React.Component {
    constructor(props) {
        super(props);

        const {MonitoredVehicleJourney} = props.data;

        this.state = {
            busLat: MonitoredVehicleJourney.VehicleLocation.Latitude,
            busLng: MonitoredVehicleJourney.VehicleLocation.Longitude,
            stopPoint: MonitoredVehicleJourney.MonitoredCall.StopPointName,
            presentableDistance: MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.PresentableDistance,
            vehicleRef: MonitoredVehicleJourney.VehicleRef.split('_')[1],
            lineName: MonitoredVehicleJourney.PublishedLineName,
            destName: MonitoredVehicleJourney.DestinationName,
            time: props.data.RecordedAtTime.split('T')[1].split('.')[0]
        }
    }

    render() {
        const {
            busLat,
            busLng,
            stopPoint,
            presentableDistance,
            vehicleRef,
            lineName,
            destName,
            time
        } = this.state;

        return (
            <Circle center={[busLat, busLng]} radius={20}>
                <Tooltip>
                    <div>
                        <h3>{lineName} / {destName}</h3>
                        <p>
                            <span>Vehicle #{vehicleRef}</span> | <span>Data updated at {time}</span>
                        </p>
                        <p>Next stop: {stopPoint}, {presentableDistance}</p>
                    </div>
                </Tooltip>
            </Circle>
        );
    }
}
