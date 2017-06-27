<?php

function jgm_enqueue_scripts() {
    // WP REST API path
    $wpRestApiPath = '/wp-json/wp/v2/';

    // bundled styles file is imported here
    wp_enqueue_style( 'jgm-style', get_bloginfo('template_directory') . '/assets/css/jgm.css', array(), null, false);


    // register project libs
    wp_register_script('jgm-libs', get_bloginfo('template_directory') . '/app/built/libs.js', array(), null, false);

    // register our app.js, which has a dependency on project libs
    wp_register_script('jgm-app', get_bloginfo('template_directory') . '/app/built/app.js', array(), null, false);

    // enqueue all scripts
    wp_enqueue_script('jgm-libs');
    wp_enqueue_script('jgm-app');

    // we need to create a JavaScript variable to store our API endpoint...
    wp_localize_script('jgm-libs', 'appAPI', array('url' => get_bloginfo('wpurl') . $wpRestApiPath));

    // ... and useful information such as the theme directory and website url
    wp_localize_script('jgm-libs', 'blogInfo', array('url' => get_bloginfo('template_directory') . '/', 'site' => get_bloginfo('wpurl')));
}

add_action('wp_enqueue_scripts', 'jgm_enqueue_scripts');


?>