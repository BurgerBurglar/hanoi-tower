import clsx from "clsx";
import Confetti from "react-confetti";
import useWindowSize from "../hooks/useWindowSize";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface GameOverDialogProps {
  totalCoins: number;
  steps: number;
  score: number;
}

const getScoreInfo = (score: number) => {
  if (score === 100) {
    return {
      textColor: "text-green-600",
      bgColor: "bg-green-600",
      feedback: "登峰造极",
    };
  }
  if (score > 95) {
    return {
      textColor: "text-green-600",
      bgColor: "bg-green-600",
      feedback: "近乎完美",
    };
  }
  if (score > 90) {
    return {
      textColor: "text-green-600",
      bgColor: "bg-green-600",
      feedback: "精彩绝伦",
    };
  }
  if (score > 80) {
    return {
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-600",
      feedback: "可圈可点",
    };
  }
  if (score > 70) {
    return {
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-600",
      feedback: "小试牛刀",
    };
  }
  // if (score > 60)
  return {
    textColor: "text-red-600",
    bgColor: "bg-red-600",
    feedback: "再接再厉",
  };
};

function GameOverDialog({ totalCoins, steps, score }: GameOverDialogProps) {
  const { textColor, bgColor, feedback } = getScoreInfo(score);
  const { width, height } = useWindowSize();

  return (
    <Dialog defaultOpen>
      <DialogContent className="w-[25em]">
        <Confetti className="z-[60]" width={width} height={height} />
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-pink-600">
            你赢啦！
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            <span className="block">
              在
              <span className="text-pink-600 text-2xl font-bold mx-1">
                {totalCoins}
              </span>
              个硬币的河内塔游戏中，
              <span className="block">
                你总共使用了
                <span className="text-pink-600 text-2xl font-bold mx-1">
                  {steps}
                </span>
                步。
              </span>
            </span>
            <span className="flex items-center justify-center gap-3">
              <span className="relative left-3">你的得分是：</span>
              <span
                className={clsx(
                  "text-4xl font-bold relative -top-1",
                  textColor
                )}
              >
                {Math.round(score)}
              </span>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-white text-base",
                  bgColor
                )}
              >
                {feedback}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GameOverDialog;
