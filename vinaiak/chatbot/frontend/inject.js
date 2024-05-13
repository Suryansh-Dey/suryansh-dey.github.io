class AI {
    static replyNo = 0
    answer(text) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                AI.replyNo++
                resolve("The backend is under development. This is a hard coded reply. Reply number = " + AI.replyNo)
            }, 1000)
        })
    }
}
class Bot {
    static exists = false
    static replying = false
    static ai = new AI()
    static botIframe
    static openFrame() {
        Bot.botIframe.style.animation = "frame-opening 0.5s ease-out"
        Bot.botIframe.style.display = 'block'
        Bot.botIframe.contentDocument.getElementById('text-input').focus()
        console.log("opened frame")
    }
    static closeFrameListener() {
        Bot.botIframe.style.display = 'none'
        Bot.botIframe.removeEventListener('animationend', Bot.closeFrameListener)
        console.log("closed frame")
    }
    static closeFrame() {
        Bot.botIframe.addEventListener('animationend', Bot.closeFrameListener)
        Bot.botIframe.style.animation = "frame-closing 0.3s ease-out"
    }
    static generateFrameAnimation() {
        let width = (window.innerHeight > window.innerWidth ? window.innerWidth * 0.95 : window.innerWidth * 0.40)
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
        Bot.botIframe.style.width = (window.innerHeight > window.innerWidth ? "95dvw" : "40dvw")
        document.getElementById('frame-animation').textContent = Bot.generateFrameAnimation()
    }
    constructor(backgroundImg, placeholder, avtarPath) {
        if (Bot.exists)
            throw new Error("Invalid call to Bot.constructor(). Instance of singleton-class Bot already exists")
        Bot.exists = true
        let frameStyles = document.createElement('style')
        frameStyles.id = "frame-animation"
        frameStyles.textContent = Bot.generateFrameAnimation()
        document.head.appendChild(frameStyles)
        Bot.botIframe = document.createElement('iframe')
        Bot.botIframe.title = "chat bot frame"
        Bot.botIframe.src = "../../../chatbot/frontend/inject.html"
        Bot.botIframe.id = 'bot-iframe'
        Bot.botIframe.style.position = "fixed"
        Bot.botIframe.style.bottom = 0
        Bot.botIframe.style.right = 0
        Bot.botIframe.style.width = 0
        Bot.botIframe.style.height = "95dvh"
        Bot.botIframe.style.overflow = "hidden"
        Bot.botIframe.style.border = "none"
        Bot.botIframe.style.borderRadius = "10px"
        Bot.botIframe.onload = () => {
            Bot.botIframe.contentDocument.getElementById('background-img').src = backgroundImg
            Bot.botIframe.contentDocument.getElementById('text-input').placeholder = placeholder
            Bot.botIframe.contentDocument.getElementById('close').addEventListener('click', Bot.closeFrame)
            Bot.botIframe.contentDocument.getElementById('send').addEventListener('click', Bot.reply)
            Bot.botIframe.contentDocument.getElementById('text-input').addEventListener('keydown', (event) => {
                if (event.key == 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    Bot.reply()
                }
            })
            let avtarUrl = document.createElement('style')
            avtarUrl.textContent = `
            .avtar {
                background-image: url(${avtarPath})
            }
            `
            Bot.botIframe.contentDocument.head.appendChild(avtarUrl)
            Bot.createWaiting()
            Bot.botIframe.style.width = (window.innerHeight > window.innerWidth ? "95dvw" : "40dvw")
            Bot.openFrame()
            window.addEventListener('resize', Bot.resizeIframe)
        }
        document.body.appendChild(Bot.botIframe)
    }
    static destructor() {
        if (!Bot.exists)
            throw new Error("Invalid call to Bot.destructor(). Bot already doesn't exist")
        Bot.botIframe.parentNode.removeChild(Bot.botIframe)
        Bot.exists = false
    }
    static createBox(text, type) {
        let box = document.createElement('div')
        box.className = 'box ' + type
        box.textContent = text
        Bot.botIframe.contentDocument.getElementById('chat-area').appendChild(box)
        Bot.botIframe.contentDocument.getElementById('chat-area').scrollTo({
            top: Bot.botIframe.contentDocument.getElementById('chat-area').scrollHeight,
            behavior: 'smooth'
        })
    }
    static async reply() {
        if (Bot.replying) return
        Bot.replying = true
        let inputText = Bot.botIframe.contentDocument.getElementById('text-input').value
        if (!inputText) return
        Bot.createBox(inputText, 'user')
        Bot.botIframe.contentDocument.getElementById('text-input').value = ''
        Bot.createAvtar()
        Bot.startWaiting()
        let replyText = await Bot.ai.answer()
        Bot.createBox(replyText, 'bot')
        Bot.stopWaiting()
        Bot.replying = false
        console.log("replied")
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
        Bot.botIframe.contentDocument.getElementById('chat-area').appendChild(waitingBox)
    }
    static startWaiting() {
        let waiting = Bot.botIframe.contentDocument.querySelector('.box.bot.waiting')
        waiting.parentNode.removeChild(waiting)
        waiting.style.display = 'flex'
        Bot.botIframe.contentDocument.getElementById('chat-area').appendChild(waiting)
        Bot.botIframe.contentDocument.getElementById('chat-area').scrollTo({
            top: Bot.botIframe.contentDocument.getElementById('chat-area').scrollHeight,
            behavior: 'smooth'
        })
    }
    static stopWaiting() {
        Bot.botIframe.contentDocument.querySelector('.box.bot.waiting').style.display = 'none'
    }
    static createAvtar() {
        let avtar = document.createElement('div')
        avtar.className = 'avtar bot'
        let emptyBox = document.createElement('div')
        emptyBox.style.width = '2rem'
        emptyBox.style.height = '2rem'
        avtar.appendChild(emptyBox)
        Bot.botIframe.contentDocument.getElementById('chat-area').appendChild(avtar)
    }
}