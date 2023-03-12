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
}

function GameOverDialog({ totalCoins, steps }: GameOverDialogProps) {
  return (
    <Dialog defaultOpen>
      <DialogContent className="w-[25em]">
        <DialogHeader>
          <DialogTitle className="text-center">你赢啦！</DialogTitle>
          <DialogDescription className="text-center">
            在 {totalCoins} 个硬币的河内塔游戏中，你总共使用了 {steps} 步。
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default GameOverDialog;
