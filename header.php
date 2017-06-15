<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php if ( is_page_template( 'page-ng-directory.php' ) ) { ?>
<html lang="en" ng-app="makeries">
<?php } else { ?>
<html xmlns="http://www.w3.org/1999/xhtml">
<?php }?>

<head profile="http://gmpg.org/xfn/11">

	<?php if ( is_page_template( 'page-ng-directory.php' ) ) { ?>
		<meta charset="utf-8" />
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" name="viewport" />
		<meta content="width" name="MobileOptimized" />
		<meta content="true" name="HandheldFriendly" />
		<meta content="yes" name="apple-mobile-web-app-capable" />
		<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
		<meta content="descr" name="description">
		<meta content="keyword" name="keywords">

		<title make-title>Just Got Made</title>

	<?php } else { ?>
		<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		
		<?php if(is_home() || is_front_page()) { ?>
			<title><?php bloginfo('name'); ?><?php echo ' / '.get_bloginfo('description'); ?></title>	
		<?php } else { ?>
			<title><?php wp_title('-', true, 'right'); ?><?php bloginfo('name'); ?></title>	
		<?php } ?>
	<?php } ?>
	
	<!-- Web font
  ================================================== -->
	<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,700italic' rel='stylesheet' type='text/css'>
  
	<!-- CSS
  ================================================== -->
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/base.css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/water-twelve.css">
  <link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
	
	<link rel="Shortcut Icon" href="<?php echo get_template_directory_uri(); ?>/images/favicon.ico" type="image/x-icon" />	
   
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	
	<script>
		
	
		$(window).load(function(){
			jQuery(document).ready(function($){
				
				var $menu = $('#mobile-menu'),
				$menulink = $('.switch');
				
				$menulink.click(function() {
					$menulink.toggleClass('active');
					$menu.toggleClass('active');
				});
				$('.loading').fadeOut(200, function(){
					$('#content').animate({
					opacity: 1},1200, function(){
						$('#footer').show();
					});
				});	
				
			});
		});
	</script>
	
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="main-body">
		
		<div id="header">
			<div class='inner'>
				<div class="logo">
					<a title='Just Got Made' href='<?php echo home_url(); ?>'>
						<img alt='Just Got Made' src='<?php echo get_template_directory_uri(); ?>/images/logo.png'>
					</a>
				</div>
			
				<nav id="main-menu" role="navigation">
					<?php wp_nav_menu( array( 'theme_location' => 'primary' ) ); ?>
				</nav>
				
				<div class='switch'></div>
				
				<div style='clear:both'></div>
			</div>
		</div>
		
		<nav id="mobile-menu" role="navigation">
			<?php wp_nav_menu( array( 'theme_location' => 'mobile' ) ); ?>
		</nav>
		<div class='loading'></div>
		<div id="content">
			
		
		