import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CardHead } from '../components/CardHead'
import { CardPlanet } from '../components/CardPlanet'
import { PaginationButtons } from '../components/PaginationButtons'

export const FavoritePage = () => {
    const localSave = JSON.parse(localStorage.getItem('planetFav'))
    const [favouritesPlanets, setFavouritesPlanets] = useState(localSave.length)
    const [currentPage, setCurrentPAge] = useState(0)

    const localSavePagination = localSave.slice(currentPage,currentPage + 10)

    const nextPage = () => {
        if( localSave.length > currentPage +10 )
        setCurrentPAge( currentPage + 10 )
    }
    const prevPage = () => {
        if (currentPage > 0)
        setCurrentPAge( currentPage - 10 )
    }

    return (
        <div className='mt-5 home__main container'>
            <h1 className='home__title'> {favouritesPlanets}  Favorite Star Wars Planets</h1>

            <nav>                        
                <Link 
                    to="/ "
                    className="butn btn-pri btn_back"
                >Back
                </Link>                       
            </nav> 
            <table className='table animate__animated animate__fadeIn'>


               
                {
                    ( localSave.length >= 1 )?

                    <CardHead />

                    :
                    

                        <thead>
                            <tr>
                                <th>

                                    you don't have favorite planets
                                </th>

                            </tr>
                        </thead>
                    
                }
               
                <tbody>

                {
                 
                 localSavePagination.map(planet =>
                                <CardPlanet 
                                    key={planet.id} 
                                    FavPlanets={localSave} 
                                    planet={planet} 
                                    setFavouritesPlanets={setFavouritesPlanets}
                                    favouritesPlanets={favouritesPlanets}
                                />

                            )

                    }
                        
                </tbody>

            </table> 

            {(localSave.length > 10)&&
            
            
                <PaginationButtons 
                    
                    nextPage={nextPage}
                    prevPage={prevPage}
                />
            }



        </div>
    )
}
