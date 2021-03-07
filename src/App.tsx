import * as React from "react";
import "./App.scss";
import { useFetchCurrencies } from "./hooks/useFetchCurrencies";
import Table from './components/Table';

const App = () => {
  const { data, error } = useFetchCurrencies();

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>CoinTrack</h1>
      <Table data={data} />
    </div>
  );
};


export default App;
