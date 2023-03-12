import { useEffect, useState } from "react";
import Coin from "./components/Coin";

type StackNumber = 1 | 2 | 3;
type NumberCoins = 3 | 4 | 5 | 6 | 7;
type CoinStacks = Map<StackNumber, Set<number>>;

const MIN_NUM_COINS = 3;
const MAX_NUM_COINS = 7;

function App() {
  const [numCoins, setNumCoins] = useState<NumberCoins>(3);
  const coins = Array.from({ length: numCoins }, (_, i) => i + 1);
  const initialCoinStacks: CoinStacks = new Map([
    [1, new Set(coins)],
    [2, new Set()],
    [3, new Set()],
  ]);

  const [steps, setSteps] = useState(0);
  const [activeStack, setActiveStack] = useState<StackNumber | 0>(0);
  const [coinStacks, setCoinStacks] = useState<CoinStacks>(initialCoinStacks);

  useEffect(() => {
    setCoinStacks(initialCoinStacks);
  }, [numCoins]);

  function getTopCoin(stack: StackNumber) {
    return Math.min(...coinStacks.get(stack)!);
  }

  function isCoinInStack(coin: number, stack: StackNumber) {
    return coinStacks.get(stack)!.has(coin);
  }

  function isCoinTop(coin: number, stack: StackNumber) {
    if (stack !== activeStack) return false;
    return coin === getTopCoin(activeStack);
  }

  function canMoveCoin(stack: StackNumber) {
    if (activeStack === 0) return false;
    const activeCoin = getTopCoin(activeStack);
    const topCoin = getTopCoin(stack);
    return activeCoin < topCoin;
  }

  function handleClick(stack: StackNumber) {
    if (activeStack === 0 && coinStacks.get(stack)!.size === 0) {
      return;
    }
    if (activeStack === 0) {
      setActiveStack(stack);
      return;
    }
    if (activeStack === stack) {
      setActiveStack(0);
      return;
    }
    if (!canMoveCoin(stack)) return;
    setCoinStacks((prev) => {
      const activeStackCoins = prev.get(activeStack)!;
      const topCoin = getTopCoin(activeStack);
      activeStackCoins.delete(topCoin);
      prev.get(stack)!.add(topCoin);
      return prev;
    });
    setSteps((prev) => prev + 1);
    setActiveStack(0);
  }

  return (
    <div className="max-w-[50rem] mx-auto px-4 py-2">
      <h1 className="text-3xl text-center my-6">河内塔</h1>
      <div className="flex gap-2 max-w-[4em] mx-auto justify-between">
        <div className="">步数</div>
        <div className="">{steps}</div>
      </div>
      <div className="flex justify-around mt-10 mx-auto">
        <button
          className="hover:bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-end h-[180px] relative w-[100px]"
          onClick={() => handleClick(1)}
        >
          <div className="w-[3px] h-full absolute left-[50%] -translate-x-[50%] bg-slate-900" />
          {coins.map(
            (coin) =>
              isCoinInStack(coin, 1) && (
                <Coin key={coin} size={coin} isTop={isCoinTop(coin, 1)} />
              )
          )}
        </button>
        <button
          className="hover:bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-end h-[180px] relative w-[100px]"
          onClick={() => handleClick(2)}
        >
          <div className="w-[3px] h-full absolute left-[50%] -translate-x-[50%] bg-slate-900" />
          {coins.map(
            (coin) =>
              isCoinInStack(coin, 2) && (
                <Coin key={coin} size={coin} isTop={isCoinTop(coin, 2)} />
              )
          )}
        </button>
        <button
          className="hover:bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-end h-[180px] relative w-[100px]"
          onClick={() => handleClick(3)}
        >
          <div className="w-[3px] h-full absolute left-[50%] -translate-x-[50%] bg-slate-900" />
          {coins.map(
            (coin) =>
              isCoinInStack(coin, 3) && (
                <Coin key={coin} size={coin} isTop={isCoinTop(coin, 3)} />
              )
          )}
        </button>
      </div>
      <div className="flex gap-4 mx-auto w-[12rem] justify-between items-center mt-6">
        <div>硬币数量</div>
        <div className="flex gap-2 items-center">
          <button
            className="border border-pink-400 rounded-full h-[2rem] grid aspect-square place-items-center disabled:border-slate-400 text-pink-400 disabled:text-slate-400"
            disabled={numCoins === MIN_NUM_COINS}
            onClick={() => setNumCoins((prev) => (prev - 1) as NumberCoins)}
          >
            -
          </button>
          <div className="">{numCoins}</div>
          <button
            className="border border-pink-400 rounded-full h-[2rem] grid aspect-square place-items-center disabled:border-slate-400 text-pink-400 disabled:text-slate-400"
            disabled={numCoins === MAX_NUM_COINS}
            onClick={() => setNumCoins((prev) => (prev + 1) as NumberCoins)}
          >
            +
          </button>
        </div>
      </div>
      <pre>{JSON.stringify(activeStack)}</pre>
      <pre>{JSON.stringify([...coinStacks.get(1)!])}</pre>
      <pre>{JSON.stringify([...coinStacks.get(2)!])}</pre>
      <pre>{JSON.stringify([...coinStacks.get(3)!])}</pre>
    </div>
  );
}

export default App;
