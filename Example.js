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
