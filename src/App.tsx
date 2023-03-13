import { useEffect, useRef, useState } from "react";
import Coin from "./components/Coin";
import GameOverDialog from "./components/GameOverDialog";
import ResetDialog from "./components/ResetDialog";
import { CoinStacks, NumberCoins, StackNumber } from "./types";
import createAudio from "./utils/audio";

const MIN_NUM_COINS = 3;
const MAX_NUM_COINS = 7;

function createInitialStacks(numberCoins: NumberCoins) {
  const coins = Array.from({ length: numberCoins }, (_, i) => i + 1);
  const coinStacks: CoinStacks = new Map([
    [1, new Set(coins)],
    [2, new Set()],
    [3, new Set()],
  ]);
  return coinStacks;
}

function App() {
  const [totalCoins, setTotalCoins] = useState<NumberCoins>(3);
  const minSteps = 2 ** totalCoins - 1;

  const coins = Array.from({ length: totalCoins }, (_, i) => i + 1);
  const initialCoinStacks = createInitialStacks(totalCoins);

  const [steps, setSteps] = useState(0);
  const [activeStack, setActiveStack] = useState<StackNumber | 0>(0);
  const [coinStacks, setCoinStacks] = useState<CoinStacks>(initialCoinStacks);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const targetTotalCoinsRef = useRef(totalCoins);

  useEffect(() => {
    resetGame();
    targetTotalCoinsRef.current = totalCoins;
  }, [totalCoins]);

  function isDisabled(stack: StackNumber) {
    if (activeStack !== 0) return false;
    return coinStacks.get(stack)!.size === 0;
  }

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
    // lift coin
    if (activeStack === 0) {
      setActiveStack(stack);
      const coinSize = getTopCoin(stack);
      createAudio({
        coinSize,
      });
      return;
    }
    // drop coin
    if (activeStack === stack) {
      setActiveStack(0);
      const coinSize = getTopCoin(stack);
      createAudio({
        coinSize,
      });
      return;
    }
    // attemped bigger on smaller
    if (!canMoveCoin(stack)) {
      // play bad sound
      createAudio({ coinSize: 100 });
      return;
    }

    // move coin
    setCoinStacks((prev) => {
      const activeStackCoins = prev.get(activeStack)!;
      const activeCoin = getTopCoin(activeStack);
      activeStackCoins.delete(activeCoin);
      prev.get(stack)!.add(activeCoin);
      createAudio({
        coinSize: activeCoin,
      });
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

  function resetGame(targetCoins = totalCoins) {
    setCoinStacks(createInitialStacks(targetCoins));
    setTotalCoins(targetCoins);
    setSteps(0);
  }

  function changeNumberCoins(delta: -1 | 1) {
    const targetCoins = totalCoins + delta;
    if (targetCoins < MIN_NUM_COINS || targetCoins > MAX_NUM_COINS) {
      return;
    }
    if (steps === 0 || isGameOver()) {
      setTotalCoins(targetCoins as NumberCoins);
      return;
    }
    targetTotalCoinsRef.current = targetCoins as NumberCoins;
    setIsResetModalOpen(true);
  }

  return (
    <div className="max-w-[50rem] mx-auto px-4 py-2">
      <h1 className="flex items-end justify-center text-3xl my-6">
        <img src="/favicon.ico" alt="icon" className="h-[1.5em]" />
        河内塔
        <img src="/favicon.ico" alt="icon" className="h-[1.5em]" />
      </h1>
      <div className="flex gap-2 max-w-[4em] mx-auto justify-between">
        <div className="">步数</div>
        <div className="">{steps}</div>
      </div>
      <div className="flex justify-around mt-10 mx-auto">
        <button
          disabled={isDisabled(1)}
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
          disabled={isDisabled(2)}
          className="flex flex-col items-center justify-end h-[180px] relative w-[100px]
          enabled:hover:bg-slate-50 enabled:active:bg-slate-100"
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
          disabled={isDisabled(3)}
          className="flex flex-col items-center justify-end h-[180px] relative w-[100px]
          enabled:hover:bg-slate-50 enabled:active:bg-slate-100"
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
        <div className="flex flex-col gap-2 w-[12rem] justify-between items-center mt-6">
          <div>硬币数量</div>
          <div className="flex gap-2 items-center">
            <button
              className="border border-pink-400 rounded-full h-[2rem] grid aspect-square place-items-center disabled:border-slate-400 text-pink-400 disabled:text-slate-400"
              disabled={totalCoins === MIN_NUM_COINS}
              onClick={() => changeNumberCoins(-1)}
            >
              -
            </button>
            <div className="">{totalCoins}</div>
            <button
              className="border border-pink-400 rounded-full h-[2rem] grid aspect-square place-items-center disabled:border-slate-400 text-pink-400 disabled:text-slate-400"
              disabled={totalCoins === MAX_NUM_COINS}
              onClick={() => changeNumberCoins(1)}
            >
              +
            </button>
          </div>
        </div>
        <ResetDialog
          isOpen={isResetModalOpen}
          setIsOpen={setIsResetModalOpen}
          confirm={() => resetGame(targetTotalCoinsRef.current)}
        >
          <button
            className="px-4 py-1 text-lg border border-pink-600 rounded-full text-pink-600"
            onClick={handleResetModal}
          >
            重置
          </button>
        </ResetDialog>
      </div>
      {isGameOver() && (
        <GameOverDialog
          totalCoins={totalCoins}
          steps={steps}
          score={getScore()}
        />
      )}
    </div>
  );
}

export default App;
