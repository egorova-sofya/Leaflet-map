import "./App.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import * as parkData from "./skateboard-parks.json";
import { Icon } from "leaflet";
import img from "./logo192.png";

const skater = new Icon({
  iconUrl: img,
  iconSize: [40, 40],
});

function MyComponent() {
  const res = JSON.stringify(parkData);
  const parkDataObj = JSON.parse(res);
  const [activePark, setActivePark] = useState(null);
  console.log("activePark", activePark);

  const map = useMapEvents({
    click: () => {
      map.locate();
    },
  });

  return (
    <>
      {parkDataObj.default.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry?.coordinates[1],
            park.geometry?.coordinates[0],
          ]}
          eventHandlers={{
            click: (e) => {
              setActivePark(park);
            },
          }}
          icon={skater}
        >
          <Popup>
            <div>
              <h2>{activePark?.properties.NAME}</h2>
              <p>{activePark?.properties.DESCRIPTIO}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <MapContainer center={[50.5, 30.5]} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MyComponent />
      </MapContainer>
    </div>
  );
}

export default App;
