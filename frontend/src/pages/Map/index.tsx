import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../../services/api'

import { Container, Global } from './styles'
import { Map as ViewMap, TileLayer, Marker } from 'react-leaflet'

interface Points {
  id: number
  image: string
  name: string
  email: string
  whatsapp: string
  latitude: number
  longitude: number
  city: string
  uf: string
}

interface Query {
  city?: string
  uf?: string
  items?: string
}

const Map: React.FC = () => {
  const query: Query = Object.fromEntries(
    useLocation()
      .search.replace('?', '')
      .split('&')
      .map(queryItem => queryItem.split('='))
  )

  const [userLocation, setUserLocation] = useState<[number, number]>([-18, -52])
  const [points, setPoints] = useState<Points[]>([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation([position.coords.latitude, position.coords.longitude])
    })
  }, [])

  useEffect(() => {
    const { city, uf, items } = query
    let parsedItems: number[] = []
    if (items) {
      parsedItems = items.split(',').map(item => Number(item))
    }
    console.log(query)
    api
      .get('points', {
        params: {
          city,
          uf,
          items: parsedItems,
        },
      })
      .then(response => setPoints(response.data))
  }, [])

  function handleMarkerClick(pointId: number) {
    window.alert(pointId)
  }

  return (
    <>
      <Global />
      <Container>
        <ViewMap center={userLocation} zoom={4} style={{ height: '100vh' }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map(point => (
            <Marker
              key={String(point.id)}
              position={[point.latitude, point.longitude]}
              onClick={() => handleMarkerClick(point.id)}
            />
          ))}
        </ViewMap>
      </Container>
    </>
  )
}

export default Map
