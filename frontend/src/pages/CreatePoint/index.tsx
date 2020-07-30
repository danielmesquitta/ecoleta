import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import axios from 'axios'

import api from '../../services/api'
import logo from '../../assets/logo.svg'
import { Container, Field, FieldGroup, ItemsGrid, Item } from './styles'

interface Item {
  id: number
  title: string
  image_url: string
}

interface IBGEUfResponse {
  sigla: string
  nome: string
}

interface IBGECityResponse {
  nome: string
}

interface Uf {
  initials: string
  name: string
}

const CreatePoint: React.FC = () => {
  const history = useHistory()

  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0])
  const [location, setLocation] = useState<[number, number]>([0, 0])

  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })

  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [ufs, setUfs] = useState<Uf[]>([])
  const [cities, setCities] = useState<string[]>([])

  const [selectedUf, setSelectedUf] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation([position.coords.latitude, position.coords.longitude])
      setLocation([position.coords.latitude, position.coords.longitude])
    })
  }, [])

  useEffect(() => {
    api.get('items').then(response => setItems(response.data))
  }, [])

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const sortedUfs = response.data
          .map((uf: IBGEUfResponse) => ({
            initials: uf.sigla,
            name: uf.nome,
          }))
          .sort((a: Uf, b: Uf) => (a.name > b.name ? 1 : -1))
        setUfs(sortedUfs)
      })
  }, [])

  useEffect(() => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then(response => {
        setCities(response.data.map((city: IBGECityResponse) => city.nome))
      })
  }, [selectedUf])

  function handleSelectUf(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(e.target.value)
  }

  function handleSelectCity(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(e.target.value)
  }

  function handleMapClick(e: LeafletMouseEvent) {
    setLocation([e.latlng.lat, e.latlng.lng])
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }

  function handleSelectItem(id: number) {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(selectedId => selectedId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const { name, email, whatsapp } = inputData
    const uf = selectedUf
    const city = selectedCity
    const [latitude, longitude] = location
    const items = selectedItems
    const data = {
      name,
      email,
      whatsapp,
      uf,
      city,
      latitude,
      longitude,
      items,
    }
    await api.post('points', data)
    history.push('/')
    toast.success('Novo ponto de coleta registrado')
  }

  return (
    <Container>
      <header>
        <img src={logo} alt="eCollect" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do ponto <br /> de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <Field>
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </Field>

          <FieldGroup>
            <Field>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </Field>

            <Field>
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </Field>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereços</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map
            center={userLocation}
            zoom={15}
            style={{ height: 300, marginBottom: 50 }}
            onClick={handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={location} />
          </Map>

          <FieldGroup>
            <Field>
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option value={uf.initials} key={uf.initials}>
                    {`${uf.name} (${uf.initials})`}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
            </Field>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ItemsGrid>
            {items.map(item => (
              <Item
                selected={selectedItems.includes(item.id)}
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </Item>
            ))}
          </ItemsGrid>
        </fieldset>

        <button type="submit">Cadastrar Ponto de coleta</button>
      </form>
    </Container>
  )
}

export default CreatePoint
