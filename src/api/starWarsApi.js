

export const fetchStarWarsApi = async() => {
    
    const url = 'https://swapi.dev/api/planets/?page='
    const PlanetsArray = []
    const Planets= []

    let apiFetch
    

        for (let i = 0; i < 6; i++) {
            
            apiFetch = await fetch( `${url}${i+1}` )
            .then(resp => resp.json())
            
            if(apiFetch.results !== undefined){

                PlanetsArray.push(apiFetch.results)

            }
             
        }
        PlanetsArray.map( a => {
            a.map( b =>{
                Planets.push(b)
            })
         })
        
    //  console.log(Planets)

    return Planets 
    
}

