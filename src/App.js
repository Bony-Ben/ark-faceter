import FacetTile from "./components/FacetTile";
import NumericFormField from "./components/NumericFormField";
import Brain from "./Brain.js";
import { useState, useEffect } from "react";

const history = [];

function App() {
  const [size, setSize] = useState(6);
  const [min1, setMin1] = useState(0);
  const [min2, setMin2] = useState(0);
  const [max, setMax] = useState(6);
  const [chance, setChance] = useState(75);

  const [facetList1, setFacetList1] = useState([]);
  const [facetList2, setFacetList2] = useState([]);
  const [facetList3, setFacetList3] = useState([]);

  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const [percent3, setPercent3] = useState(0);

  const undo = () => {
    const item = history.pop();
    if (item === 1) {
      setFacetList1(facetList1.slice(0, facetList1.length - 1));
    } else if (item === 2) {
      setFacetList2(facetList2.slice(0, facetList2.length - 1));
    } else {
      setFacetList3(facetList3.slice(0, facetList3.length - 1));
    }
  };

  const getListData = (list) => {
    const success = list.filter((f) => f).length;
    return { success, fail: list.length - success };
  };

  const resetLists = () => {
    setFacetList1([]);
    setFacetList2([]);
    setFacetList3([]);
  };

  useEffect(() => {
    const brain = new Brain(size, min1, min2, max);
    const listData1 = getListData(facetList1);
    const listData2 = getListData(facetList2);
    const listData3 = getListData(facetList3);
    const results = brain.calc(
      listData1.success,
      listData2.success,
      listData3.success,
      listData1.fail,
      listData2.fail,
      listData3.fail,
      chance / 100
    );
    setPercent1((results.a * 100).toFixed(3));
    setPercent2((results.b * 100).toFixed(3));
    setPercent3((results.c * 100).toFixed(3));
  }, [size, min1, min2, max, chance, facetList1, facetList2, facetList3]);

  return (
    <div className="bg-slate-800 min-h-screen text-white p-4">
      <h1 className="text-3xl text-center mb-2">Ark Faceter</h1>
      <form className="flex flex-col gap-4">
        <NumericFormField
          name="Ability Stone Size"
          minValue={1}
          maxValue={10}
          value={size}
          onChange={(value) => {
            resetLists();
            setSize(value);
          }}
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
      <div className="flex flex-col gap-4 my-4">
        <FacetTile
          data={facetList1}
          size={size}
          onSuccess={() => {
            setChance(Math.max(25, chance - 10));
            setFacetList1([...facetList1, true]);
            history.push(1);
          }}
          onFail={() => {
            setChance(Math.min(75, chance + 10));
            setFacetList1([...facetList1, false]);
            history.push(1);
          }}
          percent={percent1}
        />
        <FacetTile
          data={facetList2}
          size={size}
          onSuccess={() => {
            setChance(Math.max(25, chance - 10));
            setFacetList2([...facetList2, true]);
            history.push(2);
          }}
          onFail={() => {
            setChance(Math.min(75, chance + 10));
            setFacetList2([...facetList2, false]);
            history.push(2);
          }}
          percent={percent2}
        />
        <FacetTile
          data={facetList3}
          size={size}
          onSuccess={() => {
            setChance(Math.max(25, chance - 10));
            setFacetList3([...facetList3, true]);
            history.push(3);
          }}
          onFail={() => {
            setChance(Math.min(75, chance + 10));
            setFacetList3([...facetList3, false]);
            history.push(3);
          }}
          percent={percent3}
        />
      </div>
      <div className="flex gap-4">
        <button
          className="bg-slate-300 hover:bg-white text-black rounded p-1"
          onClick={resetLists}
        >
          Reset
        </button>
        <button
          className="bg-slate-300 hover:bg-white text-black rounded p-1"
          onClick={undo}
        >
          Undo
        </button>
      </div>
    </div>
  );
}

export default App;
