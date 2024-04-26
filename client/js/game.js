// Функция для добавления ведущего нуля
function pad(value) {
    return value.toString().padStart(2, '0');
}

// Функция для обновления таймера на странице
function updateTimerDisplay(hours, minutes, seconds) {
    const timerElement = document.getElementById('time');
    timerElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Запуск таймера
function startTimer() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    // Восстанавливаем сохраненное время, если оно есть
    const savedTime = localStorage.getItem('savedTime');
    if (savedTime) {
        const savedSeconds = parseInt(savedTime);
        hours = Math.floor(savedSeconds / 3600);
        minutes = Math.floor((savedSeconds - (hours * 3600)) / 60);
        seconds = savedSeconds - (hours * 3600) - (minutes * 60);
    }

    // Обновляем таймер сразу после восстановления
    updateTimerDisplay(hours, minutes, seconds);

    // Функция, вызываемая каждую секунду
    const timerInterval = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        // Сохраняем время каждую секунду
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        localStorage.setItem('savedTime', totalSeconds.toString());

        updateTimerDisplay(hours, minutes, seconds);
    }, 1000);

    // Для остановки таймера и удаления сохраненного времени можно использовать:
    // clearInterval(timerInterval);
    // localStorage.removeItem('savedTime');
}

async function createBoard() {
    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = ''; // Очистить предыдущее содержимое игрового поля

    try {
        const urlParts = window.location.pathname.split('/');
        const gameId = urlParts[urlParts.length - 1]; // Получаем ID игры из URL
        const response = await fetch(`/api/game/${gameId}/board`); // Путь к API, который вернёт данные игрового поля
        if (!response.ok) {
            throw new Error('Проблема с получением данных игровой доски');
        }
        const boardData = await response.json();

        boardData.forEach(cellData => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            cellElement.innerHTML = `
                <div class="cell-content">
                    <div class="cell-name">${cellData.name}</div>
                    <div class="cell-cost">${cellData.cost}</div>
                    <!-- Другая информация, например, владелец -->
                </div>
            `;
            gameBoardElement.appendChild(cellElement);
        });
    } catch (error) {
        console.error('Ошибка при создании игрового поля:', error);
    }
}

document.addEventListener('DOMContentLoaded', createBoard);
document.addEventListener('DOMContentLoaded', startTimer);



document.getElementById('send-message').addEventListener('click', function() {
    const chatInput = document.getElementById('chat-input');
    const text = chatInput.value.trim(); // Получаем текст из поля ввода и удаляем пробелы по краям

    if (text) { // Проверяем, что текст не пустой
        sendMessage(text); // Вызываем функцию отправки сообщения
        chatInput.value = ''; // Очищаем поле ввода после отправки
    }
});




async function buy(player){
    
}


// ************************************************************************************************************************


const ws = new WebSocket("ws://127.0.0.1:3000");
s();
// ---------------------------------------


async function sendMessage(text) {
    let userData = await getUserData();
    const urlParts = window.location.pathname.split('/');
    const gameId = urlParts[urlParts.length - 1]; // Получаем ID игры из URL
    ws.send(JSON.stringify({ type: 'chatMessage', gameId: gameId, text: text , nickname: userData.nickname}));
}

function displayChatMessage(text, from) {
    const chat = document.getElementById('chat'); // Предполагается, что у тебя есть элемент с id='chat'
    const messageElement = document.createElement('div');
    messageElement.textContent = `${from}: ${text}`;
    chat.appendChild(messageElement); // Добавляем новое сообщение в конец списка
    // Прокрутка контейнера сообщений вниз после добавления нового сообщения
    chat.scrollTop = chat.scrollHeight;
}


async function loadAndDisplayPlayersInfo(gameId) {
    const response = await fetch(`/api/game/${gameId}/players`);
    if (!response.ok) throw new Error('Не удалось загрузить информацию об игроках');
    const players = await response.json();
    // players = JSON.parse(players);

    const playersInfoElement = document.getElementById('players-info');
    playersInfoElement.innerHTML = ''; // Очищаем текущую информацию

    players.forEach(player => {
        // Создаем новый элемент для каждого игрока
        const playerElement = document.createElement('div');
        playerElement.className = 'player';
        // <img src="${player.avatar || 'default-avatar.jpg'}" alt="Аватар игрока">
        playerElement.innerHTML = `
            <div class="player-avatar">
            </div>
            <div class="player-details">
                <span class="player-name">${player.player_id}</span>
                <span class="player-money">$${player.balance}</span>
                <span class="player-properties">${player.properties_cost}</span>
            </div>
        `;
        playersInfoElement.appendChild(playerElement);
    });
}


async function getUserData() {
    try {
        const response = await fetch('/api/userinfo');
        if (!response.ok) throw new Error('Не удалось загрузить информацию пользователя');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null; // или можно вернуть пустой объект {}, в зависимости от того, что предпочтительнее
    }
}

function requestRegistration(gameId, nickname){
    return ws.send(JSON.stringify({type:'requestRegistration', gameId:gameId, nickname:nickname }))
}

// ---------------------------------------------------------------------------
function s(){
    ws.onopen = async () => { // Обрати внимание на async
        console.log('Соединение с сервером установлено');

        const urlParts = window.location.pathname.split('/'); // Разбиваем путь на части
        const gameId = urlParts[urlParts.length - 1];

        let userData = await getUserData();
        let nickname = userData.nickname;
        await loadAndDisplayPlayersInfo(gameId);
        requestRegistration(gameId, nickname);
    };

    ws.onmessage = function(event) {
        const message = JSON.parse(event.data);
        if (message.type === 'chatMessage') {
            displayChatMessage(message.text, message.from);
        } else if (message.type === 'chatHistory') {
            // Обработка массива сообщений чата
            message.messages.forEach(msg => {
                displayChatMessage(msg.message, msg.from_nickname);
            });
        }
    };
}
