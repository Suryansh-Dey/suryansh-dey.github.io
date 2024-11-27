const xhr = new XMLHttpRequest();
function initChatting() {
  Bot.iframe.contentDocument.getElementById("text-input").style.display =
    "block";
  Bot.iframe.contentDocument.getElementById("send").style.display = "block";
  Bot.iframe.contentDocument.getElementById("text-input").focus();
  Bot.removeMcq();
  Bot.iframe.contentDocument.getElementById("quick-access").style.display =
    "block";
}
function remember() {
  let children =
    Bot.iframe.contentDocument.getElementById("chat-area").children;
  AI.remember(
    children[children.length - 3].innerHTML,
    children[children.length - 1].innerHTML,
  );
}

export const mcq = {
  "About us": {
    callBack: () => {
      Bot.createBox(
        "Sarala Birla Public School, a co-educational (10+2) English medium school at Mahilong on Ranchi-Purulia Highway was set up by Bharat Arogya & Gyan Mandir under the aegis of the B. K. Birla Group. The group has successful track record of running some of the finest educational institutions across the country and is committed to quality education. The school is affiliated to C.B.S.E Delhi and imparts world class education with modern facilities.\n\nThe school offers a pragmatic and qualitative all round education to its students. It has been designed to have spacious and airy classrooms supported by computer aided learning facilities in the classrooms, well-equipped laboratories for Physics, Chemistry, Biology, Mathematics, and Computer Science, well-stocked libraries, audio-visual room(s).",
        "bot",
        false,
        remember,
      );
      initChatting();
    },
  },
  "Admission form": {
    callBack: () => {
      Bot.createBox(
        "Follow this link to the admission form https://sbpsranchi.in/admission/newregxi.aspx",
        "bot",
        true,
        remember,
      );
      initChatting();
    },
  },
};
export const quickAccesses = {
  "quick access": {
    callBack: () => {
      Bot.updateQuickAccess({
        "About us": {
          callBack: () => {
            Bot.createBox(
              "Sarala Birla Public School, a co-educational (10+2) English medium school at Mahilong on Ranchi-Purulia Highway was set up by Bharat Arogya & Gyan Mandir under the aegis of the B. K. Birla Group. The group has successful track record of running some of the finest educational institutions across the country and is committed to quality education. The school is affiliated to C.B.S.E Delhi and imparts world class education with modern facilities.\n\nThe school offers a pragmatic and qualitative all round education to its students. It has been designed to have spacious and airy classrooms supported by computer aided learning facilities in the classrooms, well-equipped laboratories for Physics, Chemistry, Biology, Mathematics, and Computer Science, well-stocked libraries, audio-visual room(s).",
              "bot",
              false,
              remember,
            );
            Bot.resetQuickAccess();
          },
        },
        "Admission form": {
          callBack: () => {
            Bot.createBox(
              "Follow this link to the admission form https://sbpsranchi.in/admission/newregxi.aspx",
              "bot",
              true,
              remember,
            );
            Bot.resetQuickAccess();
          },
        },
      });
    },
  },
};
