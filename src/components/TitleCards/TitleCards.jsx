import React from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { useRef, useState } from 'react'
import { useEffect } from 'react';



const TitleCards = ({title, category}) => {


  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYWRkODk5MWE3NTBhNTg3MmVmMzQ3MGNjZGU0YmZhYSIsIm5iZiI6MTcyMTI5MDU2OC43NzU1MjgsInN1YiI6IjY2OTdlNzhlYzI1NGEzMjNhMDhhMDYwZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.osoZdRFyUsbjaD_4ECUNeEue_NUg0HwQ5NDgE30QP4c'
    }
  };
  
const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.daltaY;
}

useEffect(() =>{

   
  fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));


  cardsRef.current.addEventListener('wheel', handleWheel);
}, [])

  return (
    <div className='title-cards'>
      <h2>{title?title: "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index) =>{
            return <div className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </div>

          }) }
      </div>
      
    </div>
  )
}

export default TitleCards
