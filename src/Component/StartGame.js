function StartGame(props) {
    return (
      <div className="game">
        <div className="body">
          <div className="container">
            <div className="game-name">{ props.title }</div>
            <div className="game-play">
              <button className="btn btn-default" type="submit" onClick = { props.startMatchGame }>
                Play Game</button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default StartGame; 