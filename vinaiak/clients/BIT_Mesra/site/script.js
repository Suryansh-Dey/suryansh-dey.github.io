import { quickAccesses, mcq } from "./mcqs.js";
const captchaKey = "6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v";

let injectjs = document.createElement("script");
injectjs.src = "/vinaiak/chatbot/frontend/inject.js";
document.body.appendChild(injectjs);
let captchaScript = document.createElement("script");
captchaScript.src =
  "https://www.google.com/recaptcha/enterprise.js?render=" + captchaKey;
captchaScript.id = "captcha";
document.body.appendChild(captchaScript);
function addBot(targetElement) {
  let frameNotOpened = false;
  targetElement = targetElement || document.body;
  const captchaKey = "6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v";

  {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = "/vinaiak/clients/BIT_Mesra/site/styles.css";
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
  let captchaScript = document.createElement("script");
  captchaScript.src =
    "https://www.google.com/recaptcha/enterprise.js?render=" + captchaKey;
  captchaScript.id = "captcha";
  targetElement.appendChild(captchaScript);
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
    customCss.textContent = `
	  #loginForm{
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  width:80dvw
	  }
	  #loginForm input{
		  width: 96%;
		  height: 1.5em;
		  margin-top: 0.5em;
		  border-radius: 5px;
		  border: none;
		  background-color: #fbe7d1;
	  }
	  #loginForm input:focus {
		  background-color: #fbe7d1;
		  outline: none;
	  }
	  #loginForm input:-webkit-autofill{
		  -webkit-box-shadow: 0 0 0px 1000px #fbe7d1 inset;
	  }
	  button[type="button"] {
		  width: 100%;
		  padding: 10px;
		  background-color: #ff9029;
		  color: #fff;
		  border: none;
		  border-radius: 5px;
		  margin-top: 0.6em;
		  cursor: pointer;
		}
	  button[type="button"]:hover {
		  background-color: #fead61;
		}`;
    new Bot(
      1,
      captchaKey,
      "Ask me about BIT Mesra",
      "BIT Admission Assistant",
      "https://yt3.ggpht.com/a/AATXAJwOzthsWc__jFGypZvbWTdrVKBNCsMIv-Y6ofuk=s900-c-k-c0xffffffff-no-rj-mo",
      quickAccesses,
      (frame) => {
        window.addEventListener("beforeunload", AI.quit);
        frame.getElementById("quick-access").style.display = "none";
        frame.getElementById("text-input").style.display = "none";
        frame.getElementById("send").style.display = "none";
        frame.getElementById("close").addEventListener("click", () => {
          document.getElementById("bot-loginIcon").style.display = "block";
        });
        Bot.startWaiting();
        setTimeout(() => {
          Bot.stopWaiting();
          Bot.createBox(
            '<div id="loginForm">\
						<h3 style="margin: 0">Introduce yourself</h3>\
						<input type="text" id="username" name="username" placeholder="Name" autocomplete="on">\
						<input type="email" id="email" name="email" placeholder="Email ID" autocomplete="on">\
						<button type="button" id="submit">Submit</button>\
						</div>',
            "bot",
            false,
          );
          frame.getElementById("username").focus();
          frame
            .getElementById("username")
            .addEventListener("keydown", (event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                frame.getElementById("email").focus();
              }
            });
          frame.getElementById("email").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              frame.getElementById("submit").dispatchEvent(new Event("click"));
            }
          });
          frame.getElementById("submit").addEventListener("click", (event) => {
            event.preventDefault();
            const name = frame.getElementById("username").value;
            const email = frame.getElementById("email").value;
            const xhr = new XMLHttpRequest();
            grecaptcha.enterprise.ready(async () => {
              const token = await grecaptcha.enterprise.execute(captchaKey, {
                action: "LOGIN",
              });
              xhr.open("POST", server + "/verify", true);
              xhr.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8",
              );
              xhr.onload = () => {
                if (xhr.status != 200) {
                  Bot.reply(
                    "Error: Invalid session. Please try logging in again otherwise some features may not work",
                  );
                  return;
                }
                xhr.open("POST", server + "/commonData", true);
                xhr.setRequestHeader(
                  "Content-Type",
                  "application/json;charset=UTF-8",
                );
                xhr.onload = null;
                xhr.send(
                  JSON.stringify({
                    id: AI.clientId,
                    data: "name " + name,
                    personalData: { name: name, email: email },
                  }),
                );
              };
              xhr.send(
                JSON.stringify({
                  id: AI.clientId,
                  token: token,
                }),
              );
            });
            frame
              .getElementById("chat-area")
              .removeChild(frame.getElementById("loginForm").parentNode);
            Bot.reply(
              `${["Hi", "Hello", "Welcome"][parseInt(Math.random() * 3)]} ${name.split(" ")[0]}! Which program are you intrested in?`,
            );
            Bot.createMcq(mcq);
          });
        }, 2000);
        Bot.customiseCss(customCss);
        frame
          .getElementById("chat-area")
          .addEventListener("scrollend", AI.keepAlive);
        document.addEventListener("scrollend", AI.keepAlive);
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
