<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */

get_header(); ?>

	<div id="primary">
		<div id="content" role="main">

			<article id="post-0" class="post error404 not-found">
				<header class="entry-header">
					<h1 class="entry-title">404 - The page you requested is no longer here.</h1>
				</header>

				<div class="entry-content">
					<p>It seems that the page you were trying to reach doesn't exist anymore, 
					or maybe it has just moved. 
					</p>
					<p>
					Please feel free to contact us if the problem persists 
					or if you think it is a problem with our website, please contact us.</p>

				</div><!-- .entry-content -->
			</article><!-- #post-0 -->

		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>