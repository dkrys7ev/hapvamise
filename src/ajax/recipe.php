<?php

$type                = $_POST['type'];
$json                = file_get_contents("recipes/{$type}/data.json");
$recipes             = json_decode( $json )->recipes;
$random_recipe_index = array_rand( $recipes, 1 );
$recipe              = $recipes[ $random_recipe_index ];

echo json_encode($recipe);
exit;
