const assert = (type:string):Function => {
    return (val:any)=>{
      return typeof val === type;
    };
  };
  
  const assertFunction = assert('function');
  const assertNumber = assert('number');
  
  const isDOM = typeof HTMLElement === 'object' ? (dom: any) => {
    return dom instanceof HTMLElement;
  } : (dom: any) => {
    return dom && typeof dom === 'object' && dom.nodeType === 1 && typeof 	dom.nodeName === 'string';
  };
  
  const compose = (...funcs:Function[]) => {
    if (funcs.length === 0) {
      return (arg:any) => arg;
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce((a, b) => (...args:any) => a(b(...args)));
  };
  const deepClone = (obj: Object) =>{
    return JSON.parse(JSON.stringify(obj));
  };
   
  function throttle(fn:Function, delay = 500) {
    let timer:number|null = null;
    return (...args) => {
      if (timer) return;
      timer = setTimeout(() => {
        // @ts-ignore
        fn.apply(this, arguments);
        timer = null;
      }, delay);
    };
  }
  
  export {
    assertFunction,
    assertNumber,
    deepClone,
    isDOM,
    compose,
    throttle
  };
  