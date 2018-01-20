<?php
session_start();

$email = $_POST['email'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];

// MailChimp API credentials
$apiKey = '50e6ad95733a7035ddb21fcbccdb03e4-us17';
$listID = '44801b695f';

// MailChimp API URL
$dataCenter = substr($apiKey, strpos($apiKey, '-') + 1);
$url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listID . '/members/';

// member information
$json = json_encode([
    'email_address' => $email,
    'status'        => 'subscribed',
    'merge_fields'  => [
        'FNAME'     => $fname,
        'LNAME'     => $lname
    ]
]);

// send a HTTP POST request with curl
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
$result = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$user_info_result = new stdClass;
$user_info_result->query_url = $query_url; 
$user_info_result->result = $result; 
setcookie($email . '-verified', json_encode($user_info_result), time() + 60 * 60 * 24, "/"); // 1day
// var_dump($user_info_result);
// exit;
header('location:http://uix.ro/user-information');
