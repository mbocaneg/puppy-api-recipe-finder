import React from 'react';
import { shallow, mount } from 'enzyme';

import RecipeFinder from './RecipeFinder';

describe('RecipeFinder', () => {

    let wrapper = shallow(<RecipeFinder />);

    it('renders a recipe input text field', () => {
        expect(wrapper.find('#search-recipe')).toHaveLength(1);
    });

    it('renders an ingredients input text field', () => {
        expect(wrapper.find('#search-ingredients')).toHaveLength(1);
    });

    it('sets state according to recipe input text', () => {
        const recipe_query = "steak";
        wrapper.find('#search-recipe')
            .simulate('change', {target: {name: "search_recipe", value: recipe_query}});
        const appState = wrapper.state();
        expect(appState.search_recipe).toBe(recipe_query);;
    });

    it('sets state according to ingredient input text', () => {
        const ingredients_query = "avocados, tomatos";
        wrapper.find('#search-ingredients')
            .simulate('change', {target: {name: "search_ingredients", value: ingredients_query}});
        const appState = wrapper.state();
        expect(appState.search_ingredients).toBe(ingredients_query);;
    });

    it('renders a submit button', () => {
        expect(wrapper.find('#btn-search')).toHaveLength(1);
    });

    it('updates dietary restrictions based on toggling checkboxes', () => {
        let restrictions = new Set();

        restrictions.add("vegan");
        wrapper
            .find("#restrict-vegan")
            .simulate('change', {target: {name: "vegan", type:"checkbox", checked: true}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.add("vegetarian");
        wrapper
            .find("#restrict-vegetarian")
            .simulate('change', {target: {name: "vegetarian", type:"checkbox", checked: true}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.add("halal");
        wrapper
            .find("#restrict-halal")
            .simulate('change', {target: {name: "halal", type:"checkbox", checked: true}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.add("kosher");
        wrapper
            .find("#restrict-kosher")
            .simulate('change', {target: {name: "kosher", type:"checkbox", checked: true}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.add("dairy_free");
        wrapper
            .find("#restrict-dairy-free")
            .simulate('change', {target: {name: "dairy_free", type:"checkbox", checked: true}});
        expect(wrapper.state().restrictions).toEqual(restrictions);
    });

    it('updates dietary restrictions based on de-toggling checkboxes', () => {
        let restrictions = new Set();

        restrictions.add("vegan");
        restrictions.add("vegetarian");
        restrictions.add("halal");
        restrictions.add("kosher");
        restrictions.add("dairy_free");

        restrictions.delete("vegan");
        wrapper
            .find("#restrict-vegan")
            .simulate('change', {target: {name: "vegan", type:"checkbox", checked: false}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.delete("vegetarian");
        wrapper
            .find("#restrict-vegetarian")
            .simulate('change', {target: {name: "vegetarian", type:"checkbox", checked: false}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.delete("halal");
        wrapper
            .find("#restrict-halal")
            .simulate('change', {target: {name: "halal", type:"checkbox", checked: false}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.delete("kosher");
        wrapper
            .find("#restrict-kosher")
            .simulate('change', {target: {name: "kosher", type:"checkbox", checked: false}});
        expect(wrapper.state().restrictions).toEqual(restrictions);

        restrictions.delete("dairy_free");
        wrapper
            .find("#restrict-dairy-free")
            .simulate('change', {target: {name: "dairy_free", type:"checkbox", checked: false}});
        expect(wrapper.state().restrictions).toEqual(restrictions);
    });

    it('calls onSubmit function and onSubmit callback passed in through props', () => {
        const mockOnClick = jest.fn();
        const wrapper = shallow(<RecipeFinder onSearchButtonClick={mockOnClick} />);

        wrapper
            .find("#btn-search")
            .simulate('click');
        expect(mockOnClick).toHaveBeenCalled();
    });

});