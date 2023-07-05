<?php
$dotenv = array();

if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        list($name, $value) = explode('=', $line, 2);
        $dotenv[$name] = trim($value, " \t\n\r\0\x0B\"'");
    }
}

class Database {
    private $pdo;

    public function __construct() {
        $host = $GLOBALS['dotenv']['DB_HOST'];
        $db   = $GLOBALS['dotenv']['DB_NAME'];
        $user = $GLOBALS['dotenv']['DB_USER'];
        $pass = $GLOBALS['dotenv']['DB_PASS'];
        $charset = 'utf8mb4';
        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
        $opt = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        $this->pdo = new PDO($dsn, $user, $pass, $opt);
    }

    public function getUsers() {
        $sql = "SELECT * FROM users";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function registerUser($fullname, $username, $email, $password) {
        $sql = "INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$fullname, $username, $email, password_hash($password, PASSWORD_DEFAULT)]);
    }

    public function updateUser($id, $fullname, $username, $email, $password) {
        $sql = "UPDATE users SET fullname = ?, username = ?, email = ?, password = ? WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$fullname, $username, $email, password_hash($password, PASSWORD_DEFAULT), $id]);
    }

    public function deleteUser($id) {
        $sql = "DELETE FROM users WHERE id = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([$id]);
    }
}

$db = new Database();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode($db->getUsers());
        break;
    case 'POST':
        if (isset($_POST['_method']) && $_POST['_method'] == 'DELETE') {
            $db->deleteUser($_POST['id']);
        } else if (isset($_POST['id'])) {
            $db->updateUser($_POST['id'], $_POST['fullname'], $_POST['username'], $_POST['email'], $_POST['password']);
        } else {
            $db->registerUser($_POST['fullname'], $_POST['username'], $_POST['email'], $_POST['password']);
        }
        break;
}
