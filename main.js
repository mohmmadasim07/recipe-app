const api = {
  baseurl: "https://www.themealdb.com/api/json/v1/1/search.php?s=",
};

const search = document.querySelector(".searchRecipes");

search.addEventListener("keypress", getinput);

function getinput(ev) {
  if (ev.keyCode === 13) {
    getSearchResult(search.value);
  }
}

function getSearchResult(e) {
  fetch(`${api.baseurl}${e}`)
    .then(function (recipe) {
      return recipe.json();
    })
    .then(displayRecipe)
    .catch(function () {
      document.querySelector("h2").innerHTML = "item not found";
      document.querySelector("p").innerHTML =
        "NO item found kindly search for  generic item such pizza burger noodles chicken soup etc";
      console.log("something went wrong it fetch api call");
    });
}

function displayRecipe(recipe) {
  let recipes = recipe.meals[0];

  let name = document.querySelector(".recipeName");
  let instruction = document.querySelector(".recipeInstructions");
  let img = document.querySelector(".recipeImg");
  img.src = recipes.strMealThumb;
  instruction.innerHTML = recipes.strInstructions;
  name.innerHTML = recipes.strMeal;

  for (let i = 1; i <= 20; i++) {
    if (recipes["strIngredient" + i]) {
      let listitem = `${recipes["strIngredient" + i]} ----- ${
        recipes["strMeasure" + i]
      }`;

      let item = document.querySelector(".list");
      let li = document.createElement("li");
      let text = document.createTextNode(listitem);
      li.appendChild(text);
      item.appendChild(li);
    } else {
      console.log("error");
    }
  }
}
