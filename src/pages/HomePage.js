import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { startSaveData } from "../actions/data"
import { fetchStarWarsApi } from "../api/starWarsApi"
import { Spinner } from "../components/Spinner"

export const HomePage = () => {
    
    const state = useSelector(state => state )
   
    const [allPlanets, setAllPlanets] = useState([])
    const [isLoading, setIsLoading] = useState(true)    
    const [currentPage, setCurrentPAge] = useState(0)
    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState('')

    const filteredPlanets = () =>{

        if( search.length === 0 )
            return allPlanets.planets.slice(currentPage,currentPage + 10)

        const filtered = allPlanets.planets.filter( planetFilt => planetFilt.name.includes( search ) )
            return filtered.slice(currentPage,currentPage + 10)

    }

    const nextPage = () => {
        if( allPlanets.planets.filter( planetFilt => planetFilt.name.includes( search ) ).length > currentPage +10 )
        setCurrentPAge( currentPage + 10 )
    }
    const prevPage = () => {
        if (currentPage > 0)
        setCurrentPAge( currentPage - 10 )
    }

    useEffect(() => {
    
        fetchStarWarsApi()
            .then(planets => {
                
                
                dispatch( startSaveData(planets) )
            }) 
    
            
    }, [])

    useEffect(() => {
        setAllPlanets(state.data)
       
    }, [state])
    useEffect(() => {

        if(allPlanets.planets){
            
            setIsLoading(false)
        }

    }, [allPlanets])

  const dispatch = useDispatch()

  const handleSearch = (e) =>{
      setSearching(e.target.value)
      setCurrentPAge(0)
      if(e.target.value === '')
      setSearch('')
  }
  const handleSubmit = (e)=>{

    let nameSearch = searching.toLowerCase()
    let nameCapitalize = nameSearch.charAt(0).toUpperCase() + nameSearch.slice(1)
    e.preventDefault()
    setCurrentPAge(0)
    setSearch(nameCapitalize)
  }

  const handleAddFav = (e) =>{
      e.preventDefault()
      
      let saveFav 

      state.data.planets.map(favMapedPlanets => {
          if(favMapedPlanets.id === e.target.value)
          
          saveFav = favMapedPlanets
                  
      })

      if(localStorage.getItem('planetFav') == null ){

            localStorage.setItem( 'planetFav',  JSON.stringify( [saveFav]  ))
      }else{

          let localSave = JSON.parse(localStorage.getItem('planetFav'))
            localSave.push(saveFav)

            localStorage.setItem( 'planetFav',  JSON.stringify( localSave  ))

      }
  }

  const handleRemoveFav = (e) =>{
    e.preventDefault()

    let localSave = JSON.parse(localStorage.getItem('planetFav'))
    let newSave = localSave
        
        localSave.map( planetLocalStorage => {

        if(planetLocalStorage.id === e.target.value){

            newSave = localSave.filter( planetFiltered =>{
                return planetFiltered.id !== e.target.value
            } )

        }


        } )
        localStorage.setItem( 'planetFav',  JSON.stringify( newSave  ))
        
  }

  const FavPlanets = JSON.parse(localStorage.getItem('planetFav'))

    return (
        <div className='mt-5'>

            <h1> List of Star Wars planets </h1>

                <form onSubmit={ handleSubmit }>

                    <input
                        type="text"
                        placeholder="Buscar planeta"
                        name="search"
                        className="mb-2 form-control"
                        value={ searching }
                        onChange={ handleSearch }
                        autoComplete="off"
                    
                    />
                    <button 
                        type="submit"
                        className="btn btn-primary"
                       >Buscar
                    </button>

                </form>

            <hr/>

            { (isLoading)? 
                    <Spinner/>
                    :
                    <>
                    <table className='table animate__animated animate__fadeIn'>

                        <thead >
                            <tr >
                                <th style={{ width: 80 }} >Name</th>
                                <th style={{ width: 60 }} >Diameter</th>
                                <th style={{ width: 100 }} >Climate</th>
                                <th style={{ width: 130 }} >Terrain</th>
                                <th style={{ width: 50 }} > Favorite</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                                {(allPlanets.planets)&&
                                
                                filteredPlanets().map(planet=> 
                                    
                                    <tr key={planet.create+planet.name}>
                                        <td>{planet.name}</td>
                                        <td>{ planet.diameter }</td>
                                        <td> { planet.climate } </td>
                                        <td> { planet.terrain } </td>
                                        <td> 

                                        {/* { 
                                            (FavPlanets)&&
                                                                            
                                            FavPlanets.map( planetFav =>{
                                                ( planetFav.id === planet.id )?
                                                
                                                 console.log(planet.id)
                                                 : 
                                                 console.log(planetFav.id)
                                            
                                            })
                                            
                                        } */}
                                
                                     
                                            <button
                                                value={ planet.id }
                                                className="btn btn-primary"
                                                onClick={ handleAddFav }
                                            >+
                                            </button>

                                            <button
                                                value={ planet.id }
                                                className="btn btn-danger"
                                                onClick={ handleRemoveFav }
                                            >-
                                            </button>

                                        </td>
                                        
                                    </tr>
                                    
                                    )
                                }
        
                        </tbody>

                </table> 
                <button 
                    className="btn btn-primary"
                    onClick={ prevPage }
                >
                    Anterior
                </button>
                
                <button 
                    className="btn btn-primary"
                    onClick={ nextPage }
                > 
                        Siguiente
                </button> 
                </>
            }


            
        </div>
    )
}
