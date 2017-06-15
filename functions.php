<?php
//Post Thumbnail	
if(function_exists('add_theme_support')) {
   add_theme_support( 'post-thumbnails' );
   add_image_size( 'medium', 600, 600, true );
   add_image_size( 'homeimage-feature', 946, 482, true );
   add_image_size( 'homeimage', 612, 472, true );
   add_image_size( 'post-thumb', 300, 200, true );
}

//Register Menus
register_nav_menus( array(
	'primary' => 'Primary Navigation',
	'second' => 'Secondary Navigation',
	'mobile' => 'Mobile Navigation'
) );

if ( function_exists('register_sidebar') ){
	register_sidebar(array(
			'name' => 'Suppliers Sidebar',
			'id' => 'suppliers-sidebar',
			'description' => 'Sidebar for Suppliers',
			'before_widget' => '<ul id="%1$s" class="widget %2$s">',
			'after_widget' => '</ul>',
			'before_title' => '<h6 class="widget-title">',
			'after_title' => '</h6>',
	));
	register_sidebar(array(
			'name' => 'Journal Sidebar',
			'id' => 'journal-sidebar',
			'description' => 'Sidebar for Journal',
			'before_widget' => '<ul id="%1$s" class="widget %2$s">',
			'after_widget' => '</ul>',
			'before_title' => '<h6 class="widget-title">',
			'after_title' => '</h6>',
	));
}

/**
 * Do the work to pagination work on custom post types listing pages.
 * OBS: Importante lembrar que a pagina de listagem n‹o pode ter a mesma key do post_type
 *
 * @author @rafaelxy
 * @param array $query args array, as it works on wordpress (dont use it as string)
 * @return array set global $posts and return it as well
 */
define('PER_PAGE_DEFAULT', 18);
function custom_query_posts(array $query = array())
{
	global $wp_query;
	wp_reset_query();

	$paged = get_query_var('paged') ? get_query_var('paged') : 1;

	$defaults = array(
		'paged'				=> $paged,
		'post_status' => 'publish',
		'posts_per_page'	=> PER_PAGE_DEFAULT
	);
	$query += $defaults;
	
	$wp_query = new WP_Query($query);
	
}
function custom_excerpt_length( $length ) {
	return 14;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
function new_excerpt_more($more) {
       global $post;
	return '...<br /><br /><a href="'. get_permalink($post->ID) . '">Read more</a>';
}
add_filter('excerpt_more', 'new_excerpt_more');
function remove_more_jump_link($link) { 
	$offset = strpos($link, '#more-');
	if ($offset) {
		$end = strpos($link, '"',$offset);
	}
	if ($end) {
		$link = substr_replace($link, '', $offset, $end-$offset);
	}
	return $link;
}
add_filter('the_content_more_link', 'remove_more_jump_link');

function dateDiff ($d1, $d2) {
// Return the number of days between the two dates:
  return round((strtotime($d1)-strtotime($d2))/86400);
}

add_filter('nav_menu_css_class', 'current_type_nav_class', 10, 2 );
function current_type_nav_class($classes, $item) {
    $post_type = get_post_type();
    if(is_home() || is_search()){
    	 $post_type = "";
    }
    if ($item->attr_title != '' && $item->attr_title == $post_type) {
        array_push($classes, 'current-menu-item');
    };
    return $classes;
}
add_rewrite_rule( 'directory/page/([0-9]+)/?$', 'index.php?pagename=directory&paged=$matches[1]', 'top' );

