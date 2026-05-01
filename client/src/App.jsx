import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreCard from './components/ScoreCard';
import History from './components/History';

const API_URL = import.meta.env.VITE_API_URL;
const MAX_CHARS = 5000;

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch history on load
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await axios.post(API_URL, { text });
      setResult(res.data);
      fetchHistory(); // refresh history after new evaluation
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Something went wrong. Make sure your server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <div className="header">
        <h1>Eval<span>ytics</span></h1>
        <p>Evaluate any AI-generated text for safety, helpfulness, factuality & calibration</p>
      </div>

      {/* Input */}
      <div className="input-section">
        <label htmlFor="ai-text">Paste AI-generated text below</label>
        <textarea
          id="ai-text"
          placeholder="Paste any AI-generated text here — a ChatGPT response, a Claude answer, anything. Evalytics will score it across 4 quality dimensions..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_CHARS}
        />
        <p className={`char-count ${text.length > MAX_CHARS * 0.9 ? 'warning' : ''}`}>
          {text.length} / {MAX_CHARS}
        </p>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading || text.trim().length === 0}
        >
          {loading ? 'Evaluating...' : 'Evaluate Text'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="error-box">
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading-box">
          <div className="spinner" />
          <p>Claude is evaluating your text...</p>
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <ScoreCard result={result} />
      )}

      {/* History */}
      <History history={history} />

    </div>
  );
}

export default App;