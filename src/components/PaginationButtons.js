import React from 'react'

export const PaginationButtons = ({nextPage,prevPage}) => {


    return (
        <div className='btn_next btn_pag'>

            <button 
            className="butn btn-pri"
            onClick={ prevPage }
            >
                Prev
            </button>
            
            <button 
                className="butn btn-pri"
                onClick={ nextPage }
            > 
                    Next
            </button> 
        
        
        </div>


    )
}
