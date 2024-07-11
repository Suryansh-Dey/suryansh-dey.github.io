import { quickAccesses, mcq } from './mcqs.js';
const captchaKey = '6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v'

let injectjs = document.createElement('script')
injectjs.src = "https://suryansh-dey.github.io/vinaiak/chatbot/frontend/inject.js"
document.body.appendChild(injectjs)
let captchaScript = document.createElement('script')
captchaScript.src = "https://www.google.com/recaptcha/enterprise.js?render=" + captchaKey
captchaScript.id = 'captcha'
document.body.appendChild(captchaScript)
document.head.innerHTML += '<link rel="stylesheet" href="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/styles.css">'
document.body.innerHTML += '\
        <div id="bot-loginIcon">\
            <img src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/bot.png" alt="Login Icon" onclick="initBot()">\
			<div id="bot-popup">Hi! I\'m your assistant</div>\
        </div>\
'
setTimeout(() => {
	document.getElementById('bot-popup').style.display = 'block'
}, 1000)

window.initBot = () => {
	if (Bot.exists) {
		Bot.openFrame()
		return
	}
	document.getElementById('bot-popup').style.display = 'none'
	let customCss = document.createElement('style')
	customCss.textContent = `
	#loginForm{
		display: flex;
		flex-direction: column;
		align-items: center;
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
	  }`
	new Bot(1,
		"Ask me about BIT Mesra",
		"BIT Admission Assistant",
		"https://yt3.ggpht.com/a/AATXAJwOzthsWc__jFGypZvbWTdrVKBNCsMIv-Y6ofuk=s900-c-k-c0xffffffff-no-rj-mo",
		quickAccesses,
		() => {
			window.addEventListener('beforeunload', AI.quit)
			Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'none'
			Bot.iframe.contentDocument.getElementById('text-input').style.display = 'none'
			Bot.iframe.contentDocument.getElementById('send').style.display = 'none'
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
					if (event.key === 'Enter') {
						event.preventDefault()
						Bot.iframe.contentDocument.getElementById('email').focus()
					}
				})
				Bot.iframe.contentDocument.getElementById('email').addEventListener('keydown', (event) => {
					if (event.key === 'Enter') {
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
					Bot.reply(`Hi ${name}! Which program are you intrested in?`)
					Bot.createMcq(mcq)
				})
			}, 1000)
			Bot.customiseCss(customCss)
			Bot.iframe.contentDocument.getElementById('chat-area').addEventListener('scrollend', AI.keepAlive)
			Bot.iframe.style.zIndex = 101
		}
	)
	console.log("Logged in to chat bot")
}