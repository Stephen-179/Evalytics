const getScoreClass = (score) => {
  if (score >= 7) return 'score-high';
  if (score >= 4) return 'score-medium';
  return 'score-low';
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const History = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="history-section">
        <h2>Past Evaluations</h2>
        <p className="no-history">
          No evaluations yet. Submit your first text above.
        </p>
      </div>
    );
  }

  return (
    <div className="history-section">
      <h2>Past Evaluations</h2>
      {history.map((item) => (
        <div className="history-item" key={item._id}>
          <div className={`history-badge ${getScoreClass(item.scores.overall)}`}>
            {item.scores.overall.toFixed(1)}
          </div>
          <div className="history-text">
            <p className="snippet">
              {item.inputText?.substring(0, 80)}
              {item.inputText?.length > 80 ? '...' : ''}
            </p>
            <p className="date">{formatDate(item.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;