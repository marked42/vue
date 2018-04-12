# Vue

## Process of preparing Vue constructor

index.js -> `function Vue() {}`
initMixin provides `_init`
stateMixin provides `$data, $props, $set, $del, $watch`
eventsMixin provides `$on, $once, $off, $emit`
lifecycleMixin provides `$forceUpdate, $destroy`

render.js
  renderMixin `$nextTick`
  initRender provides `$slots, $scopedSlots, $createElement`

## Process of creating Vue instance

calls internal method `_init(options)`

1. `initInternalComponent(vm)`
1. `initProxy(vm)`
1. `initLifecycle(vm)`
1. `initEvents(vm)`
1. `initRender(vm)`
1. `callHook(vm, 'beforeCreate')`
1. `initInjections(vm) // resolve injections before data/props`
1. `initState(vm)`
  1. `initProps`
  1. `initMethods`
  1. `initData`
  1. `initWatch`

1. `initProvide(vm) // resolve provide after data/props`
1. `callHook(vm, 'created')`

## Watchers

1. normal watchers in `watch` property
1. computed watchers in `computed` property
  1. computed watchers is in lazy mode by default, when watched target changes, watcher's value will not change immediately. Instead, the watcher will be marked as `dirty` and watchers must call `evaluate` to get the new value.
  1. when computed watchers has one or more dependencies, it's considered as `active` as opposite to `lazy`.
1. render watcher in `render` property