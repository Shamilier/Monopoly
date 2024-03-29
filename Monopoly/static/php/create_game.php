<?php

require_once 'Database.php'; // Укажи правильный путь к файлу класса

// Создание экземпляра класса Game_Database
$db = new Game_Database();

// Получение данных из POST-запроса
$id = $_POST['id'];
$password = $_POST['password'];
$players_count = $_POST['players_count'];
$map = $_POST['map'];
$bet = $_POST['bet'];
$players_id = $_POST['players_id'];
$status = 0;

// Добавление игры в базу данных
$gameId = $db->addGame($id, $password, $players_count, $map, $bet, $players_id, $status);

if ($gameId) {
    echo json_encode(['status' => 'success', 'message' => 'Игра успешно создана.', 'gameId' => $gameId]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при создании игры.']);
}

// Закрытие соединения с базой данных
$db->close();
