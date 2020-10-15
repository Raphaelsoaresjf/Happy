import React, {useEffect, useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import {useParams} from 'react-router-dom';

import Sidebar from '../components/Sidebar/Sidebar';
import api from '../services/api';

import '../styles/pages/orphanage.css';
import happyMapIcon from '../utils/MapIcon';
import { Link } from "react-router-dom";

interface IOrphanage {
  name: string;
  latitude: number;
  longitude: number;
  instructions: string;
  about: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: number;
    url: string;
  }[];
}

interface IOrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<IOrphanageParams>();
  const [orphanage, setOrphanage] = useState<IOrphanage>();
  
  useEffect(() => {
      api.get(`/orphanages/${params.id}`).then(response =>{
        setOrphanage(response.data);
      })
  }, []);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[0].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map(image => {
              return(
                <button key={image.id} type="button" className="active ">
              <img src={image.url} alt={orphanage.name} />
            </button>
              )
            })}
          </div>
      
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                 <TileLayer 
                    url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`} 
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <Link to="">Ver rotas no Google Maps</Link>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
             {orphanage.open_on_weekends ? 
              (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              )
              :
              (
                <div className="dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )
            }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}