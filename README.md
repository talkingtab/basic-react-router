# basic-react-router

What do you need for React routing? Often the answer is "not much".  The complexity of learning and implementing full scale routing can be overkill for many uses.
 
BRR exposes three and only three exports:

* `pushURL()`[^1]
* `<Route>`
* `<Switch>`


### Simple BRR Example
Create a React App using `create-react-app` then replace the contents of `src/App.js` with the following.

```
import React, { Component } from "react";
import { Switch, onRouterClick, Route } from "basic-react-router";

const Home = () => <p>There is no place like Home</p>;
const Room = () => <p>A room with a view</p>;

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={evt => onRouterClick("/", evt)} >Home</button>
                <button onClick={evt => onRouterClick("/room", evt)} >Room</button>

                <Switch>
                    <Route path="/" component={Home} />
                    <Route path="/room" component={Room}/>
                </Switch>
            </div>
        );
    }
}
export default App;
```

### <Route/> 

The `<Route>` component takes two required props: a `path` and a `component`. The `path` specifies the string to match and the `component` prop specifies what `<Component/>` is rendered on match. 

### PushURL

`pushURL()` is a method that pushes a `path` such as `/room/7` and onto the browser's history. This changes the state of any `<Switch>` components, causing them to be rendered. As a convenience t takes an optional second parameter, an `event`.

### `<Switch/>` and `<Route/>`

A `<Switch/>` takes a set of `<Route/>` components as children and `renders` one if it matches the current path. If the current path is `/room/7` then the component `<Room/>` will be rendered as though the whole `<Switch/>` element was replaced with 

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

### pushURL

`<Route>` and `<Switch>` provide a way to render a Component depending on the path. The other functionality needed is a way to control the path which is done using `pushURL`. 

``` 
[^1]: `pushURL()` is the new name for `onRouterClick()` in version v0.0.2