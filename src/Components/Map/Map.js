import React, { Component } from 'react'
import {
  Circle,
  FeatureGroup,
  LayersControl,
  LayerGroup,
  Map,
  Popup,
  Rectangle,
  TileLayer,
  ImageOverlay,
} from 'react-leaflet'
import Control from 'react-leaflet-control'
import {GoogleLayer} from 'react-leaflet-google'
import './Map.css'
import TestImage from '../../Images/merged.png'
import TestImage2 from '../../Images/rgba.png'
const { BaseLayer} = LayersControl;
const key = 'AIzaSyDEG4lyorD61vnJoAHG0FkQERZ-McElZyg';
const terrain = 'TERRAIN';
const road = 'ROADMAP';
const satellite = 'SATELLITE';
const hydrid = 'HYBRID';
//-78.49710828437009, 37.93041227710639
const center = [37.93041227710639, -78.49710828437009]
const rectangle = [[38.426526,-78.889614], [38.424929,-78.88323]]
const testcenter = [37.93041227710639, -78.49710828437009]

export default class BaseMap extends Component {

  constructor(props){
    super(props);
    this.state = {
      width:'',
    }   
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentWillMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ height: window.innerHeight-1+'px'});
  }

  render() {
    return (
      <div className = 'BaseMap'>
      <Map center={testcenter} zoom={17.4} className = 'map' style={{ width: '100%', height: this.state.height }}>

      <LayersControl position='topright'>
        
          <BaseLayer  name='ForMoreZoom'>
            <TileLayer  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
          </BaseLayer>

          <BaseLayer  checked name='Google Maps Satellite'>
            <GoogleLayer googlekey={key}  maptype={satellite} />
          </BaseLayer>

         <BaseLayer name='Google Maps Roads'>
            <GoogleLayer googlekey={key}  maptype={road} />
          </BaseLayer>

         <BaseLayer  name='Google Maps Terrain'>
            <GoogleLayer googlekey={key}  maptype={terrain} />
          </BaseLayer>

          <BaseLayer  name='Google Maps Hydrid'>
            <GoogleLayer googlekey={key}  maptype={hydrid}  libraries={['geometry', 'places']} />
          </BaseLayer>

          <BaseLayer  name='Google Maps with Libraries'>
            <GoogleLayer googlekey={key}  maptype={hydrid}  libraries={['geometry', 'places']} />
          </BaseLayer>

        </LayersControl>
        
         <ImageOverlay url = {TestImage} bounds = {[[37.92754239722171,-78.4977459718528], [37.9330963517,-78.49195042016456]]}/>
         <ImageOverlay url = {TestImage2} bounds = {[[37.9307066927,-78.4989250540139], [ 37.933022282,-78.4950953896]]}/>

        <FeatureGroup color = "#ffffff00">
          <Popup>enter</Popup>
          <Rectangle bounds={[[38.426526,-78.881614], [38.424915,-78.88323]]} />
          <ImageOverlay url = {TestImage} bounds = {[[38.426526,-78.881614], [38.424915,-78.88323]]}/>
        </FeatureGroup>

        <FeatureGroup color="purple">
          <Popup>Enter information <input type="text" /></Popup>
          <Circle center={[38.42673, -78.8816]} radius={50} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>
        
        <Control position="bottomright" className = "customButtons">
        
        <button 
          onClick={()=>console.log('hello')}
        >
          First button
        </button>

        <button 
          onClick={()=>console.log('hello')}
        >
          Second button
        </button>

        <button 
          onClick={()=>console.log('hello')}
        >
          Third button
        </button>

      </Control>
      </Map>
      {console.log(typeof(this.state.height))}
      </div>
    )
  }
}


/*
<TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
*/