import clsx from "clsx";

const COIN_WIDTH_LIMIT = 100;

interface CoinProps {
  number: number;
  totalCoins: number;
  isTop: boolean;
}

function Coin({ number, totalCoins, isTop }: CoinProps) {
  const coinOffset = totalCoins / 4;
  const unitCoinWidth = COIN_WIDTH_LIMIT / (totalCoins + coinOffset);
  const width = `${(number + coinOffset) * unitCoinWidth}px`;
  return (
    <div
      className={clsx("bg-pink-600 h-5 border-pink-900 border z-10", {
        "absolute top-0": isTop,
      })}
      style={{
        width,
      }}
    />
  );
}
export default Coin;
