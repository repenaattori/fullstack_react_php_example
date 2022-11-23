<?php
require('./headers.php');
session_start();
require('./db_user_controller.php');

if(!isset($_SESSION['username'])){
    http_response_code(403);
    echo "No access for user data";
    return;
}

$messages = getUserMessages($_SESSION['username']);

$result = array();
$result['messages'] = $messages;

$json = json_encode($result);
header('Content-type: application/json');
echo $json;