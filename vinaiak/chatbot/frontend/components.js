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
    #login {
		  width: 100%;
		  padding: 10px;
		  background-color: #ff9029;
		  color: #fff;
		  border: none;
		  border-radius: 5px;
		  margin-top: 0.6em;
		  cursor: pointer;
		}
    #login:hover {
		  background-color: #fead61;
		}
`;
/**
 * @param {string} heading
 * @param {boolean} anonymous
 * @param {Function} callback
 * @returns {void}
 */
function createLoginForm(heading, anonymous, callback, callstart) {
  grecaptcha.enterprise.ready(async () => {
    let token = await grecaptcha.enterprise.execute(captchaKey, {
      action: "LOGIN",
    });
    const response = await fetch(server + "/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        id: AI.clientId,
        token,
        personalData: { name: "suryansh", emailid: "deysuryansh@gmail.com" },
      }),
    });
    if (callstart) callstart();
    const result = await response.text();
    if (result == "Ok") {
      if (callback) callback();
      return;
    }

    Bot.createBox(
      `
<div id="loginForm">
<h3 style="margin: 0">${heading}</h3>
<input type="text" id="username" name="username" placeholder="Name" autocomplete="on">
<input type="email" id="email" name="email" placeholder="Email ID" autocomplete="on">
<button type="button" id="login">Login</button>
</div>,
`,
      "bot",
      true,
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
    frame.getElementById("login").onclick = async () => {
      const name = frame.getElementById("username");
      const email = frame.getElementById("email");
      const emailId = email.value.trim();
      if (name.value.trim().length < 3 || !email.value.includes("@")) return;
      name.parentNode.removeChild(name);
      email.type = "number";
      email.name = "OTP";
      email.placeholder = "OTP";
      email.value = "";
      frame.querySelector("#loginForm h3").textContent = "Email sent";

      let response = await fetch(server + "/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: AI.clientId,
          emailId,
          token,
        }),
      });
      if (response.status != 200) {
        Bot.createBox("Login failed! Try loggin in again later", "bot");
        return;
      }
    token = await grecaptcha.enterprise.execute(captchaKey, {
      action: "LOGIN",
    });
      frame.getElementById("login").onclick = async () => {
        response = await fetch(server + "/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({
            id: AI.clientId,
            OTP: parseInt(email.value),
            token,
            personalData: { name: name.value.trim(), emailId },
          }),
        });
        if (response.status == 200 && "OK" == (await response.text())) {
          frame
            .getElementById("chat-area")
            .removeChild(frame.getElementById("chat-area").lastChild);
          callback()
        } else {
          email.value = "";
          email.placeholder = "Wrong OTP, try again";
        }
      };
    };
  });
}
