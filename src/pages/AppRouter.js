import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
import { FavoritePage } from './FavoritePage';
import { HomePage } from './HomePage';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Routes >
                    <Route exact path="/favoritesplanets" element={ <FavoritePage/> } /> 
                    <Route exact path="/" element={ <HomePage/> }  /> 
                </Routes >
            </div>
        </Router>
    )
}
