import React from 'react';
import { shallow, mount } from 'enzyme';

import RecipeList from './RecipeList';

describe('RecipeList', () => {
    let wrapper = shallow(<RecipeList />);

    it('should render a ul that will hold individual results', () => {
       expect(wrapper.find('ul')).toHaveLength(1);
    });

    it('should render props array into ul element', () => {
        const recipeArr = [{
                "title": "Dish 1",
                "ingredients": "beef, steak, chicken, tuna, egg, cheese, milk",
            },
            {
                "title": "Dish 2",
                "ingredients": "steak, chicken, tuna, egg, cheese, milk",
            }
        ];

        let wrapper = mount(<RecipeList recipes={recipeArr} />);
        expect(wrapper.find('li')).toHaveLength(recipeArr.length);

    });

    it('should render recipe attributes', () => {
        const recipeArr = [{
                "title": "Dish 1",
                "ingredients": "beef, steak, chicken, tuna, egg, cheese, milk",
            },
            {
                "title": "Dish 2",
                "ingredients": "steak, chicken, tuna, egg, cheese, milk",
            }
        ];

        let wrapper = mount(<RecipeList recipes={recipeArr} />);

        const recipeLi = wrapper.find('li');

        expect(recipeLi.at(0).text()).toContain(recipeArr[0].title)
        expect(recipeLi.at(0).text()).toContain(recipeArr[0].ingredients)

        expect(recipeLi.at(1).text()).toContain(recipeArr[1].title)
        expect(recipeLi.at(1).text()).toContain(recipeArr[1].ingredients)

    });

});