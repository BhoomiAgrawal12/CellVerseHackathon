import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface WrongAnswerDialogProps {
  open: boolean;
  onClose: () => void;
  explanation: string;
}

export function WrongAnswerDialog({ open, onClose, explanation }: WrongAnswerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" />
            Incorrect Choice
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            <p className="mt-2">{explanation}</p>
            <Button
              onClick={onClose}
              className="w-full mt-6 bg-red-600 hover:bg-red-700"
            >
              Try Again
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}