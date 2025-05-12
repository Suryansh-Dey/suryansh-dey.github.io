/**
 * @param {string} question
 * @param {string} id used to make
 * ```html
 * <input id="data-{id}">
 * <button id="next-{id}">
 * ```
 * @param {Function} callback
 * @returns {void}
 */
function createInputBox(question, id, callback) {
    Bot.createBox(
        `<div id="loginForm">\
<h3 style="margin: 0">${question}</h3>\
<input type="text" id="data-${id}" name="text" placeholder="Answer" autocomplete="on">\
<button type="button" id="next-${id}">Next</button>\
						</div>`,
        "bot",
        true,
        () => {
            Bot.iframe.contentDocument
                .getElementById("next-" + id)
                .addEventListener("click", () => {
                    data[field] = Bot.iframe.contentDocument.getElementById(
                        "data-" + id,
                    ).value;
                    if (callback) callback();
                });
        },
    );
}
/**
 * @param {string} addionalCss 
 * @returns {HTMLStyleElement} customCss
 */
function getLoginFormCss(addionalCss, inputColor = "#fbe7d1", loginColor = "#ff9029", loginHoverColor = "#fead61", allowAnonymousColor = "#ffcc00", allowAnonymousHoverColor = "#ffdd00") {
    const styles = document.createElement('style')
    styles.textContent =
        `
	  #loginForm{
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  width:80dvw
	  }
	  #loginForm .input{
		  width: 96%;
		  height: 1.5em;
		  margin-top: 0.5em;
		  border-radius: 5px;
		  border: none;
		  background-color: ${inputColor};
	  }
	  #loginForm .input:focus {
		  background-color: ${inputColor};
		  outline: none;
	  }
	  #loginForm .input:-webkit-autofill{
		  -webkit-box-shadow: 0 0 0px 1000px ${inputColor} inset;
	  }
    #login,#allowAnonymous {
		  width: 100%;
		  padding: 10px;
		  background-color: ${loginColor};
		  color: #fff;
		  border: none;
		  border-radius: 5px;
		  margin-top: 0.6em;
		  cursor: pointer;
		}
    #allowAnonymous{
      background-color: ${allowAnonymousColor};
      color: black;
    }
    #login:hover{
		  background-color: ${loginHoverColor};
		}
    #allowAnonymous:hover {
      background-color: ${allowAnonymousHoverColor}
    }
`+ addionalCss
    return styles
}
/**
 * @param {string} captchaKey
 * @param {string} heading
 * @param {boolean} allowAnonymous
 * @param {((sessionToken?: {name:string, emailId:string, additionalInfo?:string})=>void) | null} callback sessionToken is undefined if anonymous button was clicked
 * @param {(()=>void) | null} callstart
 * @param {boolean|undefined} allowClassInput 
 * @returns {void}
 */
function createLoginForm(captchaKey, heading, allowAnonymous, callback, callstart, allowClassInput, logoutCallback) {
    let anonymous = false;
    grecaptcha.enterprise.ready(async () => {
        if (callstart) callstart();
        if (callback) callback()
        return;

        Bot.createBox(
            `
<div id="loginForm">
<h3 style="margin: 0">${heading}</h3>
<input type="text" id="username" class="input" name="username" placeholder="Name" autocomplete="on">
<input type="email" id="email" class="input" name="email" placeholder="Email ID" autocomplete="on">
<input style="display:none" id="otp" class="input" type="number" placeholder="6-digit OTP">
${!allowClassInput ? '' :
                `<select id="className" name="classes" class="input">
<option value="parent of a ">parent</option>
<option value="Nursery">Nursery</option>
<option value="KG 1">KG I</option>
<option value="KG 2">KG II</option>
<option value="Std 1">Std. I</option>
<option value="Std 2">Std. II</option>
<option value="Std 3">Std. III</option>
<option value="Std 4">Std. IV</option>
<option value="Std 5">Std. V</option>
<option value="Std 6">Std. VI</option>
<option value="Std 7">Std. VII</option>
<option value="Std 8">Std. VIII</option>
<option value="Std 9">Std. IX</option>
<option value="Std 10">Std. X</option>
<option value="Std 11">Std. XI</option>
<option value="Std 12">Std. XII</option>
</select>`}
<button type="button" id="login">Login</button>
${allowAnonymous ? '<button type="button" id="allowAnonymous">Guest</button>' : ""}
</div>
`,
            "bot",
            false,
        );
        const frame = Bot.iframe.contentDocument;
        frame.getElementById("username").focus();
        frame.getElementById("username").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                frame.getElementById("email").focus();
            }
        });
        frame.getElementById("email").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                frame.getElementById("login").dispatchEvent(new Event("click"));
            }
        });
        frame.getElementById("otp").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                frame.getElementById("login").dispatchEvent(new Event("click"));
            }
        });
        frame.getElementById("login").onclick = async () => {
            const name = frame.getElementById("username");
            const email = frame.getElementById("email");
            const classInput = frame.getElementById('className');
            const emailId = email.value.trim();
            if (!anonymous && (name.value.trim().length < 3 || !email.value.includes("@"))) return;
            frame
                .getElementById("loginForm")
                .removeChild(frame.getElementById("allowAnonymous"));

            let response = fetch(server + "/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: AI.clientId,
                    anonymous,
                    emailId,
                    token,
                }),
            });
            if (anonymous) {
                if (callback) callback();
                response.then((response) => {
                    if (response.status != 200)
                        Bot.createBox("Login in failed. Try again later", "bot");
                });
                return;
            }

            const loginForm = frame.getElementById("loginForm");
            loginForm.removeChild(name);
            loginForm.removeChild(email);
            if (allowClassInput) loginForm.removeChild(classInput);
            const otp = loginForm.querySelector("#otp");
            otp.style.display = "block";
            frame.querySelector("#loginForm h3").textContent = "Email sent";

            response = await response;
            if (response.status != 202) {
                Bot.createBox("Login failed! Try loggin in again later", "bot");
                return;
            }
            token = await grecaptcha.enterprise.execute(captchaKey, {
                action: "LOGIN",
            });
            frame.getElementById("login").onclick = async () => {
                if (otp.value.trim().length < 6 || otp.value.trim().length > 6) return;
                frame.getElementById("loginForm").style.display = "none";
                Bot.startWaiting();
                response = await fetch(server + "/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        id: AI.clientId,
                        OTP: parseInt(otp.value),
                        token,
                        personalData: { name: name.value.trim(), emailId, additionalInfo: allowClassInput ? `- Treat user as ${classInput.value} student` : '' },
                    }),
                });
                Bot.stopWaiting();
                frame.getElementById("loginForm").style.display = "flex";
                if (response.status == 200) {
                    Bot.activateLogout(logoutCallback)
                    frame
                        .getElementById("chat-area")
                        .removeChild(frame.getElementById("loginForm").parentNode);
                    callback({ name: name.value.trim(), emailId, additionalInfo: allowClassInput ? classInput.value : undefined });
                } else {
                    otp.value = "";
                    loginForm.querySelector("h3").textContent = "Wrong OTP, try again";
                    token = await grecaptcha.enterprise.execute(captchaKey, {
                        action: "LOGIN",
                    });
                }
            };
        };
        frame.getElementById("allowAnonymous").onclick = () => {
            anonymous = true;
            frame.getElementById("login").onclick();
            frame
                .getElementById("chat-area")
                .removeChild(frame.getElementById("loginForm").parentNode);
        };
    });
}
