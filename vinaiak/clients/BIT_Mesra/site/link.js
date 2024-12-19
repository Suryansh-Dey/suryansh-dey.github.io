let AI, Bot;
let quickAccesses, mcq;
const server = "https://api.vinaiak.com";
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
import(
  "https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/mcqs.js"
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
      "https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/styles.css";
    document.head.appendChild(styles);
  }
  const loginIcon = document.createElement("div");
  loginIcon.id = "bot-loginIcon";
  loginIcon.innerHTML =
    '\
            <video muted disablePictureInPicture preload="auto" id="popup"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/namaste.mp4" type="video/mp4">AI assistants</video>\
            <video muted disablePictureInPicture preload="auto" id="looking" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/Looking_Around.mp4" type="video/mp4">AI assistants</video>\
            <video muted disablePictureInPicture preload="auto" id="jump" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/Jump.mp4" type="video/mp4">AI assistants</video>\
            <video muted disablePictureInPicture preload="auto" id="hover" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/onHover.mp4" type="video/mp4">AI assistants</video>\
            <video muted disablePictureInPicture preload="auto" id="click" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/onClick.mp4" type="video/mp4">AI assistants</video>\
';
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
      "https://suryansh-dey.github.io/vinaiak/chatbot/frontend/components.js";
    document.body.appendChild(components);
  }

  loginIcon.querySelector("#popup").play();
  let startWaiting = true;
  const video = loginIcon.querySelector("#popup");
  video.onended = () => {
    video.src =
      "https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/popup.mp4";
    video.play();
    video.onended = () => {
      startWaiting = false;
    };
  };
  setInterval(() => {
    if (startWaiting) {
      startWaiting = false;
      return;
    }
    if (loginIcon.querySelector("#popup"))
      loginIcon.removeChild(loginIcon.querySelector("#popup"));
    loginIcon.querySelector("#hover").style.display = "none";
    loginIcon.querySelector("#click").style.display = "none";
    let video = loginIcon.querySelector("video");
    if (Math.random() < 0.6) {
      video = loginIcon.querySelector("#looking");
      loginIcon.querySelector("#jump").style.display = "none";
    } else {
      video = loginIcon.querySelector("#jump");
      loginIcon.querySelector("#looking").style.display = "none";
    }
    video.style.display = "block";
    video.play();
  }, 5000);
  document
    .getElementById("bot-loginIcon")
    .addEventListener("mouseenter", () => {
      startWaiting = true;
      if (loginIcon.querySelector("#popup"))
        document
          .getElementById("bot-loginIcon")
          .removeChild(loginIcon.querySelector("#popup"));
      loginIcon.querySelector("#looking").style.display = "none";
      loginIcon.querySelector("#jump").style.display = "none";
      loginIcon.querySelector("#hover").style.display = "block";
      loginIcon.querySelector("#hover").play();
    });
  document
    .getElementById("bot-loginIcon")
    .addEventListener("mouseleave", () => {
      startWaiting = false;
    });

  loginIcon.onclick = () => {
    startWaiting = true;
    const onClick = loginIcon.querySelector("#click");
    onClick.style.display = "block";
    onClick.play();
    onClick.onended = () => {
      onClick.style.display = "none";
      startWaiting = false;
    };
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
      }, 2000);
    }
    let customCss = document.createElement("style");
    customCss.textContent = loginFormCss;
    new Bot(
      1,
      captchaKey,
      "Ask me about BIT Mesra",
      "BIT Admission Assistant",
      "https://yt3.ggpht.com/a/AATXAJwOzthsWc__jFGypZvbWTdrVKBNCsMIv-Y6ofuk=s900-c-k-c0xffffffff-no-rj-mo",
      quickAccesses,
      (frame) => {
        Bot.hideFrame();
        window.addEventListener("beforeunload", AI.quit);
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
