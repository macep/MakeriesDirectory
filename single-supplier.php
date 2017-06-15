<?php
get_header(); 
?>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/jquery-scrolltofixed-min.js"></script>


<div id='suppliers-single'>
	<?php while ( have_posts() ) : the_post(); ?>
		<div class='pool'>
			<div class='one fill'>
				<div class='inner'>
					<div class="back-button">
						<a href='<?php echo home_url(); ?>/directory'><</a>
					</div>
				</div>
			</div>
			<div class='eight fill'>
				<div class="entry-content">
					<div class='inner'>
						<div class='inner-wrapper'>
							<div class='title'>
								<h3 class='post-title'>
									<?php the_title(); ?>
								</h3>
								<?php if(get_custom_field('supplier_short_info')) : ?>
									<div class='short-info'>
										<?php print_custom_field('supplier_short_info'); ?>
									</div>
								<?php endif; ?>
							</div>
							
							<?php if ( has_post_thumbnail() ) : ?>
								<div class='image-holder'>
									<?php the_post_thumbnail('medium'); ?>
								</div>
							<?php endif; ?>
							
						
							<div class='content'>
								<?php the_content(); ?>
							</div>
							
						</div>
					</div>
				</div>
				<div class='share-item'>
					<div class='inner'>
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
			</div>
			<div class='three fill'>
				<div class="side-content">
					<div class='inner'>
						<div class='inner-wrapper'>
						
							<?php
								$terms = get_the_term_list( $post->ID, 'region','', ', ', '' );
								$terms = strip_tags($terms);
							?>
							<?php if ( $terms ) : ?>
								<div class='list-item'>
									<h6>Region</h6>
									<div class='item'>
										<?php echo $terms; ?>
									</div>
								</div>
							<?php endif; ?>
							<?php
								$terms = get_the_term_list( $post->ID, 'industry','', ', ', '' );
								$terms = strip_tags($terms);
							?>
							<?php if ( $terms ) : ?>
								<div class='list-item'>
									<h6>Area of Interest</h6>
									<div class='item'>
										<?php echo $terms; ?>
									</div>
								</div>
							<?php endif; ?>
							<?php
								$terms = get_the_term_list( $post->ID, 'customer','', ', ', '' );
								$terms = strip_tags($terms);
							?>
							<?php if ( $terms ) : ?>
								<div class='list-item'>
									<h6>Customer</h6>
									<div class='item'>
										<?php echo $terms; ?>
									</div>
								</div>
							<?php endif; ?>
							<?php
								$terms = get_the_term_list( $post->ID, 'material','', ', ', '' );
								$terms = strip_tags($terms);
							?>
							<?php if ( $terms ) : ?>
								<div class='list-item'>
									<h6>Materials</h6>
									<div class='item'>
										<?php echo $terms; ?>
									</div>
								</div>
							<?php endif; ?>
							<?php
								$terms = get_the_term_list( $post->ID, 'service','', ', ', '' );
								$terms = strip_tags($terms);
							?>
							<?php if ( $terms ) : ?>
								<div class='list-item'>
									<h6>Services</h6>
									<div class='item'>
										<?php echo $terms; ?>
									</div>
								</div>
							<?php endif; ?>
							
							
							<div class='list-item'>
								<h6>Contact details</h6>
								<?php if(get_custom_field('supplier_telephone')) : ?>
								<div class='item'>
									Tel: <?php print_custom_field('supplier_telephone'); ?>
								</div>
								<?php endif; ?>
								<?php if(get_custom_field('supplier_email')) : ?>
								<div class='item'>
									Email: <a href='mailto:<?php print_custom_field('supplier_email'); ?>'>
										<?php print_custom_field('supplier_email'); ?>
									</a>
								</div>
								<?php endif; ?>
								<?php if(get_custom_field('supplier_address')) : ?>
								<div class='item'>
									<?php echo nl2br(get_custom_field('supplier_address')); ?>
								</div>
								<?php endif; ?>
							</div>
						
							<?php if(get_custom_field('supplier_url_twitter') || get_custom_field('supplier_url_facebook') || get_custom_field('supplier_url_instagram')) : ?>
							<div class='list-item'>
								<h6>Social Networks</h6>
								<?php if(get_custom_field('supplier_url_twitter')) : ?>
								<div class='item'>
									<a href='<?php print_custom_field('supplier_url_twitter'); ?>' target='_blank'>
										Follow us on Twitter
									</a>
								</div>
								<?php endif; ?>
								<?php if(get_custom_field('supplier_url_facebook')) : ?>
								<div class='item'>
									<a href='<?php print_custom_field('supplier_url_facebook'); ?>' target='_blank'>
										Join us on Facebook
									</a>
								</div>
								<?php endif; ?>
								<?php if(get_custom_field('supplier_url_instagram')) : ?>
								<div class='item'>
									<a href='<?php print_custom_field('supplier_url_instagram'); ?>' target='_blank'>
										Follow us on Instagram
									</a>
								</div>
								<?php endif; ?>
							</div>
							<?php endif; ?>
							
							<?php if(get_custom_field('supplier_url')) : ?>
							<div class='list-item'>
								<h6>Website</h6>
								<div class='item'>
									<a href='<?php print_custom_field('supplier_url'); ?>' target='_blank'>
										<?php echo str_replace('http://','',get_custom_field('supplier_url')); ?>
									</a>
								</div>
							</div>
							<?php endif; ?>
							
							<?php if(get_custom_field('supplier_opening_hours')) : ?>
							<div class='list-item'>
								<h6>Opening hours</h6>
								<div class='item'>
									<?php echo nl2br(get_custom_field('supplier_opening_hours')); ?>
								</div>
							</div>
							<?php endif; ?>
							
							<?php if(get_custom_field('supplier_post_code')) : ?>
							<div class='list-item'>
								<h6>Map</h6>
								<div class='item'>
									<?php
										$postcode = trim(get_custom_field('supplier_post_code'));
									?>
									<div class='image-holder'>
										<img src="http://maps.google.com/maps/api/staticmap?center=<?php echo $postcode; ?>&zoom=15&size=250x250&maptype=roadmap&markers=color:RED|label:|<?php echo $postcode; ?>&sensor=false">
									</div>
									<a href='https://maps.google.co.uk/maps?q=<?php echo $postcode; ?>' target='_blank'>
										Open in Google Maps
									</a>
								</div>
							</div>
							<?php endif; ?>
						
						</div>
					</div>
				</div>
			</div>
			<div style='clear:both'></div>
		</div>
	<?php endwhile; ?>
</div>

<script>
	$(window).load(function(){
		jQuery(document).ready(function($){
			
			$('.back-button').scrollToFixed( {
					marginTop: 20,
					limit: $('#footer').offset().top
			});
			
		});
	});
</script>

<?php get_footer(); ?>
