const FormInput = ({ label, name, value, onChange, isInput=true, required=false}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {isInput ? (
        <input
          onChange={onChange}
          value={value}
          id={name}
          name={name}
          className="form-control mb-2"
          type="text"
          required={required}
        />
      ) : (
        <textarea
          onChange={onChange}
          value={value}
          name={name}
          id={name}
          className="form-control"
          type="text"
          style={{minHeight: "150px"}}
        />
      )}
    </div>
  );
};

export default FormInput;
