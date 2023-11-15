import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {

  intervalId: number | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  //Adding this back in like I did in the second exercise. 
  //this is added to handle the unmounting of the component
  componentWillUnmount() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  renderGraph() {
    if (this.state.showGraph) {
      return (<Graph data={this.state.data}/>)
    }
  }

  getDataFromServer() {

    // let x = 0;
    // const interval = setInterval(()=>{

    if (this.intervalId === null) {
      // Check if an interval is already running
      this.intervalId = window.setInterval(() => {
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
          // Update the state by creating a new array of data that consists of
          // Previous data in the state and the new data from server
          this.setState({
            data: serverResponds,
            showGraph: true,
          });
        });

        //The below commented-out code was in the solution but there was a violation handout, which means the interval wasn't being cleared properly.

        // x++;
        // if (x > 1000) {
        //   //clear interval is used to stop the interval from running more than 1000 times.
        //   clearInterval(interval);
        // }
      }, 100);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank Merge & Co Task 3
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button" onClick={() => {this.getDataFromServer()}}>Start Streaming Data</button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
