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
const LoginFormCss = `
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
 * @returns {void}
 */
function createLoginForm(heading, anonymous) {
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute(captchaKey, {
      action: "LOGIN",
    });
    const response = await fetch(server + "/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        personalData: { name: "suryansh", emailid: "deysuryansh@gmail.com" },
      }),
    });
    const result = await response.text();
    if (result == "Ok") return;

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
      const emailId = frame.getElementById("email");
      const response = await fetch(server + '/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          emailId: emailId.value,
          token
        }
      })
      const parent = name.parentNode
      parent.removeChild(name)
      parent.removeChild(emailId)
    };
  });
}
