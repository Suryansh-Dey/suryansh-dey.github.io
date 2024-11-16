export const mcq = {
    "Roadmap": {
        "callBack": () => {
            Bot.removeMcq()
            Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
        }
    },
    "Job Opportunities": {
        "callBack": () => {
            Bot.removeMcq()
            Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
        }
    },
    "Skills Required": {
        "callBack": () => {
            Bot.removeMcq()
            Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
        }
    },
    "Expected Pay": {
        "callBack": () => {
            Bot.removeMcq()
            Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
        }
    }
}
export const quickAccesses = {
    "quick access": {
        "callBack": () => {
            Bot.updateQuickAccess({
                "Roadmap": { callBack: Bot.resetQuickAccess },
                "Job Opportunities": { callBack: Bot.resetQuickAccess },
                "Skills Required": { callBack: Bot.resetQuickAccess },
                "Expected Pay": { callBack: Bot.resetQuickAcces }
            })
        }
    }
}