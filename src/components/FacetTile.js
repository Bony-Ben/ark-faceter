import FacetButton from "./FacetButton";
import "./diamond.scss";

function FacetTile(props) {
  const diamondList = props.data.map((item) => {
    if (item) {
      return <div className="diamond success"></div>;
    } else {
      return <div className="diamond fail"></div>;
    }
  });
  while (diamondList.length < props.size) {
    diamondList.push(<div className="diamond"></div>);
  }

  return (
    <div className="flex gap-2 items-center">
      {diamondList}
      <FacetButton></FacetButton>
    </div>
  );
}

export default FacetTile;
