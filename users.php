<?php
$host = 'localhost';
$db   = 'CRUD_TEST';
$user = 'dESAH';
$pass = 'up_to_11';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
PDO::ATTR_EMULATE_PREPARES => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);

$sql = "SELECT * FROM users";
$stmt = $pdo->prepare($sql);
$stmt->execute();

$users = $stmt->fetchAll();

echo json_encode($users);
