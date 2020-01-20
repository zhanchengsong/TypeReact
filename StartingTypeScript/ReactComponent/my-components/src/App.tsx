import React from 'react';
import logo from './logo.svg';
import './App.css';
import Confirm from './Confirm';
import './Confirm.css';

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
 }
// First generic type is for Props, second is for state 
const Confirm: React.SFC<IProps> = (props) => {
  public static getDerivedStateFromProps(props: {}, state: IState) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }
  // Timer
  private timer: number = 0;
  // Create Constructor 
  constructor(props: {}) {
    super(props);
    this.state = {
     confirmOpen: false,
     confirmMessage: "Please hit the confirm button",
     confirmVisible: true,
     countDown: 10
    };
    
   }
  // This method is invoked when the component is mounted lifecycle 
  public componentDidMount() {
    // After every second (1000ms), calls the handle ticking
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (
          <button onClick={this.handleConfirmClick}>Confirm</button>
        )}
        <Confirm 
          open={this.state.confirmOpen}
          title = "React and TypeScript"
          content="Are you sure you want to learn React and TypeScript?"
          onCancelClick={this.handleCancelConfirmClick}
          onOkClick={this.handleOkConfirmClick} />
      </div>
    );
  }

  // This message handles the ticking process 
  private handleTimerTick() {
    this.setState(
      {
        confirmMessage: `Please hit the confirm button ${
          this.state.countDown
        } secs to go`,
        countDown: this.state.countDown - 1
      }, 
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "Too late to confirm!",
            confirmVisible: false
          });
        }
      }
    );
  }

  private handleCancelConfirmClick = () => {
    console.log("Cancel clicked");
    this.setState({ confirmOpen: false,
      confirmMessage: "Take a break, I'm sure you will later ..." });
      clearInterval(this.timer);
  };
  
  private handleOkConfirmClick = () => {
    console.log("Ok clicked");
    this.setState({confirmOpen: false,
      confirmMessage: "Cool, carry on reading!"});
      clearInterval(this.timer);
  };
  // Set state notifies the underlaying component to rerender 
  private handleConfirmClick = () => {
    this.setState({confirmOpen: true});
    clearInterval(this.timer);
  }

}

export default App;
