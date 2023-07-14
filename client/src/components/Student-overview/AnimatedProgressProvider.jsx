import React from "react";
import { Animate } from "react-move";

class AnimatedProgressProvider extends React.Component {
  interval = undefined;
  timeout = undefined;

  state = {
    isAnimated: true
  };

  static defaultProps = {
    valueStart: 0
  };

  componentDidMount() {
    if (this.props.once) {
      this.timeout = window.setTimeout(() => {
        this.setState(
          {
            isAnimated: !this.state.isAnimated
          },
          () => {
            this.startAnimation();
          }
        );
      }, this.props.duration * 2000);
    } else {
      this.startAnimation();
    }
  }
  
  startAnimation() {
    this.setState({
      isAnimated: !this.state.isAnimated
    });
  }
  

  render() {
    return (
      <Animate
        start={() => ({
          value: this.props.valueStart
        })}
        update={() => ({
          value: [
            this.state.isAnimated ? this.props.valueEnd : this.props.valueStart
          ],
          timing: {
            duration: this.props.duration * 1000,
            ease: this.props.easingFunction
          }
        })}
      >
        {({ value }) => this.props.children(value)}
      </Animate>
    );
  }
}

export default AnimatedProgressProvider;
