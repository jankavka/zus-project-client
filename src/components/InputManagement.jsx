export const addInput = (counter, setCounter, maxNumberOfFields) => {
  if (counter < maxNumberOfFields) {
    setCounter((prev) => prev + 1);
  } else {
    alert("Dosažen maximální počet vstupních polí");
  }
};

export const removeInput = (index, counter, setCounter, setField) => {
  if (counter > 1) {
    setCounter((prev) => prev - 1);
    setField((prev) => {
      let newLocations = prev;
      newLocations[index] = " ";
      return [...newLocations];
    });
  } else {
    alert("Dosažen minimální počet vstupních polí (1)");
  }
};
