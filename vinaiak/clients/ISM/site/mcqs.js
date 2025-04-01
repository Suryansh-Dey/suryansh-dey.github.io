const xhr = new XMLHttpRequest();
function remember() {
    let children =
        Bot.iframe.contentDocument.getElementById("chat-area").children;
    AI.remember(
        children[children.length - 3].innerHTML,
        children[children.length - 1].innerHTML,
    );
}

const mcq = {
    "Active notices": {
        callBack: () => {
            Bot.createBox("Active notices", "user");
            AI.getData(["ISM Dhanbad", "Active notices"]).then(data => Bot.createBox(data))
            Bot.removeMcq();
        },
    },
    "Placements": {
        callBack: () => {
            Bot.createBox("Placements", "user");
            AI.getData(["ISM Dhanbad", "Placements"]).then(data => Bot.createBox(data, "bot", true, remember))
            Bot.removeMcq();
        },
    },
    "Research": {
        callBack: () => {
            Bot.createBox("Research", "user");
            AI.getData(["ISM Dhanbad", "Research"]).then(data => Bot.createBox(data, "bot", true, remember))
            Bot.removeMcq();
        },

    },
    "Scholarships": {
        callBack: () => {
            Bot.createBox("Scholarships", 'user')
            AI.getData(["ISM Dhanbad", "Scholarships"]).then(data => Bot.createBox(data, "bot", true, remember))
            Bot.removeMcq()
        }
    },
    "Student welfare notices and documents": {
        callBack: () => {
            Bot.createBox("Student welfare notices and documents", 'user')
            AI.getData(["ISM Dhanbad", "Student welfare notices and documents"]).then(data => Bot.createBox(data, "bot", true, remember))
            Bot.removeMcq()
        }
    }
};
const quickAccesses = {
    "quick access": {
        callBack: () => {
            Bot.updateQuickAccess({
                "Active notices": {
                    callBack: () => {
                        Bot.createBox("Active notices", "user");
                        AI.getData(["ISM Dhanbad", "Active notices"]).then(data => Bot.createBox(data))
                        Bot.resetQuickAccess();
                    },
                },
                "Placements": {
                    callBack: () => {
                        Bot.createBox("Placements", "user");
                        AI.getData(["ISM Dhanbad", "Placements"]).then(data => Bot.createBox(data, "bot", true, remember))
                        Bot.resetQuickAccess();
                    },
                },
                "Research": {
                    callBack: () => {
                        Bot.createBox("Research", "user");
                        AI.getData(["ISM Dhanbad", "Research"]).then(data => Bot.createBox(data, "bot", true, remember))
                        Bot.resetQuickAccess();
                    },

                },
                "Scholarships": {
                    callBack: () => {
                        Bot.createBox("Scholarships", 'user')
                        AI.getData(["ISM Dhanbad", "Scholarships"]).then(data => Bot.createBox(data, "bot", true, remember))
                        Bot.resetQuickAccess();
                    }
                },
                "Student welfare notices and documents": {
                    callBack: () => {
                        Bot.createBox("Student welfare notices and documents", 'user')
                        AI.getData(["ISM Dhanbad", "Student welfare notices and documents"]).then(data => Bot.createBox(data, "bot", true, remember))
                        Bot.resetQuickAccess();
                    }
                }
            });
        },
    },
};
