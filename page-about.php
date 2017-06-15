<?php
get_header();
?>
<style>
body{
	background:#FDE4DF;
}
</style>


<div id='about'>
	<div class='pool'>
		<div class='one fill mobile'>
			&nbsp;
		</div>
		<div class='ten fill'>
			<div class='inner'>
				<div class='intro'>
					We connect designers and 
					makers to the goods and 
					services they need.
				</div>
				
				<div class='about-main'>
					<div class='three fill'>
						<div class='icon image-holder'>
							<img alt='Helen' src='<?php echo get_template_directory_uri(); ?>/images/helen.png'>
						</div>
					</div>
					<div class='nine fill'>
						<div class='entry-content'>
							<?php while ( have_posts() ) : the_post(); ?>
								<?php the_content(); ?>
							<?php endwhile; ?>
						</div>
					</div>
					<div style='clear:both'></div>
				</div>
				
				<?php $page = get_page_by_title( 'About more' ); if ($page->ID): ?>
					<div class='about-more'>
						<div class='nine fill'>
							<div class='entry-content'>
								<?php echo nl2br($page->post_content); ?>
							</div>
						</div>
						<div class='three fill'>
							<div class='side-info'>
								<div class='item'>
									<a href='<?php echo home_url(); ?>/directory'>
									<div class='image-holder'>
										<img alt='Directory' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/directory.jpg'>
									</div>
									</a>
									<h4>
										<a href='<?php echo home_url(); ?>/directory'>
											Visit the directory
										</a>
									</h4>
								</div>
								<div class='item'>
									<a href='<?php echo home_url(); ?>/sign-up'>
									<div class='image-holder'>
										<img alt='Sign up' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/sign.jpg'>
									</div>
									</a>
									<h4>
										<a href='<?php echo home_url(); ?>/sign-up'>
											Become a JGM supplier
										</a>
									</h4>
								</div>
								<div class='item'>
									<a target='_blank' href='http://eepurl.com/lobiL'>
									<div class='image-holder'>
										<img alt='Mailing list' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/mail.jpg'>
									</div>
									</a>
									<h4>
										<a target='_blank' href='http://eepurl.com/lobiL'>
											Subscribe
										</a>
									</h4>
								</div>
							</div>
						</div>
						<div style='clear:both'></div>
					</div>
				<?php endif; ?>
				
			</div>
		</div>
		<div class='one fill mobile'>
			&nbsp;
		</div>
		<div style='clear:both'></div>
	</div>
</div>
		


<?php get_footer(); ?>