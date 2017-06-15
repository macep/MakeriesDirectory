<?php
get_header(); 
?>

<div id='news-single'>
	
	<div class='pool'>
		<div class='one fill'>
			<?php while ( have_posts() ) : the_post(); ?>
			<div class='inner'>
				<div class='icon image-holder'>
					<?php
						$category_name = '';
						$category = get_the_category();
						$cat_ID = $category[0]->cat_ID;
						$category_name = $category[0]->cat_name;
					?>
					<?php if($category_name=='Happening') : ?>
						<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-bb.png'>
					<?php elseif($category_name=='School') : ?>
						<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-cb.png'>
					<?php elseif($category_name=='Spotlight') : ?>
						<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-db.png'>
					<?php elseif($category_name=='Discuss') : ?>
						<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-eb.png'>
					<?php elseif($category_name=='Conversation') : ?>
						<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-fb.png'>
					<?php else: ?>
						<img src='<?php echo get_template_directory_uri(); ?>/images/icon/icon-ab.png'>
					<?php endif; ?>
				
				</div>
			</div>
			<?php endwhile; ?>
		</div>
		<div class='seven fill'>
			<?php while ( have_posts() ) : the_post(); ?>
			<div class="entry-content">
				<div class='inner'>
					<div class='inner-wrapper'>
						<div class='title'>
							<h3 class='post-title'>
								<?php the_title(); ?>
							</h3>
							<?php the_author(); ?> &bull; <?php the_time('d M Y'); ?>
						</div>
					
						<div class='content'>
							<?php the_content(); ?>
							
							<?php the_tags("<div class='social-tagging'>Tagged in: ",", ","</div>"); ?>
							
						</div>
						
						<div class='share-item'>
							<div class='inner-wrapper'>
								<span class='item heading'>Share this:</span>
								<span class='item'>
									<span class='facebook'><a href='http://www.facebook.com/sharer.php?u=<?php echo get_permalink(); ?>'></a></span>
									<span class='twitter'><a href='http://twitter.com/?status=<?php echo get_permalink(); ?>'></a></span>
									<span class='pinterest'><a href="javascript:void((function()%7Bvar%20e=document.createElement(&apos;script&apos;);e.setAttribute(&apos;type&apos;,&apos;text/javascript&apos;);e.setAttribute(&apos;charset&apos;,&apos;UTF-8&apos;);e.setAttribute(&apos;src&apos;,&apos;http://assets.pinterest.com/js/pinmarklet.js?r=&apos;+Math.random()*99999999);document.body.appendChild(e)%7D)());" data-icon="\e004"></a></span>
								</span>
							</div>
						</div>
						
					</div>
					
					<div class='single-nav'>
						<div class="prev">
							<?php next_post_link('%link', 'Previous'); ?>
							<?php if(!get_adjacent_post(false, '', false)) { echo ''; } ?>
						</div>
						<div class="next">
						<?php previous_post_link('%link', 'Next'); ?>
							<?php if(!get_adjacent_post(false, '', true)) { echo ''; } ?>
						</div>
					</div>
					
				</div>
			</div>
			<?php endwhile; ?>
			
			
			
		</div>
		<div class='four fill'>
			<div class="side-content">
				<div class='inner'>
					<div class='inner-wrapper'>
					
						<?php
							wp_reset_query();
							$per_page = 2;
							
							$args=array(
								'post_type' => 'post',
								'cat' => $cat_ID,
								'post_status' => 'publish',
								'post__not_in' => array($post->ID),
								'posts_per_page'=>$per_page,
								'ignore_sticky_posts'=>1
							);
							$wp_query = new WP_Query( $args );
						?>
						<?php if ( $wp_query->have_posts() ): ?>
						<div class='list-item'>
							<h6 class='list-title'>You might also like:</h6>
							
							<?php while ( $wp_query->have_posts() ) : $wp_query->the_post(); ?>
							<div class='item'>	
								<div class='image-holder'>
									<a href="<?php the_permalink();?>">
										<?php the_post_thumbnail('post-thumb'); ?>
									</a>
								</div>
								<h3 class='post-title'>
									<a href="<?php the_permalink();?>">
										<?php the_title(); ?>
									</a>
								</h3>
								<div class='post-date'>
									<?php the_time('d M Y'); ?>
								</div>
							</div>
							<?php endwhile; ?>
							
						</div>
						<?php endif; ?>
						
						<div class='list-item'>
							<h6 class='list-title'>Other links:</h6>
							<div class='item'>
								<a href='<?php echo home_url(); ?>/directory'>
								<div class='image-holder'>
									<img alt='Directory' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/directory.jpg'>
								</div>
								</a>
								<h3 class='post-title'>
									<a href='<?php echo home_url(); ?>/directory'>
										Visit the directory
									</a>
								</h3>
							</div>
							<div class='item'>
								<a href='<?php echo home_url(); ?>/sign-up'>
								<div class='image-holder'>
									<img alt='Sign up' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/sign.jpg'>
								</div>
								</a>
								<h3 class='post-title'>
									<a href='<?php echo home_url(); ?>/sign-up'>
										Become a JGM supplier
									</a>
								</h3>
							</div>
							<div class='item'>
								<a target='_blank' href='http://eepurl.com/lobiL'>
								<div class='image-holder'>
									<img alt='Mailing list' src='<?php echo get_template_directory_uri(); ?>/images/sidebar/mail.jpg'>
								</div>
								</a>
								<h3 class='post-title'>
									<a target='_blank' href='http://eepurl.com/lobiL'>
										Subscribe
									</a>
								</h3>
							</div>
						</div>

					
					</div>
				</div>
			</div>
		</div>
		<div style='clear:both'></div>
	</div>
		
</div>



<?php get_footer(); ?>