<?php
$type    = $_POST['type'];
$product = $_POST['product'];

if ( ! isset( $type ) || empty( $type ) ) {
	echo json_encode( array(
		'success' => false,
		'recipe'  => array(),
	) );
}

$json    = file_get_contents("recipes/{$type}/data.json");
$recipes = json_decode( $json )->recipes;

if ( isset( $product ) && ! empty( $product ) ) {
	$recipes = array_filter($recipes, "hpv_filter_recipes");
}

$recipes             = array_values( $recipes );

if ( empty( $recipes ) ) {
	echo json_encode( array(
		'success' => false,
		'recipe'  => array(),
	) );

	exit;
}

$random_recipe_index = array_rand( $recipes, 1 );
$recipe              = $recipes[ $random_recipe_index ];

echo json_encode( array(
	'success' => true,
	'recipe'  => $recipe,
) );

exit;

function hpv_filter_recipes( $recipe ) {
	$product = $_POST['product'];

	return in_array( $product, $recipe->keywords );
}
