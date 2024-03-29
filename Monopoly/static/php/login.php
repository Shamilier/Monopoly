<?php   
    // $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    // $password = filter_var(trim($_POST['password']));

    // $mysqli = new mysqli('localhost', 'root', 'root', 'Monopoly_reg');

    // if ($mysqli->connect_error) {
    //     die('Ошибка подключения: ' . $mysqli->connect_error);
    // }

    // // Подготовленное выражение для предотвращения SQL-инъекций
    // $stmt = $mysqli->prepare("SELECT * FROM `users` WHERE `email` = ?");
    // $stmt->bind_param("s", $email);
    // $stmt->execute();
    // $result = $stmt->get_result();
    // $user = $result->fetch_assoc();

    // if ($user && password_verify($password, $user['password'])) {
    //     // Пользователь найден, и пароль верный
    //     setcookie('user', $user['nickname'], time() + 60*60, '/');
    // } else {
    //     echo "ТАКОЙ ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН";
    // }

    // $stmt->close();
    // $mysqli->close();
    // header('Location: ../../login_1.php');

require_once 'User.php';

// Получение данных из POST-запроса
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$password = filter_var(trim($_POST['password']), FILTER_SANITIZE_STRING);

// Создание экземпляра класса User и попытка входа
$user = new User();
$userData = $user->login($email, $password);

if ($userData) {
    $user->set_cookie('user', $userData['nickname']);
    header('Location: ../../login_1.php');
} else {
    // Сообщение об ошибке
    echo "Login failed. Please check your email and password.";
}


?>