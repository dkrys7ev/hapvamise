import { $win, $body } from "../utils/globals.js";

$win.on("load", function () {
	$body.removeClass("loading");
});
