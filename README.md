# basic-react-router

What do you need for React routing? Often the answer is "not much".  The complexity of learning and implementing full scale routing can be overkill for many uses.
 
BRR exposes three and only three exports:

* `pushURL()`[^1]
* `<Route>`
* `<Switch>`


### Getting started: A Create-react-app  BRR Example
Create a React App using `create-react-app` then replace the contents of `src/App.js` with the following.

```
import React, { Component } from "react";

import { Switch, onRouterClick, Route } from "./basic-react-router";

const Home = () => <p>There is no place like Home</p>;
const Room = ({id}) => <p>A room with a {id}</p>;
const NotFound = () => <p> 404 ... duh</p>;
const Another = () => <p>Another day another room</p>;

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={evt => onRouterClick("/", evt)} >Home</button>
                <button onClick={evt => onRouterClick("/room/view", evt)} >Room</button>

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







[^1]: `pushURL()` is the new name for `onRouterClick()` in version v0.0.2. `onRouterClick()` is deprecated./o/on