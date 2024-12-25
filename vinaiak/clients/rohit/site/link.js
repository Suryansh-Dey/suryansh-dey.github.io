const server = "https://api.vinaiak.com";
const captchaKey = "6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v";

let AI, Bot;
fetch("https://suryansh-dey.github.io/vinaiak/chatbot/frontend/inject.js").then(
  (response) => {
    response.text().then((data) => {
      let Bot1, AI1;
      data = data + ";Bot1 = Bot;AI1 = AI";
      eval(data);
      AI = AI1;
      Bot = Bot1;
    });
  },
);
{
  let captchaScript = document.createElement("script");
  captchaScript.src =
    "https://www.google.com/recaptcha/enterprise.js?render=" + captchaKey;
  captchaScript.id = "captcha";
  captchaScript.async = false;
  document.body.appendChild(captchaScript);
  let components = document.createElement("script");
  components.async = false;
  components.src =
    "https://suryansh-dey.github.io/vinaiak/chatbot/frontend/components.js";
  document.body.appendChild(components);
  let mcqsjs = document.createElement("script");
  mcqsjs.src =
    "https://suryansh-dey.github.io/vinaiak/clients/SBPS_Ranchi/site/mcqs.js";
  document.body.appendChild(mcqsjs);
}

let personalData_className = ''

function addBot(targetElement) {
  let frameNotOpened = false;
  targetElement = targetElement || document.body;
  const captchaKey = "6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v";

  {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href =
      "https://suryansh-dey.github.io/vinaiak/clients/SBPS_Ranchi/site/styles.css";
    document.head.appendChild(styles);
  }
  const loginIcon = document.createElement("div");
  loginIcon.id = "bot-loginIcon";
  loginIcon.innerHTML =
    '<img src="https://suryansh-dey.github.io/vinaiak/clients/SBPS_Ranchi/site/resources/icon.gif" alt="AI assistants"</img>';
  targetElement.appendChild(loginIcon);
  let captchaScript = document.createElement("script");
  captchaScript.src =
    "https://www.google.com/recaptcha/enterprise.js?render=" + captchaKey;
  captchaScript.id = "captcha";
  targetElement.appendChild(captchaScript);

  loginIcon.onclick = () => {
    if (Bot.exists) {
      Bot.openFrame();
      setTimeout(() => {
        document.getElementById("bot-loginIcon").style.display = "none";
      }, 400);
      return;
    } else {
      setTimeout(() => {
        document.getElementById("bot-loginIcon").style.display = "none";
        if (!Bot.loaded) frameNotOpened = true;
        else Bot.openFrame();
      }, 500);
    }

    Bot.landscapeHeight = 70;
    new Bot(
      3,
      captchaKey,
      "Ask me about Zen learn ",
      "Zen learn AI",
      "https://suryansh-dey.github.io/vinaiak/clients/rohit/site/resources/logo.png",
      null,
      (frame) => {
        Bot.iframe.style.bottom = "5dvh";
        frame.getElementById("close").addEventListener("click", () => {
          document.getElementById("bot-loginIcon").style.display = "block";
        });
        Bot.startWaiting();
        setTimeout(() => {
          Bot.stopWaiting();
          Bot.reply(`${["Hi", "Hello", "Welcome"][parseInt(Math.random() * 3)]}! How may I help you today?`)
        }, 2000)
        frame
          .getElementById("chat-area")
          .addEventListener("scrollend", AI.keepAlive);
        document.addEventListener("scrollend", AI.keepAlive);
        Bot.customiseColor({ watermark: false, heading: 'blue', boxBoder: 'violet', userBox: 'violet', link: 'green' })
        Bot.iframe.style.zIndex = 10000;
        if (frameNotOpened) Bot.openFrame();
      },
      targetElement,
      false,
    );
    console.log("Logged in to chat bot");
  };
}
addBot();
