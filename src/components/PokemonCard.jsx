import React from 'react'
import './PokemonCard.css'


const PokemonCard = ({pokamonData}) => {
  return (
    <>
    <li className='pokemon-card'>
        <figure>
            <img src={pokamonData.sprites.other.dream_world.front_default} alt={pokamonData.name} className='pokemon-image' />
        </figure>
        <h1 className='pokemon-name'>{pokamonData.name}</h1>
        <div className='pokemon-info pokemon-highlight'>
            <p>
                {pokamonData.types.map((data)=>data.type.name ).join(" , ")}
            </p>
        </div>
        <div className='flex'>
            <p className='pokemon-info'>
                <span>Height: </span>{pokamonData.height}
            </p>
            <p className='pokemon-info'>
                <span>Weight:</span>{pokamonData.weight}
            </p>
            <p className='pokemon-info'>
                <span>Speed: </span>{pokamonData.stats[5].base_stat}
            </p>
        </div>
        <div className='grid-three-cols'>
            <div className='pokemon-info'>
                <p>{pokamonData.base_experience}</p>
                <span>Experience:</span>
            </div>
            <div className='pokemon-info'>
                <p>{pokamonData.base_experience}</p>
                <span>Attact:</span>
            </div>
            <div className='pokemon-info'>
                <p>{pokamonData.abilities.map((item)=> item.ability.name).slice(0,1).join(" , ")}</p>
                <span>Abilities:</span>
            </div>

        </div>

    </li>
    </>

  )
}

export default PokemonCard
