import React from 'react'

export const CardPlanet = ({
    planet,
    FavPlanets,
    state,
    setFavouritesPlanets,
    favouritesPlanets}) => {

            const PlanetsIdArr = []
            if(FavPlanets){
            
                FavPlanets.map( planetLS =>
                    PlanetsIdArr.push(planetLS.id)
                    )
            }


            const handleAddFav = (e) =>{
                e.preventDefault()
                
                let saveFav 
        
                state.data.planets.map(favMapedPlanets => {
                    if(favMapedPlanets.id === e.target.value)
                    
                    saveFav = favMapedPlanets
                            
                });
        
                if(localStorage.getItem('planetFav') == null ){
        
                    localStorage.setItem( 'planetFav',  JSON.stringify( [saveFav]  ))
                }else{
        
                    let localSave = JSON.parse(localStorage.getItem('planetFav'))
                    setFavouritesPlanets(favouritesPlanets + 1)
        
                    localSave.push(saveFav)
        
                    localStorage.setItem( 'planetFav',  JSON.stringify( localSave  ))
        
                }
            };
        
            const handleRemoveFav = (e) =>{
            e.preventDefault()
        
            let localSave = JSON.parse(localStorage.getItem('planetFav'))
            let newSave = localSave
                
                localSave.map( planetLocalStorage => {
        
                if(planetLocalStorage.id === e.target.value){
        
                    newSave = localSave.filter( planetFiltered =>{
                        return planetFiltered.id !== e.target.value
                    })
                    }
                });

                setFavouritesPlanets(favouritesPlanets - 1)
                localStorage.setItem( 'planetFav',  JSON.stringify( newSave  ))
                
                
            };

    return (

        <tr >
           
            <td>{ planet.name }</td>
            <td>{ planet.diameter }</td>
            <td> { planet.climate } </td>
            <td> { planet.terrain } </td>
            <td> 

            {   
            (PlanetsIdArr)&&
                ( PlanetsIdArr.includes(planet.id))
                ?
                <button
                    value={ planet.id }
                    className="btn btn-danger "
                    onClick={ handleRemoveFav }
                >Remove
                </button>
                :
                <button
                    value={ planet.id }
                    className="btn btn-primary " 
                    onClick={ handleAddFav }
                >Add
                </button>
            }

            </td>
            
        </tr>
    )
}
