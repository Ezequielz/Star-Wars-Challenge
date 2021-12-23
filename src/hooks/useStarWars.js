import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchStarWarsApi } from "../api/starWarsApi"

export const useStarWars = () => {

   
    
    const [isLoading, setIsLoading] = useState(true)
    const [planets, setPlanets] = useState([])
    // console.log(planets)

    useEffect(() => {
        //cargar los planetas de starWars

        fetchStarWarsApi()
            .then(planets => {
               
                setIsLoading(false);
                setPlanets( planets )
            }) 
        
        
    }, [])
console.log(planets)
    return (
        isLoading,
        planets
    )
}
