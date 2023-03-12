import { useState } from "react";
import Coin from "./components/Coin";

type StackNumber = 1 | 2 | 3;

function App() {
  const [activeStack, setActiveStack] = useState<StackNumber | 0>(0);
  const [coinStacks, setCoinStacks] = useState<Map<StackNumber, Set<number>>>(
    new Map([
      [1, new Set([1, 2, 3])],
      [2, new Set()],
      [3, new Set()],
    ])
  );

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
    setActiveStack(0);
  }

  return (
    <div className="max-w-[50rem] mx-auto px-4 py-2">
      <h1 className="text-3xl text-center">河内塔</h1>
      <div className="flex justify-around mt-10 mx-auto">
        <button
          className="hover:bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-end h-[100px] relative w-[100px]"
          onClick={() => handleClick(1)}
        >
          <div className="w-[3px] h-full absolute left-[50%] -translate-x-[50%] bg-slate-900" />
          {isCoinInStack(1, 1) && <Coin size={1} isTop={isCoinTop(1, 1)} />}
          {isCoinInStack(2, 1) && <Coin size={2} isTop={isCoinTop(2, 1)} />}
          {isCoinInStack(3, 1) && <Coin size={3} isTop={isCoinTop(3, 1)} />}
        </button>
        <button
          className="hover:bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-end h-[100px] relative w-[100px]"
          onClick={() => handleClick(2)}
        >
          <div className="w-[3px] h-full absolute left-[50%] -translate-x-[50%] bg-slate-900" />
          {isCoinInStack(1, 2) && <Coin size={1} isTop={isCoinTop(1, 2)} />}
          {isCoinInStack(2, 2) && <Coin size={2} isTop={isCoinTop(2, 2)} />}
          {isCoinInStack(3, 2) && <Coin size={3} isTop={isCoinTop(3, 2)} />}
        </button>
        <button
          className="hover:bg-slate-50 active:bg-slate-100 flex flex-col items-center justify-end h-[100px] relative w-[100px]"
          onClick={() => handleClick(3)}
        >
          <div className="w-[3px] h-full absolute left-[50%] -translate-x-[50%] bg-slate-900" />{" "}
          {isCoinInStack(1, 3) && <Coin size={1} isTop={isCoinTop(1, 3)} />}
          {isCoinInStack(2, 3) && <Coin size={2} isTop={isCoinTop(2, 3)} />}
          {isCoinInStack(3, 3) && <Coin size={3} isTop={isCoinTop(3, 3)} />}
        </button>
      </div>
      <pre>{JSON.stringify(activeStack)}</pre>
      <pre>{JSON.stringify([...coinStacks.get(1)!])}</pre>
      <pre>{JSON.stringify([...coinStacks.get(2)!])}</pre>
      <pre>{JSON.stringify([...coinStacks.get(3)!])}</pre>
    </div>
  );
}

export default App;
