document.getElementById("recipeSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("recipeInput").value;
  if (value === "")
    return;

  /* Recipe Info */
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + value;
  console.log(url.meals);

  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json.meals[1]);

      document.getElementById("recipeName").innerHTML = json.meals[0].strMeal;
      document.getElementById("type").innerHTML = json.meals[0].strCategory + ", " + json.meals[0].strArea;
      document.getElementById("instructions").innerHTML = json.meals[0].strInstructions;
      document.getElementById("picture").src = json.meals[0].strMealThumb;

      if (json.meals.length == 0) {
        document.getElementById("similar").innerHTML = "<h3>Similar Searches:</h3>" + "none";
      } else {

        let similarMeals = "<pre>";
        let len = 0;

        if (json.meals.length > 7) {
          len = 7;
        } else {
          len = json.meals.length;
        }

        for (let i = 0; i < len; i++) {
          similarMeals += json.meals[i].strMeal + "     ";
        }

        document.getElementById("similar").innerHTML = "<br> <h3>Similar Searches:</h3>" + similarMeals + "</pre>";
      }
    })
});

/*let items = "";
let done = false;
let i = 1;
const itemKey = "strIngredient"
let foodItem = itemKey + i;

function grabItems(json) {
  while (done === false) {
    if ((json.foodItem != "") && (json.foodItem != NULL)) {
      items += json.foodItem + "<br>";
      i++;
      foodItem = itemKey + i;
    } else {
      done = true;
    }
  }

for (const x of json(5).keys()) {
  console.log(x);
}

document.getElementById("ingredients").innerHTML = items; */