import React, { PureComponent } from "react";

/**
 * {
 *    id
 *    numMs: number
 *    isPlaying
 *    onStart
 *    onPause
 * }
 */
class Timer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numMs: props.numMs,
      now: Date.now(),
      isPlaying: props.isPlaying
    };
  }

  checkAndPlay = () => {
    if (this.state.isPlaying) {
      this.tick();
      this.props.onStart(this.props.id);
    } else {
      this.props.onPause(this.props.id);
    }
  };

  tick = () => {
    requestAnimationFrame(() => {
      this.setState((prevState) => {
        const now = Date.now();
        const timeElapsed = now - prevState.now;
        const timeRemaining =
          timeElapsed > prevState.numMs ? 0 : prevState.numMs - timeElapsed;
        if (timeRemaining >= 0) {
          return {
            numMs: timeRemaining,
            now: Date.now()
          };
        }
        return prevState;
      }, this.checkAndPlay);
    });
  };

  componentDidMount() {
    this.tick();
  }

  onToggleClick = () => {
    this.setState(
      (prevState) => ({
        isPlaying: !prevState.isPlaying,
        now: !prevState.isPlaying ? Date.now() : prevState.now
      }),
      () => {
        this.tick();
      }
    );
  };

  render() {
    return (
      <div>
        {this.state.numMs}
        <button onClick={this.onToggleClick}>
          {this.state.isPlaying ? "Pause" : "Resume"}
        </button>
      </div>
    );
  }
}

export default Timer;
