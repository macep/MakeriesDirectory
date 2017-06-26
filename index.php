<?php
/**
 * Created by PhpStorm.
 * User: cristi
 * Date: 26/06/2017
 * Time: 2:01 PM
 */
?>

<!DOCTYPE html>

<html <?php language_attributes(); ?> ng-app="jgm">
    <head>
        <title>Angular w/ WP REST API</title>
        <?php wp_head(); ?>
    </head>

    <body>
        <div ng-controller="testcontroller">
            <ul>
                <li ng-repeat="post in postdata">{{post.title}}</li>
            </ul>
        </div>

        <div ng-controller="AlertDemoCtrl">
            <script type="text/ng-template" id="alert.html">
                <div ng-transclude></div>
            </script>

            <div uib-alert ng-repeat="alert in alerts" ng-class="'alert-' + (alert.type || 'warning')" close="closeAlert($index)">{{alert.msg}}</div>
            <div uib-alert template-url="alert.html" style="background-color:#fa39c3;color:white">A happy alert!</div>
            <button type="button" class='btn btn-default' ng-click="addAlert()">Add Alert</button>
        </div>
        <?php wp_footer(); ?>        
        <script id="__bs_script__">//<![CDATA[
            document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.12'><\/script>".replace("HOST", location.hostname));
            //]]></script>
    </body>
</html>