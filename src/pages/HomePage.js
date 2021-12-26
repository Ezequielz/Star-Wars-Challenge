import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { fetchStarWarsApi } from "../api/starWarsApi"
import { startSaveData } from "../actions/data"
import { Spinner } from "../components/Spinner"
import { Link } from 'react-router-dom'
import { Cards } from "../components/Cards"
import { PaginationButtons } from "../components/PaginationButtons"

export const HomePage = () => {
    
    const state = useSelector(state => state )
   
    const [allPlanets, setAllPlanets] = useState([])
    const [isLoading, setIsLoading] = useState(true)    
    const [currentPage, setCurrentPAge] = useState(0)
    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState('')
    const FavPlanets = JSON.parse(localStorage.getItem('planetFav'))
    const [favouritesPlanets, setFavouritesPlanets] = useState(FavPlanets.length)

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


    return (
        <div className='mt-5 home__main container'>

            <nav className=" home__planetsFav" >                        
                <Link 
                    to="/favoritesplanets "
                    className="butn btn-pri"
                >Planets Favorites : {favouritesPlanets}
                </Link>                       
            </nav> 

            <h1 className="home__title row"> List of Star Wars planets </h1>
            
                <form onSubmit={ handleSubmit } className="col-12 home__form">

                    <input
                        type="text"
                        placeholder="Search planet"
                        name="search"
                        className="mb-1 home__search col-6"
                        value={ searching }
                        onChange={ handleSearch }
                        autoComplete="off"
                    
                    />
                    <button 
                        type="submit"
                        className="butn btn-pri home__btn"
                       >Search
                    </button>



                </form>

            <hr/>

            { (isLoading)
                    ? 
                    <Spinner/>

                    :
                <>
                    <Cards 
                        allPlanets={allPlanets} 
                        filteredPlanets={filteredPlanets}
                        FavPlanets={FavPlanets}
                        state={state}
                        favouritesPlanets={favouritesPlanets}
                        setFavouritesPlanets={setFavouritesPlanets}
                    />

                    <PaginationButtons 
                    
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />

                </>
            }


        </div>
    )
}
