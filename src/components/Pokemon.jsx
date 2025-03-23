import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard'
import './PokemonCard.css'
import LoadingBar from 'react-top-loading-bar';

const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=649"
    const [pokemonList, setPokemonList] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)
    const [serachValue,setSerachValue] = useState("")
    const [loadingBar,setLoadingBar] = useState(10) 
    
    const apiData = async ()=>{
        try {
            setLoadingBar(40)
            const res = await fetch(API)
            const data = await res.json()
            const pokamonData = data.results.map( async(item)=>{
                const res = await fetch(item.url)
                const responseData = await res.json()
                setLoadingBar(70)
                return responseData
            })
            const finalData = await Promise.all(pokamonData)
            setPokemonList(finalData);
            setLoadingBar(0)
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            setError(error)
            setLoadingBar(80)
        }
    }

    useEffect(()=>{
        apiData()
    },[])

    // create search filter logic 
    const searchData = pokemonList.filter((newValue)=> newValue.name.toLowerCase().includes(serachValue.toLocaleLowerCase()));
    // loading code
    if(loading){
        return (
            <>
            <LoadingBar color="#09122C" progress={loadingBar} height={4} onLoaderFinished={()=> setLoadingBar(0)} />
            <div className='loader'>
        </div>
            </>
        )
    }
    // error code
    if(error){
        return (
            <div className='error-box'>
            <h1>Error: {error.message}</h1>
        </div>
        )
    }
    // main code 
return (
    <>
   <section className='container'>
    <header>
    <h1>Lets Catch Pokémon</h1>
    </header>
    <div className='pokemon-search'>
        <input type="text" placeholder='Search Pokemon...' value={serachValue} onChange={(e)=> setSerachValue(e.target.value)}  />
    </div>
    <div>
        <ul className='cards'>
            {
            searchData.map((item)=>{
                return (
                    <PokemonCard key={item.id} pokamonData={item} />
                )
            }).sort()
            }
        </ul>
    </div>

    </section>
    </>
)
}

export default Pokemon
