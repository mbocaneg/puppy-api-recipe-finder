import React, { Component } from 'react';

import './RecipeFinder.scss';
import logo from '../../assets/chef.svg'

class RecipeFinder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search_recipe: '',
            search_ingredients: '',
            restrictions: new Set(),
            isCollapsed: false
        };
    };

    onChange = (e) => {
        const name = e.target.name;

        if(e.target.type === 'checkbox'){
            let toggled = e.target.checked;
            let updated = new Set(this.state.restrictions);

            if(toggled){
                updated.add(name);
            }
            else{
                updated.delete(name);
            }

            this.setState({
                restrictions: updated
            })
            // console.log(updated);
        }
        else{
            const value = e.target.value;
    
            this.setState(
                {[name]: value}
            )
        }
    };

    onSubmit = (e) => {
        const params = {
            search_recipe: this.state.search_recipe,
            search_ingredients: this.state.search_ingredients,
            restrictions: Array.from(this.state.restrictions)
        };

        this.setState({
            isCollapsed: true
        });

        this.props.onSearchButtonClick(params);
    }

    render() {
        return (
            <>
            <div className={this.state.isCollapsed? 'finder-collapsed': 'finder'}>
                <div className="container">
                        <div className="title-logo">
                        <img className="logo" src={logo} />
                        <h1 className="title" >Recipe Finder</h1>
                    </div>
        

                    <div className="searchboxes">
                        <label className="input-text">
                            <input name="search_recipe" onChange={this.onChange} type="text" id="search-recipe" placeholder="Search Recipes..." />
                        </label>

                        <label className="input-text">
                            <input name="search_ingredients" onChange={this.onChange} type="text" id="search-ingredients" placeholder="Ingredients..." />
                        </label>

                        <label className="btn-submit">
                            <input onClick={this.onSubmit} id="btn-search" type="submit" value="search" />
                        </label>
                    </div>

                    <div id="diet-restrictions" className="checkboxes">
                        <label>
                            vegan
                            <input name="vegan" onChange={this.onChange} id="restrict-vegan" type="checkbox"/>
                        </label>
                        <label>
                            vegetarian
                            <input name="vegetarian" onChange={this.onChange} id="restrict-vegetarian" type="checkbox"/>
                        </label>
                        <label>
                            halal
                            <input name="halal" onChange={this.onChange} id="restrict-halal" type="checkbox"/>
                        </label>
                        <label>
                            kosher
                            <input name="kosher" onChange={this.onChange} id="restrict-kosher" type="checkbox"/>
                        </label>
                        <label>
                            dairy-free
                            <input name="dairy_free" onChange={this.onChange} id="restrict-dairy-free" type="checkbox"/>
                        </label>
                    </div>
                </div>
            </div>
            {this.state.isCollapsed? <div className="dummy"></div> : null}
            </>

        );
    }
};

export default RecipeFinder;