// Minimal promise-based polyfill for Chrome
if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  window.browser = {};
  const wrap = (target) => {
    return new Proxy(target, {
      get(obj, prop) {
        const value = obj[prop];
        if (typeof value === 'function') {
          return (...args) => {
            return new Promise((resolve, reject) => {
              try {
                value.call(obj, ...args, (result) => {
                  const err = chrome.runtime.lastError;
                  if (err) reject(err);
                  else resolve(result);
                });
              } catch (e) {
                reject(e);
              }
            });
          };
        }
        return value;
      }
    });
  };
  for (const key in chrome) {
    if (Object.prototype.hasOwnProperty.call(chrome, key)) {
      browser[key] = wrap(chrome[key]);
    }
  }
}
