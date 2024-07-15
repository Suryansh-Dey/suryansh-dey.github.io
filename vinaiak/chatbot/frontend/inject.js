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
    static landscapeWidth = 30
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
        if (type == 'bot' && (chats.length <= 1 || (chats[chats.length - 1].className == 'box user' ||
            (chats[chats.length - 1].className == 'box bot waiting' && chats[chats.length - 2].className == 'box user'))
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
        new AI(organisationId)
        Bot.avtarPath = avtarPath
        let frameStyles = document.createElement('style')
        frameStyles.id = "frame-animation"
        frameStyles.textContent = Bot.generateFrameAnimation()
        document.head.appendChild(frameStyles)
        Bot.iframe = document.createElement('iframe')
        Bot.iframe.title = "chat bot frame"
        //Bot.iframe.src = "../../../chatbot/frontend/inject.html"
        fetch("https://suryansh-dey.github.io/vinaiak/chatbot/frontend/inject.html").then(response => { return response.text() }).then(data => {
            Bot.iframe.contentDocument.open()
            Bot.iframe.contentDocument.write(data)
            Bot.iframe.contentDocument.close()
            Bot.exists = true
        })
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
            if(!Bot.exists) return
            Bot.iframe.contentDocument.getElementById('background-img').src = "https://suryansh-dey.github.io/vinaiak/chatbot/frontend/resources/doodle.svg"
            Bot.iframe.contentDocument.getElementById('text-input').placeholder = placeholder
            Bot.iframe.contentDocument.querySelector('#heading .title').innerHTML = title
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
            onload(Bot.iframe.contentDocument)
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