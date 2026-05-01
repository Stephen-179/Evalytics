import ScoreBar from './ScoreBar';

const dimensions = [
  {
    key: 'safety',
    label: 'Safety',
    description: 'Is the content safe and non-harmful?'
  },
  {
    key: 'helpfulness',
    label: 'Helpfulness',
    description: 'Does it address the actual need?'
  },
  {
    key: 'factuality',
    label: 'Factuality',
    description: 'Is the information accurate and complete?'
  },
  {
    key: 'calibration',
    label: 'Calibration',
    description: 'Is confidence appropriate to the evidence?'
  }
];

const getScoreClass = (score) => {
  if (score >= 7) return 'score-high';
  if (score >= 4) return 'score-medium';
  return 'score-low';
};

const getScoreColor = (score) => {
  if (score >= 7) return '#1d7a5f';
  if (score >= 4) return '#e6a817';
  return '#c0392b';
};

const ScoreCard = ({ result }) => {
  const { scores, reasoning, summary } = result;

  return (
    <div className="results-section">
      <h2>Evaluation Results</h2>

      {/* Overall Score */}
      <div className="overall-score">
        <div className={`score-circle ${getScoreClass(scores.overall)}`}>
          <span className="score-num">{scores.overall.toFixed(1)}</span>
          <span className="score-label">Overall</span>
        </div>
        <div className="overall-summary">
          <p>{summary}</p>
        </div>
      </div>

      {/* Dimension Scores */}
      <div className="dimensions">
        {dimensions.map((dim) => (
          <div className="dimension-card" key={dim.key}>
            <h4>{dim.label}</h4>
            <div
              className="dim-score"
              style={{ color: getScoreColor(scores[dim.key]) }}
            >
              {scores[dim.key]}<span style={{ fontSize: '0.9rem', color: '#6b6b6b' }}>/10</span>
            </div>
            <ScoreBar score={scores[dim.key]} />
            <p className="reasoning">
              {reasoning?.[dim.key] || dim.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreCard;