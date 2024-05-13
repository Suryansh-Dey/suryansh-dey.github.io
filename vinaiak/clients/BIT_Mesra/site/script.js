let injectjs = document.createElement('script')
injectjs.src = "../../../chatbot/frontend/inject.js"
document.body.appendChild(injectjs)
document.head.innerHTML += `
<link rel="stylesheet" href="styles.css">
`
document.body.insertAdjacentHTML('afterbegin', `
<div class="container" id="loginContainer">
<div id="loginIcon">
    <img src="resources//bot.png" alt="Login Icon" width="60" height="50">
</div>
<div id="loginForm">
    <h2>BIT login</h2>
    <form id="userForm">
        <input type="text" id="username" name="username" placeholder="username" style="margin-bottom: 7%" class="login-input" autocomplete="on"><br>
        <input type="email" id="email" name="email" placeholder="email ID" class="login-input" autocomplete="on"><br><br>
        <button type="button" id="nextButton">Next</button>
    </form>
</div>
</div>
`)
let bot;
let botActivated = 0;
let userName = ""
let userId = -1
const users = [["suryansh dey", 123], ["shreyash kumar", 1234], ["ankur panjwani", 69]];
const teacherIdx = 2

document.addEventListener('click', (event) => {
  if (botActivated) return
  let element = document.getElementById("loginForm")
  if (!element.contains(event.target) && !document.getElementById("loginIcon").contains(event.target))
    element.style.display = 'none';
}, true)
document.getElementById('loginIcon').addEventListener('click', function () {
  if (!botActivated)
    document.getElementById('loginForm').style.display = 'block';
  else Bot.openFrame()
});
setTimeout(() => {
  document.getElementById('loginIcon').addEventListener('mouseover', function () {
    if (!botActivated)
      document.getElementById('loginForm').style.display = 'block';
  });
}, 1000);

document.getElementById('nextButton').addEventListener('click', nextClick);
document.addEventListener('keydown', nextEnter)

//Functions
function validateUser() {
  for (let i = 0; i < users.length; i++) {
    if (userName.toLowerCase() == users[i][0]) {
      userId = i
      return true
    }
  }
  return false;
}

function validatePassword() {
  return users[userId][1] == document.getElementById("password").value
}

function loginClick() {
  if (validatePassword()) {
    initBot(userId < teacherIdx ? '1' : '2');
  } else {
    alert('Invalid password. Please try again.');
  }
}
function nextClick() {
  document.removeEventListener('keydown', nextEnter)
  document.getElementById('nextButton').removeEventListener('click', nextClick)
  userName = document.getElementById("username").value
  if (validateUser()) {
    document.getElementById('loginForm').innerHTML = `
    <h2>Welcome back!</h2>
    <form id="passwordForm">
    <input type="password" id="password" name="password" placeholder="password" class="login-input"><br><br>
    <button type="button" id="loginButton">Login</button>
    </form>
    `;
    document.getElementById('loginButton').addEventListener('click', loginClick);
    document.addEventListener('keydown', (event) => {
      if (event.key == 'Enter') {
        event.preventDefault()
        loginClick()
      }
    })
  } else {
    initBot('0');
  }
}
function nextEnter(event) {
  if (event.key == 'Enter') nextClick()
}
function initBot(userType) {
  if (botActivated == 1 || userName == "")
    return;
  bot = new Bot("../../clients/BIT_Mesra/site/resources/doodle.png",
    "Ask me about BIT Mesra",
    "https://yt3.ggpht.com/a/AATXAJwOzthsWc__jFGypZvbWTdrVKBNCsMIv-Y6ofuk=s900-c-k-c0xffffffff-no-rj-mo"
  )
  botActivated = 1
  document.getElementById("loginForm").style.display = 'none';
  console.log("Logged in to chat bot")
}