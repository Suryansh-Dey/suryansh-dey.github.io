const data = {};
let dataCount = 0;
function createForm(question, field, callback) {
    const id = dataCount;
    Bot.createBox(
        `<div id="loginForm">\
<h3 style="margin: 0">${question}</h3>\
<input type="text" id="data${dataCount}" name="text" placeholder="Answer" autocomplete="on">\
<button type="button" id="next${dataCount++}">Next</button>\
						</div>`,
        "bot",
        true,
        () => {
            Bot.iframe.contentDocument
                .getElementById("next" + id)
                .addEventListener("click", () => {
                    data[field] = Bot.iframe.contentDocument.getElementById(
                        "data" + id,
                    ).value;
                    if (callback) callback();
                });
        },
    );
}
function compare(dest) {
    dest = dest.toLowerCase().trim();
    Bot.removeMcq();
    Bot.createBox("Compare with others", "user");
    switch (dest) {
        case "darjeeling":
            Bot.createBox(
                `
## travelgangtok
- 5D / 4N
- Delhi to Delhi 
- 2 Breakfast and 2 dinner 
- 12,500 **Cheapest**

## king hills 
- 5D / 4N
- Delhi to Delhi 
- 15,000

## travel tech
- 5D / 4N
- Delhi to Delhi  
- 17,999 /-

## barefootrekians
- 6D / 5N
- Delhi to Delhi 
- 5 breakfast and 5 dinner 
- 18,000
`,
                "bot",
            );
            break;
        case "kashmir":
            Bot.createBox(
                `
## Barefoot trekians 

- 6N/7D
- 5 night stay 
- 5 breakfast 5 dinner 
- Katra to Katra 
- 13500-/ **Cheapest**

## Travel tech
- 7N/8D
- 3 night stay in hotel and 1 night stay in house boat
- 4 breakfast and 4 dinner
- Delhi to Delhi 
- 13500-/

## Kings hill 
- 9D/8N
- 6 night stay at hotel 
- 6 breakfast 6 dinner 
- Lucknow to Lucknow 
- 17500-/

## Lockyour trip
- 7D/6N
- 5 night stay hotel and 1 night stay house boat 
- Shrinagar to shrinagar 
- 6 breakfast and 6 dinner 
- 25500-/
`,
                "bot",
            );
            break;
        case "goa":
            Bot.createBox(
                `
## tintintours_india
- 2N / 3D
- Delhi to Delhi 
- 3499 /- **Cheapest**

## adventuresquad.in
- 4N / 5D
- 2 Breakfast 2 dinner 
- Delhi to delhi
- 5999 /-

## tamil_travelgram
- 3N / 4 D
- Delhi to Delhi 
- 3 night stay 
- 3 breakfast and 3 dinner 
- 5999 /-

## letstour.in
- 3N /4D
- Delhi to Delhi 
- 3 breakfast and 3 dinner 
- 6999 /-
`,
                "bot",
            );
            break;
        default:
            Bot.reply("Sorry, No data for this destination is available");
    }
}
function askAI() {
    Bot.createBox("Planning a perfect trip for you!", "bot");
    Bot.startWaiting();
    Bot.removeMcq();
    let answer = null;
    grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute(captchaKey, {
            action: "LOGIN",
        });
        answer = await fetch("https://um4h654pnnpflvmqr62irtlflm0ujjhf.lambda-url.ap-south-1.on.aws", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sysprompt:
                    "You are a trip planner. You will be given the preffered choices of the user and your task is to replay witha trip plan explaining the which train or flight is to be taken from where to where and which hotels are to be booked etc.\n\
        Give him a day wise trip plan with all the details like sightseeing etc. Use markdown for formatting.",
                query: `I want to go to ${data.dest} from ${data.src} with ${data.transport} and stay in ${data.hotel} hotel. Give me a trip plan.`,
                token,
            }),
        });
        answer = await answer.text();
        Bot.stopWaiting();
        Bot.createBox(answer, "bot");
        Bot.createMcq({
            "Compare with others": {
                callBack: () => {
                    compare(data.dest);
                },
            },
        });
    });
}
function askHotel() {
    Bot.removeMcq();
    Bot.createBox("Which hotel rating would you prefer", "bot");
    Bot.createMcq({
        "1 star": {
            callBack: () => {
                Bot.createBox("1 star", "user");
                data["hotel"] = "1 star";
                askAI();
            },
        },
        "2 star": {
            callBack: () => {
                Bot.createBox("2 star", "user");
                data["hotel"] = "2 star";
                askAI();
            },
        },
        "3 star": {
            callBack: () => {
                Bot.createBox("3 star", "user");
                data["hotel"] = "3 star";
                askAI();
            },
        },
        "4 star": {
            callBack: () => {
                Bot.createBox("4 star", "user");
                data["hotel"] = "4 star";
                askAI();
            },
        },
        "5 star": {
            callBack: () => {
                Bot.createBox("5 star", "user");
                data["hotel"] = "5 star";
                askAI();
            },
        },
    });
}
const mcq = {
    Bus: {
        callBack: () => {
            Bot.createBox("Bus", "user");
            data["transport"] = "Bus";
            askHotel();
        },
    },
    Train: {
        callBack: () => {
            Bot.createBox("Train", "user");
            data["transport"] = "Train";
            askHotel();
        },
    },
    Flight: {
        callBack: () => {
            Bot.createBox("Flight", "user");
            data["transport"] = "Flight";
            askHotel();
        },
    },
};
