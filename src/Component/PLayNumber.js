//node 1-9
const PlayNumber = props => (
    <button 
      style= {{ backgroundColor: colors[props.status] }}run 
      className="number" 
      //nhận giá trị onClick từ nút cha
      onClick={() => props.onClick(props.number, props.status)}>
      {props.number}
    </button>
);

// Color Theme
const colors = {
    available: 'lightgray',//xam
    used: 'lightgreen',//xanh la cay
    wrong: 'lightcoral',//do
    candidate: 'deepskyblue',//xanh da troi
};
  
export default PlayNumber;