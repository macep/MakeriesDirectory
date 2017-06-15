<?php

get_header();

?>
<style>
body{
	background:#FDE4DF;
}
</style>
<?php while ( have_posts() ) : the_post(); ?>

<div id='pages'>
	<div class='pool'>
		<div class='one fill mobile'>
			&nbsp;
		</div>
		<div class='ten fill'>
			<div class='inner'>
				
				<div class='entry-content'>
					<?php the_content(); ?>
				</div>
				<div style='clear:both'></div>
				
			</div>
		</div>
		<div class='one fill mobile'>
			&nbsp;
		</div>
		<div style='clear:both'></div>
	</div>
</div>
		
<?php endwhile; ?>

<?php get_footer(); ?>