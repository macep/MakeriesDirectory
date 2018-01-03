<?php
session_start();

$query_url = $_SERVER['QUERY_STRING'];
parse_str($query_url);

$user_info = json_decode($_COOKIE[str_replace('.', '_', $email)], TRUE);

$fname = isset($user_info['firstName']) ? $user_info['firstName'] : '';
$lname = isset($user_info['lastName']) ? $user_info['lastName'] : '';

setcookie($email . '-verified', $query_url, time() + 60 * 60 * 24, "/"); // 1day

// MailChimp API credentials
$apiKey = 'a48b6b7a069e205acac0764976a81e67-us17';
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

// store the status message based on response code
if ($httpCode == 200) {
    header('location:http://uix.ro/login');
} else {
    header('location:http://uix.ro/register');
}
