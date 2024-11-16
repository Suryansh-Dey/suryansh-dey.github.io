document.body.insertAdjacentHTML('afterbegin', `
<div class="container" id="loginContainer">
<div id="loginIcon">
    <img src="resources//bot.png" alt="Login Icon" width="60" height="50">
</div>
<div id="loginForm">
    <h2>SBPS Login</h2>
    <form id="userForm">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email"><br><br>
        <button type="button" id="nextButton">Next</button>
    </form>
</div>
</div>
`)

let botActivated = 0;
let userName = ""
let userId = -1
const users = [["suryansh dey", 123], ["shreyash kumar", 1234], ["ankur panjwani", 69]];
const teacherIdx = 2

document.addEventListener('click', (event) => {
  if(botActivated) return
  let element = document.getElementById("loginForm")
  if (!element.contains(event.target) && !document.getElementById("loginIcon").contains(event.target))
    element.style.display = 'none';
}, true)
function initBot(userType) {
  if (botActivated == 1 || userName == "")
    return;
  let parameters = {
    userData: {
      userName: userName.toLowerCase(),
      userType: userType,
    },
    "composerPlaceholder": "Ask me about SBPS Ranchi",
    "botConversationDescription": "⚡ by vinAIak",
    "botId": "bb50a007-d5bb-4dc4-836e-c9d775af161b",
    "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
    "messagingUrl": "https://messaging.botpress.cloud",
    "clientId": "bb50a007-d5bb-4dc4-836e-c9d775af161b",
    "webhookId": "26e25e69-a294-4528-a0e4-10be60f31e0c",
    "lazySocket": true,
    "themeName": "prism",
    "botName": "SBPS assistant",
    "avatarUrl": "https://yt3.ggpht.com/a/AGF-l79JPm-7oPv0JHz0RuNcGsTV4DSKfuQZ2sM_=s900-mo-c-c0xffffffff-rj-k-no",
    "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/201f3ad7-f9a0-482c-b330-cd66cd48402d/v77824/style.css",
    "frontendVersion": "v1",
    "useSessionStorage": true,
    "enableConversationDeletion": true,
    "theme": "prism",
    "themeColor": "#2563eb",
    "containerWidth": "100%25",
    "layoutWidth": "100%25"
  };
  window.botpressWebChat.init(parameters);
  botActivated = 1
  document.getElementById("loginContainer").classList.add("hidden");
  console.log("Logged in to chat bot")
}
document.getElementById('loginIcon').addEventListener('click', function () {
  document.getElementById('loginForm').style.display = 'block';
});
setTimeout(()=>{
  document.getElementById('loginIcon').addEventListener('mouseover', function () {
    document.getElementById('loginForm').style.display = 'block';
  });
}, 1000);

document.getElementById('nextButton').addEventListener('click', function () {
  userName = document.getElementById("username").value
  if (validateUser()) {
    document.getElementById('loginForm').innerHTML = `
      <h2>Welcome back!</h2>
        <form id="passwordForm">
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password"><br><br>
          <button type="button" id="loginButton">Login</button>
        </form>
      `;
    document.getElementById('loginButton').addEventListener('click', function () {
      if (validatePassword()) {
        initBot(userId < teacherIdx ? '1' : '2');
      } else {
        alert('Invalid password. Please try again.');
      }
    });
  } else {
    initBot('0');
  }
});

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