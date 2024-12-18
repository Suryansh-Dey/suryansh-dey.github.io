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
const loginFormCss = `
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
    #login,#allowAnonymous {
		  width: 100%;
		  padding: 10px;
		  background-color: #ff9029;
		  color: #fff;
		  border: none;
		  border-radius: 5px;
		  margin-top: 0.6em;
		  cursor: pointer;
		}
    #allowAnonymous{
      background-color: #ffcc00;
      color: black;
    }
    #login:hover{
		  background-color: #fead61;
		}
    #allowAnonymous:hover {
      background-color: #ffdd00
    }
`;
/**
 * @param {string} captchaKey
 * @param {string} heading
 * @param {boolean} allowAnonymous
 * @param {((sessionToken?: {name:string, emailId:string})=>void) | null} callback
 * @param {(()=>void) | null} callstart
 * @returns {void}
 */
function createLoginForm(
  captchaKey,
  heading,
  allowAnonymous,
  callback,
  callstart,
) {
  let anonymous = false;
  grecaptcha.enterprise.ready(async () => {
    let token = await grecaptcha.enterprise.execute(captchaKey, {
      action: "LOGIN",
    });
    const response = await fetch(server + "/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id: AI.clientId,
        token,
      }),
    });
    if (callstart) callstart();
    if (response.status === 200) {
      if (callback) callback(await response.json());
      return;
    }

    Bot.createBox(
      `
<div id="loginForm">
<h3 style="margin: 0">${heading}</h3>
<input type="text" id="username" name="username" placeholder="Name" autocomplete="on">
<input type="email" id="email" name="email" placeholder="Email ID" autocomplete="on">
<input style="display:none" id="otp" type="number" placeholder="OTP">
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
      frame
        .getElementById("loginForm")
        .removeChild(frame.getElementById("allowAnonymous"));

      const name = frame.getElementById("username");
      const email = frame.getElementById("email");
      const emailId = email.value.trim();
      if (
        !anonymous &&
        (name.value.trim().length < 3 || !email.value.includes("@"))
      )
        return;
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
            personalData: { name: name.value.trim(), emailId },
          }),
        });
        Bot.stopWaiting();
        frame.getElementById("loginForm").style.display = "flex";
        if (response.status == 200) {
          frame
            .getElementById("chat-area")
            .removeChild(frame.getElementById("loginForm").parentNode);
          callback({ name: name.value.trim(), emailId });
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
