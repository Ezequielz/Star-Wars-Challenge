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
            console.log('allPlanets')
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
                    <table className='table'>

                        <thead>
                            <tr>
                                <th style={{ width: 100 }} >Name</th>
                                <th style={{ width: 100 }} >Diameter</th>
                                <th style={{ width: 100 }} >Climate</th>
                                <th style={{ width: 100 }} >Terrain</th>
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
