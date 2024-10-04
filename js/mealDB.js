// loading meals in home --------------------------------
const showAllMeals = async(searchText = '') => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayAllMeals(data.meals);
  } 
  catch(error){
    console.log(error);
  }
}

//displaying all meals in home------------------------
const displayAllMeals = meals => {
  // console.log(meals);
  const allMealsContainer = document.getElementById('meals-container');
  if (meals == null) {
    allMealsContainer.innerHTML = `<img src="Images/DataNotFound.jpg" class="img-fluid rounded mx-auto d-block" alt="...">`;
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
           <p class="card-text">Looking Delicious? see details by Clicking Below!</p>
           <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#mealDetails">
            Details
            </button>
          </div>
        </div>
      `;
    allMealsContainer.appendChild(mealDiv);
  });
}

//foodSearch---------------------------------------------------------
const searchFood = () => {
  const searchText = document.getElementById('search-input-field').value;
  showAllMeals(searchText);
  document.getElementById('search-input-field').value='';
}

// Meal Details for Modals-----------------------------------------
const loadMealDetails = async(mealId) =>{
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMealDetails(data.meals[0])
    
  } catch (error) {
    console.log(error);
  }
}

const showMealDetails = (meal) =>{
  document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
  const mealBody = document.getElementById('meal-details-body');
  mealBody.innerHTML = `
    <img src="${meal.strMealThumb}" class="img-fluid rounded mb-2" alt="${meal.strMeal}">
    <p class="text-center">Food Catergory: <span class="fw-bold">${meal.strCategory}</span></p>
    <p class="text-center">Food Origin: <span class="fw-bold">${meal.strArea}</span></p>
    <p><span class="fw-bold">Instructions:</span> ${meal.strInstructions}</p>
    <a class="d-block text-center fw-bold text-decoration-none" href="${meal.strYoutube}" target="_blank">Youtube Video Link</a>
  `;
}

// default all meals Load
showAllMeals();