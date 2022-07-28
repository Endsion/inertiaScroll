import { throttle } from 'lodash'
import { isDOM, compose } from './utils';
import { IElProp, Direction, IMouseCoord } from './types'
// 1 引用类型
// 2 暴露方法
let allowScroll = true; // 是否允许滚动

const validArea = 100; // 有效区域值 上下 px
const step = 2; // 滚动速度 px
let elProp:IElProp|null = null; // 元素属性
let mouseIn = false; // 鼠标位置
let scrolling = false; // 滚动状态
let currentDirection:Direction = Direction.UP; // 鼠标位置

const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));

const setScroll = (scroll:boolean) => {
  allowScroll = scroll;
  (!scroll && scrolling) && stopScroll();
};

const getElProp = (el: HTMLDivElement) => {
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

const scroll = (el: HTMLDivElement) =>{
    if(!elProp){
        return
    }
  if (currentDirection === 'up' && elProp.scrollTop > 0) {
    let currentStep = -step;
    elProp.scrollTop = elProp.scrollTop + currentStep;
    el.scrollTop = elProp.scrollTop;
  }
  if (currentDirection === 'down' && elProp.scrollTop < elProp.scrollHeight - elProp.height) {
    let currentStep = step;
    elProp.scrollTop = elProp.scrollTop + currentStep;
    el.scrollTop = elProp.scrollTop;
  }
  scrolling && rAF(()=>{
    scroll(el);
  });
};

const startScroll = (direction: Direction, el: HTMLDivElement) =>{
  currentDirection = direction;
  if (!scrolling) {
    scrolling = true;
    scroll(el);
  }
};

const stopScroll = () =>{
  scrolling = false;
};
const onMouseLeave = ()=>{
  mouseIn = false;
  stopScroll();
};
const onMouseEnter = ()=>{
  mouseIn = true;
};
const onMouseMove = throttle((event:MouseEvent, el:HTMLDivElement)=>{
  if (!allowScroll || !mouseIn) {
    return;
  }

  const getMouseCoord = ()=> {
    const e = event || window.event;
    const curseX = e.pageX;
    const curseY = e.pageY;
    return {
      curseX,
      curseY
    };
  };

  const calcScroll = (mouseCoord:IMouseCoord)=>{
    let direction = '';
    if(!elProp){
        return
    }
    const isUp = mouseCoord.curseX > elProp.left && mouseCoord.curseX < (elProp.left + elProp.width) && mouseCoord.curseY > elProp.top && mouseCoord.curseY < elProp.top + validArea;
    const isDown = mouseCoord.curseX > elProp.left && mouseCoord.curseX < (elProp.left + elProp.width) && mouseCoord.curseY > (elProp.top + elProp.height - validArea) && mouseCoord.curseY < (elProp.top + elProp.height);
    isUp && (direction = 'up');
    isDown && (direction = 'down');
    return {
      isScroll: isUp || isDown,
      direction
    };
  };

  const toggleScroll = (res:{
    isScroll: Boolean,
    direction: Direction
  }) =>{
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
    toggleScroll, // 滚动操作
    calcScroll, // 计算滚动方式 向上  向下 或者 不滚
    getMouseCoord, // 获取鼠标坐标
    getElProp, // el属性会变化  需要在mousemove中实时调用
  );

  chains(el);
}, 100);

const initScroll = (el: HTMLDivElement, scroll = true) => {
  if (!isDOM(el)) {
    console.error('scroll el must be dom node');
    return;
  }
  allowScroll = scroll;
  el.addEventListener('mousemove', (e: MouseEvent)=>{
    onMouseMove(e, el);
  });
  el.addEventListener('mouseleave', onMouseLeave);
  el.addEventListener('mouseenter', onMouseEnter);
};

const release = () => {
  allowScroll = true; // 是否允许滚动
  elProp = null; // 元素属性
  mouseIn = false; // 鼠标位置
  scrolling = false; // 滚动状态
};

export {
  setScroll,
  initScroll,
  release
};
