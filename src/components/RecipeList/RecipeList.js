import React, { Component } from 'react';

import './RecipeList.scss'
import dinner from '../../assets/dinner.png';

export default class RecipeList extends Component {

    inline = (thumbnail) => {
        return {
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(" + thumbnail + ")", 
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
    }

    truncate = (str, length) => {
        return (str.length > length)? str.substring(0, length) + ' . . .': str;
    }

    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="recipelist">
                <ul>
                    {(this.props.recipes && this.props.recipes.length > 0)?
                    this.props.recipes.map( (recipe, index) => 
                        <li key={index} >

                                <div className="title-section">
                                    <h2>{this.truncate(recipe.title, 50)}</h2>
                                </div>
                                <div className="recipe-content">
                                    <img src={recipe.thumbnail} onError={(e) =>{e.target.src=dinner; e.target.style='width: 88px; height: 88px'} } alt='Preview not available' />
                                    <p className="ingredients">{ this.truncate(recipe.ingredients, 90)}</p>
                                </div>
                                <p className="link"><a href={recipe.href}>Read More . . .</a></p>

                        </li> )
                    :
                    <div></div>}
                </ul>
            </div>
        )
    }
};