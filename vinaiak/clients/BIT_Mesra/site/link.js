let AI, Bot;
let quickAccesses, mcq;
const server = "https://api.vinaiak.com";
fetch("https://chatbot.vinaiak.com/chatbot/frontend/inject.js").then(
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
import(
  "https://chatbot.vinaiak.com/clients/BIT_Mesra/site/mcqs.js"
).then((module) => {
  quickAccesses = module.quickAccesses;
  mcq = module.mcq;
});
function addBot(targetElement) {
  let frameNotOpened = false;
  targetElement = targetElement || document.body;
  const captchaKey = "6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v";

  {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href =
      "https://chatbot.vinaiak.com/clients/BIT_Mesra/site/styles.css";
    document.head.appendChild(styles);
  }
  const loginIcon = document.createElement("div");
  loginIcon.id = "bot-loginIcon";
  loginIcon.innerHTML =
    '<img src="https://chatbot.vinaiak.com/clients/SBPS_Ranchi/site/resources/icon.gif" alt="AI assistants"</img>';
  targetElement.appendChild(loginIcon);
  {
    let captchaScript = document.createElement("script");
    captchaScript.src =
      "https://www.google.com/recaptcha/enterprise.js?render=" + captchaKey;
    captchaScript.id = "captcha";
    captchaScript.async = false;
    targetElement.appendChild(captchaScript);
    let components = document.createElement("script");
    components.src =
      "https://chatbot.vinaiak.com/chatbot/frontend/components.js";
    components.async = false;
    document.body.appendChild(components);
  }

  loginIcon.onclick = () => {
    if (Bot.exists) {
      setTimeout(() => {
        Bot.openFrame();
        setTimeout(() => {
          document.getElementById("bot-loginIcon").style.display = "none";
        }, 400);
      }, 600);
      return;
    } else {
      setTimeout(() => {
        document.getElementById("bot-loginIcon").style.display = "none";
        if (!Bot.loaded) frameNotOpened = true;
        else Bot.openFrame();
      }, 1000);
    }
    let customCss = getLoginFormCss();
    new Bot(
      1,
      captchaKey,
      "Ask me about BIT Mesra",
      "BIT Admission Assistant",
      "https://yt3.ggpht.com/a/AATXAJwOzthsWc__jFGypZvbWTdrVKBNCsMIv-Y6ofuk=s900-c-k-c0xffffffff-no-rj-mo",
      quickAccesses,
      (frame) => {
        Bot.hideFrame();
        frame.getElementById("quick-access").style.display = "none";
        frame.getElementById("text-input").style.display = "none";
        frame.getElementById("send").style.display = "none";
        frame.getElementById("close").addEventListener("click", () => {
          document.getElementById("bot-loginIcon").style.display = "block";
        });
        Bot.startWaiting();
        createLoginForm(
          captchaKey,
          "Introduce yourself",
          true,
          (personalData) => {
            Bot.reply(
              `${["Hi", "Hello", "Welcome"][parseInt(Math.random() * 3)]} ${personalData ? personalData.name : ""}! Which program are you intrested in?`,
            );
            Bot.createMcq(mcq);
          },
          () => {
            Bot.stopWaiting();
          },
          false, () => {
            console.log("Logged out of chat bot")
            document.getElementById("bot-loginIcon").style.display = "block";
          }
        );
        Bot.customiseCss(customCss);
        frame
          .getElementById("chat-area")
          .addEventListener("scrollend", AI.keepAlive);
        document.addEventListener("scrollend", AI.keepAlive);
        Bot.iframe.style.zIndex = 10000;
        if (frameNotOpened) Bot.openFrame();
      },
      targetElement,
    );
    console.log("Logged in to chat bot");
  };
}
