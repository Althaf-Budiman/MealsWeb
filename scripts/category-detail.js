$(document).ready(function () {
    const url = new URL(window.location.href)
    const categoryName = url.searchParams.get('category_name')

    $('#meal-category').text(categoryName + ' Meals')

    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
        method: 'get',
        success: function (response) {
            let meals = response.meals

            meals.forEach(meal => {
                let mealCard = `
                <div  id="${meal.idMeal}" class="relative hover:cursor-pointer overflow-hidden w-60 group rounded-xl shadow-md duration-300 text-slate-500 shadow-slate-200">
                    <figure class="relative border-2 border-slate-200">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal} image" class="aspect-video w-full duration-300 transition  group-hover:scale-105" />
                        <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                        <figcaption class="absolute bottom-0 left-0 w-full p-4 text-bottom text-white">
                            <h3 class="text-2xl font-semibold transition-colors  group-hover:text-white">${meal.strMeal}</h3>
                        </figcaption>
                    </figure>
                </div>
            `;

                // Append the card to the container
                $('#container-meal').append(mealCard);
            });
        },
        error: function (error) {
            console.error("Error: ", error)
        }
    })
})
