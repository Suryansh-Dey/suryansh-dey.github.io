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
    mcqsjs.src = "https://suryansh-dey.github.io/vinaiak/clients/ISM/site/mcqs.js";
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
            "https://suryansh-dey.github.io/vinaiak/clients/ISM/site/styles.css";
        document.head.appendChild(styles);
    }
    const loginIcon = document.createElement("div");
    loginIcon.id = "bot-loginIcon";
    loginIcon.innerHTML =
        '<img src="https://suryansh-dey.github.io/vinaiak/clients/ISM/site/resources/icon.gif" alt="AI assistants"</img>';
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
        let customCss = getLoginFormCss();
        new Bot(
            3,
            captchaKey,
            "Ask me about IIT (ISM) Dhanbad",
            "IIT(ISM) Assistant",
            "https://suryansh-dey.github.io/vinaiak/clients/ISM/site/resources/logo.png",
            quickAccesses,
            (frame) => {
                Bot.iframe.style.bottom = "5dvh";
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
                        Bot.reply(`${["Hi", "Hello", "Welcome"][parseInt(Math.random() * 3)]} ${personalData ? personalData.name : ""}! Which program are you intrested in?`);
                        frame.getElementById("text-input").style.display = "block";
                        frame.getElementById("send").style.display = "block";
                        frame.getElementById("text-input").focus();
                        frame.getElementById("quick-access").style.display = "block";
                        Bot.createMcq(mcq);
                    },
                    Bot.stopWaiting,
                    false,
                    () => {
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
            false,
        );
        Bot.landscapeHeight = 90;
        Bot.resizeIframe()
        AI.setContext(["ISM Dhanbad"])
        console.log("Logged in to chat bot");
    };
}
