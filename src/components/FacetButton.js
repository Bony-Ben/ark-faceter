import { useState } from "react";
import "./diamond.scss";

function FacetButton(props) {
  const [faceting, setFaceting] = useState(false);
  if (faceting) {
    return (
      <div className="flex gap-2" onBlur={() => setFaceting(false)}>
        <button
          className="bg-slate-300 hover:bg-white text-black rounded p-1"
          onMouseDown={() => {
            props.onSuccess();
            setFaceting(false);
          }}
        >
          <div className="small-diamond success"></div>
        </button>
        <button
          className="bg-slate-300 hover:bg-white text-black rounded p-1"
          onMouseDown={() => {
            props.onFail();
            setFaceting(false);
          }}
        >
          <div className="small-diamond fail"></div>
        </button>
      </div>
    );
  } else if (!props.disabled) {
    return (
      <div>
        <button
          className="bg-slate-300 hover:bg-white text-black rounded p-1"
          onClick={() => setFaceting(true)}
        >
          <img className="inline" width="15" height="15" src="hammer.ico" />{" "}
          %{props.percent}
        </button>
      </div>
    );
  }
  return null;
}

export default FacetButton;
