export const taskPlans: Record<string, Record<"mild" | "moderate" | "severe", string[][]>> = {
    depression: {
      mild: [
        ["Make a to-do list", "Complete a focused work session", "Organize workspace"],
        ["Time-block for 30 mins", "Take a structured break", "Track time usage"],
        ["Brain dump tasks", "Work distraction-free", "Avoid procrastination"],
        ["Pomodoro technique", "Complete a priority task", "Limit distractions"],
        ["Plan next week", "Identify energy boosters", "Celebrate progress"],
      ],
      moderate: [
        ["Complete one meaningful task", "Sit outside", "Organize a small area"],
        ["Work for 15 min", "Drink water", "Do something enjoyable"],
        ["Start each day with self-care", "Break tasks into steps", "Reflect weekly"],
      ],
      severe: [
        ["Drink water", "Change clothes", "Sit near sunlight"],
        ["Try a 5-minute task", "Pick a comforting routine", "Text one supportive person"],
        ["Continue self-care at own pace", "Tiny productivity steps"],
      ],
    },
    anxiety: {
      mild: [
        ["Practice deep breathing", "Organize workspace", "Declutter emails"],
        ["Write down worries", "Exercise for 15 minutes", "Limit caffeine"],
        ["Plan your next day", "Try guided meditation", "Track anxious thoughts"],
        ["Use the 5-4-3-2-1 grounding technique", "Stretch for 5 minutes", "Reduce screen time"],
        ["Self-reflection: What makes you feel safe?", "Create a safe space"],
      ],
      moderate: [
        ["Limit social media", "Do a 10-minute mindfulness session"],
        ["Identify triggers", "Journal anxious moments", "Try gratitude listing"],
      ],
      severe: [
        ["Hold something cold in your hand", "Focus on slow breathing"],
        ["Ask for support", "Drink a glass of water"],
        ["Listen to calming music", "Write a comfort letter to yourself"],
      ],
    },
  
  
  ptsd: {
    mild: [
      ["Do the 5-4-3-2-1 grounding technique", "Write down 3 emotions", "Take 3 deep belly breaths"],
      ["Place a hand over your heart when anxious", "Say 'I am here, I am safe' in the mirror", "Try progressive muscle relaxation"],
      ["Listen to calming instrumental music", "Look at an old photo & write one positive memory", "Spend 5 minutes outside in silent observation"],
      ["Identify 1 small fear & write about it", "Write a letter to yourself (don’t read it yet)", "Hold a warm cup of tea & focus on warmth"],
      ["Tell a trusted person one small thing about your day", "Send a text to someone you’ve been avoiding", "Give yourself a 3-minute self-hug"],
    ],
    moderate: [
      ["Write down one common trigger & how it affects you", "List 3 emotions you’ve been avoiding", "Track your stress level 3 times today"],
      ["Look at a mild trigger for 10 seconds, then ground yourself", "Watch a mildly emotional scene from a movie", "Hold a warm cup of tea & breathe deeply"],
      ["Draw or scribble what stress feels like", "Write down one regret & rip up the paper", "Do slow, mindful stretching"],
      ["Write a letter of comfort to your younger self", "Sit with one difficult emotion for 5 minutes", "Try box breathing (4 sec inhale, 4 hold, 4 exhale)"],
      ["Tell someone a small personal story", "Make eye contact in a conversation today", "Write down 3 safety reminders ('I am safe now.')"],
    ],
    severe: [
      ["Hold something cold in your hand", "Focus on slow breathing", "Drink a glass of water"],
      ["Ask for support", "Text a trusted person", "Listen to calming music"],
      ["Describe your surroundings out loud", "Try an anchoring movement (tap fingers, rock side to side)", "Write a comfort letter to yourself"],
      ["Go to a safe but mildly triggering place & observe reactions", "Do a 'Bravery Challenge' (safely confront a past fear)", "Reflect: What was easier? What was harder?"],
    ],
  },

  ocd: {
    mild: [
      ["Write down all OCD-related behaviors", "Identify your biggest triggers", "Keep a log of compulsions & thoughts"],
      ["Delay one compulsion by 30 sec", "Delay one compulsion by 1 min", "Delay one compulsion by 2 min"],
      ["Use mindfulness to sit with discomfort for 1 min", "Sit with anxiety for 2 min", "Sit with anxiety for 5 min"],
      ["Rearrange one thing 'incorrectly'", "Touch something normally avoided", "Touch an anxiety-inducing object & wait before sanitizing"],
      ["Change routine slightly", "Skip one non-critical compulsion", "Do a small act opposite to OCD urges"],
    ],
    moderate: [
      ["Change how you perform a small ritual", "Skip a compulsion for 5 minutes", "Skip a compulsion for 10 minutes"],
      ["Touch an 'unclean' surface & wait before washing", "Delay checking something important", "Delay checking for 10 min & leave the room"],
      ["Misalign something in your room", "Wear mismatched socks", "Mess up a whole setup intentionally"],
      ["Leave a small mess on purpose", "Write an intrusive thought down & sit with it", "Record yourself saying an intrusive thought & listen to it"],
      ["Hold onto an unnecessary item for 5 minutes", "Delay throwing something away", "Put an item in the 'wrong' place & leave it"],
    ],
    severe: [
      ["Skip one small compulsion entirely", "Skip a medium-sized compulsion", "Skip a large compulsion"],
      ["Stay in an uncomfortable situation for 10 min", "Increase delay time before checking/washing", "Face your biggest trigger for 10 sec"],
      ["Rearrange something & leave it for 2 hours", "Touch a public object & wait before washing", "Skip cleaning for a full hour"],
      ["Wear the 'wrong' color", "Remove one hoarded item", "Donate something you’ve held onto for too long"],
      ["Reduce a ritual’s time by half", "Challenge a long-held OCD belief", "Fully remove a major compulsion"],
    ],
  },

  eating_disorder: {
    mild: [
      ["Keep a simple food & mood log", "Identify emotions before & after meals", "Write down fear foods & rate anxiety (1-10)"],
      ["Pause before eating—ask, 'Am I hungry?'", "Rate hunger/fullness on a scale of 1-10", "If struggling to eat, take one bite & observe"],
      ["Note a positive experience with food", "Write 3 words describing how eating felt today", "Identify one thing that helped you eat"],
      ["Reflect on eating influences (stress, media, etc.)", "Note 1 situation where eating felt uncomfortable & why", "Try eating in a new environment"],
      ["Write a kind statement about eating habits", "List 1 thing you appreciate about your body (not appearance-based)", "Write what you would say to a friend struggling with eating"],
      ["Try eating something new (different flavor, texture, brand)", "Eat a fear food in a small portion—observe, don’t judge", "If avoiding meals, eat a tiny portion of something easy to digest"],
      ["What patterns did you notice?", "Which tasks felt easiest/hardest?", "Adjust goals for next week"],
    ],
    moderate: [
      ["Eat one meal mindfully (no phone, TV, distractions)", "Take 3 deep breaths before eating to reset", "Focus on taking small bites—no pressure to finish"],
      ["Eat something you usually avoid but like", "Ask yourself, 'Why do I avoid this food?' & write about it", "Take one step toward eating a restricted food (even just touching it)"],
      ["List 3 ways your body supports you daily", "Replace one negative body thought with a neutral one", "Place your hand on your stomach & say, 'My body deserves care'"],
      ["Put down utensils between bites", "Chew each bite fully before swallowing", "Take one more bite than comfortable"],
      ["Notice if you feel guilty after eating—write it down", "Counter a guilty thought with self-compassion", "Repeat: 'Food is not the enemy. My body needs nourishment'"],
      ["Stretch for 5 minutes after waking up", "Take a 10-minute walk without focusing on steps/calories", "Do one relaxing movement (wiggling fingers, slow breathing)"],
      ["What changes felt manageable?", "What still feels challenging?", "Adjust plan for next week"],
    ],
    severe: [
      ["List negative food thoughts → Replace with neutral ones", "Identify one coping skill that isn't food-related", "Write 3 reasons why food is important for life"],
      ["Eat a meal based on what sounds good, not what’s 'safe'", "Challenge the idea that food must be earned", "Wear something comfortable & appreciate how it feels"],
      ["Eat at a different time than usual to challenge rigid habits", "Try one new recipe (even just a snack)", "Notice hunger cues & honor them without second-guessing"],
      ["Challenge one fear food (portion size, texture, calorie concern)", "Eat with someone supportive", "Find a non-food comfort item (blanket, warm drink, music)"],
      ["Reflect on the most helpful task so far", "Write a self-compassion letter to your past self", "Identify one non-food reward for progress"],
      ["Try a new food in a positive setting", "Set one long-term goal for your relationship with food", "Celebrate progress—small or big"],
      ["Final Reflection: What food-related thoughts improved?", "What still feels challenging?", "What habits do I want to continue?"],
    ],
  },

  panic_disorder: {
    mild: [
      ["Plan tomorrow’s tasks before sleeping", "Try a 5-minute breathing exercise", "Reflect on energy levels today"],
      ["Break tasks into smaller chunks", "Identify a minor stressor & reframe it", "Schedule a 10-minute 'reset break'"],
      ["Complete 2 high-priority tasks", "Write down one moment you handled stress well", "Experiment with a new work environment"],
      ["Complete one challenging task early", "Try a 5-10 minute guided meditation", "Swap a high-stress task with a low-stress one"],
      ["List 3 things you’re grateful for", "Take a slow 10-minute walk", "Adjust task list to match your mood"],
      ["Test a 25-minute focus block", "Try a gentle stretching routine", "Skip 1 non-essential task guilt-free"],
      ["Review completed tasks", "Identify which tasks drained or energized you", "Modify routine based on what worked"],
    ],
    moderate: [
      ["Choose 3 must-do tasks", "Listen to a calming playlist while working", "Take a 5-minute 'reset' every 30 minutes"],
      ["Use a priority-based to-do list", "Declutter a small space for 5 minutes", "Allow a slow start to tasks guilt-free"],
      ["Schedule one intentional break", "Write down & reframe an intrusive thought", "Swap a stressful task for an easier one"],
      ["Use a 2:1 work-rest ratio", "Try a cold splash of water on your face", "Skip a non-essential task if overwhelmed"],
      ["Complete one 'stretch goal' task", "Try a breathing technique before tasks", "Work at a slower pace without pressure"],
      ["Reflect on which tasks cause stress", "Plan the next day the night before", "Adjust deadlines to reduce anxiety"],
      ["Note which coping strategies helped", "Identify anxiety spikes in the day", "Modify task difficulty based on energy levels"],
    ],
    severe: [
      ["Identify 2 simple, achievable tasks", "Use a comforting sensory activity", "Allow a complete rest day if needed"],
      ["Set a 10-minute work timer, then stop if needed", "Try a safe-space visualization exercise", "Replace a stressful task with a lighter one"],
      ["Complete a single essential task", "Identify one body sensation linked to anxiety", "Delay a difficult task guilt-free"],
      ["Pick any one small task & complete it", "Try a self-soothing activity", "Break tasks into 2-minute actions if overwhelmed"],
      ["Choose one task to delegate or postpone", "Do a light movement exercise", "Change your work setting to a calming space"],
      ["Complete only tasks that feel manageable", "Identify one 'safe' task that doesn’t trigger anxiety", "Give yourself permission to do less"],
      ["What tasks felt most difficult?", "What stress-reduction techniques helped?", "Adjust next week's workload based on comfort"],
    ],
  },

 stress: {
    mild: [
      ["List 3 high-priority tasks & finish at least 2", "Block 90 minutes for deep work", "Identify distractions & remove one"],
      ["Avoid social media for 3 hours", "Work on hardest task first", "Track most productive moments"],
      ["No work: Engage in hobbies", "Do deep work in a distraction-free zone", "Write down goals for the week & prioritize"],
      ["Test a different task scheduling method", "Avoid notifications for 4 hours", "Say no to one unnecessary task"],
      ["End the day early & reflect", "Digital detox for half a day", "Rank tasks by importance, not urgency"],
    ],
    moderate: [
      ["List 2 major & 2 minor tasks, finish at least 3", "Use Pomodoro (25 min work, 5 min break)", "Test working at a different time of day"],
      ["Identify 1 major task that can be delayed", "Prioritize tasks based on energy levels", "Identify best & worst work habits"],
      ["Plan next week with flexible deadlines", "Identify your energy peak & work during it", "Delay low-energy tasks to evening"],
      ["Work in 2-hour focused blocks", "Schedule intentional breaks", "Prioritize based on impact, not urgency"],
      ["Adjust routine for next week", "Do a mindful activity", "Batch similar tasks for efficiency"],
    ],
    severe: [
      ["Complete 2 small, simple tasks before noon", "Start with a 5-min easy task before harder ones", "Limit task list to 3 items"],
      ["Automate or delegate 1 task", "Complete a simple repetitive task", "Identify a task you procrastinated on"],
      ["Take a walk or relax mindfully", "Start with 5 minutes of mindfulness before work", "Organize workspace"],
      ["Complete just 1 key task", "Focus on 1 small task at a time", "Automate a repetitive task"],
      ["Simplify tomorrow’s plans", "Take a slow morning", "Try working on fewer tasks but for longer"],
    ],
  },

  addiction_recovery: {
    mild: [
      ["Track emotions & cravings", "Avoid triggers & journal", "15-min walk or stretching"],
      ["Engage in a hobby", "Practice deep breathing", "Spend time with a friend"],
      ["Review the week’s progress", "Track sleep & hydration", "Try a new hobby or relaxation technique"],
      ["Gratitude journaling", "Set a small fitness goal", "Practice saying 'no' to unhealthy situations"],
      ["Plan a fun activity", "Self-care & tracking", "Write down 3 affirmations"],
    ],
    moderate: [
      ["10-min mindfulness session", "List high-risk situations", "Eat a nutritious meal & hydrate"],
      ["Attend a support group", "Write about a positive moment", "Set a small recovery goal"],
      ["Adjust goals & check-in", "Plan a week of balanced meals", "Identify negative thought patterns"],
      ["20-min mindful exercise", "Talk to a trusted person", "Deep breathing or relaxation"],
      ["Engage in social connection", "Adjust routines as needed", "Identify thought distortions"],
    ],
    severe: [
      ["Hydration & light movement", "Contact a support person", "Therapy session (if available)"],
      ["Identify the biggest recovery challenge", "Reflect on urges & responses", "Identify personal strengths"],
      ["Self-care & affirmations", "Therapy or mentor check-in", "Reach out to a mentor"],
      ["Identify emotional triggers", "Attend a recovery meeting", "List safe spaces & coping plans"],
      ["Reflect on the week’s hardest moment", "Celebrate small wins", "Create an emergency coping plan"],
    ],
  },

    anorexia: {
      mild: [
        ["Log meals & snacks without calorie counting", "Rate hunger on a scale (1-10) before & after eating", "Write 3 neutral or positive thoughts about food"],
        ["Identify fear foods & rank anxiety levels (1-10)", "Write a kind statement to your body", "Eat a 'fear food' in a small portion & reflect"],
        ["Focus on one meal without TV/phone", "Add a small 'forbidden' food to a meal", "List 3 things your body does for you"],
        ["Eat at a normal pace without cutting food into tiny pieces", "Reflect on a time when food felt enjoyable", "Stretch for 5 minutes instead of over-exercising"],
        ["List food rules → Challenge one", "Identify one non-food coping skill", "Write 3 reasons why food is important beyond weight"],
      ],
      moderate: [
        ["Track food intake & emotions", "Recognize fear foods & their triggers", "Eat a meal with someone supportive"],
        ["Practice eating with minimal anxiety rituals", "Journal about hunger/fullness cues", "Include a variety of foods in meals"],
        ["Use positive affirmations before eating", "Challenge the belief that weight defines worth", "Try a small portion of a high-calorie food"],
        ["Engage in light movement without over-exercising", "Follow a structured meal plan", "Focus on body function rather than appearance"],
        ["Eat at scheduled times without skipping", "Challenge the belief that certain foods are 'bad'", "Increase food intake slightly"],
      ],
      severe: [
        ["Drink a high-calorie beverage to meet intake", "Allow a supportive person to serve a meal", "Commit to eating despite anxiety"],
        ["Sit with discomfort after eating without purging/restricting", "Use a grounding technique when feeling overwhelmed", "Reintroduce previously avoided foods"],
        ["Increase portion sizes slightly", "Allow rest without compensatory behaviors", "Use distraction techniques after eating"],
        ["Avoid body-checking behaviors for a day", "Reduce time spent planning meals", "Have a therapist or mentor guide meals"],
        ["Reflect on personal growth without body/weight focus", "List reasons for recovery", "Acknowledge progress despite setbacks"],
      ],
    },
  
        bulimia: {
          mild: [
            ["Track binge/purge episodes & note triggers", "Pause before eating & ask: 'Am I physically hungry?'", "List situations where purging felt unavoidable"],
            ["Reflect on the strongest binge-purge urges of the day", "Challenge 1 negative self-thought with a neutral one", "Delay the urge to purge by 5 minutes & write feelings"],
            ["Take 3 deep breaths before eating", "Eat a normal meal without compensatory behaviors", "Identify 1 way you’ve taken care of yourself today"],
            ["Try eating without rushing through a meal", "Challenge 'good vs. bad' food labeling", "Walk for relaxation, not calorie burning"],
            ["Challenge the belief that food must be earned", "Eat a meal based on what sounds good, not 'safe'", "Wear something comfortable and appreciate how it feels"],
          ],
          moderate: [
            ["Track emotions before and after eating", "Challenge the idea that purging provides relief", "Use mindfulness before meals"],
            ["Increase meal variety without compensation", "Reduce reliance on 'safe foods'", "Eat without distractions"],
            ["Identify underlying emotions that trigger binges", "Practice self-soothing techniques instead of purging", "Avoid restriction after a binge"],
            ["Set structured meal/snack times", "Journal about recovery progress", "Identify self-care activities unrelated to food"],
            ["Acknowledge small victories in recovery", "Reflect on progress without judgment", "Plan alternative responses to urges"],
          ],
          severe: [
            ["Commit to eating without purging", "Allow supportive guidance during meals", "Stay in a safe place after eating to resist urges"],
            ["Work with a therapist to create a coping plan", "Avoid isolation after meals", "Use a distress tolerance skill when feeling the urge to purge"],
            ["Increase intake slightly without fear", "Challenge restrictive thoughts that lead to binges", "Use breathing techniques when anxious about food"],
            ["Avoid the scale for a full week", "Replace negative self-talk with neutral statements", "Engage in mindful movement"],
            ["Celebrate non-food-related achievements", "List motivations for recovery", "Reflect on identity beyond eating disorder behaviors"],
          ],
        },
      
        binge_eating: {
            mild: [
              ["Identify when you eat past fullness & what triggered it", "Identify emotional vs. physical hunger", "Note emotions before and after a binge episode"],
              ["Identify non-food coping strategies for emotional distress", "Write what you'd say to a friend in your situation", "Slow down eating by placing utensils down between bites"],
              ["Eat slowly and notice textures & flavors", "Stop halfway through a meal to assess fullness", "Find one non-food way to feel comforted"],
              ["Set a timer for 20 minutes and eat at a steady pace", "Acknowledge eating without judgment", "Do a mindful activity like yoga or deep breathing"],
              ["Try one new recipe", "Eat at a different time than usual", "Notice hunger cues and honor them without second-guessing"],
            ],
            moderate: [
              ["Track hunger & fullness levels", "Recognize emotional eating patterns", "Eat without multitasking"],
              ["Reduce binge frequency through structured eating", "Practice mindful eating at least once per day", "Challenge guilt related to food choices"],
              ["Delay eating when triggered & assess feelings", "Replace one binge episode with self-care", "Reduce portion sizes without restriction"],
              ["Engage in non-food activities during cravings", "Avoid buying binge foods when feeling emotional", "Use journaling to track emotional patterns"],
              ["Identify supportive people for accountability", "Acknowledge progress despite setbacks", "Celebrate recovery wins without food rewards"],
            ],
            severe: [
              ["Plan meals ahead to reduce impulsive eating", "Work with a therapist to create a meal structure", "Avoid long periods without eating"],
              ["Challenge restrictive eating patterns", "Avoid labeling foods as 'bad'", "Allow cravings without immediate action"],
              ["Create a relapse prevention plan", "Commit to eating at least three meals per day", "Identify stressors that lead to binges"],
              ["Use breathing techniques before eating", "Avoid weighing yourself if it triggers anxiety", "Replace binge behaviors with small intentional actions"],
              ["Develop a long-term recovery goal", "Reflect on progress beyond eating behaviors", "Acknowledge personal growth"],
            ],
          },
};