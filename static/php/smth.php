<?php
include 'Database.php'; 

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data)) {
    $gameDB = new Game_Database();
    $result = $gameDB->addGame($data['id'], $data['password'], $data['players_count'], $data['map'], $data['bet'], $data['players_id'], $data['status']);
    if ($result) {
        echo json_encode(['status' => 'success', 'message' => 'Game added successfully', 'game_id' => $result]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add game']);
    }
    $gameDB->close();
}
?>
