import clsx from "clsx";

interface CoinProps {
  size: number;
  isTop: boolean;
}

function Coin({ size, isTop }: CoinProps) {
  const width = `${(size + 1) * 20}px`;
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
