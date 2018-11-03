# react-chat-mobile-app

### 1. socket.io是什么
+ 基于事件的实时双向通信库
	- 基于websocket协议
	- 前后端通过事件进行双向通信
+ 基于不同的网络协议
	- ajax基于http协议，单向，实时获取数据只能轮询
	- 后端可以主动推送数据
	- 现代浏览器均支持websocket协议

### 2. React原理
##### 2.1 虚拟DOM

##### 2.2 生命周期函数
+ 在某一个时刻，组件会自动调用执行的函数
+ Initialization
    + `setup props and state`
+ Mounting
    + `componentWillMount`，组件即将被挂载到页面上自动执行
    + `render`，必须存在，在这里不能进行AJAX请求，如果请求后获取到数据，修改了`state`的值，那么就会继续render，请求AJAX，造成死循环
    + `componentDidMount`，组件挂载到页面上之后自动执行，AJAX
+ Update
    + **props**
    + **componentWillReceiveProps**， 当一个组件从父组件里接收了参数，只要父组件的render函数重新执行，子组件的`componentWillReceiveProps`就会被执行，如果这个组件第一次存在于父组件中，不会执行，如果这个组件之前已经存在于父组件中，才会执行
    + `shouldComponentUpdate`，组件被更新之前自动执行，需要返回一个布尔值，如果返回false，那么就不会修改state的值
    + `componentWillUpdate`，组件被更新之前自动执行，如果`shouldComponentUpdate`返回true，会执行。返回false，不会执行
    + `render`
    + `componentDidUpdate`，组件更新完毕后执行
    + **states**
    + `shouldComponentUpdate`
    + `componentWillUpdate`
    + `render`
    + `componentDidUpdate`
+ Ummount
    + `componentWillUnmount`，当这个组件即将被页面剔除的时候，会被执行


### 3. Redux原理
##### 3.1 Redux工作流程
+ 每一个组件都从store里修改数据
+ action creators是修改数据的动作
+ store，存储了所有的数据
+ store只是存储数据，需要由reducers查询数据，然后告诉store，需要传递给组件什么数据，最后由store把对应的数据给组件
+ 使用原则
    - store必须是唯一的
    - 只有store能够改变自己的内容
    - Reducer必须是纯函数(指的是，给定固定的输入，就一定会有固定的输出，而且不会有任何副作用)
+ 核心API
    - createStore
    - store.dispatch
    - store.getState
    - store.subscribe
+ redux的中间件是指action和store之间，换句话说，中间件就是对dispatch方法的封装
+ redux-thunk可以让我们在action中写函数


##### 3.2 React组件优化
+ 属性传递优化
	- 调用函数时，在constructor中绑定this，因为在render中绑定，每次渲染都要再次绑定this
	- 传递值的时候，尽量把值先定义好，然后再传递，防止每次传递的时候都要 创建一个值
	- 组件间传递的时候，不建议把值全部展开`{...this.state}`
+ 多组件优化
+ key

### 4. 新版本带来的优化和新功能
+ 新的核心算法Fiber
+ render可以返回数组，字符串
+ 错误处理机制
+ Partals组件
+ 更好更快的服务端渲染
+ 体积更小，MIT协议
