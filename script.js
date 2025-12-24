const messages = [
    "Hoje nasceu o Salvador! Jesus veio ao mundo para nos trazer esperança, amor e salvação. Glória a Deus nas alturas! 🌟",
    "O menino Jesus nasceu em Belém para nos mostrar que Deus se fez homem por amor a nós. Que maravilha divina! ✨",
    "Natal é celebrar o nascimento de Jesus Cristo, a luz que veio iluminar o mundo e transformar a humanidade. 🕯️",
    "Assim como os Reis Magos seguiram a estrela até Jesus, deixe que a fé guie seus passos neste Natal. ⭐",
    "Jesus nasceu numa humilde manjedoura para nos ensinar que o amor de Deus é para todos, sem exceção. 💝",
    "O anjo anunciou aos pastores: 'Não temais! Eis que vos trago boa nova de grande alegria: nasceu o Salvador!' 👼",
    "Maria e José nos ensinam sobre confiança em Deus. Eles disseram sim ao plano divino e mudaram a história. 🙏",
    "Emanuel - Deus conosco. Jesus veio habitar entre nós para que nunca mais nos sintamos sozinhos. 🕊️",
    "O maior presente do Natal não vem embrulhado, mas nasceu numa manjedoura: Jesus Cristo, nosso Salvador. 🎁",
    "A estrela de Belém brilhou para anunciar ao mundo que havia nascido o Rei dos reis, Jesus Cristo. Glória a Deus! 🌠",
    "Jesus nasceu para trazer paz aos corações aflitos e esperança aos que perderam a fé. Ele é nossa luz! ✝️",
    "O Natal nos lembra que Deus tanto amou o mundo que enviou Seu Filho para nos salvar. Que amor infinito! 💫",
    "Como os pastores, vamos adorar Jesus com alegria e gratidão pelo milagre do Seu nascimento. 🐑",
    "Jesus veio ao mundo em simplicidade para nos mostrar que o verdadeiro tesouro está no Reino de Deus. 👑",
    "O cântico dos anjos ecoa até hoje: 'Glória a Deus nas alturas e paz na terra aos homens de boa vontade!' 🎶",
    "Natal é tempo de renovar nossa fé e agradecer a Deus pelo maior presente: Jesus Cristo. 🌟",
    "Que o nascimento de Jesus renove em você a esperança, fortaleça sua fé e encha seu coração de amor. 💖",
    "Jesus nasceu para ser nossa luz na escuridão, nossa esperança na desesperança, nosso caminho para a salvação. 🕯️",
    "Assim como as estrelas brilham mais forte na escuridão, sua força interior se revela nos momentos difíceis. Este Natal, celebre sua resiliência. 🌟",
    "O presente mais valioso que você pode dar é sua presença. Esteja presente para si mesmo e para quem você ama. 🎁",
    "Cada floco de neve é único, assim como cada passo da sua jornada. Agradeça pelo caminho que te trouxe até aqui. ❄️",
    "O Natal não é sobre perfeição, é sobre conexão. Conecte-se com sua gratidão, seus sonhos e com aqueles que importam. 💝",
    "Que neste Natal você encontre coragem para começar de novo, sabedoria para aprender com o passado e fé para acreditar no futuro. 🕊️",
    "As luzes de Natal nos ensinam que juntas brilhamos mais. Você não está sozinho nesta jornada. 💡",
    "O verdadeiro espírito natalino está em transformar dificuldades em aprendizados e tristezas em gratidão pelo que temos. 🎄",
    "Que este Natal marque o início de um novo capítulo repleto de esperança, amor e realizações. Você merece toda a felicidade. 🌠",
    "O sino de Natal toca anunciando renovação. Deixe para trás o que não serve mais e abrace as infinitas possibilidades que chegam. 🔔",
    "Natal é tempo de acreditar em milagres. E o maior milagre é você ter chegado até aqui, mais forte e sábio. ⭐",
    "O Natal nos lembra que mesmo na noite mais escura, uma pequena luz pode fazer toda a diferença. Você é essa luz para alguém. ✨",
    "Neste Natal, celebre suas conquistas, aprenda com seus desafios e renove suas esperanças para o ano que vem. 🎊"
];

let currentMessageIndex = -1;
let usedMessages = [];
let isMuted = true;

const messageDisplay = document.getElementById('messageDisplay');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const muteBtn = document.getElementById('muteBtn');
const copyFeedback = document.getElementById('copyFeedback');
const muteIcon = document.getElementById('muteIcon');
const muteText = document.getElementById('muteText');

function getRandomMessage() {
    if (usedMessages.length === messages.length) {
        usedMessages = [];
    }

    let availableMessages = messages.filter((_, index) => !usedMessages.includes(index));
    let randomIndex = Math.floor(Math.random() * availableMessages.length);
    let messageIndex = messages.indexOf(availableMessages[randomIndex]);
    
    usedMessages.push(messageIndex);
    currentMessageIndex = messageIndex;
    
    return messages[messageIndex];
}

function displayMessage() {
    const message = getRandomMessage();
    messageDisplay.innerHTML = `<p class="message-fade">${message}</p>`;
    copyBtn.classList.remove('hidden');
    
    if (!isMuted) {
        playSound();
    }
}

function copyMessage() {
    const messageText = messages[currentMessageIndex];
    navigator.clipboard.writeText(messageText).then(() => {
        copyFeedback.classList.remove('hidden');
        setTimeout(() => {
            copyFeedback.classList.add('hidden');
        }, 2000);
    });
}

function toggleMute() {
    isMuted = !isMuted;
    muteIcon.textContent = isMuted ? '🔊' : '🔇';
    muteText.textContent = isMuted ? 'Som' : 'Mudo';
}

function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25;
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 5 + 's';
    snowflake.style.opacity = Math.random() * 0.6 + 0.4;
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    
    document.getElementById('snowContainer').appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, 8000);
}

generateBtn.addEventListener('click', displayMessage);
copyBtn.addEventListener('click', copyMessage);
muteBtn.addEventListener('click', toggleMute);

setInterval(createSnowflake, 300);
