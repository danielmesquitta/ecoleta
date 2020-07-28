import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'

import logo from '../../assets/logo.svg'
import { Container, Field, FieldGroup, ItemsGrid, Item } from './styles'

const CreatePoint: React.FC = () => {
  return (
    <Container>
      <header>
        <img src={logo} alt="eCollect" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do ponto <br /> de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <Field>
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </Field>

          <FieldGroup>
            <Field>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </Field>

            <Field>
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </Field>
          </FieldGroup>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereços</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map
            center={[-18.637291, -48.189616]}
            zoom={15}
            style={{ height: 300, marginBottom: 50 }}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-18.637291, -48.189616]} />
          </Map>

          <FieldGroup>
            <Field>
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </Field>

            <Field>
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
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
            <Item selected={true}>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Oleo" />
              <span>Óleo de Cozinha</span>
            </Item>
            <Item>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Oleo" />
              <span>Óleo de Cozinha</span>
            </Item>
            <Item>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Oleo" />
              <span>Óleo de Cozinha</span>
            </Item>
            <Item>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Oleo" />
              <span>Óleo de Cozinha</span>
            </Item>
            <Item>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Oleo" />
              <span>Óleo de Cozinha</span>
            </Item>
            <Item>
              <img src="http://localhost:3333/uploads/oleo.svg" alt="Oleo" />
              <span>Óleo de Cozinha</span>
            </Item>
          </ItemsGrid>
        </fieldset>

        <button type="submit">Cadastrar Ponto de coleta</button>
      </form>
    </Container>
  )
}

export default CreatePoint
