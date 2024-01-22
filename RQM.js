const { useState, useEffect } = React;

function QuoteMachine() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [tweetHref, setTweetHref] = useState('https://twitter.com/intent/tweet');

  const fetchQuote = async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    setQuote(data.content);
    setAuthor(data.author);

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${data.content}" - ${data.author}`)}`;
    setTweetHref(twitterUrl);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box" className="quote-container">
      <p id="text" className="quote-text">{quote}</p>
      <p id="author" className="quote-author">{author}</p>
      <button id="new-quote" className="new-quote-btn" onClick={fetchQuote}>New Quote</button>
      <a id="tweet-quote" className="tweet-quote-btn" href={tweetHref} target="_blank">Tweet</a>
    </div>
  );
}

ReactDOM.render(<QuoteMachine />, document.getElementById('root'));
