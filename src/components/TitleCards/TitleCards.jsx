import React from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef } from 'react'
import { useEffect } from 'react';



const TitleCards = ({title, category}) => {

  const cardsRef = useRef();

const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.daltaY;
}

useEffect(() =>{
  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])

  return (
    <div className='title-cards'>
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
          {cards_data.map((card, index) =>{
            return <div className="card" key={index}>
              <img src={card.image} alt="" />
              <p>{card.name}</p>
            </div>

          }) }
      </div>
      
    </div>
  )
}

export default TitleCards
