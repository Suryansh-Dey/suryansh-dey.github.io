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
    static optionsCallBacks = {}
    static closeFrameListener() {
        Bot.botIframe.style.display = 'none'
        Bot.botIframe.removeEventListener('animationend', Bot.closeFrameListener)
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
    static createOptions(options, containerClassId, optionClassName) {
        if (!Bot.optionsCallBacks.hasOwnProperty(containerClassId))
            Bot.optionsCallBacks[containerClassId] = [[options, () => {
                let creator = Bot.optionsCallBacks[containerClassId][0]
                Bot.optionsCallBacks[containerClassId] = [creator]
                Bot.botIframe.contentDocument.getElementById(containerClassId).parentNode.replaceChild(this.createOptions(options, containerClassId, optionClassName), Bot.botIframe.contentDocument.getElementById(containerClassId))
            }]]
        let optionContainer = document.createElement('div')
        optionContainer.id = containerClassId
        if (this.optionsCallBacks[containerClassId].length > 1) {
            let exit = document.createElement('button')
            exit.className = 'option navigator'
            exit.innerHTML = '×'
            exit.addEventListener('click', Bot.optionsCallBacks[containerClassId][0][1])
            optionContainer.appendChild(exit)
        }
        if (this.optionsCallBacks[containerClassId].length > 2) {
            let back = document.createElement('button')
            back.className = 'option navigator'
            back.innerHTML = '&#x2190;'
            back.addEventListener('click', async () => {
                Bot.optionsCallBacks[containerClassId].pop()
                let prevCallBack = Bot.optionsCallBacks[containerClassId][Bot.optionsCallBacks[containerClassId].length - 1]
                await prevCallBack[1](prevCallBack[0])
            })
            optionContainer.appendChild(back)
        }
        let optionNames = Object.keys(options)
        for (let optionName of optionNames) {
            let option = document.createElement('button')
            option.className = optionClassName
            option.textContent = optionName
            option.addEventListener('click', async () => {
                if (!options[optionName]['skipBack'])
                    Bot.optionsCallBacks[containerClassId].push([option, options[optionName]['callBack']])
                await options[optionName]['callBack'](option)
            })
            optionContainer.appendChild(option)
        }
        return optionContainer
    }
    constructor(backgroundImg, placeholder, avtarPath, quickAccesses) {
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
            Bot.botIframe.contentDocument.querySelector('main').appendChild(Bot.createOptions(quickAccesses, 'quick-access', 'option'))
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
    //public
    static openFrame() {
        Bot.botIframe.style.animation = "frame-opening 0.5s ease-out"
        Bot.botIframe.style.display = 'block'
        Bot.botIframe.contentDocument.getElementById('text-input').focus()
    }
    static updateQuickAccess(options) {
        Bot.botIframe.contentDocument.querySelector('main').replaceChild(Bot.createOptions(options, 'quick-access', 'option'), Bot.botIframe.contentDocument.getElementById('quick-access'))
    }
    static resetQuickAccess() {
        Bot.optionsCallBacks['quick-access'][0][1]()
    }
    static async reply(text) {
        if (Bot.replying) {
            console.log("Bot.reply() failed. one Bot.reply() call is aready processing")
            return
        }
        Bot.replying = true
        if (!text) {
            let inputText = Bot.botIframe.contentDocument.getElementById('text-input').value
            if (!inputText) {
                Bot.replying = false
                return
            }
            Bot.botIframe.contentDocument.getElementById('text-input').value = ''
            Bot.createBox(inputText, 'user')
        }
        if (Bot.botIframe.contentDocument.getElementById('chat-area').children[Bot.botIframe.contentDocument.getElementById('chat-area').children.length - 1].className != 'box bot')
            Bot.createAvtar()
        Bot.startWaiting()
        let replyText = text || await Bot.ai.answer()
        Bot.createBox(replyText, 'bot')
        Bot.stopWaiting()
        Bot.replying = false
    }
}