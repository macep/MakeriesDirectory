<?php
/**
 * The template for displaying Search Results pages.
 */

get_header();
//query_posts($query_string.'&showposts=2');
?>




<div id="search">
	<div class='pool'>
		<div class='sixteen fill'>

			<div class='searchform'>
				<?php get_search_form(); ?>
			</div>
			
			<h3 class='heading-small'>Results for "<?php echo get_search_query(); ?>"</h3> 
			
			<?php if ( have_posts() ) : ?>
				Found
				<?php while ( have_posts() ) : the_post(); ?>
					<div>
						<a href="<?php the_permalink();?>" title="<?php the_title_attribute(); ?>">
							&mdash; <?php the_title(); ?>
						</a>
					</div>
				<?php endwhile; ?>
			
				<div style='clear:both'></div>
			<?php else : ?>
				<br><br>
				<div class="entry-title">Nothing Found</div>
				<div class="entry-content">
					<p>
						Sorry, but nothing matched your search criteria.
						<br>
						Please try again with some different keywords.
					</p>
				</div>
				
			<?php endif; ?>
			
		</div>
	</div>
</div>
		
	


<?php get_footer(); ?>