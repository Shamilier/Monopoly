<?php
class Database {
    private $host = "localhost";
    private $username = "root";
    private $password = "root";
    private $database = "Monopoly_reg";
    protected $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function query($sql, $params = []) {
        $stmt = $this->conn->prepare($sql);
        if (!empty($params)) {
            $stmt->bind_param(str_repeat("s", count($params)), ...$params);
        }
        $stmt->execute();
        return $stmt->get_result();
    }

    public function close() {
        $this->conn->close();
    }
}


class Game_Database {
    private $host = "localhost";
    private $username = "root";
    private $password = "root";
    private $database = "games";
    protected $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function query($sql, $params = []) {
        $stmt = $this->conn->prepare($sql);
        if (!empty($params)) {
            $stmt->bind_param(str_repeat("s", count($params)), ...$params);
        }
        $stmt->execute();
        return $stmt->get_result();
    }

    public function addGame($id, $password, $players_count, $map, $bet, $players_id, $status) {
        $sql = "INSERT INTO cre (id, password, players_count, map, bet, players_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $params = [$id, $password, $players_count, $map, $bet, $players_id];
        $result = $this->query($sql, $params);
        if ($result) {
            return $this->conn->insert_id; // Возвращает ID добавленной записи
        } else {
            return false; // В случае ошибки
        }
    }

    // Метод для получения новых игр из базы данных
    public function getNewGames($lastGameId) {
        $sql = "SELECT * FROM cre WHERE id > ?";
        $params = [$lastGameId];
        $result = $this->query($sql, $params);
        
        $newGames = array();
        
        while ($row = $result->fetch_assoc()) {
            $newGames[] = $row;
        }
        
        return $newGames;
    }

    public function close() {
        $this->conn->close();
    }
}

