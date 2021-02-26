// STAR MATCH - Starting Template
//star
import utils from "./MatchScine";
const StarsDisplay = props => (
    <>
      { utils.range(1, props.count).map(startId => <div key= { startId } className="star"></div>) }
    </>
  );

export default StarsDisplay;