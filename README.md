# basic-react-router

What do I need in a React Router? Not much. More than anythihg I need something that is not overly complex. It should be simple to install and simple to use and it should not get in my way.

### BRR Usage
```
import { Switch, onRouterClick, Route } from "./Router";
...
<button onClick={(evt) => onRouterClick("/path2",evt)>Path2</button>
...
<Switch>
	<Route path="/" component={Content1} catname="3toes" />
	<Route path="/path2" component={Content1} catname="3toes" />
	<Route path="/duck" component={Content2} catname="muffy" />
	<Route path="/room/:id" component={Room} catname="spike" />
</Switch>
```



### What is a `<Switch>` and what is a `<Route>`?

A `<Switch>` takes a set of `<Route>` components as children and `renders` one if it matches the current path. If the current path is `/room/7` then the component `<Room>` will be rendered as though the whole `<Switch/>` element was replaced with 

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

### onRouterClick

`<Route>` and `<Switch>` provide a way to render a Component depending on the path. The other functionality needed is a way to control the path which is done using `onRouterClick`. 

``` 