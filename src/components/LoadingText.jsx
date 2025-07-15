import { useEffect, useState } from "react";

const LoadingText = ({isHidden}) => {
  const [text, setText] = useState("Načítám");
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
    //sets number based on previous state
      setNumber((prev) => {
        if (prev < 3) {
          setText((prevText) => prevText + ".");
          return prev + 1;
        } else {
          setText("Načítám");
          return 0;
        }
      });
    }, 500);

    //clean-up function for interval (has to be called for example as an arrow func)
    return () => clearInterval(interval);
  }, []);

  return (
    <div hidden={isHidden}>
      <p>
        {text}
      </p>
    </div>
  );
};

export default LoadingText;
