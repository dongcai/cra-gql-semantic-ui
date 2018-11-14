import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>
          My first Apollo app{" "}
          <span role="img" aria-label="rocket">
            🚀
          </span>
        </h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    );
  }
}

export default Home;
