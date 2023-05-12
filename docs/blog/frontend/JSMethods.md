## 数组

```js
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

Array.prototype.myMap = function (callback) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    let r = callback(this[i], i, this);
    res.push(r);
  }
  return res;
};

Array.prototype.myFilter = function (callback) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    let flag = callback(this[i], i, this);
    flag && res.push(this[i]);
  }
  return res;
};

Array.prototype.mySome = function (callback) {
  let flag = false;
  for (let i = 0; i < this.length; i++) {
    flag = callback(this[i], i, this);
    if (flag) {
      break;
    }
  }
  return flag;
};

Array.prototype.myEvery = function (callback) {
  let flag = true;
  for (let i = 0; i < this.length; i++) {
    flag = callback(this[i], i, this);
    if (!flag) {
      break;
    }
  }
  return flag;
};

Array.prototype.myReduce = function (callback, ...args) {
  let start = 0;
  let pre;
  if (args.length) {
    pre = args[0];
  } else {
    pre = this[0];
    start = 1;
  }
  for (let i = 0; i < this.length; i++) {
    pre = callback(pre, this[i], i, this);
  }
  return pre;
};

Array.prototype.myFindIndex = function (callback) {
  let index = -1;
  for (let i = 0; i < this.length; i++) {
    let flag = callback(this[i], i, this);
    if (flag) {
      index = i;
      break;
    }
  }
  return index;
};

Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};
Array.prototype.myFill = function (val, start = 0, end) {
  end = end || this.length;
  for (let i = start; i < end; i++) {
    this[i] = val;
  }
  return this;
};

Array.prototype.myIncludes = function (val, start) {
  start = start || 0;
  let flag = Number.isNaN(val);
  for (let i = start; i < this.length; i++) {
    if (this[i] === val || Number.isNaN(this[i] === flag)) {
      return true;
    }
  }
  return false;
};

Array.prototype.MyJoin = function (s = ",") {
  let str = "";
  for (let i = 0; i < this.length - 1; i++) {
    str += this[i] + s;
  }
  str += this[this.length - 1];
  return str;
};

Array.prototype.myFlat = function (num = 1) {
  let arr = [];
  while (this.some((item) => Array.isArray(item))) {
    arr.concat(this);
  }
  return arr;
};
```

## 函数

```js
Function.prototype.myCall = function (obj, ...args) {
  obj = obj || globalThis;
  let fn = Symbol();
  obj[fn] = this;
  setTimeout(() => {
    delete obj[fn];
  });
  return obj[fn](...args);
};

Function.prototype.myApply = function (obj, args) {
  obj = obj || globalThis;
  let fn = Symbol();
  obj[fn] = this;
  setTimeout(() => {
    delete obj[fn];
  });
  return obj[fn](...args);
};

Function.prototype.MyBind = function (obj, ...args) {
  obj = obj || globalThis;
  let fn = Symbol();
  obj[fn] = this;
  const _this = this;
  const res = function (...innerArgs) {
    if (this instanceof _this) {
      //判断是不是new 操作
      this[fn] = _this;
      this[fn](...args, ...innerArgs);
      delete this[fn];
    } else {
      obj[fn](...args, ...innerArgs);
      delete obj[fn];
    }
  };
  res.prototype = Object.create(this.prototype);
  return res;
};

function myBind(obj = globalThis, ...args) {
  let fn = Symbol();
  obj[fn] = this;
  const _this = this;
  const res = function (...innerArgs) {
    if (this instanceof _this) {
      this[fn] = _this;
      this[fn](...args, ...innerArgs);
      delete this[fn];
    } else {
      obj[fn](...args, ...innerArgs);
      delete obj[fn];
    }
  };
  res.prototype = Object.create(this.prototype);
  return res;
}
```

## 对象

```js
function instanceOf(child, father) {
  const fp = father.prototype;
  const cp = child.__proto__;
  while (cp) {
    if (cp === fp) {
      return true;
    }
    cp = cp.__proto__;
  }
  return false;
}
```

## Promise 方法

```js
function all(promises) {
  let res = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    function settlePro(index, val) {
      res[index] = val;
      count++;
      if (count === promises.length) {
        resolve(res);
      }
    }
    promises.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then(
          (res) => {
            settlePro(index, res);
          },
          (err) => reject(err)
        );
      } else {
        settlePro(index, promise);
      }
    });
  });
}

function race(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
      } else {
        resolve(promise);
      }
    });
  });
}

function settled(promises) {
  let res = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    function check() {
      if (promises.length === count) {
        resolve(res);
      }
    }
    promises.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then(
          (res) => {
            res[index] = res;
            count++;
            check();
          },
          (err) => {
            res[index] = err;
            count++;
            check();
          }
        );
      } else {
        res[index] = promise;
        count++;
        check();
      }
    });
  });
}

function any(promises) {
  let count = 0;
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      if (promise instanceof Promise) {
        promise.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            count++;
            if (count === promise.length) {
              reject(new Error("No Promise Resolve"));
            }
          }
        );
      } else {
        resolve(promise);
      }
    });
  });
}

Promise.prototype.myFinally = function (callback) {
  this.then(
    (res) => {
      callback();
      return res;
    },
    (err) => {
      callback();
      return res;
    }
  );
};
```

## Utils

```js
function New(fn, ...args) {
  let obj = {};
  obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, args);
  if (res instanceof Object) {
    return res;
  } else {
    return obj;
  }
}

function debounce(fn, delay, immediate = true) {
  let timer = null;
  let isInvoke = false;
  return function (...args) {
    if (!isInvoke && immediate) {
      fn.apply(this, args);
      isInvoke = true;
      return;
    }
    if (timer) {
      clearTimeout(timer);
      timer = null;
      isInvoke = false;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function throttle(fn, delay, immediate = true) {
  let oldTime = 0;
  return function (...args) {
    if (immediate && oldTime == 0) {
      fn.apply(this, args);
      oldTime = Date.now();
      return;
    }
    if (Date.now() - oldTime >= delay) {
      fn.apply(this, args);
      oldTime = Date.now();
    }
  };
}

//用setTimeOut 实现setInterval
function mySetTimeInter(fn, delay) {
  let timer = null;
  const fnc = () => {
    fn();
    timer = setTimeout(() => {
      fnc();
    }, delay);
  };
  setTimeout(() => {
    fnc();
  }, delay);
  return function clear() {
    clearTimeout(timer);
  };
}

function compose(...fn) {
  if (fn.length === 0) {
    return (n) => n;
  }
  if (fn.length === 1) {
    return fn[0];
  }
  return fn.reduce((pre, next) => {
    return (nums) => {
      return next(pre(nums));
    };
  });
}
```

## 并发控制

```js
class ConcurrentPromise {
  constructor(limit) {
    this.limit = limit;
    this.count = 0;
    this.task = [];
  }
  add(timer, order) {
    this.task.push(() => {
      return new Promise((res) => {
        setTimeout(() => {
          console.log(order);
          res();
        }, timer);
      });
    });
  }
  start() {
    for (let i = 0; i < this.limit; i++) {
      this.request();
    }
  }
  request() {
    if (!this.task.length || this.limit <= this.count) return;
    this.count++;
    this.task
      .shift()()
      .then(() => {
        this.count--;
        this.request();
      });
  }
}
```
