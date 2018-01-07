import React, { Component } from "react";
import createHistory from "history/createBrowserHistory";
import pathToRegexp from "path-to-regexp";

import Debug from "debug";
Debug.enable("basic-react-router");
// Debug.enable();
let debug = Debug("basic-react-router");

class RouterStore {
    constructor() {
        this.subscribers = [];
        this.history = createHistory();
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.location = this.history.location;
        this.subscribe = this.subscribe.bind(this);

        this.history.push.bind(this.history); // needed by onClick?
        this.history.listen(this.onChange); // must be called AFTER onChange is bound
    }
    onClick(name, event) {
        if (event) {
            event.preventDefault();
        }
        debug("onClick(): name is %s", name);
        // eslint-disable-next-line no-restricted-globals
        this.history.push(name);
    }

    subscribe(l) {
        debug("subscribe()");
        this.subscribers.push(l);
    }
    onChange(location, action) {
        debug(`onChange(): new location is ${location.pathname}`);
        this.location = location;
        this.subscribers.map(l => l(location));
    }
}
export class Route extends Component {
    constructor(props) {
        super();
        debug(
            "Route(): path is %s component is %s",
            props.path,
            props.component
        );
    }

    render() {
        let { component, path, ...other } = this.props;
        let match = true;
        return match
            ? React.createElement(this.props.component, this.props)
            : null;
    }
}

// holds <Route> only
export class Switch extends Component {
    constructor(props) {
        super(props);
        this.state = { path: theRouter.location.pathname };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        theRouter.subscribe(this.handleChange.bind(this));
    }
    handleChange(location) {
        console.log("Routes.handleChange, loc is %s", location.pathname);
        this.setState({ path: location.pathname });
    }
    matchpath(path, elpath) {
        debug("Switch.matchpath() path %s elpath is %s", path, elpath);
        if (path === elpath) {
            return {};
        }
        // treat elpath as a regex
        let keys = [];
        let re = pathToRegexp(elpath, keys);
        let match = re.exec(path);
        if (match === null) {
            return null;
        }
        let pnames = keys.map(k => {
            return k.name;
        });
        debug("pnames is %s", pnames);
        let params = {};
        pnames.forEach((p, i) => {
            params[p] = match[i + 1];
        }, params);
        return params;
    }

    render() {
        let { children } = this.props;
        // console.log("children is %s", React.Children.count(children));
        let match = null;
        let child;
        React.Children.forEach(children, element => {
            console.log("each");
            if (element.type !== Route) {
                throw new Error("Switch children must be <Route/>");
            }
            if (!element.props.path) {
                throw new Error("<Switch/> child <Route/> has no path");
            }
            if (match === null) {
                match = this.matchpath(this.state.path, element.props.path);
                child = element;
            }
        });
        if (match) {
            debug("Switch().render found match");
            let { path, component, ...other } = child.props;
            let outprops = { ...match, ...other };
            return React.cloneElement(child, { ...match, ...other });
        }
        debug("Switch().render no  match");
        return null;
    }
}
const theRouter = new RouterStore();
export const onRouterClick = theRouter.onClick;

export class Link extends React.Component {
    onClick = event => {
        event.preventDefault();
        const path = event.currentTarget.pathname;
        console.log("path is %s", path);
        // navigateTo(path);
    };
    render() {
        return (
            <a href={this.props.to} onClick={this.onClick}>
                {this.props.children}
            </a>
        );
    }
}

/*
const Link = props => {
    const onClick = e => {
        const aNewTab = e.metaKey || e.ctrlKey;
        const anExternalLink = props.href.startsWith("http");

        if (!aNewTab && !anExternalLink) {
            e.preventDefault();
            history.push(props.href);
        }
    };

    return (
        <a href={props.href} onClick={onClick}>
            {props.children}
        </a>
    );
};

*/
// EX
//
/*
const Routes = {
    "/": Home,
    "/isolog": Isolog,
    "/fireball": Fireball,
    "/all-the-primes": AllThePrimes,
    "/not-the-web": NotTheWeb
};

class App extends Component {
    render() {
        const Handler = PAGES[this.props.pathname] || FourOhFour;

        return <Handler />;
    }
}
*/
