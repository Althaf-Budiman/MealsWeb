$(document).ready(function () {
    const url = new URL(window.location.href)
    const mealId = url.searchParams.get('meal_id')

    $.ajax({
        method: 'get',
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
        success: function (response) {
            const meal = response.meals[0]
            console.log(meal)

            $("#title-meal").text(meal.strMeal)
            $("#subtitle-meal").html(`${meal.strArea} ${meal.strCategory} Meal`)

            $("#back-category").attr('href', `category-detail.html?category_name=${meal.strCategory}`)

            $("#image-meal").attr('src', meal.strMealThumb)

            const instructions = meal.strInstructions.replace(/\r?\n/g, '<br>');
            $("#instructions-meal").html(instructions);

            // tags
            const tags = meal.strTags ? meal.strTags.split(',') : []
            tags.forEach(function (tag) {
                let tagContainer = `<span class="text-white bg-gray-600 mt-3 rounded-full font-medium text-sm px-3 py-1">${tag}</span>`
                $("#tags-container").append(tagContainer)
            })

            // ingredients
            const ingredientsContainer = $("#ingredients-container")
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`]
                const measure = meal[`strMeasure${i}`]

                if (ingredient) {
                    let ingredientList = `<li>${measure} ${ingredient}</li>`
                    ingredientsContainer.append(ingredientList)
                }
            }

            // youtube
            const youtubeUrl = meal.strYoutube;
            if (youtubeUrl) {
                // Mengonversi URL ke format embed
                const videoId = youtubeUrl.split('v=')[1];
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                console.log(embedUrl)
                const videoEmbed = `<iframe class="w-full h-[30rem] mt-16" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
                $("#youtube-container").html(videoEmbed);
            }
        },
        error: function (error) {
            console.error("Error: ", error)
        }
    })
})