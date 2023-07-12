const buttonColors = ['green', 'red', 'yellow', 'blue'];
const title = $('#level-title').text();
const onPress = {
    click: '',
    isClicked: true,
    randomColor: '',
    count: 1
}

// Create object for game loop
const loopObject = {
    time: 900,
    loop: 3,
    title: 'Game is about to begin in...',
    level: 'Level',
    startGame: true,
}

let started = false;
let interval;
let timeout;


// Listener = start game
$(document).keypress((e) => {
    if (!started) {
        if (e.key === 'a' || e.key === 'A') {
            intervalHanlder(loopObject);
            started = true;
        }
    }
});

// Listener = user interaction with user
$('div.btn').on('click', (e) => {
    if (!onPress.isClicked) {
        clickHandler(e.target.id);
    }
});


// Main function = start game
function gameHandler() {
    const random = generateRandomNumber();
    onPress.randomColor = random;

    timeout = setTimeout(() => {
        animatePress(random);
        playSounds(random);
    }, 600)
}

// Handle click from user interation
function clickHandler(userClick) {
    animatePress(userClick);
    playSounds(userClick);

    onPress.click = userClick;
    onPress.isClicked = true;

    // loopObject.time = 600;
    // loopObject.loop = 3;
    // loopObject.title = 'Fast! Time is running away..!';
    // loopObject.level = null;
    // loopObject.startGame = null;

    // intervalHanlder(loopObject);
    if (onPress.isClicked) updateGame();
}

// Check condition and load next level
function updateGame() {
    if (onPress.click === onPress.randomColor) {
        $('#level-title').text(`Level ${onPress.count}`);
        gameHandler();
        onPress.count++;
        onPress.isClicked = false;
    } else {
        gameOver();
    }
}

// Side functions to add interaction
function animatePress(currentColor) {
    $(`div#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`div#${currentColor}`).removeClass("pressed");
    }, 100);
}

function playSounds(color) {
    const audio = new Audio(`sounds/${color}.mp3`);

    audio.play();
}

// Generat random color
function generateRandomNumber() {
    let choosenColor;
    let random = Math.floor((Math.random() * 4));

    choosenColor = buttonColors[random];
    return choosenColor;
}

// Loop function for different tasks
function intervalHanlder(items) {
    const { time, loop, title, level, startGame } = items;

    let i = loop;
    let interval = setInterval(() => {
        if (title !== null) {
            $('#level-title').text(`${title} ${i}`);
        }

        if (i == 0) {
            if (level !== null) {
                $('#level-title').text(`${level} ${onPress.count}`);
            }

            if (startGame !== null) {
                gameHandler();
                onPress.isClicked = false;
            } else {
                gameOver();
            }
            clearInterval(interval);
        }
        i--;

    }, time)
}


// End of a game and reload settings
function gameOver() {
    $('body').addClass('game-over');
    onPress.click = '';
    onPress.isClicked = true;
    onPress.randomColor = '';
    onPress.count = 1;
    loopObject.time = 900;
    loopObject.loop = 3;
    loopObject.title = 'Game is about to begin in...';
    loopObject.level = 'Level';
    loopObject.startGame = true;
    started = false;



    timeout = setTimeout(() => {
        $('body').removeClass('game-over');
        $('#level-title').text(title);
    }, 600)
}