<?php
    setcookie('user', $user['nickname'], time() - 60*60*10, '/');
    header('Location: ../../login_1.php');

?>