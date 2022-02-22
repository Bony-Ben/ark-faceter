function NumericFormField(props) {
  const onChange = (event) => {
    props.onChange(
      Math.min(
        props.maxValue,
        Math.max(props.minValue, Math.floor(event.target.value))
      )
    );
  };
  return (
    <label>
      {props.name}:
      <input
        className="rounded text-black px-1 ml-2 w-16"
        type="number"
        value={props.value}
        onChange={onChange}
      ></input>
    </label>
  );
}

NumericFormField.defaultProps ={
  minValue: 0,
  maxValue: Infinity
}

export default NumericFormField;
