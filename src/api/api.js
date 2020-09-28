export default class Api {

    static dietRestrictions = {
        "vegan": ["chicken", "beef", "steak", "pork", "tuna", "egg", "cheese", "milk", "fish", "cod", "shrimp", "scallop", "clam"],
        "vegetarian": ["beef", "steak", "fish", "cod", "pork", "chicken", "shrimp", "scallop", "clam"],
        "halal": ["pork", "shrimp", "shellfish"],
        "kosher": ["pork", "shrimp", "shellfish"],
        "dairy_free": ["cheese", "milk"]
    }

    static async fetchRecipes(params, page) {
        console.log("search params: " + params.search_recipe);
        console.log("ingredients params: " + params.search_ingredients);

        const PROXY = "https://can-cors.herokuapp.com/";
        const API_URL = `http://www.recipepuppy.com/api/?q=${params.search_recipe}&p=${page}&i=${params.search_ingredients}`;
    
        let results = await fetch(PROXY + API_URL)
          .then(res => res.json())
          .then(recipes => recipes.results);

        let isEmpty = results.length > 0? false: true;

        let filtered = results.filter(recipe => Api.filterRestricted(recipe, params.restrictions));

        // while(filtered.length < 10) {
        //     let additional = await fetch(PROXY + API_URL)
        //     .then(res => res.json())
        //     .then(recipes => recipes.results);
        //     if(additional.length === 0)
        //         break;
        //     additional = additional.filter(recipe => Api.filterRestricted(recipe, params.restrictions));
        //     filtered = [...filtered, ...additional];
        // }
        
        return {
            results: filtered,
            noResults: isEmpty
        }
    }

    static filterRestricted(recipe, restrictions) {
        for(const restrict of restrictions) {
            let restrictIngredients = Api.dietRestrictions[restrict];
            for(let ingredient of restrictIngredients) {
                if(recipe.ingredients.includes(ingredient))
                    return false;
            };
        };
        return true;
    };
};

