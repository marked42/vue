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

1. function `createWatcher(vm, expOrFn, handler, options)`, `expOrFn` can be a path string or function.
  1. path string - used in `watch` property, watch on vm property at specific path and call handler if property changes.
  1. function - used in `computed` property, watch on vm properties used in this function, if dependent property changes, update `computed` property lazily or actively.

1. normal watchers in `watch` property
```js
{
  watch: {
    'path': function() {

    },
    'path1': 'method-name',
    'path2': {
      handler() {

      },
      deep: true,
      immediate: true,
    },
    'path3': [
      // string || function || plainObject
    ],
    // this can be recursive and values innermost takes effect, not so useful, only a side effect
    // of actual implementation
    'path4': {
      handler {
        handler {
          handler() {
            
          },
          immediate: true,
          deep: true,
        }
      }
    }
  }
}
```
1. computed watchers in `computed` property
  1. computed watchers is in lazy mode by default, when watched target changes, watcher's value will not change immediately. Instead, the watcher will be marked as `dirty` and watchers must call `evaluate` to get the new value.
  1. when computed watchers has one or more dependencies, it's considered as `active` as opposite to `lazy`.
1. render watcher in `render` property

## Mixins

options merge strategy

1. data undergo shallow merge with component's data taking priority in case of confilicts. Same strategy for other options that receives object values, eg. `methods`, `components`, `directives`.
  1. same strategy used in `Vue.extend()`
1. hook functions with same name are merged into array, mixin hooks placed in front and called before component hooks.

1. Global mixin registered using `Vue.mixin()`, affects every vue instance created after.
1. customer options merge strategy
```js
Vue.config.optionMergeStrategies.myOption = function(toVal, fromVal) {
  return mergedResult
}
```

## Extends Component