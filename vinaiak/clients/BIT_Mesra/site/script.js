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
        <div id="bot-loginIcon" onclick="initBot()">\
            <video muted class="popup"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/namaste.mp4" type="video/mp4">AI assistants</video>\
            <video muted class="looking" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/Looking_Around.mp4" type="video/mp4">AI assistants</video>\
            <video muted class="jump" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/Jump.mp4" type="video/mp4">AI assistants</video>\
            <video muted class="hover" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/onHover.mp4" type="video/mp4">AI assistants</video>\
            <video muted class="click" style="display:none"><source src="https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/onClick.mp4" type="video/mp4">AI assistants</video>\
			<img src="https://yt3.ggpht.com/a/AATXAJwOzthsWc__jFGypZvbWTdrVKBNCsMIv-Y6ofuk=s900-c-k-c0xffffffff-no-rj-mo">\
        </div>\
'
const loginIcon = document.getElementById("bot-loginIcon")
loginIcon.querySelector('img').onload = () => {
	loginIcon.querySelector('video').play()
}
let startWaiting = true
document.querySelector('#bot-loginIcon img').addEventListener('animationend', () => {
	loginIcon.removeChild(loginIcon.querySelector('img'))
	const video = loginIcon.querySelector('video')
	video.src = "https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/resources/popup.mp4"
	video.play()
	video.onended = () => { startWaiting = false }
})
setInterval(() => {
	if (startWaiting) {
		startWaiting = false
		return
	}
	if (loginIcon.querySelector('.popup'))
		loginIcon.removeChild(loginIcon.querySelector('.popup'))
	loginIcon.querySelector('.hover').style.display = "none"
	loginIcon.querySelector('.click').style.display = "none"
	let video = loginIcon.querySelector('video')
	if (Math.random() < 0.6) {
		video = loginIcon.querySelector('.looking')
		loginIcon.querySelector('.jump').style.display = "none"
	}
	else {
		video = loginIcon.querySelector('.jump')
		loginIcon.querySelector('.looking').style.display = "none"
	}
	video.style.display = "block"
	video.play()
}, 5000)
document.getElementById('bot-loginIcon').addEventListener('mouseenter', () => {
	startWaiting = true
	if (loginIcon.querySelector('.popup'))
		document.getElementById('bot-loginIcon').removeChild(loginIcon.querySelector('.popup'))
	if (loginIcon.querySelector('img'))
		document.getElementById('bot-loginIcon').removeChild(loginIcon.querySelector('img'))
	loginIcon.querySelector('.looking').style.display = "none"
	loginIcon.querySelector('.jump').style.display = "none"
	loginIcon.querySelector('.hover').style.display = "block"
	loginIcon.querySelector('.hover').play()
})
document.getElementById('bot-loginIcon').addEventListener('mouseleave', () => {
	startWaiting = false
})

window.initBot = () => {
	startWaiting = true
	const onClick = loginIcon.querySelector('.click')
	onClick.style.display = 'block'
	onClick.play()
	onClick.onended = () => {
		onClick.style.display = 'none'
		startWaiting = false
	}
	if (Bot.exists) {
		setTimeout(() => {
			Bot.openFrame()
			setTimeout(() => { document.getElementById('bot-loginIcon').style.display = 'none' }, 400)
		}, 600)
		return
	}
	else {
		setTimeout(() => {
			Bot.openFrame()
			document.getElementById('bot-loginIcon').style.display = 'none'
		}, 2000)
	}
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
			Bot.hideFrame()
			window.addEventListener('beforeunload', AI.quit)
			Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'none'
			Bot.iframe.contentDocument.getElementById('text-input').style.display = 'none'
			Bot.iframe.contentDocument.getElementById('send').style.display = 'none'
			Bot.iframe.contentDocument.getElementById('close').addEventListener('click', () => {
				document.getElementById('bot-loginIcon').style.display = 'block'
			})
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
					const name = Bot.iframe.contentDocument.getElementById('username').value
					const xhr = new XMLHttpRequest()
					grecaptcha.enterprise.ready(async () => {
						const token = await grecaptcha.enterprise.execute(captchaKey, { action: 'LOGIN' })
						xhr.open('POST', server + '/verify', true)
						xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
						xhr.onload = () => {
							if (xhr.status != 200) {
								Bot.reply('Tum ek insaan nhi bn paye. Smaaj ka blueprint follow kr kr ek machine bn gye ho!')
								return
							}
							xhr.open('POST', server + '/commonData', true)
							xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
							xhr.onload = null
							xhr.send(JSON.stringify({ id: AI.clientId, data: 'name ' + name }))
						}
						xhr.send(JSON.stringify({ id: AI.clientId, token: token }))
					})
					Bot.iframe.contentDocument.getElementById('chat-area').removeChild(Bot.iframe.contentDocument.getElementById('chat-area').lastChild)
					Bot.reply(`Hi ${name}! Which program are you intrested in?`)
					Bot.createMcq(mcq)
				})
			}, 3000)
			Bot.customiseCss(customCss)
			Bot.iframe.contentDocument.getElementById('chat-area').addEventListener('scrollend', AI.keepAlive)
			Bot.iframe.style.zIndex = 101
		}
	)
	console.log("Logged in to chat bot")
}