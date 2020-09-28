import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import RecipeFinder from './components/RecipeFinder/RecipeFinder';
import RecipeList from './components/RecipeList/RecipeList';

describe('App', () => {
  let wrapper = shallow(<App />);

  it('renders recipe search component sucessfully', () => {
    const recipeFinder = wrapper.find(RecipeFinder);
    expect(recipeFinder).toHaveLength(1);
  })

  it('renders recipe results list', () => {
    const recipeList = wrapper.find(RecipeList);
    expect(recipeList).toHaveLength(1);
  })

})