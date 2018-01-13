import React, { Component } from "react";

import { Switch, pushURL, Route } from "basic-react-router";

const Content = ({ name }) => <h1>There is no place like {name} {id}</h1>;

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={evt => pushURL("/", evt)} >/</button>
                <button onClick={evt => pushURL("/home", evt)} >Home</button>
                <Switch>
                    <Route path="/" component={Content} name="NYC" />
                    <Route path="/home" component={Content} name="Home" />
                    <Route path="/room/:id" component={Room} name="A room with a" />
                </Switch>
            </div>
        );
    }
}

export default App;
