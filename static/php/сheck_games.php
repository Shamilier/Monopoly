<?php

// require_once 'Database.php';

// $db = new Game_Database();

// // Получение последнего известного игрового идентификатора
// $lastGameId = isset($_GET['lastGameId']) ? $_GET['lastGameId'] : 0;

// // Получение новых игр
// $newGames = $db->getNewGames($lastGameId);

// // Возвращаем новые игры в формате JSON
// echo json_encode($newGames);

// // Закрытие соединения с базой данных
// $db->close();

require_once 'Database.php';

$db = new Game_Database();

// Получение новых игр со статусом -1
$newGames = $db->getNewGames();

// Возвращаем новые игры в формате JSON
echo json_encode($newGames);

// Закрытие соединения с базой данных
$db->close();
?>
