import React from 'react'
import { CardHead } from './CardHead';
import { CardPlanet } from './CardPlanet';

export const Cards = ({
    allPlanets,
    filteredPlanets,
    FavPlanets,
    state,
    setFavouritesPlanets,
    favouritesPlanets}) => {



  
    return (
                <table className='table animate__animated animate__fadeIn'>

                             <CardHead />
                    <tbody>

                            {(allPlanets.planets)&&

                            
                            filteredPlanets().map(planet=> 
                                
                                <CardPlanet 
                                    key={planet.id} 
                                    FavPlanets={FavPlanets} 
                                    planet={planet} 
                                    state={state}
                                    setFavouritesPlanets={setFavouritesPlanets}
                                    favouritesPlanets={favouritesPlanets}
                                />
                                
                                )
                            }

                    </tbody>

                </table>  
    )
}
