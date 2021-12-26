import React from 'react'

export const PaginationButtons = ({nextPage,prevPage}) => {


    return (
        <>

            <button 
            className="btn btn-primary"
            onClick={ prevPage }
            >
                Prev
            </button>
            
            <button 
                className="btn btn-primary"
                onClick={ nextPage }
            > 
                    Next
            </button> 
        
        
        </>


    )
}
