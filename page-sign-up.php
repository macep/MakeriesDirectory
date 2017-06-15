<?php
get_header();
?>
<style>
body{
	background:#FDE4DF;
}
</style>


<div id='signup'>
	<div class='pool'>
		<div class='one fill mobile'>
			&nbsp;
		</div>
		<div class='ten fill'>
			<div class='inner'>
				<div class='intro'>
					Want to become a JGM 
					supplier? Here's how:
				</div>
				<div class='intro-entry entry-content'>
					<?php while ( have_posts() ) : the_post(); ?>
						<?php the_content(); ?>
					<?php endwhile; ?>
				</div>
				
				<div class='step'>
					<h3>Step:</h3>
					<div class='image-holder'>
						<img alt='Step' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/steps.png'>
					</div>
				</div>
				
				<?php $page = get_page_by_title( 'Sign up step 1' ); if ($page->ID): ?>
				<div class='signup-main'>
					<div class='two fill'>
						<div class='icon image-holder'>
							<img alt='Helen' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/step1.png'>
						</div>
					</div>
					<div class='ten fill'>
						<div class='entry-content'>
							<?php echo nl2br($page->post_content); ?>
						</div>
					</div>
					<div style='clear:both'></div>
				</div>
				<?php endif; ?>
				
				<?php $page = get_page_by_title( 'Sign up step 2' ); if ($page->ID): ?>
				<div class='signup-main'>
					<div class='two fill'>
						<div class='icon image-holder'>
							<img alt='Helen' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/step2.png'>
						</div>
					</div>
					<div class='ten fill'>
						<div class='entry-content'>
							<?php echo nl2br($page->post_content); ?>
						</div>
					</div>
					<div style='clear:both'></div>
				</div>
				<?php endif; ?>
				
				<?php $page = get_page_by_title( 'Sign up step 3' ); if ($page->ID): ?>
				<div class='signup-main'>
					<div class='two fill'>
						<div class='icon image-holder'>
							<img alt='Helen' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/step3.png'>
						</div>
					</div>
					<div class='ten fill'>
						<div class='entry-content'>
							<?php echo nl2br($page->post_content); ?>
						</div>
					</div>
					<div style='clear:both'></div>
				</div>
				<?php endif; ?>
				
				<div class='signup-main'>
					<div class='sixteen fill'>
						<div id='FSContact'>
							<?php echo do_shortcode("[si-contact-form form='1']") ?>
						</div>
					</div>
				</div>
				
				
			</div>
		</div>
		<div class='one fill mobile'>
			&nbsp;
		</div>
		<div style='clear:both'></div>
	</div>
</div>
		


<?php get_footer(); ?>