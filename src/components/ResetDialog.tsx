import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ResetDialogProps {
  trigger: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  resetGame: () => void;
}

function ResetDialog({
  trigger,
  isOpen,
  setIsOpen,
  resetGame,
}: ResetDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger}
      <DialogContent className="w-[25em]">
        <DialogHeader>
          <DialogTitle className="text-center">
            确定要重置本局游戏吗？
          </DialogTitle>
          <DialogDescription className="text-center">
            本局游戏进度将无法回复。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-4 justify-center">
            <button
              className="border border-green-600 px-4 py-2 rounded-full text-green-600"
              onClick={() => setIsOpen(false)}
            >
              再玩一会
            </button>
            <button
              className="px-4 py-2 rounded-full bg-red-600 text-white"
              onClick={() => {
                resetGame();
                setIsOpen(false);
              }}
            >
              重置本局
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResetDialog;
