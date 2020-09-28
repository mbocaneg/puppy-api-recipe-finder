import React, { Component } from 'react';
import debounce from "lodash.debounce";

import './App.scss';

import RecipeFinder from './components/RecipeFinder/RecipeFinder';

import Api from './api/api';
import RecipeList from './components/RecipeList/RecipeList';

class App extends Component {

  componentWillMount(){
    window.addEventListener('scroll', this.onScrollToBottom);
  }

  onScrollToBottom = debounce(() =>{
    if (window.innerHeight + document.documentElement.scrollTop + 1  >= document.scrollingElement.scrollHeight) {
      this.fetchMoreRecipes()
    }
  }, 100); 

  constructor(props) {
    super(props);

    this.state = {
      recipeList: [],
      page: 1,
      cached: {},
      noResults: false
    }
  }

  fetchRecipes = async(params) => {
    console.log(params);
    let pageCount = 1;
    let recipes = [];
    // console.log(recipes);

    let noResults = false;
    while(recipes.length < 10) {
      let query = await Api.fetchRecipes(params, pageCount);
      noResults = query.noResults;
      let additional = query.results;
      if(query.noResults){
        break;
      }
      pageCount += 1;

      recipes = [...recipes, ...additional]
    }

    // let pageCount = this.state.page + 1;

    this.setState({
      recipeList: recipes,
      cached: params,
      page: pageCount,
      noResults: noResults
    });

    window.scrollTo(0, 0)

  };

  fetchMoreRecipes = async() => {
    let moreRecipes = [];
    let pageCount = this.state.page;
    while (moreRecipes.length < 10) {
      let query = await Api.fetchRecipes(this.state.cached, this.state.page);
      let additional = query.results;
      if(query.noResults)
        break;
      moreRecipes = [...moreRecipes, ...additional];
      pageCount += 1;
    }
    this.setState(prevState => ({
      recipeList: [...prevState.recipeList, ...moreRecipes],
      page: pageCount
    }));

  };

  render() {
    return (
      <div className="App">
        <RecipeFinder onSearchButtonClick={this.fetchRecipes} />

      {(!this.state.noResults)? 
        (this.state.recipeList && this.state.recipeList.length > 0)?
          <RecipeList recipes={this.state.recipeList} />:null
        : 
        <div className="no-results">
          <h1>Sorry, no results for {this.state.cached.search_recipe} were found </h1>
        </div>
      }
      </div>
    );
  }
}

export default App;
