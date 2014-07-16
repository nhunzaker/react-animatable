react-animatable
================

Here's a demo: http://www.natehunzaker.com/react-animatable/

For animated charts, I've been pairing this.forceUpdate with an easing function with a fair amount of success. I ended up moving this direction because it was way faster and clearer for DOM animation (such as with SVG paths). I think it's because setState({ tweenedValue: x }) produces a lot of garbage when used to trigger many 60 fps animations.

`forceUpdate` works really well here. In the example I can clearly see in the chrome timeline tool that all of the animation frames firing sequentially, with a single write to the DOM. It's beautiful.