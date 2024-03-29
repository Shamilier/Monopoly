<?php
require_once 'Database.php';

class User {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function register($email, $password, $nickname) {
        $sql = "SELECT * FROM users WHERE email = ?";
        $result = $this->db->query($sql, [$email]);
        if ($result->num_rows > 0) {
            // Пользователь уже существует
            return false;
        }
        // Здесь должна быть валидация данных
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (email, password, nickname) VALUES (?, ?, ?)";
        $this->db->query($sql, [$email, $passwordHash, $nickname]);
        return true;
    }

    public function login($email, $password) {
        $sql = "SELECT * FROM users WHERE email = ?";
        $result = $this->db->query($sql, [$email]);
        if ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row['password'])) {
                // Успешный вход, установка сессии или возвращение данных пользователя
                return $row;
            } else {
                // Неверный пароль
                return false;
            }
        } else {
            // Пользователь не найден
            return false;
        }
    }

    public function set_cookie($name, $value, $expire = 3600, $path = "/", $domain = "", $secure = false, $httponly = false) {
        setcookie($name, $value, time() + $expire, $path, $domain, $secure, $httponly);
    }

    public function del_cookie($name) {
        if (isset($_COOKIE[$name])) {
            setcookie($name, "", time() - 36000, "/");
            unset($_COOKIE[$name]);
        }
    }

    public function __destruct() {
        $this->db->close();
    }
}
?>
