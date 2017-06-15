<?php
	wp_reset_query();
?>
			<div style='clear:both'></div>
		</div><!-- #content -->

		<div id='footer'>
			<div class='social-menu'>
				<div class='icon instagram'>
					<a title='Instagram' href='https://instagram.com/justgotmade/' target='_blank'></a>
				</div>
				<div class='icon facebook'>
					<a title='Facebook' href='https://www.facebook.com/JustGotMade' target='_blank'></a>
				</div>
				<div class='icon twitter'>
					<a title='Twitter' href='https://twitter.com/Just_Got_Made ' target='_blank'></a>
				</div>
				<div class='icon thedots'>
					<a title='Thedots' href='http://the-dots.co.uk/justgotmade' target='_blank'></a>
				</div>
			</div>
			<nav id="second-menu" role="navigation">
				<?php wp_nav_menu( array( 'theme_location' => 'second' ) ); ?>
			</nav>
			<div class='credit'>
				<span>&copy;Just Got Made <?php echo date('Y'); ?></span>
				<span>Design by <a href='http://www.studio-blake.com/' target='_blank'>Blake</a></span>
				<span>Build by <a href='http://www.johnwai.co.uk/' target='_blank'>John</a></span>
			</div>
		</div>
			
	</div><!-- #main-body -->

<?php wp_footer(); ?>

	<?php if ( is_page_template( 'page-ng-directory.php' ) ) { ?>
	    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.20/angular.min.js"></script>
	    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.17/angular-ui-router.min.js"></script>
	    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/angular-filter/0.5.8/angular-filter.min.js"></script>
	    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
	    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/fastclick/1.0.6/fastclick.min.js"></script>
	    <script defer src="<?php echo get_template_directory_uri(); ?>/ng-directory/assets/js/ga.js"></script>
	    <script defer src="<?php echo get_template_directory_uri(); ?>/ng-directory/assets/js/app.js"></script>

	    <script>

		    $(document).ready(function() {
		        setTimeout(function() {
		    		var left = $('.side-left').height();
		    		var right = $('.side-right').height();

					if ($(window).width() > 767) {
			    		if (left > right) {
			    			$('.side-right').find('.inner-wrapper').css('height', left + 'px');
			    		}
					} else {
		    			$('.side-right').css('margin', '20px 0 0');
					}		

		        }, 1000);
		    });

		    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		    	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		    	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		    ga('create', 'UA-49362824-1', 'auto');

	    </script>	

	<?php }  ?>

</body>
</html>