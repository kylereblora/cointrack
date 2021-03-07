import * as React from "react";
import "./App.scss";
import { useFetchCurrencies } from "./hooks/useFetchCurrencies";

const App = () => {
  const { data, error } = useFetchCurrencies();

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) {
    return <div>Loading...</div>;
  }
  const items = data && data.map((coin: any) => <Coin data={coin} />);
  return (
    <div className="App">
      <h1>CoinTrack</h1>
      <div>{items}</div>
    </div>
  );
};

const Coin = ({ data }: any) => {
  const { rank, logo_url, name, currency, price, market_cap } = data;
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <p>{rank}</p>
      <img
        src={logo_url}
        alt={currency}
        style={{
          width: "30px",
        }}
      />
      <p>
        {name} {currency}
      </p>
      <p>{price}</p>
    </div>
  );
};

export default App;
