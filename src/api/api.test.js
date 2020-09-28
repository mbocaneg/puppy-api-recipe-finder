import Api from './api';

describe('api', () =>{

    it('calls recipe puppy api and fetches a recipe list', async() => {
        const params = {
            search_recipe: 'apple pie',
            search_ingredients: '',
            restrictions: []
        };

        const resultsArr = [{
            title: "Apple Pie",
            href: "http://apple-pie-recipe-url.com",
            ingredients: "list, of, ingredients",
            thumbnail: "http://thumbnail.png"
        }];

        const mockFetchPromise = Promise.resolve({ 
            json: () => Promise.resolve({results: resultsArr})
        });
        const fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        let recipes = await Api.fetchRecipes(params, 1);
        expect(recipes).toEqual(resultsArr);
    });
});