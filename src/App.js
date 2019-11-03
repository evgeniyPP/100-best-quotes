import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
  }

  componentDidMount() {
    fetch("./quotes.json")
      .then(response => response.json())
      .then(json => {
        this.setState({
          quotes: json
        });
        this.pickRandomQuote();
      });

    document.addEventListener("keyup", e => {
      if (e.keyCode === 32) {
        e.preventDefault();
        this.pickRandomQuote();
      }
    });
  }

  pickRandomQuote() {
    let randomIndex = Math.round(Math.random() * this.state.quotes.length - 1);
    document.getElementById("text").innerHTML =
      this.state.quotes[randomIndex].quote || this.state.quotes[0].quote;
    document.getElementById("author").innerHTML =
      this.state.quotes[randomIndex].author || this.state.quotes[0].author;
    this.setRandomColor();
  }

  setRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    document.body.style.backgroundColor = color;
    document.getElementById("twitter-icon").style.color = color;
    document.getElementById("new-quote").style.backgroundColor = color;
  }

  render() {
    return (
      <div id="quote-box">
        <h2 id="text"> </h2>
        <h3 id="author"> </h3>
        <div className="buttons">
          <button
            id="new-quote"
            onClick={() => {
              this.pickRandomQuote();
            }}
          >
            Новая цитата
          </button>
          <a id="tweet-quote" href="https://twitter.com/intent/tweet">
            <i class="fab fa-twitter-square" id="twitter-icon"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default App;
