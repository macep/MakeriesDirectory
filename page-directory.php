<?php
get_header();
wp_reset_query();
$per_page = 2;
$args = array(
'post_type' => 'supplier',
'meta_key' => 'supplier_featured',
'meta_value' => 1,
'post_status' => 'publish',
'posts_per_page'	=> $per_page,
'orderby' => 'rand'
);
$wp_query = new WP_Query( $args );
?>
<!--
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery-scrolltofixed-min.js"></script>
-->

<div id='suppliers-listing' class='supplier'>

	<div class='inner'>
		<div class='banner'>
			<h3>WELCOME TO<br>JUST GOT MADE'S UK MAKER DIRECTORY</h3>
			Jam-packed with everything the modern maker needs. Browse your area of interest for inspiration, or head directly to listed goods &amp; services.
		</div>
	</div>

	<div class='pool'>
		<div class='three fill'>
			<div class='inner'>
				<div class="sidebar-area">
					<h3 class='heading'>Search directory</h3>
					<?php dynamic_sidebar('suppliers-sidebar'); ?>
					<ul class='widget'>
						<a href='<?php echo home_url(); ?>/directory-a-z'>
							<h6 class='widget-title a-z'>
								View A- Z Listing
							</h6>
						</a>
					</ul>
				</div>
			</div>
		</div>
		<div class='nine fill'>
			<h3 class='heading'>Featured Suppliers</h3>
			<?php if ( $wp_query->have_posts() ) while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
				
				<div class='entry-content'>
					<div class='inner outter'>
						<div class='image-holder'>
							<a href="<?php the_permalink();?>">
								<?php if('' != get_the_post_thumbnail()) :?>
									<?php the_post_thumbnail('thumbnail'); ?>
								<?php else : ?>
									<img alt='<?php the_title_attribute(); ?>' src='<?php echo get_template_directory_uri(); ?>/images/placeholder2.png'>
								<?php endif; ?>
								<div class='cover'></div>
							</a>
						</div>
						
						<div class='info'>
							<div class='inner'>
								
								<h3 class='post-title'>
									<a href="<?php the_permalink();?>">
										<?php the_title(); ?>
									</a>
								</h3>
								<?php if(get_custom_field('supplier_short_info')) : ?>
									<div class='short-info'>
										<?php print_custom_field('supplier_short_info'); ?>
									</div>
								<?php endif; ?>
								<?php
									$terms = get_the_term_list( $post->ID, 'region','', ', ', '' );
									$terms = strip_tags($terms);
									if ( $terms ):
								?>
									<div class='region'>
										<?php echo $terms; ?>
									</div>
								<?php endif; ?>
									
							</div>
						</div>
					</div>
				</div>
				
			<?php endwhile; ?>
			
			<div class='entry-content'>
				<div class='inner outter'>
					<a href='<?php echo home_url(); ?>/sign-up'>
						<div class='image-holder'>
							<img alt='Sign up' src='<?php echo get_template_directory_uri(); ?>/images/signup.png'>
						</div>
					</a>
				</div>
			</div>
			
			<div style='clear:both'></div>
			
			<h3 class='heading'>New Suppliers</h3>
			<?php
				wp_reset_query();
				//$paged = get_query_var('paged') ? get_query_var('paged') : 1;
				$per_page = 6;
				$args = array(
				'post_type' => 'supplier',
				'post_status' => 'publish',
				//'paged'				=> $paged,
				'posts_per_page'	=> $per_page
				);
				$wp_query = new WP_Query( $args );
			?>
			
			<?php if ( $wp_query->have_posts() ) while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
				
				<div class='entry-content'>
					<div class='inner outter'>
						<div class='image-holder'>
							<a href="<?php the_permalink();?>">
								<?php the_post_thumbnail('thumbnail'); ?>
								<div class='cover'></div>
							</a>
						</div>
					
						<div class='info'>
							<div class='inner'>
								
								<h3 class='post-title'>
									<a href="<?php the_permalink();?>">
										<?php the_title(); ?>
									</a>
								</h3>
								<?php if(get_custom_field('supplier_short_info')) : ?>
									<div class='short-info'>
										<?php print_custom_field('supplier_short_info'); ?>
									</div>
								<?php endif; ?>
								<?php
									$terms = get_the_term_list( $post->ID, 'region','', ', ', '' );
									$terms = strip_tags($terms);
									if ( $terms ):
								?>
									<div class='region'>
										<?php echo $terms; ?>
									</div>
								<?php endif; ?>
									
							</div>
						</div>
					</div>
				</div>
				
			<?php endwhile; ?>
			<div style='clear:both'></div>
			
			<!--
			<div id="pagenation">
				<?php wp_pagenavi(); ?>
			</div>
			-->
			
		</div>
		<div style='clear:both'></div>
	</div>
	<div style='clear:both'></div>

</div>	

<script>
	$(window).load(function(){
		jQuery(document).ready(function($){
			
			var $submenu = $('.widget_taxonomy .widget-title');
			
			$submenu.click(function() {
				$(this).toggleClass('active');
				$(this).parent().toggleClass('active');
			});
			
			/*
			$('.sidebar-area').scrollToFixed( {
					marginTop: 20,
					limit: $('#footer').offset().top
			});
			*/
			
		});
	});
</script>

<?php get_footer(); ?>