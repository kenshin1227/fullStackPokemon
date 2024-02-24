import { useState, useEffect } from 'react'
import axios from 'axios'


const Pokemon = (props) => {

  const [ searchPokeText, setSearchPokeText ] = useState('')
  const [ receivedPoke, setReceivedPoke ] = useState()
  const [ allPokeList, setAllPokeList] = useState([])
  const [ callUseEffect, setCallUseEffect ] = useState(false)
  

  useEffect(() => {
    console.log('poke start')
    },[callUseEffect])


    const deleteBH = (e, index) => {
      let prevPoke = allPokeList
      prevPoke.splice(index, 1)
    
      setAllPokeList(prevPoke)
      setCallUseEffect(!callUseEffect)
    }

    
    const addToBH = (e, pokemon) => {
      
      let newPoke = allPokeList
      newPoke.push(pokemon)
    
      setAllPokeList(newPoke)  
      setCallUseEffect(!callUseEffect)
    
      console.log(receivedPoke, 'successed Poke')
      }




    const ChangeBH = (e) => {
      setSearchPokeText(e.target.value)
    }
    
    const searchedtBH = async (e) => {
      try {
        const request = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchPokeText}/`) 
        setReceivedPoke(request.data)
      } catch (error) {
          window.alert('please enter searched pokemon number')
      }
    }
  


  return (
    <div className="px-20 py-2 bg-green-200 flex flex-cil flex-nowrap gap-2">
    <div>
      <p className="bg-green-500 px-10 font-bold"> Search Pokemon </p>

      <input type='text' value={searchPokeText} onChange={ChangeBH} />
     
      <button className="bg-blue-200 px-5 font-bold" onClick={searchedtBH}> Click button </button>

        {receivedPoke && <div>
          <p>{receivedPoke.name}</p>
          <img src={receivedPoke.sprites.front_default} />
          <button className ="px-4 font-bold" onClick={(e) => addToBH(e, receivedPoke)}> Add to FavPokemon List </button>
        </div>}

      {allPokeList.length > 0 && <div>
        {allPokeList.map((allPokemon, i) => {
          return <div className="bg-blue-200 font-bold" key={i}>
          <p>{allPokemon.name}</p>
          <img src={allPokemon.sprites.front_default} />

          <button className="bg-green-600 px-4 font-bold" onClick={(e) => deleteBH(e, i)}> Delete </button>
        </div>
        })}  
      </div>
      }
    </div>
    </div>

  );
      }
      


export default Pokemon;