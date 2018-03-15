# basic-react-router

What do you need for React routing? Often the answer is "not much".  The complexity of learning and implementing full scale routing can be overkill for many uses.
 
BRR exposes three and only three exports:

* `pushURL()`[^1]
* `<Route>`
* `<Switch>`


### Getting started
All the examples use create-react-app. [^2] Assuming the latest version of npm (with npx is installed already):

```
npx create-react-app brr-example
cd brr-example
```
Then replace App.js in the brr-example/src directory with one of the samples and 
``` 
npm start
```

#### The first create-react-app BRR Example
Replace the contents of `src/App.js` with the following code. Run the example by using `npm run start`.

```
import React, { Component } from "react"
import { Switch, pushURL, Route } from "./basic-react-router";

const Home = () => <p>You are home</p>;
const Room = () => <p>You are in a room</p>;

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={evt => pushURL("/", evt)} >Home</button>
                <button onClick={evt => pushURL("/room", evt)} >Room</button>

                <Switch>
                    <Route path="/room" component={Room} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
```
*NOTES on the above code*

Two trivial components, `Home` and `Room` are defined. `App.render()` has two buttons and a BRR `<Switch/>`. In the `<Switch>` are two `<Route/>` components. Clicking the buttons will change which component is rendered.

#### Adding a default `<Route\>` 

In the above example, when you type a url that does not match `/` or `/room`, it does not work. You can, and should add a **default route**  by adding a `<Route/>` with *no* `path` property.

```
import React, { Component } from "react";
import { Switch, pushURL, Route } from "./basic-react-router";

const Home = () => <p>You are home</p>;
const Room = () => <p>You are in a room</p>;
const NotFound = () => <p> 404 ... duh</p>;   // <-- NEW


class App extends Component {
    render() {
        return (
            <div>
                <button onClick={evt => pushURL("/", evt)} >Home</button>
                <button onClick={evt => pushURL("/room/view", evt)} >Room</button>

                <Switch>
                    <Route component={NotFound} /> // <-- NEW
                    <Route path="/" component={Home} />
                    <Route path="/room" component={Room} />
                </Switch>
            </div>
        );
    }
}

export default App;
```

```
import React, { Component } from "react";

import { Switch, pushURL, Route } from "./basic-react-router";

const Home = () => <p>There is no place like Home</p>;
const Room = ({id}) => <p>A room with a {id}</p>;
const NotFound = () => <p> 404 ... duh</p>;
const Another = () => <p>Another day another room</p>;

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={evt => pushURL("/", evt)} >Home</button>
                <button onClick={evt => pushURL("/room/view", evt)} >Room</button>

                <Switch>
                    <Route component={NotFound} />
                    <Route path="/" component={Home} />
                    <Route path="/room/:id" component={Room}/>
                    <Route path="/another" component={Another} />
                </Switch>
            </div>
        );
    }
}

export default App;
```
**NOTES on the above code**

There are four trivial React components, `<Home/>`, `<Room/>`, `<NotFound/>` and `<Another\>`. Note that `<Room/>` takes a parameter, the `id`. There are two butons, one which pushes the route `/` and the other pushes the route `/room/view`. There is a `<Switch/>` component. When it is rendered, it finds the current url in the browser, then walks through the `<Route/>` components, comparing the URL with the `path`. At first the `<Home\>` component will be rendered because it matches the current path. Clicking the `Room` button will push the `/room/view` URL causing the `<Room\>` component to be rendered as `A room with a view` because the `id` in this case is `view`. You could manually enter `/room/dog` in the browser in which case `<Room\>` component would be rendered as `A room with a dog`. The url `/room` does **not** match the `/room/:id` route because it has no `id`. If you manually enter the url `/room` then the `<NotFound/>` component will be rendered

### `<Switch/>` and `<Route/>`

A `<Switch/>` takes a set of `<Route/>` components as children and `renders` one if it matches the current path. In the example below, if the current path is `/room/7` then the component `<Room/>` will be rendered as though the whole `<Switch/>` element was replaced with 

```
<Room id=7 catname="spike"\>
```

When `<Switch/>`renders a path it passes any parameters from route matching, for example `id=7` and any props other than the `component` and `path`. You can of course add more path parameters and more props: 

```
<Route 
	path="/room/:id/:sector/:seat" 
	component={Room} 
	mousename="super"
	dogname="fluffy" 
	catname="spike" />
	
```

Would match a path `/room/7/right/hot`
and cause a component to be instanstiated as 


```
<Room 
	id=7
	sector="right"
	seat="hot"
	catname="spike"
	mousename="super"
	dogname="fluffy" \>
```

### `<Route/>`

The `<Route>` component takes one required props, a `component` and one optional prop, a `path`. The `path` specifies the string to match and the `component` prop specifies what `<Component/>` is rendered on match. 

A `<Route/>` without a path component is used in when no other `<Route/>` matches a path. The order of the default route inside the `<Switch/>` element does not matter - all other `<Route/>` elements will be compared first and only if none match will the default be used. 



```
	<Switch>
		<Route path="/" component={Home} />
		<Route component={The404} />
		<Route path="/room" component={Room}/>
	</Switch>
```

When no defaut route is specified and no other route matches `<Switch/>` renders `null`.

### `PushURL()`

`pushURL()` is a method that pushes a `path` such as `/room/7` and onto the browser's history. This changes the state of any `<Switch>` components, causing them to be rendered. As a convenience `pushURL()` takes an optional second parameter, an `event`. If present, `pushURL()` simply calls `event.preventDefault()` in order to prevent the event from bubbling up







[^1]: `pushURL()` is the new name for `onRouterClick()` after version v0.0.2. `onRouterClick()` is deprecated.

[^2]: See the create-react-app [page](https://github.com/facebook/create-react-app).
