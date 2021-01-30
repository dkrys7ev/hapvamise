import { $doc, $body } from "../utils/globals.js";

const $recipe = $(".recipe");
const $recipeIngredients = $recipe.find(".recipe__ingredients");
const $recipePreparation = $recipe.find(".recipe__preparation");

$doc.on("submit", ".form-recipe", function (event) {
	event.preventDefault();

	$.ajax({
		method: "POST",
		url: "ajax/recipe.php",
		data: {
			type: "veggie",
			// keywords: ["peas", "potatoes"]
		},
		beforeSend: function () {
			$body.addClass("loading");
			$recipe.addClass("hidden");
			$recipeIngredients.html('');
		},
		success: function (response) {
			const randomRecipe = JSON.parse(response);
			const randomRecipeIngredients = randomRecipe.ingredients;

			$recipe.find(".recipe__title").html(randomRecipe.name);
			$recipe.find(".recipe__image img").attr("src", randomRecipe.image);
			$recipe.find(".recipe__preparation").html(randomRecipe.preparation);

			randomRecipeIngredients.forEach(function (ingredient) {
				$recipeIngredients.append("<li>" + ingredient + "</li>");
			});
		},
		complete: function (response) {
			$body.removeClass("loading");
			$recipe.removeClass("hidden");
		},
	});
});
