<?php
get_header();
?>
<!--
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery-scrolltofixed-min.js"></script>
-->

<div id='suppliers-a-z' class='supplier'>

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
			<h3 class='heading'>A-Z Listing</h3>
			<?php
				wp_reset_query();
				$per_page = 99999;
				$args = array(
				'post_type' => 'supplier',
				'orderby' => 'title',
        'order' => 'ASC',
				'post_status' => 'publish',
				'posts_per_page'	=> $per_page
				);
				$wp_query = new WP_Query( $args );
				$alphas = array_merge(range('A', 'Z'), range('a', 'z'));
				$first_run = true;
			?>
		
			<div class='listing'>
				<?php if ( $wp_query->have_posts() ) while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
					<?php
						 $first_letter = strtoupper(substr(apply_filters('the_title',$post->post_title),0,1));
						 if ($first_letter != $curr_letter) {
								if(in_array($first_letter, $alphas)) {
									echo "<h2 class='title'>".$first_letter."</h2>";
								}else{
									if($first_run){
										echo "<h2 class='title'>0-9</h2>";
										$first_run = false;
									}
								}
								$curr_letter = $first_letter;
						 }
					 ?>
					<div class='post-title'>
						<div class='inner'>
							<a href="<?php the_permalink();?>">
								<?php the_title(); ?>
							</a>
						</div>
					</div>
				<?php endwhile;?>
			</div>

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