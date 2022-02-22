import FacetButton from "./FacetButton";
import "./diamond.scss";

function FacetTile(props) {
  const diamondList = props.data.map((item, index) => {
    if (item) {
      return <div key={index} className="diamond success"></div>;
    } else {
      return <div key={index} className="diamond fail"></div>;
    }
  });
  while (diamondList.length < props.size) {
    diamondList.push(<div key={diamondList.length} className="diamond"></div>);
  }

  return (
    <div className="flex gap-2 items-center">
      {diamondList}
      <FacetButton
        disabled={props.data.length >= props.size}
        onSuccess={props.onSuccess}
        onFail={props.onFail}
        percent={props.percent}
      ></FacetButton>
    </div>
  );
}

export default FacetTile;
