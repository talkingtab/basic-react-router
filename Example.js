import React, { Component } from "react";

import { Switch, onRouterClick, Route } from "../lib/index.js";


const Content1 = ({ catname }) => <h1>Content One {catname}</h1>;
const Content2 = ({ catname }) => <h2>{catname}</h2>;
const Room = ({ id, catname }) => (
    <h2>
        Room is {id} name is {catname}
    </h2>
);

class App extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <div>
                        <button
                            onClick={evt => onRouterClick("/", evt)}
                        >
                            Page1
                        </button>
                        <button
                            raised
                            color="primary"
                            onClick={evt => onRouterClick("/page2", evt)}
                        >
                            Page2
                        </button>
                        <button
                            raised
                            color="primary"
                            onClick={evt => onRouterClick("/duck", evt)}
                        >
                            Duck
                        </button>
                        <button
                            raised
                            color="primary"
                            onClick={evt => onRouterClick("/room/88", evt)}
                        >
                            Room
                        </button>
                    </div>
                </div>
                <Switch>
                    <Route path="/" component={Content1} catname="3toes" />
                    <Route
                        path="/page2"
                        component={Content1}
                        catname="bigfoot"
                    />
                    <Route path="/duck" component={Content2} catname="muffy" />
                    <Route path="/room/:id" component={Room} catname="spike" />
                </Switch>
            </div>
        );
    }
}

// export default withRouter()(App);
export default App;
