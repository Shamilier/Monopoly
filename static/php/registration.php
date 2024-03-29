<?php
    // $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    // $password = filter_var(trim($_POST['password']), FILTER_SANITIZE_STRING);
    // $nickname = filter_var(trim($_POST['nickname']), FILTER_SANITIZE_STRING);

    // if (mb_strlen($email) <= 6 || mb_strlen($email) > 60) {
    //     echo "EMAIL IS INCORRECT";
    //     exit();
    // } elseif (mb_strlen($nickname) < 2 || mb_strlen($nickname) > 60) {
    //     echo "username IS INCORRECT";
    //     exit();
    // } elseif (mb_strlen($password) < 5 || mb_strlen($password) > 60) {
    //     echo "password IS INCORRECT";
    //     exit();
    // }

    // $mysql = new mysqli("localhost", "root", "root", "Monopoly_reg");

    // if ($mysql->connect_error) {
    //     echo "SMTH WRONG: " . $mysql->connect_error;
    //     exit();
    // }

    // // Проверка на существование пользователя с таким же email
    // $query = $mysql->prepare("SELECT `email` FROM `users` WHERE `email` = ?");
    // $query->bind_param("s", $email);
    // $query->execute();
    // $result = $query->get_result();
    // if ($result->num_rows > 0) {
    //     echo "Such user is already registered";
    //     $query->close();
    //     $mysql->close();
    //     exit();
    // }

    // $password = password_hash($password, PASSWORD_DEFAULT);
    // // Дальше идет код на добавление пользователя в базу данных, если проверка пройдена


    // // Использование подготовленных выражений для защиты от SQL-инъекций
    // $stmt = $mysql->prepare("INSERT INTO `users` (`email`, `nickname`, `password`) VALUES (?, ?, ?)");
    // $stmt->bind_param("sss", $email, $nickname, $password); // "sss" означает, что все три параметра являются строками

    // if (!$stmt->execute()) {
    //     echo "Ошибка выполнения запроса: " . $stmt->error;
    //     $stmt->close();
    //     $mysql->close();
    //     exit();
    // }

    // $stmt->close();
    // $mysql->close();

    // header('Location: ../../login_1.php');

require_once 'User.php';
    
$user = new User();
$email = $_POST['email']; // Получение данных из формы
$password = $_POST['password'];
$nickname = $_POST['nickname'];

$registrationResult = $user->register($email, $password, $nickname, $table);
?>

<?php if ($registrationResult): ?> 
    <p>Вы успешно зарегистрированы. Вы будете перенаправлены на страницу входа.</p>
    <script>
        setTimeout(function() {
            window.location.href = '../../login_1.php';
        }, 3000);
    </script>
<?php else: ?>
    <p>Ошибка: Пользователь уже существует или произошла ошибка при регистрации.</p>
<?php endif; ?>
    
