"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Star, Calendar, Sparkles } from 'lucide-react';

interface GratitudeEntry {
  id: string;
  content: string;
  category: 'personal' | 'relationships' | 'achievements' | 'simple-joys';
  date: Date;
}

const CATEGORIES = [
  { id: 'personal', label: 'Personal Growth', icon: Star },
  { id: 'relationships', label: 'Relationships', icon: Heart },
  { id: 'achievements', label: 'Achievements', icon: Sparkles },
  { id: 'simple-joys', label: 'Simple Joys', icon: Calendar },
] as const;

export function GratitudeJournal() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GratitudeEntry['category']>('simple-joys');

  const handleSubmit = () => {
    if (newEntry.trim()) {
      const entry: GratitudeEntry = {
        id: Date.now().toString(),
        content: newEntry,
        category: selectedCategory,
        date: new Date(),
      };
      setEntries([entry, ...entries]);
      setNewEntry('');
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500" />
          Gratitude Journal
        </h2>
        <p className="text-muted-foreground">
          Practice gratitude by recording things you're thankful for
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={selectedCategory === id ? "default" : "outline"}
              className="flex flex-col items-center p-4 h-auto"
              onClick={() => setSelectedCategory(id as GratitudeEntry['category'])}
            >
              <Icon className="w-5 h-5 mb-2" />
              <span className="text-sm text-center">{label}</span>
            </Button>
          ))}
        </div>

        <Textarea
          placeholder="What are you grateful for today?"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          className="min-h-[100px]"
        />

        <Button
          onClick={handleSubmit}
          disabled={!newEntry.trim()}
          className="w-full"
        >
          Add Entry
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Your Gratitude Journey</h3>
        {entries.map((entry) => {
          const category = CATEGORIES.find(c => c.id === entry.category);
          const Icon = category?.icon || Star;
          
          return (
            <Card key={entry.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{category?.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {entry.date.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{entry.content}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
}