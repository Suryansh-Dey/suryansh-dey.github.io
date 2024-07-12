const captchaKey = '6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v'

let injectjs = document.createElement('script')
injectjs.src = "../../../chatbot/frontend/inject.js"
document.body.appendChild(injectjs)
let captchaScript = document.createElement('script')
captchaScript.src = "https://www.google.com/recaptcha/enterprise.js?render=" + captchaKey
captchaScript.id = 'captcha'
document.body.appendChild(captchaScript)
document.head.innerHTML += '<link rel="stylesheet" href="styles.css">'
document.body.innerHTML += '\
        <div id="loginIcon">\
            <img src="resources/bot.png" alt="Login Icon" onclick="initBot()">\
			<div id="popup">Hi! I\'m your assistant</div>\
        </div>\
'
setTimeout(() => {
	document.getElementById('popup').style.display = 'block'
}, 1000)

window.initBot = () => {
	if (Bot.exists) {
		Bot.openFrame()
		return
	}
	document.getElementById('popup').style.display = 'none'
	let customCss = document.createElement('style')
	customCss.textContent = `
	#loginForm{
		display: flex;
		flex-direction: column;
		align-items: center;
		color: white
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
		background-color: rgb(50, 50, 255);
		color: #fff;
		border: none;
		border-radius: 5px;
		margin-top: 0.6em;
		cursor: pointer;
	  }
	button[type="button"]:hover {
		background-color: #blue;
	  }
	#heading {
	background-color: rgb(0, 0, 150);
	}
	a {
	color: yellow}
	.box{
	color: white
	}
	.box.bot {
	background-color: blue;
	border: 2dvh solid blue;
	}
	.box.user {
	background-color: rgb(50, 50, 255);
	border: 2dvh solid rgb(50, 50, 255);
	}
	`
	new Bot(3,
		"Ask me about Aventum",
		"Aventum Admission Assistant",
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuez9j5jliXTLKpWHADI8-BQSYZk_VIqgWvw&s",
		{},
		() => {
			window.addEventListener('beforeunload', AI.quit)
			Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'none'
			Bot.iframe.contentDocument.getElementById('text-input').style.display = 'none'
			Bot.iframe.contentDocument.getElementById('send').style.display = 'none'
			Bot.iframe.style.zIndex = 10
			Bot.startWaiting()
			setTimeout(() => {
				Bot.stopWaiting()
				Bot.createBox('<div id="loginForm">\
					<h3 style="margin: 0">Introduce yourself</h3>\
					<input type="text" id="username" name="username" placeholder="Name" autocomplete="on">\
					<input type="email" id="email" name="email" placeholder="Email ID" autocomplete="on">\
					<button type="button" id="submit">Submit</button>\
					</div>', 'bot', false)
				Bot.iframe.contentDocument.getElementById('username').focus()
				Bot.iframe.contentDocument.getElementById('username').addEventListener('keydown', (event) => {
					if (event.key === 'Enter'){
						event.preventDefault()
						Bot.iframe.contentDocument.getElementById('email').focus()
					}
				})
				Bot.iframe.contentDocument.getElementById('email').addEventListener('keydown', (event) => {
					if (event.key === 'Enter'){
						event.preventDefault()
						Bot.iframe.contentDocument.getElementById('submit').dispatchEvent(new Event('click'))
					}
				})
				Bot.iframe.contentDocument.getElementById('submit').addEventListener('click', (event) => {
					event.preventDefault()
					const xhr = new XMLHttpRequest()
					grecaptcha.enterprise.ready(async () => {
						const token = await grecaptcha.enterprise.execute(captchaKey, { action: 'LOGIN' })
						xhr.open('POST', server + '/verify', false)
						xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
						xhr.send(JSON.stringify({ id: AI.clientId, token: token }))
						if (xhr.status != 200)
							Bot.reply('Tum ek insaan nhi bn paye. Orders ka paln kr kr ke ek machine bn gye ho!')
					})
					const name = Bot.iframe.contentDocument.getElementById('username').value
					Bot.iframe.contentDocument.getElementById('chat-area').removeChild(Bot.iframe.contentDocument.getElementById('chat-area').lastChild)
					AI.setContext([])
					Bot.reply(`Hi ${name}! what would you like to know about us?`)
					Bot.iframe.contentDocument.getElementById('text-input').style.display = 'block'
					Bot.iframe.contentDocument.getElementById('send').style.display = 'block'
					Bot.iframe.contentDocument.getElementById('text-input').focus()
				})
			}, 1000)
			Bot.customiseCss(customCss)
			Bot.iframe.contentDocument.getElementById('chat-area').addEventListener('scrollend', AI.keepAlive)
		}
	)
	console.log("Logged in to chat bot")
}