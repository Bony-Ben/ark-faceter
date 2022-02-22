import FacetTile from "./components/FacetTile";
import NumericFormField from "./components/NumericFormField";
import { useState } from "react";

function App() {
  const [size, setSize] = useState(10);
  const [min1, setMin1] = useState(0);
  const [min2, setMin2] = useState(0);
  const [max, setMax] = useState(10);
  const [chance, setChance] = useState(75);

  const [facetList1, setFacetList1] = useState([]);
  const [facetList2, setFacetList2] = useState([]);
  const [facetList3, setFacetList3] = useState([]);
  return (
    <div className="bg-slate-800 min-h-screen text-white p-2">
      <h1 className="text-3xl text-center mb-2">Ark Faceter</h1>
      <form className="flex flex-col gap-3">
        <NumericFormField
          name="Ability Stone Size"
          minValue={1}
          maxValue={10}
          value={size}
          onChange={(value) => setSize(value)}
        />
        <NumericFormField
          name="First Target"
          maxValue={size}
          value={min1}
          onChange={(value) => setMin1(value)}
        />
        <NumericFormField
          name="Second Target"
          maxValue={size}
          value={min2}
          onChange={(value) => setMin2(value)}
        />
        <NumericFormField
          name="Max Negative Engraving Effect"
          maxValue={size}
          value={max}
          onChange={(value) => setMax(value)}
        />
        <NumericFormField
          name="Success Chance"
          minValue={0}
          maxValue={100}
          value={chance}
          onChange={(value) => setChance(value)}
        />
      </form>
      <div className="flex flex-col gap-3 mt-4">
        <FacetTile data={facetList1} size={size} />
        <FacetTile data={facetList2} size={size}/>
        <FacetTile data={facetList3} size={size}/>
      </div>
    </div>
  );
}

export default App;
