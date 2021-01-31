import { $doc, $body } from "../utils/globals.js";

const $recipe = $(".recipe");
const $error = $(".error");
const $recipeIngredients = $recipe.find(".recipe__ingredients");
const $recipePreparation = $recipe.find(".recipe__preparation");

$doc.on("submit", ".form-recipe", function (event) {
	event.preventDefault();

	const $form = $(this);
	const formData = $form.serializeArray();

	$.ajax({
		method: "POST",
		url: "ajax/recipe.php",
		data: formData,
		beforeSend: function () {
			$body.addClass("loading");
			$recipe.addClass("hidden");
			$error.addClass("hidden");
			$recipeIngredients.html("");
		},
		success: function (response) {
			response = JSON.parse(response);

			if (response.success) {
				const randomRecipe = response.recipe;
				const randomRecipeIngredients = randomRecipe.ingredients;

				$recipe.find(".recipe__title").html(randomRecipe.name);
				$recipe
					.find(".recipe__image img")
					.attr("src", randomRecipe.image);
				$recipe
					.find(".recipe__preparation")
					.html(randomRecipe.preparation);

				randomRecipeIngredients.forEach(function (ingredient) {
					$recipeIngredients.append("<li>" + ingredient + "</li>");
				});

				$recipe.removeClass("hidden");
			} else {
				$error.removeClass("hidden");
			}
		},
		complete: function (response) {
			$body.removeClass("loading");
		},
	});
});
