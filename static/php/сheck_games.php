<?php

// require_once 'Database.php';

// // Создание экземпляра класса Game_Database
// $db = new Game_Database();

// // Функция для проверки новых игр
// function checkForNewGames($lastGameId) {
//     global $db;
    
//     // Получение всех игр, созданных после последнего известного игрового идентификатора
//     $newGames = $db->getNewGames($lastGameId);

//     // Если есть новые игры, возвращаем их
//     if (!empty($newGames)) {
//         return $newGames;
//     }

//     // В противном случае, ждем некоторое время перед повторной проверкой
//     usleep(500000); // Подождать 0.5 секунды
//     return checkForNewGames($lastGameId); // Рекурсивно проверяем снова
// }

// // Получение последнего известного игрового идентификатора
// $lastGameId = isset($_GET['lastGameId']) ? $_GET['lastGameId'] : 0;

// // Получение новых игр
// $newGames = checkForNewGames($lastGameId);

// // Возвращаем новые игры в формате JSON
// echo json_encode($newGames);

// // Закрытие соединения с базой данных
// $db->close();

require_once 'Database.php';

// Создание экземпляра класса Game_Database
$db = new Game_Database();

// Получение последнего известного игрового идентификатора
$lastGameId = isset($_GET['lastGameId']) ? $_GET['lastGameId'] : 0;

// Получение новых игр
$newGames = $db->getNewGames($lastGameId);

// Возвращаем новые игры в формате JSON
echo json_encode($newGames);

// Закрытие соединения с базой данных
$db->close();
?>
