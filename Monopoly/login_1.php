<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="static/css/login.css">
</head>

<body>
    <section class="container">
        <?php
            if($_COOKIE['user'] == ''):
        ?>
            <div class="login-container">
                <div class="circle circle-one"></div>
                <div class="form-container">
                    <!-- <img src="https://telegra.ph/file/45c4bfc21315d6fb3f08f.jpg" alt="illustration" class="illustration" /> -->
                    <h1 class="opacity">LOGIN</h1>
                    <form action="static/php/login.php" method="post">
                        <input type="text" name = "email" placeholder="EMAIL" />
                        <input type="password" name = "password" placeholder="PASSWORD" />
                        <button href = "#" id = "Submit" class="opacity">SUBMIT</button>
                    </form>
                    <div class="register-forget opacity">
                        <a href="#" id="RegisterLink" class="animate">REGISTER</a>
                        <a href="#" id="ForgetLink" class="animate">FORGOT PASSWORD</a>
                    </div>
                </div>
                <div class="circle circle-two"></div>
            </div>
            <div class="theme-btn-container"></div>
            <?php else: ?> 
                <p>Hello <?=$_COOKIE['user']?>. To exit press <a href="static/php/exit.php">here</a>.</p>
                <script>
                    setTimeout(function() {
                        window.location.href = 'main_page.html';
                    }, 3000);
                </script>
            <?php endif; ?>  
    </section>
<script src="static/jscript/login.js"></script>
</body>