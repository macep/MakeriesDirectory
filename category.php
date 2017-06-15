<?php
get_header();
$per_page = 8;

global $query_string;
query_posts( $query_string . '&posts_per_page='.$per_page);
?>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery-scrolltofixed-min.js"></script>

<div id='news-listing' class='news'>

	<div class='pool'>
		<div class='two fill'>
			<div class='inner'>
				<div class="sidebar-area">
					<?php dynamic_sidebar('journal-sidebar'); ?>
				</div>
			</div>
		</div>
		<div class='ten fill'>
	
			<?php if ( $wp_query->have_posts() ) while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
				
				<div class='entry-content'>
					<div class='inner outter'>
						<div class='image-holder'>
							<a href="<?php the_permalink();?>">
								<?php if('' != get_the_post_thumbnail()) :?>
									<?php the_post_thumbnail('homeimage'); ?>
								<?php else : ?>
									<img alt='<?php the_title_attribute(); ?>' src='<?php echo get_template_directory_uri(); ?>/images/placeholder.png'>
								<?php endif; ?>
								<div class='info'>
									<div class='info-wrapper'>
										<div class='info-wrapper-inner'>
											<div class='inner'>
												<h3 class='post-title'>
													<?php the_title(); ?>
												</h3>
												<?php the_author(); ?> &bull; <?php the_time('d M Y'); ?>
											</div>
										</div>
									</div>
								</div>
								
								<div class='cover'></div>
							</a>
						</div>
					</div>
				</div>
				
			<?php endwhile; ?>
			<div style='clear:both'></div>
			
			<div id="pagenation">
				<?php wp_pagenavi(); ?>
			</div>
			
		</div>
		<div style='clear:both'></div>
	</div>
	<div style='clear:both'></div>

</div>	

<script>
	$(window).load(function(){
		jQuery(document).ready(function($){
			
			var $submenu = $('.widget-title');
			
			$submenu.click(function() {
				$(this).toggleClass('active');
				$(this).parent().toggleClass('active');
			});
			
			$('.sidebar-area').scrollToFixed( {
					marginTop: 20,
					limit: $('#footer').offset().top
			});
			
		});
	});
</script>

<?php get_footer(); ?>
