## [v1.3.0]
> October 17, 2018

- bug fix: when a <Switch/> containted only a default <Route/> it failed
<Switch>
    <Route component={Home}/>
</Switch>

## [v1.1.0]
> Feb 9, 2018

- updated CHANGES.md
- updated README.md to no longer use `OnRouterClick()` in the example
- added more text to README.md
- in `index.js` disable the `debugging`

## [v1.0.0]
> Jan 26, 2018

- added README.md so the NPM page is updated

## [v0.0.3]
> Jan 10, 2018

- Added CHANGES.md
- DEPRECATED onRouterClick();
- ADDED pushURL();

`pushURL()` has exactly the same functionality as`onRouterClick()` but is a more intuititve and helpful name.
