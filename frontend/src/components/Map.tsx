import {GeoJSON,MapContainer,TileLayer} from "react-leaflet"
import type {GeoJsonObject} from "geojson";
import "leaflet/dist/leaflet.css"
import geoDataJson from "../assets/custom.geo.json"
import type {Path} from "leaflet"
import React, { useEffect, useRef } from "react"

interface MapInter{
    setCountry:React.Dispatch<React.SetStateAction<String|null>>;
    country:String|null;
}

const Map:React.FC<MapInter>=({country,setCountry})=>{
    const lat=20.59
    const lng=78.96

    const geoData=geoDataJson as GeoJsonObject

    const selected=useRef<Path|null>(null)

    const defaultStyle={
        color:'transparent',
        fillColor:'transparent'
    }

    const hoverStyle={
        color:'red',
        fillColor:'red',
        fillOpacity:0.7
    }

    const selectedStyle={
        color:'blue',
        fillColor:'blue',
        fillOpacity:0.7
    }

    useEffect(()=>{
        if (selected.current){
            selected.current.setStyle(selectedStyle)
        }
    },[country])

    const onEachFeature=(feature:any,layer:Path)=>{
        layer.bindTooltip(feature.properties.name,{
            permanent:false
        })

        layer.on({
            mouseover:()=>{
                layer.setStyle(hoverStyle)
            },
            mouseout:()=>{
                layer.setStyle(defaultStyle)
                if (selected.current){
                    selected.current.setStyle(selectedStyle)
                }
            },
            click:()=>{
                if (selected.current && selected.current !== layer){
                    selected.current.setStyle(defaultStyle)
                }
                selected.current=layer
                setCountry(feature.properties.name)
            }
        })
    }

    return (
        <MapContainer center={[lat,lng]} zoom={5} style={{height:'100vh', width:'100%'}} maxBounds={[[-90,-180],[90,180]]}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <GeoJSON style={defaultStyle} data={geoData} onEachFeature={onEachFeature}/>
        </MapContainer>
    )
}
export default Map