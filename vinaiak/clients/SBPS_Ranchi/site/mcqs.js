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
  "About us": {
    callBack: () => {
      Bot.createBox(
        "Sarala Birla Public School, a co-educational (10+2) English medium school at Mahilong on Ranchi-Purulia Highway was set up by Bharat Arogya & Gyan Mandir under the aegis of the B. K. Birla Group. The group has successful track record of running some of the finest educational institutions across the country and is committed to quality education. The school is affiliated to C.B.S.E Delhi and imparts world class education with modern facilities.\n\nThe school offers a pragmatic and qualitative all round education to its students. It has been designed to have spacious and airy classrooms supported by computer aided learning facilities in the classrooms, well-equipped laboratories for Physics, Chemistry, Biology, Mathematics, and Computer Science, well-stocked libraries, audio-visual room(s).",
        "bot",
        false,
        remember,
      );
      Bot.createBox("About us", "user");
      Bot.removeMcq();
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
      Bot.createBox("Admission form", "user");
      Bot.removeMcq();
    },
  },
  "Fee structure": {
    callBack: () => {
      Bot.createBox(
        "Follow this link to the fee structure https://docs.sbpsranchi.com/SBPS-Ftp-Uploads/PDFs/Fees/2024/November/23-11-2024-Fees.pdf",
        "bot",
        true,
        remember,
      );
      Bot.createBox("Fee structure", "user");
      Bot.removeMcq();
    },

  },
  "Assignments": {
    callBack: () => {
      Bot.createBox("Assignments", 'user')
      if (personalData_className)
        AI.getData(['Assignments of classes', personalData_className])
          .then(data => { Bot.createBox(data, 'bot', true, remember) })
      else Bot.createBox("Ask the AI about Assignments for a class", 'bot')
      Bot.removeMcq()
    }
  },
  "Notices": {
    callBack: () => {
      Bot.createBox("Notices", 'user')
      if (personalData_className) {
        AI.getData(['Notices', personalData_className])
          .then(data => { Bot.createBox(data, 'bot', true, remember) })
        AI.getData(['Notices', 'common to all'])
          .then(data => { Bot.createBox(data, 'bot', true, remember) })
      }
      else Bot.createBox("Ask the AI about Notices for a class", 'bot')
      Bot.removeMcq()
    }
  }
};
const quickAccesses = {
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
            Bot.createBox("About us", "user");
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
            Bot.createBox("Admission form", "user");
            Bot.resetQuickAccess();
          },
        },
        "Fee structure": {
          callBack: () => {
            Bot.createBox(
              "Follow this link to the fee structure https://docs.sbpsranchi.com/SBPS-Ftp-Uploads/PDFs/Fees/2024/November/23-11-2024-Fees.pdf",
              "bot",
              true,
              remember,
            );
            Bot.createBox("Fee structure", "user");
            Bot.resetQuickAccess();
          },
        },
        "Assignments": {
          callBack: () => {
            if (personalData_className)
              AI.getData(['Assignments of classes', personalData_className])
                .then(data => { Bot.createBox(data, 'bot', true, remember) })
            else Bot.createBox("Ask the AI about Assignments for a class", 'bot')
            Bot.resetQuickAccess()
          }
        },
        "Notices": {
          callBack: () => {
            if (personalData_className) {
              AI.getData(['Notices', personalData_className])
                .then(data => { Bot.createBox(data, 'bot', true, remember) })
              AI.getData(['Notices', 'common to all'])
                .then(data => { Bot.createBox(data, 'bot', true, remember) })
            }
            else Bot.createBox("Ask the AI about Notices for a class")
            Bot.resetQuickAccess()
          }
        }
      });
    },
  },
};
