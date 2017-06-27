<!DOCTYPE html>

<html <?php language_attributes(); ?> ng-app="jgm">
    <head>
        <base href="/">

        <meta charset="utf-8"/>
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" name="viewport"/>
        <meta content="width" name="MobileOptimized"/>
        <meta content="true" name="HandheldFriendly"/>
        <meta content="yes" name="apple-mobile-web-app-capable"/>
        <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
        <meta content="description" name="description"/>
        <meta content="keywords" name="keywords"/>

        <title>JustGotMade.com</title>

        <?php wp_head(); ?>
    </head>

    <body>
        <span id="ui-view" ui-view ng-cloak/>
        <span class="app-loader"/>

        <?php wp_footer(); ?>        

        <script id="__bs_script__">
            //<![CDATA[
            document
                .write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.12'><\/script>"
                .replace("HOST", location.hostname));
            //]]>
        </script>
    </body>
</html>

