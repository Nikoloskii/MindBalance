// ===== STATE =====
let good = 0, okay = 0, bad = 0, total = 0;
let moodHistory = [];
let currentTab = 'mood';
let userName = '';

// ===== QUOTES =====
const quotes = [
    { text: "Твоето ментално здравје е приоритет. Грижи се за себе.", author: "- MindBalance" },
    { text: "Секој ден е нова можност да бидеш подобра верзија од себе.", author: "- Непознат" },
    { text: "Не дозволувај лошиот ден да те убеди дека имаш лош живот.", author: "- Непознат" },
    { text: "Грижата за себе не е себичност, туку неопходност.", author: "- Audre Lorde" },
    { text: "Твојата вредност не се мери со твоите неуспеси.", author: "- Непознат" },
    { text: "Малите чекори водат до големи промени.", author: "- Непознат" },
    { text: "Биди благ кон себе. Секој има лоши денови.", author: "- Непознат" },
    { text: "Силата не доаѓа од физичките способности, туку од непоколебливата волја.", author: "- Mahatma Gandhi" },
    { text: "Најголемата слава не е во никогаш не паѓање, туку во станување секој пат кога ќе паднеш.", author: "- Confucius" },
];

// ===== CHALLENGES =====
const challenges = {
    good: [
        "🏃 Оди на прошетка 15 минути и уживај во природата.",
        "📝 Напиши 3 работи за кои си благодарен денес.",
        "🤗 Подели насмевка со некого денес.",
        "🎵 Слушај омилена песна и танцувај.",
        "📖 Прочитај нешто инспиративно 10 минути.",
        "🌿 Направи 10 склекови или чучњеви.",
        "☀️ Излези надвор 20 минути."
    ],
    okay: [
        "🧘 Направи 5 минути длабоко дишење.",
        "☕ Направи пауза со шолја чај или кафе.",
        "📱 Исклучи го телефонот 30 минути.",
        "🚶 Прошетај 10 минути без никаква цел.",
        "💬 Разговарај со пријател 5 минути.",
        "🎨 Нацртај или напиши нешто.",
        "🎧 Слушај смирувачка музика."
    ],
    bad: [
        "🤗 Прегрни некого или прегрни перница.",
        "😴 Одмори се и спиј 20 минути.",
        "✍️ Напиши ги своите чувства на хартија.",
        "📞 Јави се на близок пријател.",
        "🧘 Направи вежби за релаксација.",
        "🍵 Попј топол чај и земи 5 длабоки вдишувања.",
        "💭 Запомни - ова чувство ќе помине."
    ]
};

// ===== CHATBOT RESPONSES =====
const botResponses = {
    anxiety: [
        "Разбирам дека се чувствуваш анксиозно. Пробај да дишеш длабоко: вдиши 4 секунди, задржи 4, издиши 4. Повтори 5 пати. 💨",
        "Анксиозноста е нормална реакција. Запомни дека ова чувство ќе помине. Фокусирај се на сегашниот момент. 🌿",
        "Кога чувствуваш анксиозност, обидете се да ги забележиш 5 работи што ги гледаш, 4 што ги слушаш, 3 што ги чувствуваш... Ова ќе те врати во сегашноста. 👀",
        "Практикувај мускулна релаксација: стисни ги тупаниците 5 секунди, па отпушти. Повтори низ целото тело. 💪",
        "Запомни - анксиозноста е како бран, доаѓа и си оди. Не се бори со неа, прифати ја и ќе помине побрзо. 🌊"
    ],
    stress: [
        "Училишниот стрес е чест кај младите. Направи пауза, прошетај 5 минути и потоа продолжи со задачата. 📚",
        "Организирај ги задачите по важност. Една по една, чекор по чекор. Не мораш се одеднаш. ✅",
        "Запомни дека оценките не ја дефинираат твојата вредност. Дали си направил се што можеш? Тоа е доволно. 🌟",
        "Пробај техника 'Помодоро': 25 минути работа, 5 минути пауза. Ќе видиш колку е ефективно! ⏰",
        "Стресот е сигнал дека ти е важно. Канализирај ја таа енергија во продуктивност, не во грижа. ⚡"
    ],
    motivation: [
        "Мотивацијата доаѓа и си оди. Важно е да имаш дисциплина. Започни со мал чекор - само 5 минути. 🚀",
        "Запомни зошто започна. Која е твојата цел? Визуелизирај го успехот и почни. 💪",
        "Не чекај совршен момент. Започни сега, дури и ако е мал чекор. Движењето создава енергија. ⚡",
        "Секој успешен човек започнал од нула. Ти исто можеш! Верувај во себе. 🌟",
        "Ако ти е тешко да започнеш, кажи си 'Само 2 минути' - обично после тоа продолжуваш. 🎯"
    ],
    sleep: [
        "Проблемите со спиење се чести кај младите. Пробај да легнуваш и стануваш во исто време. 🕐",
        "Исклучи го телефонот 1 час пред спиење. Сината светлина го нарушува сонот. 📱🚫",
        "Направи рутина пред спиење: чај, читање, или медитација. 🌙",
        "Ако не можеш да заспиеш, стани и направи нешто смирувачко 15 минути, па пробај повторно. 🛌",
        "Спиењето е исто важно како и вежбањето. Твоето тело и мозок требаат одмор за да функционираат. 💤"
    ],
    selfesteem: [
        "Самодовербата се гради секој ден. Запиши 3 работи за кои си горд/горда на себе денес. ✍️",
        "Споредувањето со другите е крадец на радоста. Фокусирај се на својот напредок. 👀",
        "Твојата вредност не зависи од тоа што мислат другите. Ти си доволен/доволна токму ваков/ваква. 💙",
        "Секој има несигурности. Дури и најсамоуверените луѓе. Не си сам! 🤗",
        "Почни со афирмации: 'Јас сум способен/на', 'Јас вредам', 'Јас можам'. Повторувај секој ден. 🌟"
    ],
    bullying: [
        "Булингот е сериозен проблем. Важно е да знаеш - НЕ СИ ТИ ВИНОВЕН/НА! 🚫",
        "Разговарај со некој кому му веруваш: родител, наставник, пријател. Не држи сè во себе. 🤝",
        "Ако си сведоци на булинг, реагирај. Твојата поддршка може да промени сè. 💪",
        "Запомни - зборовите на другите не ја дефинираат твојата вредност. Ти си уникатен/на. 🌈",
        "Постојат организации кои помагаат. HBSC податоците покажуваат дека 20% од младите се соочуваат со булинг. Заедно можеме да го спречиме! 🤗"
    ],
    friends: [
        "Врсничките односи се важни за менталното здравје. Окружи се со луѓе кои те поддржуваат. 🤗",
        "Ако се чувствуваш осамено, придружи се во некоја активност или клуб. Ќе запознаеш нови луѓе. 🌟",
        "Понекогаш е подобро да имаш 2-3 вистински пријатели отколку 30 површни. Квалитет > квантитет. 💙",
        "Не се плаши да иницираш разговор. Секој сака да има пријатели, само некои се постидливи. 🗣️",
        "Социјалната поддршка е еден од клучните фактори за добро ментално здравје, според HBSC студиите. 🤝"
    ],
    family: [
        "Семејството е важна поддршка. Разговарај со нив за тоа како се чувствуваш. 🏠",
        "Понекогаш родителите не разбираат, но тоа не значи дека не ги интересира. Пробај да им објасниш. 💙",
        "Ако имаш конфликти дома, направи пауза. Оди прошетај 10 минути, па врати се смирен/на. 🌿",
        "Секое семејство има предизвици. Важно е да се комуницира отворено и со почит. 💬",
        "Семејната поддршка е клучна за добросостојбата на младите, покажуваат HBSC податоците. 🤗"
    ],
    school: [
        "Училиштето може да биде стресно. Направи распоред за учење и држи се до него. 📚",
        "Не споредувај се со другите. Секој учи со своја брзина. 🐢",
        "Ако имаш проблеми со некој предмет, побарај помош. Наставниците се тука да помогнат. 👨‍🏫",
        "Училиштето е само дел од животот. Најди хоби и интереси надвор од него. 🎨",
        "Задоволството од училиштето е поврзано со добросостојбата - затоа најди што те прави среќен/на во училиштето! ⭐"
    ],
    exercise: [
        "Физичката активност ослободува ендорфини - природни 'хормони на среќата'! 🏃",
        "Не мора да биде напорно. 15 минути прошетка дневно се доволни за позитивен ефект. 🚶",
        "Најди активност што ти е забавна: танц, велосипед, спорт... Ќе ти биде полесно да се мотивираш. 🎵",
        "HBSC покажува дека 40% од младите не се доволно активни. Придружи се кон 60%! 💪",
        "Вежбањето го подобрува расположението, сонот и самодовербата. Започни денес! 🌟"
    ],
    default: [
        "Те слушам. Раскажи ми повеќе за тоа како се чувствуваш. 🌈",
        "Важно е да зборуваш за своите чувства. Продолжи... 💙",
        "Секој има предизвици. Што мислиш дека би ти помогнало во моментов? 🤔",
        "Твоите чувства се валидни. Благодарам што споделуваш со мене. 🌸",
        "Можеби ќе помогне да ги напишеш своите мисли. Понекогаш тоа носи јасност. ✍️",
        "Не си сам/а. Многу млади поминуваат низ слични работи. Заедно сме посилни! 🤗"
    ]
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    loadStats();
    loadMoodHistory();
    setDailyQuote();
    setDailyChallenge('default');
    loadUserName();
    updateHistoryDisplay();
});

// ===== TAB SWITCHING =====
function switchTab(tab) {
    currentTab = tab;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tab-btn[data-tab="${tab}"]`).classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`tab-${tab}`).classList.add('active');
}

// ===== MOOD TRACKER =====
function showAdvice(mood) {
    let name = document.getElementById("name").value.trim();
    let result = document.getElementById("result");
    let resultEmoji = document.getElementById("resultEmoji");
    let resultTitle = document.getElementById("resultTitle");
    let resultText = document.getElementById("resultText");

    if (name === "") {
        let input = document.getElementById("name");
        input.style.animation = "shake 0.5s ease";
        setTimeout(() => { input.style.animation = ""; }, 500);
        showNotification("Внеси го твоето име! 👋");
        return;
    }

    userName = name;
    localStorage.setItem("userName", userName);

    if (mood === "good") {
        good++;
        resultEmoji.textContent = "🌟";
        resultTitle.textContent = `Браво, ${name}!`;
        resultText.textContent = "Продолжи со здравите навики и физичката активност. Ти си одличен! 💪";
    } else if (mood === "okay") {
        okay++;
        resultEmoji.textContent = "😊";
        resultTitle.textContent = `Здраво, ${name}`;
        resultText.textContent = "Обиди се да направиш кратка пауза и одмор. Заслужуваш малку време за себе! 🌿";
    } else {
        bad++;
        resultEmoji.textContent = "💙";
        resultTitle.textContent = `${name}, не си сам!`;
        resultText.textContent = "Разговарај со пријател или член од семејството. Секој има лоши денови, и тоа е океј! 🤗";
    }

    total = good + okay + bad;

    result.classList.remove("hidden");
    setTimeout(() => { result.classList.add("show"); }, 10);

    saveMoodToHistory(mood, name);
    updateStats();
    setDailyChallenge(mood);
    updateHistoryDisplay();

    showNotification(`Забележано! 😊 ${name} се чувствува ${mood === 'good' ? 'одлично' : mood === 'okay' ? 'океј' : 'помалку добро'}`);
}

function updateStats() {
    document.getElementById("goodCount").textContent = good;
    document.getElementById("okayCount").textContent = okay;
    document.getElementById("badCount").textContent = bad;

    if (total === 0) {
        document.getElementById("goodBar").style.width = "0%";
        document.getElementById("okayBar").style.width = "0%";
        document.getElementById("badBar").style.width = "0%";
        return;
    }

    document.getElementById("goodBar").style.width = (good / total * 100) + "%";
    document.getElementById("okayBar").style.width = (okay / total * 100) + "%";
    document.getElementById("badBar").style.width = (bad / total * 100) + "%";

    saveStats();
}

// ===== DAILY CHALLENGE =====
function setDailyChallenge(mood) {
    let challengeText = document.getElementById("challengeText");
    let challengeList = challenges[mood] || challenges.default;
    let randomChallenge = challengeList[Math.floor(Math.random() * challengeList.length)];
    challengeText.textContent = randomChallenge || "🎯 Направи нешто добро за себе денес!";
}

// ===== DAILY QUOTE =====
function setDailyQuote() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quoteText").textContent = `"${randomQuote.text}"`;
    document.getElementById("quoteAuthor").textContent = randomQuote.author;
}

// ===== MOOD HISTORY =====
function saveMoodToHistory(mood, name) {
    let entry = {
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        mood: mood,
        name: name
    };
    moodHistory.push(entry);
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
}

function loadMoodHistory() {
    let saved = localStorage.getItem("moodHistory");
    if (saved) {
        moodHistory = JSON.parse(saved);
    }
}

function updateHistoryDisplay() {
    let container = document.getElementById("dailyEntries");
    
    if (moodHistory.length === 0) {
        container.innerHTML = `
            <p style="color: rgba(255,255,255,0.5); text-align: center; padding: 20px;">
                📝 Нема записи. Кликни на расположение за да започнеш!
            </p>
        `;
        return;
    }

    let entries = moodHistory.slice(-7).reverse();
    let html = '';
    
    entries.forEach(entry => {
        let moodEmoji = entry.mood === 'good' ? '😊' : entry.mood === 'okay' ? '😐' : '😔';
        let moodClass = entry.mood === 'good' ? 'good-entry' : entry.mood === 'okay' ? 'okay-entry' : 'bad-entry';
        let moodText = entry.mood === 'good' ? 'Добро' : entry.mood === 'okay' ? 'Океј' : 'Лошо';
        
        html += `
            <div class="entry-item ${moodClass}">
                <div>
                    <span class="entry-name">${entry.name}</span>
                    <span class="entry-date"> • ${entry.date}</span>
                </div>
                <div>
                    <span class="entry-mood">${moodEmoji}</span>
                    <span style="color:rgba(255,255,255,0.4); font-size:11px; margin-left:5px;">${moodText}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function loadUserName() {
    let saved = localStorage.getItem("userName");
    if (saved) {
        document.getElementById("name").value = saved;
    }
}

// ===== CHATBOT =====
function sendChatMessage() {
    let input = document.getElementById("chatInput");
    let message = input.value.trim();
    
    if (message === "") {
        showNotification("Напиши нешто! 📝");
        return;
    }

    addMessage(message, 'user');
    input.value = "";

    setTimeout(() => {
        let response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 600);
}

function handleChatKey(event) {
    if (event.key === "Enter") {
        sendChatMessage();
    }
}

function quickReply(text) {
    document.getElementById("chatInput").value = text;
    sendChatMessage();
}

function addMessage(text, sender) {
    let chatMessages = document.getElementById("chatMessages");
    let messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}-message`;
    
    let contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(message) {
    let lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('анксиоз') || lowerMsg.includes('страв') || lowerMsg.includes('нервоз') || 
        lowerMsg.includes('паника') || lowerMsg.includes('тревож')) {
        return botResponses.anxiety[Math.floor(Math.random() * botResponses.anxiety.length)];
    }
    else if (lowerMsg.includes('стрес') || lowerMsg.includes('училишт') || lowerMsg.includes('задач') || 
             lowerMsg.includes('испит') || lowerMsg.includes('оценк') || lowerMsg.includes('ученье')) {
        return botResponses.stress[Math.floor(Math.random() * botResponses.stress.length)];
    }
    else if (lowerMsg.includes('мотиваци') || lowerMsg.includes('немо') || lowerMsg.includes('не ми се') || 
             lowerMsg.includes('дај') || lowerMsg.includes('инспираци') || lowerMsg.includes('сила')) {
        return botResponses.motivation[Math.floor(Math.random() * botResponses.motivation.length)];
    }
    else if (lowerMsg.includes('спие') || lowerMsg.includes('спање') || lowerMsg.includes('несоница') || 
             lowerMsg.includes('заспи') || lowerMsg.includes('ноќ')) {
        return botResponses.sleep[Math.floor(Math.random() * botResponses.sleep.length)];
    }
    else if (lowerMsg.includes('самодоверб') || lowerMsg.includes('самоувер') || lowerMsg.includes('вред') || 
             lowerMsg.includes('горд') || lowerMsg.includes('несигур')) {
        return botResponses.selfesteem[Math.floor(Math.random() * botResponses.selfesteem.length)];
    }
    else if (lowerMsg.includes('булинг') || lowerMsg.includes('малтретир') || lowerMsg.includes('задева') || 
             lowerMsg.includes('вред') || lowerMsg.includes('навред')) {
        return botResponses.bullying[Math.floor(Math.random() * botResponses.bullying.length)];
    }
    else if (lowerMsg.includes('пријател') || lowerMsg.includes('другар') || lowerMsg.includes('осамен') || 
             lowerMsg.includes('социјал') || lowerMsg.includes('сам') || lowerMsg.includes('врсник')) {
        return botResponses.friends[Math.floor(Math.random() * botResponses.friends.length)];
    }
    else if (lowerMsg.includes('семеј') || lowerMsg.includes('родител') || lowerMsg.includes('мама') || 
             lowerMsg.includes('тато') || lowerMsg.includes('дома') || lowerMsg.includes('брат') || lowerMsg.includes('сестра')) {
        return botResponses.family[Math.floor(Math.random() * botResponses.family.length)];
    }
    else if (lowerMsg.includes('училишт') || lowerMsg.includes('школ') || lowerMsg.includes('наставник') || 
             lowerMsg.includes('професор') || lowerMsg.includes('часов') || lowerMsg.includes('предмет')) {
        return botResponses.school[Math.floor(Math.random() * botResponses.school.length)];
    }
    else if (lowerMsg.includes('физичка') || lowerMsg.includes('вежба') || lowerMsg.includes('спорт') || 
             lowerMsg.includes('трча') || lowerMsg.includes('активн') || lowerMsg.includes('движе') || 
             lowerMsg.includes('прошетк')) {
        return botResponses.exercise[Math.floor(Math.random() * botResponses.exercise.length)];
    }
    else if (lowerMsg.includes('здраво') || lowerMsg.includes('хеј') || lowerMsg.includes('привет') || 
             lowerMsg.includes('здрав') || lowerMsg.includes('добар ден')) {
        return "Здраво! 👋 Како можам да ти помогнам денес? Кажи ми како се чувствуваш или прашај ме за нешто!\n\n💡 Можеш да прашаш за: стрес, анксиозност, спиење, булинг, самодоверба, мотивација, пријатели, семејство, училиште или физичка активност.";
    }
    else if (lowerMsg.includes('благодар') || lowerMsg.includes('фала') || lowerMsg.includes('thx') || 
             lowerMsg.includes('благода')) {
        return "Со задоволство! 🌟 Секогаш сум тука за тебе. Ако ти треба совет, само пиши! Запомни - твоето ментално здравје е важно! 💙";
    }
    else if (lowerMsg.includes('добро') || lowerMsg.includes('одлично') || lowerMsg.includes('супер') || 
             lowerMsg.includes('прекрасно') || lowerMsg.includes('фантастично')) {
        return "Тоа е одлично! 🎉 Продолжи со позитивната енергија. Запомни да ги цениш малите победи! 🌟\n\n💡 Според HBSC, младите со позитивен став имаат подобра добросостојба. Продолжи така!";
    }
    else if (lowerMsg.includes('лошо') || lowerMsg.includes('таж') || lowerMsg.includes('плач') || 
             lowerMsg.includes('депресив') || lowerMsg.includes('тешко') || lowerMsg.includes('жал')) {
        return "Разбирам дека ти е тешко. 💙 Запомни - чувствата се привремени. Дали има нешто што би сакал да споделиш? Секогаш можеш да разговараш со мене или со некој близок.\n\n🌸 HBSC податоците покажуваат дека 15% од младите се чувствуваат осамено. Не си сам/а!";
    }
    else if (lowerMsg.includes('hbsc') || lowerMsg.includes('студи') || lowerMsg.includes('истражува') || 
             lowerMsg.includes('податоци') || lowerMsg.includes('статистик')) {
        return "📊 HBSC (Health Behaviour in School-aged Children) е меѓународна студија за здравјето на младите.\n\nКлучни наоди за Македонија:\n• 30% од младите пријавуваат стрес\n• 25% имаат проблеми со спиење\n• 20% се соочуваат со булинг\n• 40% не се доволно физички активни\n\nMindBalance е инспириран токму од овие податоци! 🌟";
    }
    else {
        return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
    }
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    let notif = document.createElement("div");
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        padding: 15px 30px;
        border-radius: 15px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideDown 0.5s ease;
        backdrop-filter: blur(10px);
        max-width: 90%;
        text-align: center;
    `;
    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = "slideUp 0.5s ease";
        setTimeout(() => { notif.remove(); }, 500);
    }, 3000);
}

// ===== STORAGE =====
function saveStats() {
    let stats = { good, okay, bad };
    localStorage.setItem("mindBalanceStats", JSON.stringify(stats));
}

function loadStats() {
    let saved = localStorage.getItem("mindBalanceStats");
    if (saved) {
        let stats = JSON.parse(saved);
        good = stats.good || 0;
        okay = stats.okay || 0;
        bad = stats.bad || 0;
        total = good + okay + bad;
        updateStats();
    }
}

// ===== RESET =====
document.getElementById("logoReset").addEventListener("dblclick", function() {
    if (confirm("Дали сакаш да ги ресетираш сите податоци?")) {
        good = 0; okay = 0; bad = 0; total = 0;
        moodHistory = [];
        localStorage.removeItem("mindBalanceStats");
        localStorage.removeItem("moodHistory");
        localStorage.removeItem("userName");
        updateStats();
        updateHistoryDisplay();
        document.getElementById("name").value = '';
        showNotification("📊 Сите податоци се ресетирани!");
        document.getElementById("result").classList.remove("show");
        document.getElementById("result").classList.add("hidden");
    }
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === '1') switchTab('mood');
    if (e.ctrlKey && e.key === '2') switchTab('chat');
    if (e.ctrlKey && e.key === '3') switchTab('history');
});

// ===== ANIMATION STYLES =====
let style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideUp {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(style);

console.log("🧠 MindBalance Pro v3.0 loaded! 🌟");
console.log("💡 Tips:");
console.log("  • HBSC info is always visible - left and right panels");
console.log("  • Double click logo to reset");
console.log("  • Ctrl+1, Ctrl+2, Ctrl+3 to switch tabs");
console.log("  • Type anything in chat - bot recognizes 10+ topics!");