import { useEffect, useState } from "react";
import Coin from "./components/Coin";
import GameOverDialog from "./components/GameOverDialog";
import ResetDialog from "./components/ResetDialog";

type StackNumber = 1 | 2 | 3;
type NumberCoins = 3 | 4 | 5 | 6 | 7;
type CoinStacks = Map<StackNumber, Set<number>>;

const MIN_NUM_COINS = 3;
const MAX_NUM_COINS = 7;

function App() {
  const [totalCoins, setTotalCoins] = useState<NumberCoins>(3);
  const minSteps = 2 ** totalCoins - 1;
  const coins = Array.from({ length: totalCoins }, (_, i) => i + 1);
  const initialCoinStacks: CoinStacks = new Map([
    [1, new Set(coins)],
    [2, new Set()],
    [3, new Set()],
  ]);

  const [steps, setSteps] = useState(0);
  const [activeStack, setActiveStack] = useState<StackNumber | 0>(0);
  const [coinStacks, setCoinStacks] = useState<CoinStacks>(initialCoinStacks);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    resetGame();
  }, [totalCoins]);

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

  function isGameOver() {
    if (coinStacks.get(1)!.size !== 0) return false;
    if (coinStacks.get(2)!.size !== 0 && coinStacks.get(3)!.size !== 0) {
      return false;
    }
    return true;
  }

  function getScore() {
    if (!isGameOver()) return -1;
    const timesMinSteps = steps / minSteps;
    // if use minSteps, 100; 1.2*minSteps gets 90, 2* gets 69, infinite steps gets 60
    return 40 * Math.exp((1 - timesMinSteps) * 1.5) + 60;
  }

  function handleResetModal() {
    if (steps === 0 || isGameOver()) {
      resetGame();
      return;
    }
    setIsResetModalOpen(true);
  }

  function resetGame() {
    setCoinStacks(initialCoinStacks);
    setSteps(0);
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
                <Coin
                  key={coin}
                  number={coin}
                  totalCoins={totalCoins}
                  isTop={isCoinTop(coin, 1)}
                />
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
                <Coin
                  key={coin}
                  number={coin}
                  totalCoins={totalCoins}
                  isTop={isCoinTop(coin, 2)}
                />
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
                <Coin
                  key={coin}
                  number={coin}
                  totalCoins={totalCoins}
                  isTop={isCoinTop(coin, 3)}
                />
              )
          )}
        </button>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4 w-[12rem] justify-between items-center mt-6">
          <div>硬币数量</div>
          <div className="flex gap-2 items-center">
            <button
              className="border border-pink-400 rounded-full h-[2rem] grid aspect-square place-items-center disabled:border-slate-400 text-pink-400 disabled:text-slate-400"
              disabled={totalCoins === MIN_NUM_COINS}
              onClick={() => setTotalCoins((prev) => (prev - 1) as NumberCoins)}
            >
              -
            </button>
            <div className="">{totalCoins}</div>
            <button
              className="border border-pink-400 rounded-full h-[2rem] grid aspect-square place-items-center disabled:border-slate-400 text-pink-400 disabled:text-slate-400"
              disabled={totalCoins === MAX_NUM_COINS}
              onClick={() => setTotalCoins((prev) => (prev + 1) as NumberCoins)}
            >
              +
            </button>
          </div>
        </div>
        <ResetDialog
          trigger={
            <button
              className="px-4 py-1 text-lg border border-pink-600 rounded-full text-pink-600"
              onClick={handleResetModal}
            >
              重置
            </button>
          }
          isOpen={isResetModalOpen}
          setIsOpen={setIsResetModalOpen}
          resetGame={resetGame}
        />
      </div>
      {isGameOver() && (
        <>
          <GameOverDialog
            totalCoins={totalCoins}
            steps={steps}
            score={getScore()}
          />
        </>
      )}
    </div>
  );
}

export default App;
