console.log("JavaScript file is loaded");
function previewFile() {
    const fileChooser = document.getElementById('fileChooser');
    const profilePhoto = document.getElementById('profilePhoto');
    const file = fileChooser.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = function() {
            profilePhoto.src = reader.result;
        }
        reader.readAsDataURL(file);
    }
}
function toggleButtons() {
    const buttons = document.querySelector('.user-photo .buttons');
    buttons.style.display = (buttons.style.display === 'none') ? 'flex' : 'none';
}

function viewPhoto() {
    const photoSrc = document.getElementById('profilePhoto').src;
    // Открывает фотографию в новой вкладке или как вам удобно
    window.open(photoSrc, '_blank');
}


document.addEventListener('DOMContentLoaded', function() {
    const getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    const userNickname = getCookie('user'); // Получаем никнейм из куки
    const nicknameElement = document.getElementById('nickname-placeholder'); // Элемент для отображения никнейма
    if (nicknameElement) {
        nicknameElement.textContent = userNickname; // Устанавливаем никнейм в элемент
    }
});

let lastGameId = 0; // Инициализация lastGameId
let StatuS = -1;

document.addEventListener('DOMContentLoaded', function() {
    var createGameButton = document.getElementById('create-game-button');
    createGameButton.addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращаем отправку формы
        var password = document.getElementById('password').value;
        var players_count = document.getElementById('players_count').value;
        var map = document.getElementById('map').value;
        var bet = document.getElementById('bet').value;
        var players_id = document.getElementById('players_id').value;
        
        var data = {
            id: lastGameId,
            password: password,
            players_count: players_count,
            map: map,
            bet: bet,
            players_id: players_id,
            Status : StatuS
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'static/php/smth.php', true); // Укажите путь к вашему PHP файлу
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (this.status == 200) {
                console.log(this.responseText); // Обработка ответа от сервера
                // После успешного добавления игры на сервере увеличиваем lastGameId на 1
                lastGameId++;
            } else {
                console.error('Ошибка запроса');
            }
        };
        xhr.send(JSON.stringify(data)); // Отправляем данные в формате JSON
    });
});

// function checkForNewGames(lastGameId) {
//     var currentLastGameId = lastGameId;

//     $.ajax({
//         url: 'static/php/сheck_games.php',
//         type: 'GET',
//         data: { lastGameId: currentLastGameId },
//         dataType: 'json',
//         success: function(newGames) {
//             if (newGames.length > 0) {
//                 newGames.forEach(function(game) {
//                     addNewGameToPage(game);
//                 });
//                 lastGameId = newGames[newGames.length - 1].gameId;
//             }
//             setTimeout(function() { checkForNewGames(lastGameId); }, 5000); // AAAAAAAAAA
//         },
//         error: function(xhr, status, error) {
//             console.error(error);
//             setTimeout(function() { checkForNewGames(lastGameId); }, 5000); // AA
//         }
//     });
// }

// $(document).ready(function() {
//     checkForNewGames(lastGameId);
// });

function checkForNewGames() {
    $.ajax({
        url: 'static/php/сheck_games.php',
        type: 'GET',
        dataType: 'json',
        success: function(newGames) {
            if (newGames.length > 0) {
                newGames.forEach(function(game) {
                    if (game.status === -1) { // Если статус игры равен -1, то добавляем её на страницу
                        game.status = 0; // Устанавливаем статус игры в 0, чтобы обозначить, что она выведена на экран
                        addNewGameToPage(game);
                    }
                });
            }
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
}

$(document).ready(function() {
    checkForNewGames(); // Вызываем функцию проверки новых игр при загрузке страницы
    setInterval(checkForNewGames, 500); // Периодически вызываем функцию каждые 30 секунд
});


// Функция для добавления новой игры на страницу
function addNewGameToPage(game) {
    const gamesList = document.getElementById('games-list');
    // Создаем элемент для отображения информации о новой игре
    const gameElement = document.createElement('div');
    gameElement.classList.add('game-card'); // Добавляем класс для стилизации
    gameElement.innerHTML = `
        <h3>${game.name}</h3>
        <p>Игроков: ${game.players_count}</p>
        <p>Ставка: ${game.bet}</p>
        <button class="join-game" data-game-id="${game.id}">Присоединиться</button>
    `;
    // Добавляем обработчик события для кнопки присоединения
    const joinButton = gameElement.querySelector('.join-game');
    joinButton.addEventListener('click', joinGame);
    // Добавляем новую игру в список игр на странице
    gamesList.appendChild(gameElement);
}

// Функция для обработки нажатия на кнопку "Присоединиться"
function joinGame(event) {
    const gameId = event.target.dataset.gameId;
    // Отправляем запрос на сервер для вступления в игру с gameId
    // Обработка вступления в игру
}
