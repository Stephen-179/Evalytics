const ScoreBar = ({ score }) => {
  const getColor = (s) => {
    if (s >= 7) return '#1d7a5f';
    if (s >= 4) return '#e6a817';
    return '#c0392b';
  };

  return (
    <div className="score-bar-track">
      <div
        className="score-bar-fill"
        style={{
          width: `${score * 10}%`,
          background: getColor(score)
        }}
      />
    </div>
  );
};

export default ScoreBar;