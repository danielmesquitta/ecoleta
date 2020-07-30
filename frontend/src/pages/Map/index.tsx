import React, { useState, useEffect } from 'react'

import { Container, Global } from './styles'
import { Map as ViewMap, TileLayer, Marker } from 'react-leaflet'

const Map: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation([position.coords.latitude, position.coords.longitude])
    })
  }, [])

  function handleMapClick() {}

  return (
    <>
      <Global />
      <Container>
        <ViewMap
          center={userLocation}
          zoom={15}
          style={{ height: '100vh', marginBottom: 50 }}
          onClick={handleMapClick}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation} />
        </ViewMap>
      </Container>
    </>
  )
}

export default Map
