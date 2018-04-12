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