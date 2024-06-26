/* eslint-disable react/prop-types */
import React from 'react'
import pharmacy_logo from '../assets/pharmacy_logo.png';

export default function Card({ data }) {
  const actionButtonclickHandler = (loc)=>{
    window.open(`https://www.google.com/maps/place/${loc}`,'_blank');
  }


  return (
    <div className='card-wrapper'>
        <div className='info'>
        <div className='icon'>
          <img src={pharmacy_logo}></img>
        </div>
        <div className='content'>
          <div className='card-title'>Eczane Adı</div>
          <div className='name'>{ data.pharmacyName }</div>
          <div className='phone'><a target='_blank' href={`tel:+90${data.phone}`}>{ data.phone } </a></div>
          </div>
        </div>
        <div className='address'>
          <div className='card-title'>Adres</div>
          <div className='desc'>{data.address}</div>
        </div>
        <div className='action'>
          <div className='action-button' onClick={()=>actionButtonclickHandler(data.latitude + ',' + data.longitude)}>
            Konuma Git
          </div>
        </div>
    </div>
  )
}
