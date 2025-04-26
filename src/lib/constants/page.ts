export const levelTwoChallenges = [
  {
    situation: "You pass by your old hangout spot",
    options: [
      "Change your route",
      "Call a friend",
      "Rush through",
      "Confront memories",
    ],
    correct: ["Change your route", "Call a friend"],
    explanation:
      "Consider how your choices affect your feelings and well-being.",
  },
  {
    situation: "An old friend invites you to a party",
    options: [
      "Make an excuse",
      "Be honest about recovery",
      "Go briefly",
      "Ignore the invite",
    ],
    correct: ["Be honest about recovery"],
    explanation:
      "Communicating your needs can help maintain healthy relationships.",
  },
  {
    situation: "You're feeling stressed about work",
    options: ["Exercise", "Use substances", "Meditate", "Isolate yourself"],
    correct: ["Exercise", "Meditate"],
    explanation:
      "Finding healthy ways to cope with stress is important for your well-being.",
  },
];

export const levelThreeChallenges = [
  {
    name: "Sarah",
    story:
      "I've been clean for 3 months, but lately I've been thinking about using again...",
    responses: [
      "You should just try to forget about it",
      "I understand how you feel. Would you like to talk about what's triggering these thoughts?",
      "At least you're not using now",
      "Have you considered what helped you stay clean these past months?",
    ],
    correct: 1,
    explanation:
      "It's important to talk about feelings and triggers to stay on track.",
  },
  {
    name: "Michael",
    story:
      "I lost my job because of my addiction. I don't know how to start over.",
    responses: [
      "That must be really tough. There are resources and people here to support you",
      "Everyone loses jobs sometimes",
      "You'll find another one eventually",
      "Maybe you shouldn't have used at work",
    ],
    correct: 0,
    explanation:
      "Support is crucial during tough times, and it's okay to seek help.",
  },
  {
    name: "David",
    story: "I'm one year sober today!",
    responses: [
      "That's nothing compared to others",
      "Cool",
      "Congratulations! Would you share what helped you reach this milestone?",
      "You're lucky",
    ],
    correct: 2,
    explanation:
      "Celebrating milestones is important for motivation and self-worth.",
  },
];
