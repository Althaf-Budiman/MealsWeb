$(document).ready(function() {
    const url = new URL(window.location.href)
    const mealId = url.searchParams.get('meal_id')

    $.ajax({
        method: 'get',
        url: `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        success: function(response) {
            const meal = response.meals[0]
            $("#title-meal").text(meal.strMeal)
            $("#subtitle-meal").text(`${meal.strArea} ${meal.strCategory} Meal`)

            $("#image-meal").attr('src', meal.strMealThumb)
            $("#instructions-meal").text(meal.strInstructions)
        },
        error: function(error) {
            console.error("Error: ", error)
        }
    })
})