<?php
session_start();

$query_url = $_SERVER['QUERY_STRING'];
// echo '<pre>'.print_r($query_url, TRUE).'</pre>';
parse_str($query_url);
// echo '<pre>' . print_r($_COOKIE, TRUE) . '</pre>';

$user_info = '';
$fname = '';
$lname = '';

if(isset($_COOKIE[$email])) {
    $user_info = $_COOKIE[$email];
    $user_info = json_decode($user_info, true);
	$fname = $user_info['firstName'];
	$lname = $user_info['lastName'];
}

setcookie($email, $query_url, time() + 300, "/"); // 5min

// MailChimp API credentials
$apiKey = 'a48b6b7a069e205acac0764976a81e67-us17';
$listID = '44801b695f';

// MailChimp API URL
$dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
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

// store the status message based on response code
if ($httpCode == 200) {
    header('location:http://localhost:8080/login');
} else {
    header('location:http://localhost:8080/register');
}
