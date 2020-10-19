import React from 'react';
import './Map.css'
import { Map as LeafletMap, Marker, Popup, TileLayer } from 'react-leaflet';
import { showDataOnMap } from './util';


const position = [51.505, -0.09]
function Maps({countries, casesType,center,zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                    
              {showDataOnMap(countries,casesType)}

            </LeafletMap>

        </div>
    )
}

export default Maps;
