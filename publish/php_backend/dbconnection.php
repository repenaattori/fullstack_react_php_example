<?php

function createDbConnection(){
    $ini = parse_ini_file('myconf.ini');
    $host = $ini["host"];
    $dbname = $ini["db"];
    $username = $ini["username"];
    $pw = $ini["pw"];

    try{
        $dbcon = new PDO("mysql:host=$host;dbname=$dbname", $username, $pw);
        return $dbcon;
    }catch(PDOException $e){
        http_response_code(505);
        echo "Service is currently unavailable.";
    }

    return null;
}

function createSqliteConnection($filename){
    try{
        $dbcon = new PDO("sqlite:".$filename);
        return $dbcon;
    }catch(PDOException $e){
        http_response_code(505);
        echo "Service is currently unavailable.";
    }

    return null;
}