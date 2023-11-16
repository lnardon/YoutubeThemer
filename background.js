// Function to modify theme
function gotMessage(message) {
  function persist(key, value) {
    chrome.storage.local.set({ [key]: value }, function () {});
  }

  function changeLogoColor() {
    const selector =
      "#logo-icon > yt-icon-shape > icon-shape > div > svg > svg > g:nth-child(1) > path:nth-child(1)";
    const svgPath = document.querySelector(selector);

    if (svgPath) {
      svgPath.style.fill = message.setLogoColor;
      persist("setLogoColor", message.setLogoColor);
    } else {
      console.log("SVG path not found using the given selector:", selector);
    }
  }

  function changeTimeLineColor() {
    const selector = ".ytp-swatch-background-color";
    const timeLine = document.querySelectorAll(selector);

    if (timeLine) {
      timeLine.forEach((el) => {
        el.style.backgroundColor = message.setTimelineColor;
        persist("setTimelineColor", message.setTimelineColor);
      });
    } else {
      console.log("SVG path not found using the given selector:", selector);
    }
  }

  function changePlayerIconsColor() {
    let selector = ".ytp-svg-fill";
    let icons = document.querySelectorAll(selector);

    if (icons) {
      icons.forEach((el) => {
        el.style.fill = message.setPlayerIconsColor;
        persist("setPlayerIconsColor", message.setPlayerIconsColor);
      });
    } else {
      console.log("SVG path not found using the given selector:", selector);
    }

    selector = ".ytp-button > svg";
    icons = document.querySelectorAll(selector);

    if (icons) {
      icons.forEach((el) => {
        el.style.fill = message.setPlayerIconsColor;
      });
    } else {
      console.log("SVG path not found using the given selector:", selector);
    }
  }

  function changeIconsColor() {
    const selector = ".guide-icon.ytd-guide-entry-renderer";
    const icon = document.querySelectorAll(selector);

    if (icon) {
      icon.forEach((el) => {
        el.style.color = message.setIconsColor;
        persist("setIconsColor", message.setIconsColor);
      });
    } else {
      console.log("SVG path not found using the given selector:", selector);
    }
  }

  changeLogoColor();
  changeTimeLineColor();
  changeIconsColor();
  changePlayerIconsColor();
}

// Listen for messages
function handleGotMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: gotMessage,
      args: [message],
    });
  });
}

const theme = {
  setLogoColor: "setLogoColor",
  setTimelineColor: "setTimelineColor",
  // setAllFontsColors: getInputValue("setFontsColor"),
  setIconsColor: "setIconsColor",
  setPlayerIconsColor: "setPlayerIconsColor",
};

chrome.runtime.onMessage.addListener(handleGotMessage);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === "get-theme-data") {
    let fetchedTheme = {};
    const keys = Object.keys(theme);
    let counter = 0;

    keys.forEach((key) => {
      chrome.storage.local.get(key, function (value) {
        fetchedTheme[key] = value[key];
        counter++;
        if (counter === keys.length) {
          sendResponse(fetchedTheme);
        }
      });
    });
    return true;
  }
  return true;
});
