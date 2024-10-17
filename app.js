const searchMeal = document.getElementById("input");
// console.log(searchMeal);

function fetchMeal() {
  if (searchMeal.value) {
    console.log(searchMeal.value);
    let URL = `https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;
    fetch(URL)
      .then((res) => res.json())
      .then((meals) => showMeal(meals.meals));
    document.getElementById("noMeal").style.display = "none";
    document.querySelector(".meal-wrapper").innerHTML += "";
  } else {
    alert("Please Search for your favorite food first!");
    document.getElementById("noMeal").style.display = "block";
  }
}

function showMeal(meals) {
  for (let meal of meals) {
    document.querySelector(
      ".meal-wrapper"
    ).innerHTML += ` <div class="meal-box border border-amber-400 p-4">
          <img
            src=${meal.strMealThumb}
            alt=""${meal.strMeal}
            class="rounded h-[250px] w-full object-cover"
          />
          <div class="p-3">
            <h3 class="text-2xl text-white">${meal.strMeal}</h3>
            <p class="text-gray-400 mt-2">
              ${meal.strInstructions.slice(2, 120)} ....
            </p>
            <p class="italic text-gray-500">
              <span>${meal.strArea}</span> <span>$</span>
            </p>
            <div class="mt-5 flex gap-5">
              <a href=${
                meal.strYoutube
              } target="_blank" class="bg-amber-400 p-2 rounded"> Watch</a>
              <button class="bg-amber-400 p-2 rounded" onclick="lookUpDetails('${
                meal.idMeal
              }')">View Recipe</button>
            </div>
          </div>
        </div>`;
  }
}

function lookUpDetails(id) {
  let URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(URL)
    .then((res) => res.json())
    .then((meals) => showDetailsMeal(meals.meals[0]));
}

function showDetailsMeal(meal) {
  const Details = document.getElementById("Details");
  Details.classList.add("visible");
  Details.classList.remove("invisible");

  Details.innerHTML = `<div class="popup bg-white w-[70%] min-h-[500px] p-10">
            <h2 class="text-2xl font-bold mb-4">${meal.strMeal}</h2>
            <p class="mb-6">${meal.strInstructions}</p>
            <a href=${meal.strYoutube}
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded ml-2"
            >
              watch
            </a>
            <button onclick="closeDetails()">Close</button>
          </div>`;
}

function closeDetails() {
  Details.classList.add("invisible");
  Details.classList.remove("visible");
}

const search = document.getElementById("search");
search.addEventListener("click", () => {
  fetchMeal();
});
