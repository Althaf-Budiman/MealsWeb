$(document).ready(function () {

    // fetch categories
    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
        method: 'GET',
        success: function (response) {
            let categories = response.categories

            categories.forEach(category => {
                let categoryCard = `
                <div onclick="mealDetail('${category.strCategory}')" id="${category.idCategory}" class="relative hover:cursor-pointer overflow-hidden w-60 group rounded-xl shadow-md duration-300 text-slate-500 shadow-slate-200">
                    <figure class="relative border-2 border-slate-200">
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory} image" class="aspect-video w-full duration-300 transition  group-hover:scale-105" />
                        <div class="absolute inset-0 bg-black opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                        <figcaption class="absolute bottom-0 left-0 w-full p-4 text-bottom text-white">
                            <h3 class="text-2xl font-semibold transition-colors  group-hover:text-white">${category.strCategory}</h3>
                        </figcaption>
                    </figure>
                </div>
            `;

                // Append the card to the container
                $('#container-category').append(categoryCard);
            });

        },
        error: function (error) {
            console.error("Error: ", error)
        }
    })

})

function mealDetail(categoryName) {
    window.location.href = `category-detail.html?category_name=${categoryName}`
}