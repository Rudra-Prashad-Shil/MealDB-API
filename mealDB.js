const showAllMeals = (searchText = '') => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayAllMeals(data.meals))

}
const displayAllMeals = meals => {
  // console.log(meals);
  const allMealsContainer = document.getElementById('meals-container');
  if(meals == null){
    allMealsContainer.innerHTML = `<img src="Images/DataNotFound.jpg" class="img-fluid rounded mx-auto d-block" alt="...">
`;
    return;
  }
  allMealsContainer.innerHTML = '';
  meals.forEach(meal => {
    // console.log(meal);
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('col');
    mealDiv.innerHTML = `
        <div class="card">
         <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
           <h5 class="card-title">${meal.strMeal}</h5>
           <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      `;
    allMealsContainer.appendChild(mealDiv);
  });
}


const searchFood = () => {
  const searchText = document.getElementById('search-bar').value;
  showAllMeals(searchText);
}
showAllMeals();