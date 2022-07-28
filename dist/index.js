// src/index.ts
import { throttle } from "lodash";

// src/utils/index.ts
var assert = (type) => {
  return (val) => {
    return typeof val === type;
  };
};
var assertFunction = assert("function");
var assertNumber = assert("number");
var isDOM = typeof HTMLElement === "object" ? (dom) => {
  return dom instanceof HTMLElement;
} : (dom) => {
  return dom && typeof dom === "object" && dom.nodeType === 1 && typeof dom.nodeName === "string";
};
var compose = (...funcs) => {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

// src/index.ts
var allowScroll = true;
var validArea = 100;
var step = 2;
var elProp = null;
var mouseIn = false;
var scrolling = false;
var currentDirection = "up" /* UP */;
var rAF = window.requestAnimationFrame || ((func) => setTimeout(func, 16));
var setScroll = (scroll2) => {
  allowScroll = scroll2;
  !scroll2 && scrolling && stopScroll();
};
var getElProp = (el) => {
  const elRect = el.getBoundingClientRect();
  elProp = {
    left: elRect.left,
    top: elRect.top,
    width: el.clientHeight,
    height: el.clientHeight,
    scrollTop: el.scrollTop,
    scrollHeight: el.scrollHeight
  };
};
var scroll = (el) => {
  if (!elProp) {
    return;
  }
  if (currentDirection === "up" && elProp.scrollTop > 0) {
    let currentStep = -step;
    elProp.scrollTop = elProp.scrollTop + currentStep;
    el.scrollTop = elProp.scrollTop;
  }
  if (currentDirection === "down" && elProp.scrollTop < elProp.scrollHeight - elProp.height) {
    let currentStep = step;
    elProp.scrollTop = elProp.scrollTop + currentStep;
    el.scrollTop = elProp.scrollTop;
  }
  scrolling && rAF(() => {
    scroll(el);
  });
};
var startScroll = (direction, el) => {
  currentDirection = direction;
  if (!scrolling) {
    scrolling = true;
    scroll(el);
  }
};
var stopScroll = () => {
  scrolling = false;
};
var onMouseLeave = () => {
  mouseIn = false;
  stopScroll();
};
var onMouseEnter = () => {
  mouseIn = true;
};
var onMouseMove = throttle((event, el) => {
  if (!allowScroll || !mouseIn) {
    return;
  }
  const getMouseCoord = () => {
    const e = event || window.event;
    const curseX = e.pageX;
    const curseY = e.pageY;
    return {
      curseX,
      curseY
    };
  };
  const calcScroll = (mouseCoord) => {
    let direction = "";
    if (!elProp) {
      return;
    }
    const isUp = mouseCoord.curseX > elProp.left && mouseCoord.curseX < elProp.left + elProp.width && mouseCoord.curseY > elProp.top && mouseCoord.curseY < elProp.top + validArea;
    const isDown = mouseCoord.curseX > elProp.left && mouseCoord.curseX < elProp.left + elProp.width && mouseCoord.curseY > elProp.top + elProp.height - validArea && mouseCoord.curseY < elProp.top + elProp.height;
    isUp && (direction = "up");
    isDown && (direction = "down");
    return {
      isScroll: isUp || isDown,
      direction
    };
  };
  const toggleScroll = (res) => {
    if (elProp && elProp.scrollHeight < elProp.height) {
      return;
    }
    if (res.isScroll) {
      startScroll(res.direction, el);
    }
    if (!res.isScroll) {
      stopScroll();
    }
  };
  const chains = compose(
    toggleScroll,
    calcScroll,
    getMouseCoord,
    getElProp
  );
  chains(el);
}, 100);
var initScroll = (el, scroll2 = true) => {
  if (!isDOM(el)) {
    console.error("scroll el must be dom node");
    return;
  }
  allowScroll = scroll2;
  el.addEventListener("mousemove", (e) => {
    onMouseMove(e, el);
  });
  el.addEventListener("mouseleave", onMouseLeave);
  el.addEventListener("mouseenter", onMouseEnter);
};
var release = () => {
  allowScroll = true;
  elProp = null;
  mouseIn = false;
  scrolling = false;
};
export {
  initScroll,
  release,
  setScroll
};
//# sourceMappingURL=index.js.map
