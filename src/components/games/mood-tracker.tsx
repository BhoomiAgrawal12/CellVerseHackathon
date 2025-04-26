"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MoodEntry } from "@/lib/types";
import { SmilePlus, Smile, Meh, Frown } from "lucide-react";

const MOODS = [
  { value: "great", icon: SmilePlus, label: "Great", className: "" },
  { value: "good", icon: Smile, label: "Good", className: "" },
  { value: "okay", icon: Meh, label: "Okay", className: "" },
  { value: "bad", icon: Frown, label: "Bad", className: "" },
  { value: "awful", icon: Frown, label: "Awful", className: "rotate-180" },
] as const;

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<MoodEntry["mood"] | null>(
    null
  );
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  const handleSubmit = () => {
    if (selectedMood) {
      const newEntry: MoodEntry = {
        mood: selectedMood,
        timestamp: new Date(),
        note,
      };
      setEntries([newEntry, ...entries]);
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">How are you feeling?</h2>

        <div className="grid grid-cols-5 gap-4 mb-6">
          {MOODS.map(({ value, icon: Icon, label, className }) => (
            <Button
              key={value}
              variant={selectedMood === value ? "default" : "outline"}
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => setSelectedMood(value as MoodEntry["mood"])}
            >
              <Icon className={`w-8 h-8 mb-2 ${className || ""}`} />
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>

        <Textarea
          placeholder="Add a note about how you're feeling..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mb-4"
        />

        <Button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className="w-full"
        >
          Save Entry
        </Button>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Entries</h3>
        {entries.map((entry, index) => {
          const mood = MOODS.find((m) => m.value === entry.mood);
          const Icon = mood?.icon || Meh;

          return (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-4">
                <Icon className={`w-6 h-6 ${mood?.className || ""}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{mood?.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {entry.timestamp.toLocaleString()}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-sm text-muted-foreground">
                      {entry.note}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
