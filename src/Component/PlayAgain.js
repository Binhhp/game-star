//button play again
function PlayAgain(props){
    return(
        <div className="game-done">
            <div 
                className = "message"
                style={{ color: props.gameStatus === 'lost' ? 'red' : 'green'}}>
                {props.gameStatus === 'lost' ? 'Game over' : 'Win'}
            </div>
            <button className="btn btn-default" onClick={ props.onClick } className="play-again">Play again</button>
            <button className="btn btn-default" onClick = { props.exit } className="exit">Exit</button>
        </div>
    );
};

export default PlayAgain;