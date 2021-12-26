import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const FavoritePage = () => {
    const localSave = JSON.parse(localStorage.getItem('planetFav'))
    const [favouritesPlanets, setFavouritesPlanets] = useState(localSave.length)

    const handleRemoveFav = (e) =>{
        e.preventDefault()
    
        let newSave = localSave
            
            localSave.map( planetLocalStorage => {
    
            if(planetLocalStorage.id === e.target.value){
    
                newSave = localSave.filter( planetFiltered =>{
                    return planetFiltered.id !== e.target.value
                })
    
            }
            })

            setFavouritesPlanets(favouritesPlanets - 1)
            localStorage.setItem( 'planetFav',  JSON.stringify( newSave  ))
            
      }


    return (
        <div className='mt-5'>
            <h1> {favouritesPlanets}  Favorite Star Wars Planets</h1>

            <nav>                        
                <Link 
                    to="/ "
                    className="btn btn-primary"
                >Back
                </Link>                       
            </nav> 
            <table className='table animate__animated animate__fadeIn'>


                <thead >
                {
                    ( localSave.length >= 1 )?


                    <tr >
                        <th style={{ width: 100 }} >Name</th>
                        <th style={{ width: 100 }} >Diameter</th>
                        <th style={{ width: 120 }} >Climate</th>
                        <th style={{ width: 150 }} >Terrain</th>
                        <th style={{ width: 100 }} > Favorite</th>
                    </tr>

                    :

                    <p>you don't have favorite planets</p>
                }
                </thead>
                <tbody>

                {
                 
                            localSave.map(planet =>


                                <tr >
                                    <td >{planet.name}</td>
                                    <td>{ planet.diameter }</td>
                                    <td> { planet.climate } </td>
                                    <td> { planet.terrain } </td>
                                    <td> 
                                          
                                        <button
                                            value={ planet.id }
                                            className="btn btn-danger "
                                            onClick={ handleRemoveFav }
                                        >Remove
                                        </button>
                                            
                                    </td>
                                    
                                </tr>

                            )

                    }
                        
                </tbody>

            </table> 



        </div>
    )
}
