import { types } from "../types/types";


export const startSaveData = (planetsas) => {

    return (dispatch) => {

        dispatch( data(planetsas) )

    }

}

export const data = (planets)=>({
    type: types.cargarData,
    payload: {
        planets
    }
})