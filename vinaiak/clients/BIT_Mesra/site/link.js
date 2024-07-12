let quickAccesses, mcq
import('https://suryansh-dey.github.io/vinaiak/clients/BIT_Mesra/site/mcqs.js').then((module) => {
  quickAccesses = module.quickAccesses
  mcq = module.mcq
})

const server = "https://vinaiak.ddns.net"
const xhr = new XMLHttpRequest()

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
class AI {
  static replyNo = 0
  static clientId
  static context = ''
  static keepAliveXhr
  constructor(organisationId) {
    AI.keepAliveXhr = new XMLHttpRequest()
    xhr.open('POST', server + '/login', false)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(JSON.stringify({ orgId: organisationId }))
    AI.clientId = xhr.responseText
    if (xhr.status != 200)
      throw Error("Server refused to login")
  }
  static setContext(context) {
    if (AI.context != '' && !arraysEqual(AI.context, context)) {
      xhr.open('POST', server + '/forget', true)
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
      xhr.send(JSON.stringify({ id: AI.clientId }))
    }
    AI.context = context
  }
  static answer(query) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('POST', server + `/ask`, true)
      xhr.onload = () => {
        if (xhr.status == 200)
          resolve(JSON.parse(xhr.responseText).content)
        else resolve("An error occured! Try logging in again to the chatbot")
      }
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
      xhr.send(JSON.stringify({ id: AI.clientId, query: query, context: AI.context }))
    })
  }
  static remember(query, reply) {
    xhr.open('POST', `${server}/remember`, true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(JSON.stringify({ query: query, reply: reply, id: AI.clientId }))
  }
  static keepAlive() {
    AI.keepAliveXhr.open('POST', server + '/keepAlive', true)
    AI.keepAliveXhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    AI.keepAliveXhr.send(JSON.stringify({ id: AI.clientId }))
  }
  static quit() {
    xhr.open('POST', server + '/quit', true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.send(JSON.stringify({ id: AI.clientId }))
  }
}
class Bot {
  static landscapeWidth = 35
  static mobileWidth = 100
  static height = 98
  static exists = false
  static replying = false
  static iframe
  static optionsCallBacks = {}
  static queue = []
  static hideFrame() {
    Bot.iframe.style.display = 'none'
    Bot.iframe.removeEventListener('animationend', Bot.hideFrame)
  }
  static closeFrame() {
    Bot.iframe.addEventListener('animationend', Bot.hideFrame)
    Bot.iframe.style.animation = "frame-closing 0.3s ease-out"
  }
  static generateFrameAnimation() {
    let width = (window.innerHeight > window.innerWidth ? window.innerWidth * Bot.mobileWidth / 100 : window.innerWidth * Bot.landscapeWidth / 100)
    return `
        @keyframes frame-opening {
            0%{
                right: -${width}px;
            }
            100%{
              right: 0;
            }
          }
        @keyframes frame-closing {
            100%{
              right: -${width}px;
            }
          }
        `
  }
  static resizeIframe() {
    Bot.iframe.style.width = (window.innerHeight > window.innerWidth ? Bot.mobileWidth : Bot.landscapeWidth) + 'dvw'
    document.getElementById('frame-animation').textContent = Bot.generateFrameAnimation()
  }
  static createWaiting() {
    let waitingBox = document.createElement('div')
    waitingBox.className = 'box bot waiting'
    waitingBox.style.display = 'none'
    for (let i = 0; i < 3; i++) {
      let dot = document.createElement('div')
      dot.className = 'dot'
      dot.textContent = '.'
      waitingBox.appendChild(dot)
    }
    Bot.iframe.contentDocument.getElementById('chat-area').appendChild(waitingBox)
  }
  static startWaiting() {
    let waiting = Bot.iframe.contentDocument.querySelector('.box.bot.waiting')
    waiting.parentNode.removeChild(waiting)
    waiting.style.display = 'flex'
    Bot.iframe.contentDocument.getElementById('chat-area').appendChild(waiting)
    Bot.iframe.contentDocument.getElementById('chat-area').scrollTo({
      top: Bot.iframe.contentDocument.getElementById('chat-area').scrollHeight,
      behavior: 'smooth'
    })
    Bot.replying = true
  }
  static stopWaiting() {
    Bot.iframe.contentDocument.querySelector('.box.bot.waiting').style.display = 'none'
    Bot.replying = false
  }
  static createAvtar() {
    let avtar = document.createElement('img')
    avtar.src = Bot.avtarPath
    avtar.className = 'avtar bot'
    avtar.style.width = '2rem'
    avtar.style.height = '2rem'
    Bot.iframe.contentDocument.getElementById('chat-area').appendChild(avtar)
  }
  static wrapLinks(text) {
    text = text.replace(/(?<!http:\/\/|https:\/\/)www\./g, 'https://www.')
    const fileTag = {
      "png": [`<img src="`, `" alt="pta chla ki galat leke main pta nikla" class="media" onclick="window.open(this.src, '_blank')">`],
      "jpg": [`<img src="`, `" alt="pta chla ki galat leke main pta nikla" class="media" onclick="window.open(this.src, '_blank')">`],
      "mp4": ['<video autoplay muted controls class="media"><source src="', '" type="video/mp4">\
            pta chla ki galat leke main pta nikla.\
        </video>']
    }
    let trigger = "https://"
    let matchedCount = 0
    for (let i = 0; i < text.length; i++) {
      if (text[i].toLowerCase() == trigger[matchedCount])
        matchedCount++
      else if (trigger[matchedCount] == 's') {
        matchedCount++
        i--
        continue
      }
      else matchedCount = 0
      if (matchedCount == trigger.length) {
        let start = i - trigger.length + 1 + (text[i - 3] != 's')
        let fileExtension
        let got1stBracket = 0, got2ndBracket = 0
        for (; i < text.length && !(text[i] === ' ' || text[i] === '"' || text[i] === '\n' || text[i] === '\r' || text[i] === ',' || (text[i] == '.' && text[i + 1] == ' ') || (!got1stBracket && text[i] == ')') || (!got2ndBracket && text[i] == ']')); i++) {
          got1stBracket += '(' === text[i]
          got2ndBracket += '[' === text[i]
          got1stBracket -= ')' === text[i]
          got2ndBracket -= ']' === text[i]
          if (text[i] == '.') fileExtension = ''
          else fileExtension += text[i]
        }
        let link = text.slice(start, i)
        let remaining = text.length - i
        if (link[link.length - 1] == '.')
          link = link.slice(0, -1)
        if (fileTag.hasOwnProperty(fileExtension.toLowerCase()))
          text = text.slice(0, start) + fileTag[fileExtension][0] + link + fileTag[fileExtension][1] + text.slice(i)
        else text = text.slice(0, start) + `<a href="${link}" target="_blank">click here</a>` + text.slice(i)
        i = text.length - remaining - 1
      }
    }
    return text
  }
  static createBox(text, type, format, callBack) {
    if (Bot.replying) {
      Bot.queue.push({ text: text, type: type, format: format, callBack: callBack })
      return
    }
    const chats = Bot.iframe.contentDocument.getElementById('chat-area').children
    if (type == 'bot' && chats.length > 1 && (chats[chats.length - 1].className == 'box user' ||
      (chats[chats.length - 1].className == 'box bot waiting' && chats[chats.length - 2].className == 'box user')
    ))
      Bot.createAvtar()
    let box = document.createElement('div')
    box.className = 'box ' + type
    box.innerHTML = (type == 'bot' && format == undefined) || format ? Bot.wrapLinks(text).replace(/^- /gm, '<div style="font-weight:bold;font-size:larger; display:inline">• </div>').
      replace(/^\d+\.\s/gm, (match) => {
        return `<div style="font-weight:bold;display:inline">${match}</div>`
      }).
      replace(/\n/g, "<br>") : text
    Bot.iframe.contentDocument.getElementById('chat-area').appendChild(box)
    Bot.iframe.contentDocument.getElementById('chat-area').scrollTo({
      top: Bot.iframe.contentDocument.getElementById('chat-area').scrollHeight,
      behavior: 'smooth'
    })
    if (callBack != undefined)
      callBack()
    if (Bot.queue.length) {
      const { text, type, format, callBack } = Bot.queue[0]
      Bot.queue.shift()
      this.createBox(text, type, format, callBack)
    }
  }
  static createOptions(options, containerClassId, optionClassName) {
    if (!Bot.optionsCallBacks.hasOwnProperty(containerClassId))
      Bot.optionsCallBacks[containerClassId] = [() => {
        let creator = Bot.optionsCallBacks[containerClassId][0]
        Bot.optionsCallBacks[containerClassId] = [creator]
        Bot.iframe.contentDocument.getElementById(containerClassId).parentNode.replaceChild(this.createOptions(options, containerClassId, optionClassName), Bot.iframe.contentDocument.getElementById(containerClassId))
      }]
    let optionContainer = document.createElement('div')
    optionContainer.id = containerClassId
    if (this.optionsCallBacks[containerClassId].length > 1) {
      let back = document.createElement('button')
      back.className = 'option navigator'
      back.textContent = '\u2190'
      back.title = 'previous menu'
      back.addEventListener('click', async () => {
        Bot.optionsCallBacks[containerClassId].pop()
        await Bot.optionsCallBacks[containerClassId][Bot.optionsCallBacks[containerClassId].length - 1]()
      })
      optionContainer.appendChild(back)
    }
    if (this.optionsCallBacks[containerClassId].length > 2) {
      let exit = document.createElement('button')
      exit.className = 'option navigator'
      exit.textContent = '×'
      exit.title = 'start menu'
      exit.addEventListener('click', Bot.optionsCallBacks[containerClassId][0])
      optionContainer.appendChild(exit)
    }
    let optionNames = Object.keys(options)
    for (let optionName of optionNames) {
      let option = document.createElement('button')
      option.className = optionClassName
      option.textContent = optionName
      if (options[optionName]['id'])
        option.id = options[optionName]['id']
      option.addEventListener('click', async () => {
        if (!options[optionName]['skipBack'])
          Bot.optionsCallBacks[containerClassId].push(options[optionName]['callBack'])
        await options[optionName]['callBack']()
      })
      optionContainer.appendChild(option)
    }
    return optionContainer
  }
  constructor(organisationId, placeholder, title, avtarPath, quickAccesses, onload) {
    if (Bot.exists)
      throw new Error("Invalid call to Bot.constructor(). Instance of singleton-class Bot already exists")
    Bot.exists = true
    new AI(organisationId)
    Bot.avtarPath = avtarPath
    let frameStyles = document.createElement('style')
    frameStyles.id = "frame-animation"
    frameStyles.textContent = Bot.generateFrameAnimation()
    document.head.appendChild(frameStyles)
    Bot.iframe = document.createElement('iframe')
    Bot.iframe.title = "chat bot frame"
    Bot.iframe.id = 'bot-iframe'
    Bot.iframe.style.position = "fixed"
    Bot.iframe.style.bottom = '1dvh'
    Bot.iframe.style.right = '1px'
    Bot.iframe.style.width = 0
    Bot.iframe.style.height = Bot.height + 'dvh'
    Bot.iframe.style.overflow = "hidden"
    Bot.iframe.style.border = "none"
    Bot.iframe.style.boxShadow = "0 0 5px rgb(100,100,100)"
    Bot.iframe.style.borderRadius = "10px"
    Bot.iframe.onload = () => {
      //** inject.html **
      const iframeDoc = Bot.iframe.contentDocument || Bot.iframe.contentWindow.document;
      const htmlContent = '\
	<!DOCTYPE html>\
	<html lang="en">\
	<head>\
		<meta charset="UTF-8">\
		<meta name="viewport" content="width=device-width, initial-scale=1.0">\
		<title>chat bot</title>\
		<style>\
		main {\
  position: fixed;\
  width: 100dvw;\
  height: 100dvh;\
  background-color: white;\
}\
\
#background-img {\
  position: fixed;\
  bottom: 0;\
  left: 0;\
  height: 100dvh;\
  width: auto;\
  overflow: hidden;\
}\
\
#text-input {\
  position: fixed;\
  bottom: 3dvh;\
  left: 0.9dvw;\
  width: 90dvw;\
  height: 7dvh;\
  border-radius: 10px;\
  font-size: 3dvh;\
  resize: vertical;\
  border: 1px solid rgb(88, 88, 88);\
  animation: slideUp 0.5s ease-out;\
}\
\
#text-input::placeholder {\
  color: rgba(0, 0, 0, 0.4);\
}\
\
#text-input:focus {\
  outline: 1px solid rgb(88, 88, 88);\
}\
\
#send {\
  position: fixed;\
  bottom: 4.5dvh;\
  right: 0.5dvw;\
  height: 5dvh;\
  width: 5dvh;\
  background-color: #FFDE00;\
  border-radius: 100%;\
  border: 1px solid #F15922;\
  animation: slideUp 0.5s ease-out;\
}\
\
#send img {\
  position: absolute;\
  width: 50%;\
  height: 50%;\
  transform: translate(-60%, -60%);\
}\
\
#send:hover {\
  background-color: white;\
  transform: scale(1.1);\
}\
\
#heading {\
  position: fixed;\
  top: 3dvh;\
  left: 4dvw;\
  width: 90dvw;\
  height: 12dvh;\
  background-color: #F15922;\
  border-radius: 10px;\
  display: flex;\
  align-items: center;\
  justify-content: space-around;\
}\
\
#heading .title {\
  color: white;\
  text-align: center;\
}\
#heading .credit {\
  position: absolute;\
  color: yellow;\
  text-align: center;\
  margin: auto;\
  transform: translate(0, 1em);\
}\
#heading .credit a {\
  color: yellow;\
}\
\
#close {\
  background: transparent;\
  border: none;\
  border-radius: 100%;\
  color: white;\
  font-size: 7dvh;\
  font-weight: 1;\
}\
\
#close:hover {\
  color: rgb(89, 88, 88);\
  cursor: pointer;\
}\
\
.avtar {\
  aspect-ratio: 1;\
  height: 80%;\
  width: auto;\
  border-radius: 100%;\
  background-size: cover;\
}\
\
.avtar.bot {\
  height: 5dvh;\
  width: 5dvh;\
  background-size: cover;\
  transform: none;\
}\
\
#chat-area {\
  position: absolute;\
  top: 17dvh;\
  left: 1dvw;\
  height: 70dvh;\
  width: 98dvw;\
  overflow-y: scroll;\
  display: flex;\
  flex-direction: column;\
}\
\
.box {\
  position: relative;\
  border-radius: 10px;\
  font-size: medium;\
  overflow-wrap: break-word;\
  margin-bottom: 1dvh;\
  max-width: 80dvw;\
}\
\
.box:last-child {\
  margin-bottom: 20dvh;\
}\
\
.box.user {\
  align-self: flex-end;\
  background-color: #f9a23f;\
  border: 2dvw solid #f9a23f;\
  border-top-right-radius: 0;\
}\
\
.box.bot {\
  align-self: flex-start;\
  background-color: #EF8812;\
  border: 2dvw solid #EF8812;\
  margin-left: 2dvh;\
  border-top-left-radius: 0;\
  animation: largerFont 0.3s ease-out;\
}\
\
.box.bot.waiting {\
  display: flex;\
  align-items: center;\
  justify-content: center;\
}\
\
.dot {\
  width: 0.5rem;\
  font-size: large;\
  animation: wavyAnimation 1.5s infinite ease-in-out;\
}\
\
@keyframes wavyAnimation {\
  0% {\
    transform: translateY(0);\
  }\
\
  50% {\
    transform: translateY(-10px);\
  }\
\
  100% {\
    transform: translateY(0);\
  }\
}\
\
.dot:nth-child(2) {\
  animation-delay: 0.2s;\
}\
\
.dot:nth-child(3) {\
  animation-delay: 0.4s;\
}\
\
#quick-access {\
  position: fixed;\
  bottom: 11.5dvh;\
  left: 0;\
  display: flex;\
  flex-wrap: wrap;\
  animation: slideRight 0.5s ease-out;\
}\
\
#mcq {\
  position: relative;\
  display: flex;\
  flex-wrap: wrap;\
  margin-bottom: 2em;\
  animation: slideRight 0.5s ease-out;\
}\
\
.option {\
  font-size: 1.3em;\
  margin: 1dvh;\
  background-color: #fead61;\
  border-radius: 10px;\
  border: none;\
  animation: comeOut 0.4s ease-out;\
}\
\
.option:hover {\
  background-color: #ff9029;\
}\
\
@keyframes slideUp {\
  0% {\
    bottom: -10dvh;\
    color: rgba(0, 0, 0, 0);\
  }\
}\
\
@keyframes slideRight {\
  0% {\
    left: -20dvh;\
  }\
\
  100% {\
    left: 0;\
  }\
}\
\
@keyframes comeOut {\
  0% {\
    color: #f9a23f00;\
  }\
}\
\
@keyframes smallerFont {\
  100% {\
    font-size: 0;\
  }\
}\
\
@keyframes largerFont {\
  0% {\
    font-size: 0;\
  }\
}\
\
.option.navigator {\
  animation: none;\
  position: absolute;\
  bottom: -1.4em;\
  height: 1.3em;\
}\
\
#quick-access .option.navigator {\
  top: -1.4em;\
}\
\
.option.navigator:nth-child(2) {\
  left: 2em;\
}\
\
.media {\
  width: 100%;\
  height: auto;\
  cursor: pointer;\
}</style>\
	</head>\
	<body>\
		<main>\
			<img src="" alt="pta chla ki galat le ke main pta nikla" id="background-img" />\
			<div id="heading">\
				<img class="avtar"></img>\
				<div class="title"></div> \
				<button id="close">×</button>\
				<div class="credit">powered by <a href="" target="_blank">vinAIak</a></div>\
			</div>\
			<div id="chat-area"></div>\
			<textarea id="text-input"></textarea>\
			<button id="send">\
				<img src="https://suryansh-dey.github.io/vinaiak/chatbot/frontend/resources/send.svg" alt="pta chla ki galat le ke main pta nikla">\
			</button>\
		</main>\
	</body>\
	</html>\
	'
      iframeDoc.open()
      iframeDoc.write(htmlContent)
      iframeDoc.close()
      //** inject.html end **
      Bot.iframe.contentDocument.getElementById('background-img').src = "https://suryansh-dey.github.io/vinaiak/chatbot/frontend/resources/doodle.svg"
      Bot.iframe.contentDocument.getElementById('text-input').placeholder = placeholder
      Bot.iframe.contentDocument.querySelector('#heading .title').innerHTML = title
      Bot.iframe.contentDocument.querySelector('#heading .credit a').href = server
      Bot.iframe.contentDocument.getElementById('close').addEventListener('click', Bot.closeFrame)
      Bot.iframe.contentDocument.getElementById('send').addEventListener('click', (event) => {
        event.preventDefault()
        Bot.reply()
      })
      Bot.iframe.contentDocument.getElementById('text-input').addEventListener('keydown', (event) => {
        if (event.key == 'Enter' && !event.shiftKey) {
          event.preventDefault()
          Bot.reply()
        }
      })
      Bot.iframe.contentDocument.querySelector('#heading .avtar').src = avtarPath
      Bot.iframe.contentDocument.querySelector('main').appendChild(Bot.createOptions(quickAccesses, 'quick-access', 'option'))
      Bot.createWaiting()
      Bot.iframe.style.width = (window.innerHeight > window.innerWidth ? Bot.mobileWidth : Bot.landscapeWidth) + 'dvw'
      Bot.openFrame()
      window.addEventListener('resize', Bot.resizeIframe)
      onload(Bot.iframe)
    }
    document.body.appendChild(Bot.iframe)
  }
  static destructor() {
    if (!Bot.exists)
      throw new Error("Invalid call to Bot.destructor(). Bot already doesn't exist")
    Bot.iframe.parentNode.removeChild(Bot.iframe)
    Bot.exists = false
  }
  //public
  static openFrame() {
    Bot.iframe.style.animation = "frame-opening 0.5s ease-out"
    Bot.iframe.style.display = 'block'
    Bot.iframe.contentDocument.getElementById('text-input').focus()
  }
  static updateQuickAccess(options) {
    Bot.iframe.contentDocument.querySelector('main').replaceChild(Bot.createOptions(options, 'quick-access', 'option'), Bot.iframe.contentDocument.getElementById('quick-access'))
  }
  static resetQuickAccess() {
    Bot.optionsCallBacks['quick-access'][0]()
  }
  static async reply(text) {
    if (Bot.replying) {
      console.log("Bot.reply() failed. one Bot.reply() call is aready processing")
      return
    }
    let inputText
    if (!text) {
      inputText = Bot.iframe.contentDocument.getElementById('text-input').value
      if (!inputText) {
        return
      }
      Bot.iframe.contentDocument.getElementById('text-input').value = ''
      Bot.createBox(inputText, 'user')
    }
    Bot.startWaiting()
    let replyText = text || await AI.answer(inputText)
    Bot.stopWaiting()
    Bot.createBox(replyText, 'bot')
  }
  static createMcq(options) {
    Bot.iframe.contentDocument.getElementById('chat-area').appendChild(Bot.createOptions(options, 'mcq', 'option'))
  }
  static updateMcq(options) {
    Bot.iframe.contentDocument.getElementById('chat-area').replaceChild(Bot.createOptions(options, 'mcq', 'option'), Bot.iframe.contentDocument.getElementById('mcq'))
  }
  static removeMcq() {
    Bot.iframe.contentDocument.querySelector('#mcq .option').addEventListener('animationend', () => {
      Bot.iframe.contentDocument.getElementById('chat-area').removeChild(Bot.iframe.contentDocument.getElementById('mcq'))
    })
    let options = Bot.iframe.contentDocument.querySelectorAll('#mcq .option')
    for (let option of options)
      option.style.animation = "smallerFont 0.3s ease-in"
  }
  static customiseCss(css) {
    Bot.iframe.contentDocument.head.appendChild(css)
  }
}
//** inject.js end **
const captchaKey = '6LfgWgAqAAAAAAUnB69cbKEuxMVJJxDzs9lSP65v'
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
      }, 3000)
      Bot.customiseCss(customCss)
      Bot.iframe.contentDocument.getElementById('chat-area').addEventListener('scrollend', AI.keepAlive)
      Bot.iframe.style.zIndex = 101
    }
  )
  console.log("Logged in to chat bot")
}