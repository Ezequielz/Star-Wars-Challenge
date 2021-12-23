import { types } from "../types/types";

/*
    {
        id: 12321,
        name: 'sdsdw'        
        diametro:
        clima:
        terreno:
    }

*/

export const dataReducer = ( state = {}, action ) => {


    switch ( action.type ) {
        case types.cargarData:
            
            return {

                planets: action.payload.planets,

            }
        case types.borrarData:

            return {}
    
        default:
            return state;
    }

}
