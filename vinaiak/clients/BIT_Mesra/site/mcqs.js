function initChatting() {
    Bot.iframe.contentDocument.getElementById('text-input').style.display = 'block'
    Bot.iframe.contentDocument.getElementById('send').style.display = 'block'
    Bot.iframe.contentDocument.getElementById('text-input').focus()
    Bot.reply('How may I assist you?')
}
function remember() {
    let children = Bot.iframe.contentDocument.getElementById('chat-area').children
    AI.remember(children[children.length - 3].innerHTML, children[children.length - 1].innerHTML)
}

export const quickAccesses = {
    "programs": {
        'callBack': () => {
            Bot.updateQuickAccess({
                "Undergraduate Program": {
                    "callBack": () => {
                        Bot.updateQuickAccess({
                            "B.Tech/B.Arch/Integrated M.Sc": {
                                'callBack': () => {
                                    Bot.createBox('B.Tech/B.Arch/Integrated M.Sc', 'user')
                                    AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                    Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                                    Bot.updateQuickAccess({
                                        "Course details": {
                                            'callBack': () => {
                                                Bot.createBox('Course details', 'user')
                                                Bot.createBox('Refer to this link for B.Tech and B.Arch https://www.bitmesra.ac.in/BIT_Course_Structure_Details?cid=1 and this for IMSC https://www.bitmesra.ac.in/PG_CS__List?cid=1', 'bot')
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Important dates": {
                                            'callBack': () => {
                                                Bot.createBox('Important dates', 'user')
                                                AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                                Bot.createBox('To get latest dates go to this link https://www.bitmesra.ac.in/admission/notification/1 and click "Important dates"', 'bot', true, remember)
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "How to apply": {
                                            'callBack': () => {
                                                Bot.createBox('How to apply', 'user')
                                                AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                                AI.getData(['b.tech b.arch and integrated msc', 'admission', "application procedure"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Eligibility criteria": {
                                            'callBack': () => {
                                                Bot.createBox('Eligibility criteria', 'user')
                                                AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                                AI.getData(['b.tech b.arch and integrated msc', 'admission', "eligibility criteria"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Fee structure": {
                                            'callBack': () => {
                                                Bot.createBox('Fee structure', 'user')
                                                AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                                AI.getData(['b.tech b.arch and integrated msc', 'admission', "hostel and tuition fee"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Documents required": {
                                            'callBack': () => {
                                                Bot.createBox('Documents required', 'user')
                                                AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                                AI.getData(['b.tech b.arch and integrated msc', 'admission', "documents required"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        }
                                    })
                                }
                            },
                            "BHMCT": {
                                'callBack': () => {
                                    Bot.createBox('BHMCT', 'user')
                                    AI.setContext(['bhmct', 'admission'])
                                    Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                                    Bot.updateQuickAccess({
                                        "Course details": {
                                            'callBack': () => {
                                                window.open('https://www.bitmesra.ac.in/Display_Course_Details_9093KJh?cid=1&ct=UG&id=14', '_blank')
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Important dates": {
                                            'callBack': () => {
                                                Bot.createBox('Important dates', 'user')
                                                AI.setContext(['bhmct', 'admission'])
                                                Bot.createBox('To get latest dates go to this link https://www.bitmesra.ac.in/admission/notification/1 and click "Important dates"', 'bot', true, remember)
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "How to apply": {
                                            'callBack': () => {
                                                Bot.createBox('How to apply', 'user')
                                                AI.setContext(['bhmct', 'admission'])
                                                AI.getData(['bhmct', 'admission', "how to apply"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Admission process": {
                                            'callBack': () => {
                                                Bot.createBox('Admission process', 'user')
                                                AI.setContext(['bhmct', 'admission'])
                                                AI.getData(['bhmct', 'admission', "admission procedure"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Eligibility criteria": {
                                            'callBack': () => {
                                                Bot.createBox('Eligibility criteria', 'user')
                                                AI.setContext(['bhmct', 'admission'])
                                                AI.getData(['bhmct', 'admission', "eligibility criteria"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Fee structure": {
                                            'callBack': () => {
                                                Bot.createBox('Fee structure', 'user')
                                                AI.setContext(['bhmct', 'admission'])
                                                AI.getData(['bhmct', 'admission', "fee structure"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Reservation criteria": {
                                            'callBack': () => {
                                                Bot.createBox('Reservation criteria', 'user')
                                                AI.setContext(['bhmct', 'admission'])
                                                AI.getData(['bhmct', 'admission', "reservation criteria"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        }
                                    })
                                }
                            },
                            "B.pharma": {
                                "callBack": () => {
                                    Bot.createBox("B.Pharma", 'user')
                                    Bot.createBox("Error: not trained on this section yet", "bot")
                                }
                            }
                        })
                    }
                },
                "Postgraduate Program": {
                    "callBack": () => {
                        Bot.updateQuickAccess({
                            "MBA": {
                                'callBack': () => {
                                    Bot.createBox('MBA', 'user')
                                    AI.setContext(['MBA'])
                                    Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                                    Bot.resetQuickAccess()
                                }
                            },
                            "B.Sc/M.Sc": {
                                'callBack': () => {
                                    Bot.createBox('B.Sc/M.Sc', 'user')
                                    AI.setContext(['BSc and MSc', 'admission'])
                                    Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                                    Bot.updateQuickAccess({
                                        "Course details": {
                                            'callBack': () => {
                                                window.open('https://www.bitmesra.ac.in/PG_CS__List?cid=1', '_blank')
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Important dates": {
                                            'callBack': () => {
                                                Bot.createBox('Important dates', 'user')
                                                AI.setContext(['BSc and MSc', 'admission'])
                                                Bot.createBox('To get latest dates go to this link https://www.bitmesra.ac.in/admission/notification/1 and click "Important dates"', 'bot', true, remember)
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "How to apply": {
                                            'callBack': () => {
                                                Bot.createBox('How to apply', 'user')
                                                AI.setContext(['BSc and MSc', 'admission'])
                                                AI.getData(['BSc and MSc', 'admission', "how to apply"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Selection procedure": {
                                            'callBack': () => {
                                                Bot.createBox('Selection procedure', 'user')
                                                AI.setContext(['BSc and MSc', 'admission'])
                                                AI.getData(['BSc and MSc', 'admission', "admission and selection procedure"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Eligibility criteria": {
                                            'callBack': () => {
                                                Bot.createBox('Eligibility criteria', 'user')
                                                AI.setContext(['BSc and MSc', 'admission'])
                                                AI.getData(['BSc and MSc', 'admission', "eligibility criteria"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Fee structure": {
                                            'callBack': () => {
                                                Bot.createBox('Fee structure', 'user')
                                                AI.setContext(['BSc and MSc', 'admission'])
                                                AI.getData(['BSc and MSc', 'admission', "fee structure"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        },
                                        "Documents required": {
                                            'callBack': () => {
                                                Bot.createBox('Documents for physical verification', 'user')
                                                AI.setContext(['BSc and MSc', 'admission'])
                                                AI.getData(['BSc and MSc', 'admission', "documents required"])
                                                    .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                                Bot.resetQuickAccess()
                                            }
                                        }
                                    })
                                }
                            },
                            "M.Pharma": {
                                "callBack": () => {
                                    Bot.createBox("M.Pharma", 'user')
                                    Bot.createBox("Error: not trained on this section yet", "bot")
                                }
                            },
                            "M.Tech/M.Urban Planning/MSc": {
                                "callBack": () => {
                                    Bot.createBox("M.Tech/M.Urban Planning/MSc", 'user')
                                    Bot.createBox("Error: not trained on this section yet", "bot")
                                }
                            },
                            "MCA": {
                                "callBack": () => {
                                    Bot.createBox("MCA", 'user')
                                    Bot.createBox("Error: not trained on this section yet", "bot")
                                }
                            }
                        })
                    }
                },
                "PHD": {
                    'callBack': () => {
                        Bot.createBox('PHD', 'user')
                        AI.setContext(['phd', 'Admission'])
                        Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                        Bot.updateQuickAccess({
                            "Course details": {
                                'callBack': () => {
                                    window.open('https://www.bitmesra.ac.in/Show_Content_Section?cid=1&pid=379', '_blank')
                                    Bot.resetQuickAccess()
                                }
                            },
                            "Important dates": {
                                'callBack': () => {
                                    Bot.createBox('Important dates', 'user')
                                    AI.setContext(['phd', 'admission'])
                                    Bot.createBox('To get latest dates go to this link https://www.bitmesra.ac.in/admission/notification/1 and click "Important dates"', 'bot', true, remember)
                                    Bot.resetQuickAccess()
                                }
                            },
                            "How to apply": {
                                'callBack': () => {
                                    Bot.createBox('How to apply', 'user')
                                    AI.setContext(['phd', 'admission'])
                                    AI.getData(['phd', 'admission', "how to apply"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.resetQuickAccess()
                                }
                            },
                            "Admission process": {
                                'callBack': () => {
                                    Bot.createBox('Admission process', 'user')
                                    AI.setContext(['phd', 'admission'])
                                    AI.getData(['phd', 'admission', "admission procedure"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.resetQuickAccess()
                                }
                            },
                            "Eligibility criteria": {
                                'callBack': () => {
                                    Bot.createBox('Eligibility criteria', 'user')
                                    AI.setContext(['phd', 'admission'])
                                    AI.getData(['phd', 'admission', "eligibility criteria"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.resetQuickAccess()
                                }
                            },
                            "Exam for admission": {
                                'callBack': () => {
                                    Bot.createBox('Exam for admission', 'user')
                                    AI.setContext(['phd', 'admission'])
                                    AI.getData(['phd', 'admission', "exam for admission"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.resetQuickAccess()
                                }
                            },
                            "Documents required": {
                                'callBack': () => {
                                    Bot.createBox('Documents for physical verification', 'user')
                                    AI.setContext(['phd', 'admission'])
                                    AI.getData(['phd', 'admission', "documents required"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.resetQuickAccess()
                                }
                            },
                            "Fee structure": {
                                'callBack': () => {
                                    Bot.createBox('Fee structure', 'user')
                                    AI.setContext(['phd', 'admission'])
                                    AI.getData(['phd', 'admission', "fee structure"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.resetQuickAccess()
                                }
                            }
                        })
                    }
                }
            })
        }
    }
}
export const mcq = {
    "General query": {
        "callBack": () => {
            Bot.createBox("Genreal query", 'user')
            AI.setContext([])
            initChatting()
            Bot.removeMcq()
        }
    },
    "Undergraduate Program": {
        "callBack": () => {
            Bot.updateMcq({
                "B.Tech/B.Arch/Integrated M.Sc": {
                    'callBack': () => {
                        Bot.createBox('B.Tech/B.Arch/Integrated M.Sc', 'user')
                        AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                        Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                        initChatting()
                        Bot.updateMcq({
                            "Course details": {
                                'callBack': () => {
                                    Bot.createBox('Course details', 'user')
                                    Bot.createBox('Refer to this link for B.Tech and B.Arch https://www.bitmesra.ac.in/BIT_Course_Structure_Details?cid=1 and this for IMSC https://www.bitmesra.ac.in/PG_CS__List?cid=1', 'bot')
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Important dates": {
                                'callBack': () => {
                                    Bot.createBox('Important dates', 'user')
                                    AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                    Bot.createBox('To get latest dates go to this link https://www.bitmesra.ac.in/admission/notification/1 and click "Important dates"', 'bot', true, remember)
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "How to apply": {
                                'callBack': () => {
                                    Bot.createBox('How to apply', 'user')
                                    AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                    AI.getData(['b.tech b.arch and integrated msc', 'admission', "application procedure"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Eligibility criteria": {
                                'callBack': () => {
                                    Bot.createBox('Eligibility criteria', 'user')
                                    AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                    AI.getData(['b.tech b.arch and integrated msc', 'admission', "eligibility criteria"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Fee structure": {
                                'callBack': () => {
                                    Bot.createBox('Fee structure', 'user')
                                    AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                    AI.getData(['b.tech b.arch and integrated msc', 'admission', "hostel and tuition fee"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Documents required": {
                                'callBack': () => {
                                    Bot.createBox('Documents required', 'user')
                                    AI.setContext(['b.tech b.arch and integrated msc', 'admission'])
                                    AI.getData(['b.tech b.arch and integrated msc', 'admission', "documents required"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            }
                        })
                    }
                },
                "BHMCT": {
                    'callBack': () => {
                        Bot.createBox('BHMCT', 'user')
                        AI.setContext(['bhmct', 'admission'])
                        Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                        initChatting()
                        Bot.updateMcq({
                            "Course details": {
                                'callBack': () => {
                                    window.open('https://www.bitmesra.ac.in/Display_Course_Details_9093KJh?cid=1&ct=UG&id=14', '_blank')
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Important dates": {
                                'callBack': () => {
                                    Bot.createBox('Important dates', 'user')
                                    AI.setContext(['bhmct', 'admission'])
                                    Bot.createBox('To get latest dates go to this link https://www.bitmesra.ac.in/admission/notification/1 and click "Important dates"', 'bot', true, remember)
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "How to apply": {
                                'callBack': () => {
                                    Bot.createBox('How to apply', 'user')
                                    AI.setContext(['bhmct', 'admission'])
                                    AI.getData(['bhmct', 'admission', "how to apply"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Admission process": {
                                'callBack': () => {
                                    Bot.createBox('Admission process', 'user')
                                    AI.setContext(['bhmct', 'admission'])
                                    AI.getData(['bhmct', 'admission', "admission procedure"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Eligibility criteria": {
                                'callBack': () => {
                                    Bot.createBox('Eligibility criteria', 'user')
                                    AI.setContext(['bhmct', 'admission'])
                                    AI.getData(['bhmct', 'admission', "eligibility criteria"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Fee structure": {
                                'callBack': () => {
                                    Bot.createBox('Fee structure', 'user')
                                    AI.setContext(['bhmct', 'admission'])
                                    AI.getData(['bhmct', 'admission', "fee structure"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Reservation criteria": {
                                'callBack': () => {
                                    Bot.createBox('Reservation criteria', 'user')
                                    AI.setContext(['bhmct', 'admission'])
                                    AI.getData(['bhmct', 'admission', "reservation criteria"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            }
                        })
                    }
                },
                "B.Pharma": {
                    "callBack": () => {
                        Bot.createBox("B.Pharma", 'user')
                        Bot.createBox("Error: not trained on this section yet", "bot")
                    }
                }
            })
        }
    },
    "Postgraduate Program": {
        "callBack": () => {
            Bot.updateMcq({
                "MBA": {
                    'callBack': () => {
                        Bot.createBox('MBA', 'user')
                        AI.setContext(['MBA'])
                        Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                        initChatting()
                        Bot.removeMcq()
                    }
                },
                "B.Sc/M.Sc": {
                    'callBack': () => {
                        Bot.createBox('B.Sc/M.Sc', 'user')
                        AI.setContext(['BSc and MSc', 'admission'])
                        Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
                        initChatting()
                        Bot.updateMcq({
                            "Course details": {
                                'callBack': () => {
                                    window.open('https://www.bitmesra.ac.in/PG_CS__List?cid=1', '_blank')
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Important dates": {
                                'callBack': () => {
                                    Bot.createBox('Important dates', 'user')
                                    AI.setContext(['BSc and MSc', 'admission'])
                                    Bot.createBox('To get latest dates go to this link https://www.bitmesra.ac.in/admission/notification/1 and click "Important dates"', 'bot', true, remember)
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "How to apply": {
                                'callBack': () => {
                                    Bot.createBox('How to apply', 'user')
                                    AI.setContext(['BSc and MSc', 'admission'])
                                    AI.getData(['BSc and MSc', 'admission', "how to apply"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Selection procedure": {
                                'callBack': () => {
                                    Bot.createBox('Selection procedure', 'user')
                                    AI.setContext(['BSc and MSc', 'admission'])
                                    AI.getData(['BSc and MSc', 'admission', "admission and selection procedure"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Eligibility criteria": {
                                'callBack': () => {
                                    Bot.createBox('Eligibility criteria', 'user')
                                    AI.setContext(['BSc and MSc', 'admission'])
                                    AI.getData(['BSc and MSc', 'admission', "eligibility criteria"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Fee structure": {
                                'callBack': () => {
                                    Bot.createBox('Fee structure', 'user')
                                    AI.setContext(['BSc and MSc', 'admission'])
                                    AI.getData(['BSc and MSc', 'admission', "fee structure"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            },
                            "Documents required": {
                                'callBack': () => {
                                    Bot.createBox('Documents for physical verification', 'user')
                                    AI.setContext(['BSc and MSc', 'admission'])
                                    AI.getData(['BSc and MSc', 'admission', "documents required"])
                                        .then(data => { Bot.createBox(data, 'bot', true, remember) })
                                    Bot.removeMcq()
                                    Bot.iframe.contentDocument.getElementById('quick-access').style.display = 'block'
                                }
                            }
                        })
                    }
                },
                "M.Pharma": {
                    "callBack": () => {
                        Bot.createBox("M.Pharma", 'user')
                        Bot.createBox("Sorry, I am not trained on this section yet", "bot")
                    }
                },
                "M.Tech/M.Urban Planning/MSc": {
                    "callBack": () => {
                        Bot.createBox("M.Tech/M.Urban Planning/MSc", 'user')
                        Bot.createBox("Sorry, I am not trained on this section yet", "bot")
                    }
                },
                "MCA": {
                    "callBack": () => {
                        Bot.createBox("MCA", 'user')
                        Bot.createBox("Sorry, I am not trained on this section yet", "bot")
                    }
                }
            })
        }
    },
    "PHD": {
        'callBack': () => {
            Bot.createBox('PHD', 'user')
            AI.setContext(['phd', 'Admission'])
            Bot.createBox('You may refer to the brochure on institute site for latest updates via this link https://www.bitmesra.ac.in/admission/notification/1', 'bot')
            initChatting()
            Bot.removeMcq()
        }
    }
}
