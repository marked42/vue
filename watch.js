class Watcher {
  construcor(vm, expOrFn, fn, options) {

  }
}

// receives callback function and create the watcher
function watch(vm, expOrFn, fn, options) {
  options = options || { user: true }

  const watcher = new Watcher(vm, expOrFn, fn, options)

  if (options.immediate) {
    fn.call(vm, watcher.value)
  }

  return function unwatch() {
    watcher.teardown()
  }
}

function isPlainObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]'
}

function initWatch(vm, watchOptions) {
  Object.keys(watchOptions).forEach(key => {
    const handler = watchOptions[key]
    if (Array.isArray(handler)) {
      handler.forEach(val =>  createWatcher(vm, key, val))
    } else {
      createWatcher(vm, key, handler)
    }
  }) 
}

// recursively peel off plain object to get real callback function and options
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }

  if (typeof handler === 'string')  {
    handler = vm[handler]
  }

  if (typeof handler === 'function') {
    return watch(vm, expOrFn, handler, options)
  }

  return createWatcher(vm, expOrFn, handler, options)
}

// computed
/* 1. define watchers on vm._computedWatchers for each computed key 
*  2. computed watcher option can be single function or object { get, set, cache }
*    2.1 warn if computed key already exsit on vm
*    2.2 define property of name [key] on vm iteself
*       2.2.1 handle option type of function or object
*       2.2.2 handle option of cache
*       2.2.3 warning when setter is called when not in production mode, noop in production mode
* why call watcher.depend() ?
*/

function initComputed(vm, computed) {
  for (let key in computed) {

  }
}