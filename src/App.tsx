import { useEffect, useState } from "react";
import SeatMap from "./BusLayout/BusLayout";
import { IBusLayout } from "./interfaces";

const App = () => {
  const [data, setData] = useState<IBusLayout>();
  const [num, setNum] = useState(1);

  const handleClick = (num: number) => {
    setNum(num);
  };

  useEffect(() => {
    const getData = () => {
      fetch(`./layout${num}.json`)
        .then(function (response) {
          return response.json();
        })
        .then((data) => setData(data));
    };
    getData();
  }, [num]);

  return (
    data && (
      <>
        <button onClick={() => handleClick(1)}>Layout 1</button>
        <button onClick={() => handleClick(2)}>Layout 2</button>
        <button onClick={() => handleClick(3)}>Layout 3</button>
        <button onClick={() => handleClick(4)}>Layout 4</button>
        <button onClick={() => handleClick(5)}>
          Layout 5 (Low Floor AC/NON AC Seater 2+2 )
        </button>
        <h1>Layout {num}</h1>
        <SeatMap layout={data} />
      </>
    )
  );
};

export default App;
