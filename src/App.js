import { PureComponent } from "react";
import "./styles.css";
import Timer from "./Timer";

const MAX_RUNNING_TIMERS = 3;

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeNum: "",
      timers: []
    };
  }

  getActiveTimers = () => {
    return this.state.timers.reduce((acc, timer) => {
      if (timer.isPlaying) {
        return acc + 1;
      }
      return acc;
    }, 0);
  };

  onChange = (e) => {
    this.setState({
      timeNum: e.target.value
    });
  };

  onClick = () => {
    if (this.state.timeNum !== "") {
      this.setState({
        timers: [
          ...this.state.timers,
          {
            isPlaying: this.getActiveTimers() <= MAX_RUNNING_TIMERS,
            timeNum: this.state.timeNum
          }
        ]
      });
    }
  };

  onTimerStart = (id) => {
    this.setState((prevState) => {
      return {
        timers: prevState.timers.map((timer) => ({
          ...timer,
          isPlaying: timer.id === id
        }))
      };
    });
  };

  onTimerPause = (id) => {
    this.setState((prevState) => {
      return {
        timers: prevState.timers.map((timer) => ({
          ...timer,
          isPlaying: timer.id !== id
        }))
      };
    });
  };

  render() {
    return (
      <div className="App">
        <input
          type="number"
          onChange={this.onChange}
          value={this.state.timeNum}
        />
        <button onClick={this.onClick}>Add</button>
        {this.state.timers.map((timer, index) => (
          <Timer
            key={index}
            id={index}
            onStart={this.onTimerStart}
            onPause={this.onTimerPause}
            numMs={timer.timeNum}
            isPlaying={timer.isPlaying}
          />
        ))}
      </div>
    );
  }
}
