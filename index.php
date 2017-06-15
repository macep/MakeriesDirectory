<?php
get_header(); 
?>
<!-- FlexSlider -->
<script defer src="<?php echo get_template_directory_uri(); ?>/js/jquery.flexslider.js"></script>
<div id='home'>
	
	<div class='feature-images'>
		<div class='inner'>
			<?php
				wp_reset_query();
				$posts_per_page = 4;
				$args = array(
				'post_type' => 'homeslider',
				'post_status' => 'publish',
				'posts_per_page'	=> $posts_per_page
				//'orderby' => 'rand'
				);
				$slider = new WP_Query( $args );
			?>
			
			<section class="slider">
				<div class="flexslider carousel">
					<ul class="slides">
						<?php if ( $slider->have_posts() ) while ( $slider->have_posts() ) : $slider->the_post(); ?>
							<li>
								<?php print_custom_field('home_feature_image:to_image_tag', 'homeimage-feature'); ?>
								
								<?php if(get_custom_field('home_url')) : ?>
									<?php 
										if(get_custom_field('home_url_target')){
											$target='_blank';
										}else{
											$target='_parent';
										}
									?>
									<a href='<?php print_custom_field('home_url'); ?>' target='<?php echo $target; ?>'>
								<?php endif; ?>
								<div class='caption'>
									<div class='inner'>
										<div class='inner-wrap'>
											<div class='icon'>
												<div class='icon-wrapper'>
													<?php if(get_custom_field('home_icon')=='jgm') : ?>
														<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-a.png'>
													<?php elseif(get_custom_field('home_icon')=='happening') : ?>
														<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-b.png'>
													<?php elseif(get_custom_field('home_icon')=='school') : ?>
														<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-c.png'>
													<?php elseif(get_custom_field('home_icon')=='spotlight') : ?>
														<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-d.png'>
													<?php elseif(get_custom_field('home_icon')=='discuss') : ?>
														<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-e.png'>
													<?php elseif(get_custom_field('home_icon')=='conversation') : ?>
														<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-f.png'>
													<?php endif; ?>
												</div>
											</div>
											<h1><?php the_title(); ?></h1>
											<?php print_custom_field('home_short_info'); ?>
										</div>
									</div>
								</div>
								<?php if(get_custom_field('home_url')) : ?>
									</a>	
								<?php endif; ?>
							</li>
						<?php endwhile; ?>
					</ul>
				</div>
			</section>
		</div>
	</div>
	
	<div class='pool'>
		<div class='one-third fill'>
			<div class='inner'>
				<?php
					wp_reset_query();
					$per_page = 1;
					$args = array(
					'post_type' => 'homebox1',
					'post_status' => 'publish',
					'posts_per_page'	=> $per_page,
					'orderby' => 'rand'
					);
					$wp_query = new WP_Query( $args );
				?>
				<?php if ( $wp_query->have_posts() ) while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
					
					<div class='home-info'>
						<?php if(get_custom_field('home_url')) : ?>
							<?php 
								if(get_custom_field('home_url_target')){
									$target='_blank';
								}else{
									$target='_parent';
								}
							?>
							<a href='<?php print_custom_field('home_url'); ?>' target='<?php echo $target; ?>'>
						<?php endif; ?>
						<div class='image-holder'>
							<?php print_custom_field('home_image:to_image_tag', 'homeimage'); ?>
							<div class='cover'></div>
						</div	>
						<?php if(get_custom_field('home_url')) : ?>
							</a>	
						<?php endif; ?>
						<div class='inner-wrap'>
							<?php if(get_custom_field('home_url')) : ?>
								<?php 
									if(get_custom_field('home_url_target')){
										$target='_blank';
									}else{
										$target='_parent';
									}
								?>
								<a href='<?php print_custom_field('home_url'); ?>' target='<?php echo $target; ?>'>
							<?php endif; ?>
							<h2><?php the_title(); ?></h2>
							<?php if(get_custom_field('home_url')) : ?>
								</a>	
							<?php endif; ?>
							<?php print_custom_field('home_short_info'); ?>
						</div>
					</div>
					
				<?php endwhile; ?>
			</div>
		</div>
		<div class='one-third fill'>
			<div class='inner'>
				<?php
					wp_reset_query();
					$per_page = 1;
					$args = array(
					'post_type' => 'homebox2',
					'post_status' => 'publish',
					'posts_per_page'	=> $per_page,
					'orderby' => 'rand'
					);
					$wp_query = new WP_Query( $args );
				?>
				<?php if ( $wp_query->have_posts() ) while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
					
					<div class='home-info'>
						<?php if(get_custom_field('home_url')) : ?>
							<?php 
								if(get_custom_field('home_url_target')){
									$target='_blank';
								}else{
									$target='_parent';
								}
							?>
							<a href='<?php print_custom_field('home_url'); ?>' target='<?php echo $target; ?>'>
						<?php endif; ?>
						<div class='image-holder'>
							<?php print_custom_field('home_image:to_image_tag', 'homeimage'); ?>
							<div class='cover'></div>
						</div	>
						<?php if(get_custom_field('home_url')) : ?>
							</a>	
						<?php endif; ?>
						<div class='inner-wrap'>
							<?php if(get_custom_field('home_url')) : ?>
								<?php 
									if(get_custom_field('home_url_target')){
										$target='_blank';
									}else{
										$target='_parent';
									}
								?>
								<a href='<?php print_custom_field('home_url'); ?>' target='<?php echo $target; ?>'>
							<?php endif; ?>
							<h2><?php the_title(); ?></h2>
							<?php if(get_custom_field('home_url')) : ?>
								</a>	
							<?php endif; ?>
							<?php print_custom_field('home_short_info'); ?>
						</div>
					</div>
					
				<?php endwhile; ?>
			</div>
		</div>
		<div class='one-third fill'>
			<div class='inner'>
				<?php
					wp_reset_query();
					$per_page = 1;
					$args = array(
					'post_type' => 'homebox3',
					'post_status' => 'publish',
					'posts_per_page'	=> $per_page,
					'orderby' => 'rand'
					);
					$wp_query = new WP_Query( $args );
				?>
				<?php if ( $wp_query->have_posts() ) while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
					
					<div class='home-info'>
						<?php if(get_custom_field('home_url')) : ?>
							<?php 
								if(get_custom_field('home_url_target')){
									$target='_blank';
								}else{
									$target='_parent';
								}
							?>
							<a href='<?php print_custom_field('home_url'); ?>' target='<?php echo $target; ?>'>
						<?php endif; ?>
						<div class='image-holder'>
							<?php print_custom_field('home_image:to_image_tag', 'homeimage'); ?>
							<div class='cover'></div>
						</div	>
						<?php if(get_custom_field('home_url')) : ?>
							</a>	
						<?php endif; ?>
						<div class='inner-wrap'>
							<?php if(get_custom_field('home_url')) : ?>
								<?php 
									if(get_custom_field('home_url_target')){
										$target='_blank';
									}else{
										$target='_parent';
									}
								?>
								<a href='<?php print_custom_field('home_url'); ?>' target='<?php echo $target; ?>'>
							<?php endif; ?>
							<h2><?php the_title(); ?></h2>
							<?php if(get_custom_field('home_url')) : ?>
								</a>	
							<?php endif; ?>
							<?php print_custom_field('home_short_info'); ?>
						</div>
					</div>
					
				<?php endwhile; ?>
			</div>
		</div>
		<div style='clear:both'></div>
	</div>
	
	<div style='clear:both'></div>
</div>

<script type="text/javascript">
	$(window).load(function(){
		jQuery(document).ready(function($){
			$('.flexslider').flexslider({
				animation: "fade",
				animationLoop: true,
				directionNav: false,
				pauseOnAction: true,
				slideshowSpeed: 5000,           
				animationSpeed: 500
			});
		});
	});
</script>

<?php get_footer(); ?>