<?php

$selected_menu = $attributes['selected_menu'] ?? 0;
wp_nav_menu(['menu' => $selected_menu]);
