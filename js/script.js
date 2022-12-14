

// https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

document.getElementById('error-message').style.display = "none";



const searchFood = () => {
    
    const searchField =document.getElementById('myInput');
    const searchText = searchField.value;
    searchField.value ='';

    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML ='';



    document.getElementById('error-message').style.display = "none";
    
    if(searchText == ''){
      document.getElementById('error-message').style.display = "block";
    }else{
        const url =`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}
      `;
      fetch(url)
      .then(res =>res.json ())
      .then(data => displayLoad(data?.meals))
    }

    

}
const displayLoad = (images) => {
    const searchResult = document.getElementById('search-result');
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    images.forEach(image => {
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card" onclick="loadMealDetails(${image.idMeal})">
            <img src="${image.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${image.strMeal}</h5>
              <p class="card-text">${image.strInstructions.slice(0,200)}</p>
            </div>
          </div>
        `;
        searchResult.appendChild(div);
    });
}
const loadMealDetails = (mealId) => {
  const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.meals[0]))

}
const displayDetails = (meal) => {
  const mealDetails = document.getElementById('meal-details');
  mealDetails.innerHTML ='';
  // mealDetails.textContent = '';
  const div = document.createElement("div");
  div.classList.add('card')
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
  </div>
  <a href="${meal.strYoutube}" class="btn btn-success">Go Youtube</a>
  `;
  mealDetails.appendChild(div);

}
