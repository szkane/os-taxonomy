/* Storybooks for the reading-strategy course: public-domain tales retold
   in our own words. Page items reference PYP.actors keys (canvas-drawn
   actors — no emoji). Sentences/stops/art are machine-checked at build. */
export const STORYBOOKS = {
 "early": [
  {
   "title": "The Three Little Pigs",
   "fiction": true,
   "strategies": [
    "🔮 Predict",
    "✅ Check"
   ],
   "palette": {
    "sky": [
     "#e8f7ff",
     "#cfeaff"
    ],
    "ground": "#a8d98a"
   },
   "pages": [
    {
     "text": "Three little pigs set off. They would each build a house.",
     "items": [
      {
       "art": "sun",
       "x": 0.84,
       "y": 0.16,
       "s": 70,
       "fixed": true
      },
      {
       "art": "pig",
       "x": 0.26,
       "y": 0.6,
       "s": 100
      },
      {
       "art": "pig",
       "x": 0.48,
       "y": 0.66,
       "s": 88
      },
      {
       "art": "pig",
       "x": 0.68,
       "y": 0.6,
       "s": 96
      }
     ]
    },
    {
     "text": "The first pig built a house of straw. Quick and easy!",
     "items": [
      {
       "art": "house",
       "x": 0.3,
       "y": 0.58,
       "s": 150
      },
      {
       "art": "pig",
       "x": 0.62,
       "y": 0.64,
       "s": 100
      },
      {
       "art": "sun",
       "x": 0.85,
       "y": 0.14,
       "s": 64,
       "fixed": true
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "I PREDICT the straw house will not be strong. Let’s read on and check my prediction!"
     }
    },
    {
     "text": "The second pig built a house of sticks. A bit stronger!",
     "items": [
      {
       "art": "stickHouse",
       "x": 0.3,
       "y": 0.58,
       "s": 148
      },
      {
       "art": "pig",
       "x": 0.62,
       "y": 0.64,
       "s": 100
      },
      {
       "art": "sun",
       "x": 0.15,
       "y": 0.14,
       "s": 64,
       "fixed": true
      }
     ]
    },
    {
     "text": "The third pig built a house of bricks. It took a long time!",
     "items": [
      {
       "art": "brickHouse",
       "x": 0.3,
       "y": 0.58,
       "s": 152
      },
      {
       "art": "pig",
       "x": 0.64,
       "y": 0.64,
       "s": 100
      },
      {
       "art": "tuft",
       "x": 0.9,
       "y": 0.72,
       "s": 56
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Which house will the wolf NOT blow down?",
      "choices": [
       {
        "label": "The straw house",
        "why": "Straw is light — it blows away!"
       },
       {
        "label": "The stick house",
        "why": "Sticks are stronger than straw, but a big wolf can still push them."
       },
       {
        "label": "The brick house",
        "correct": true,
        "why": "Yes! Bricks are heavy and strong. You predicted from the story’s clues!"
       }
      ]
     }
    },
    {
     "text": "A big wolf came! He huffed and puffed. The straw house flew away!",
     "items": [
      {
       "art": "wolf",
       "x": 0.24,
       "y": 0.58,
       "s": 110
      },
      {
       "art": "gust",
       "x": 0.55,
       "y": 0.48,
       "s": 80
      },
      {
       "art": "house",
       "x": 0.82,
       "y": 0.62,
       "s": 140
      }
     ]
    },
    {
     "text": "The stick house fell too! Both pigs ran to the brick house.",
     "items": [
      {
       "art": "brickHouse",
       "x": 0.6,
       "y": 0.58,
       "s": 150
      },
      {
       "art": "pig",
       "x": 0.26,
       "y": 0.68,
       "s": 84
      },
      {
       "art": "pig",
       "x": 0.4,
       "y": 0.7,
       "s": 80
      },
      {
       "art": "wolf",
       "x": 0.88,
       "y": 0.6,
       "s": 105
      }
     ]
    },
    {
     "text": "The wolf huffed and puffed. But the brick house stood STILL.",
     "items": [
      {
       "art": "wolf",
       "x": 0.2,
       "y": 0.56,
       "s": 105
      },
      {
       "art": "gust",
       "x": 0.42,
       "y": 0.44,
       "s": 90
      },
      {
       "art": "brickHouse",
       "x": 0.76,
       "y": 0.58,
       "s": 155
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Why did the brick house stand still?",
      "choices": [
       {
        "label": "It was a lucky house",
        "why": "Not luck — the story told us why!"
       },
       {
        "label": "Bricks are heavy and strong",
        "correct": true,
        "why": "Right! You checked the story’s own words to explain why."
       },
       {
        "label": "The wolf was tired",
        "why": "The wolf huffed plenty — that is not the reason the house stood."
       }
      ]
     }
    },
    {
     "text": "The wolf climbed down the chimney — SPLASH! Right into a pot of soup. The pigs were safe.",
     "items": [
      {
       "art": "soupPot",
       "x": 0.5,
       "y": 0.66,
       "s": 92
      },
      {
       "art": "wolf",
       "x": 0.5,
       "y": 0.38,
       "s": 100
      },
      {
       "art": "pig",
       "x": 0.18,
       "y": 0.66,
       "s": 80
      },
      {
       "art": "pig",
       "x": 0.34,
       "y": 0.7,
       "s": 76
      },
      {
       "art": "pig",
       "x": 0.84,
       "y": 0.66,
       "s": 82
      }
     ]
    }
   ]
  },
  {
   "title": "Goldilocks and the Three Bears",
   "fiction": true,
   "strategies": [
    "🔮 Predict",
    "🕵️ Use the clues"
   ],
   "palette": {
    "sky": [
     "#fdf3d8",
     "#f7e3b0"
    ],
    "ground": "#e2c893"
   },
   "pages": [
    {
     "text": "Goldilocks walked into the forest. She found a little wooden house.",
     "items": [
      {
       "art": "girl",
       "x": 0.3,
       "y": 0.6,
       "s": 104
      },
      {
       "art": "cottage",
       "x": 0.72,
       "y": 0.56,
       "s": 150
      },
      {
       "art": "tree",
       "x": 0.1,
       "y": 0.5,
       "s": 90
      },
      {
       "art": "tree",
       "x": 0.93,
       "y": 0.46,
       "s": 100
      },
      {
       "art": "sun",
       "x": 0.16,
       "y": 0.14,
       "s": 58,
       "fixed": true
      }
     ]
    },
    {
     "text": "The door was open. Three bowls of porridge sat on the table.",
     "items": [
      {
       "art": "porridge",
       "x": 0.3,
       "y": 0.64,
       "s": 54
      },
      {
       "art": "porridge",
       "x": 0.5,
       "y": 0.68,
       "s": 64
      },
      {
       "art": "porridge",
       "x": 0.7,
       "y": 0.64,
       "s": 48
      },
      {
       "art": "girl",
       "x": 0.5,
       "y": 0.32,
       "s": 96
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "I wonder whose house this is. Three bowls… I PREDICT: a family of three — maybe bears! Let’s read and check."
     }
    },
    {
     "text": "She tasted the big bowl — too hot! The middle bowl — too cold! The little bowl — just right. She ate it ALL.",
     "items": [
      {
       "art": "girl",
       "x": 0.5,
       "y": 0.56,
       "s": 100
      },
      {
       "art": "porridge",
       "x": 0.22,
       "y": 0.66,
       "s": 52
      },
      {
       "art": "porridge",
       "x": 0.5,
       "y": 0.7,
       "s": 62
      },
      {
       "art": "porridge",
       "x": 0.78,
       "y": 0.66,
       "s": 46
      }
     ]
    },
    {
     "text": "Then she felt tired. Big bed — too hard! Middle bed — too soft! Little bed — just right.",
     "items": [
      {
       "art": "bed",
       "x": 0.5,
       "y": 0.58,
       "s": 150
      },
      {
       "art": "girl",
       "x": 0.5,
       "y": 0.4,
       "s": 92
      }
     ]
    },
    {
     "text": "While she slept, the front door opened…",
     "items": [
      {
       "art": "bear",
       "x": 0.22,
       "y": 0.6,
       "s": 116
      },
      {
       "art": "bear",
       "x": 0.5,
       "y": 0.63,
       "s": 96
      },
      {
       "art": "bear",
       "x": 0.78,
       "y": 0.63,
       "s": 74
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Who is coming home?",
      "choices": [
       {
        "label": "The police",
        "why": "The police do not live in forest houses — check the clues!"
       },
       {
        "label": "Three bears",
        "correct": true,
        "why": "Yes! Three bowls, three beds — the clues all said a bear family lives here."
       },
       {
        "label": "Her mum",
        "why": "Her mum would call her name — the story shows three animal shapes at the door."
       }
      ]
     }
    },
    {
     "text": "\"Somebody tasted my porridge!\" said Father Bear. His voice was big and grumbly.",
     "items": [
      {
       "art": "bear",
       "x": 0.5,
       "y": 0.58,
       "s": 120
      },
      {
       "art": "porridge",
       "x": 0.8,
       "y": 0.68,
       "s": 48
      }
     ]
    },
    {
     "text": "\"Somebody is in MY bed!\" squeaked Baby Bear. Goldilocks woke up!",
     "items": [
      {
       "art": "bear",
       "x": 0.28,
       "y": 0.62,
       "s": 80
      },
      {
       "art": "girl",
       "x": 0.56,
       "y": 0.5,
       "s": 96
      },
      {
       "art": "bed",
       "x": 0.56,
       "y": 0.66,
       "s": 140
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "How does Goldilocks feel right now?",
      "choices": [
       {
        "label": "Sleepy and calm",
        "why": "She just woke to loud bear voices — the clues say otherwise!"
       },
       {
        "label": "Scared",
        "correct": true,
        "why": "Right! Three bears shouting would scare anyone — you read between the lines."
       },
       {
        "label": "Angry",
        "why": "Angry is for unfair things — here the clue words are \"woke up\" to big loud voices."
       }
      ]
     }
    },
    {
     "text": "She jumped out of bed. She ran through the trees — and never went back!",
     "items": [
      {
       "art": "girl",
       "x": 0.34,
       "y": 0.5,
       "s": 100
      },
      {
       "art": "tree",
       "x": 0.74,
       "y": 0.5,
       "s": 100
      },
      {
       "art": "gust",
       "x": 0.56,
       "y": 0.38,
       "s": 60
      }
     ]
    }
   ]
  },
  {
   "title": "Tadpole to Frog",
   "fiction": false,
   "strategies": [
    "❓ Ask questions",
    "✅ Say it back"
   ],
   "palette": {
    "sky": [
     "#e3f2fd",
     "#cbe8f6"
    ],
    "ground": "#4aa8e8",
    "kind": "water"
   },
   "pages": [
    {
     "text": "This is a frog pond. Frogs begin life in the water — as tiny eggs!",
     "items": [
      {
       "art": "lily",
       "x": 0.18,
       "y": 0.36,
       "s": 96
      },
      {
       "art": "eggs",
       "x": 0.5,
       "y": 0.56,
       "s": 66
      },
      {
       "art": "eggs",
       "x": 0.64,
       "y": 0.63,
       "s": 52
      },
      {
       "art": "frog",
       "x": 0.86,
       "y": 0.4,
       "s": 92
      }
     ]
    },
    {
     "text": "The eggs hatch into tadpoles. They have long tails. They swim like little fish.",
     "items": [
      {
       "art": "tadpole",
       "x": 0.3,
       "y": 0.56,
       "s": 64
      },
      {
       "art": "tadpole",
       "x": 0.55,
       "y": 0.63,
       "s": 58
      },
      {
       "art": "tadpole",
       "x": 0.78,
       "y": 0.54,
       "s": 62
      }
     ]
    },
    {
     "text": "Slowly, back legs grow. Then front legs. The tail gets shorter and shorter.",
     "items": [
      {
       "art": "frog",
       "x": 0.5,
       "y": 0.54,
       "s": 104
      },
      {
       "art": "legs",
       "x": 0.24,
       "y": 0.6,
       "s": 50
      },
      {
       "art": "legs",
       "x": 0.74,
       "y": 0.6,
       "s": 50
      },
      {
       "art": "bubbles",
       "x": 0.88,
       "y": 0.28,
       "s": 54,
       "fixed": true
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "I ASK questions as I read: \"Do tadpoles have legs yet?\" The picture and words say — legs grow LATER!"
     }
    },
    {
     "text": "At last — a frog! It hops out onto the land!",
     "items": [
      {
       "art": "frog",
       "x": 0.5,
       "y": 0.46,
       "s": 120
      },
      {
       "art": "bubbles",
       "x": 0.24,
       "y": 0.66,
       "s": 50,
       "fixed": true
      },
      {
       "art": "sprout",
       "x": 0.8,
       "y": 0.66,
       "s": 44
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Say it back: what does a tadpole become?",
      "choices": [
       {
        "label": "A fish",
        "why": "It swims like a fish at first — but it changes!"
       },
       {
        "label": "A frog",
        "correct": true,
        "why": "Yes! Saying facts back in your own words locks them in."
       },
       {
        "label": "A bird",
        "why": "No wings in this story — frogs stay frogs."
       }
      ]
     }
    },
    {
     "text": "Frogs eat insects. They breathe air — just like you.",
     "items": [
      {
       "art": "frog",
       "x": 0.3,
       "y": 0.56,
       "s": 96
      },
      {
       "art": "bug",
       "x": 0.64,
       "y": 0.44,
       "s": 40
      },
      {
       "art": "bug",
       "x": 0.82,
       "y": 0.58,
       "s": 40
      }
     ]
    },
    {
     "text": "In spring, the frog lays eggs in the pond. The story starts again!",
     "items": [
      {
       "art": "frog",
       "x": 0.3,
       "y": 0.44,
       "s": 96
      },
      {
       "art": "eggs",
       "x": 0.6,
       "y": 0.58,
       "s": 64
      },
      {
       "art": "eggs",
       "x": 0.74,
       "y": 0.65,
       "s": 50
      },
      {
       "art": "lily",
       "x": 0.9,
       "y": 0.4,
       "s": 84
      }
     ]
    }
   ]
  }
 ],
 "mid": [
  {
   "title": "Little Red Riding Hood",
   "fiction": true,
   "strategies": [
    "🕵️ Read between the lines",
    "🔍 Fix fuzzy words"
   ],
   "palette": {
    "sky": [
     "#e8f7ff",
     "#cfeaff"
    ],
    "ground": "#a8d98a"
   },
   "pages": [
    {
     "text": "Little Red Riding Hood put on her red cloak. She carried a basket of cakes to Grandma, deep in the woods.",
     "items": [
      {
       "art": "redRiding",
       "x": 0.3,
       "y": 0.58,
       "s": 108
      },
      {
       "art": "basket",
       "x": 0.43,
       "y": 0.72,
       "s": 44
      },
      {
       "art": "tree",
       "x": 0.75,
       "y": 0.44,
       "s": 110
      },
      {
       "art": "tree",
       "x": 0.93,
       "y": 0.54,
       "s": 100
      }
     ]
    },
    {
     "text": "A wolf saw her! He ran ahead. He locked Grandma in the cupboard. He put on her nightcap and glasses.",
     "items": [
      {
       "art": "wolf",
       "x": 0.5,
       "y": 0.5,
       "s": 112,
       "cap": true
      },
      {
       "art": "door",
       "x": 0.87,
       "y": 0.54,
       "s": 110
      },
      {
       "art": "tree",
       "x": 0.1,
       "y": 0.48,
       "s": 96
      }
     ]
    },
    {
     "text": "\"Grandma, your voice sounds hoarse,\" said Little Red, stepping closer.",
     "items": [
      {
       "art": "redRiding",
       "x": 0.28,
       "y": 0.56,
       "s": 104
      },
      {
       "art": "wolf",
       "x": 0.66,
       "y": 0.5,
       "s": 112,
       "cap": true
      },
      {
       "art": "bed",
       "x": 0.66,
       "y": 0.68,
       "s": 140
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "\"Hoarse\" felt fuzzy to me! I read around it — a voice that is not quite Grandma’s. Hoarse = rough and croaky. Fixed!"
     }
    },
    {
     "text": "\"Grandma, what BIG ears you have!\"",
     "items": [
      {
       "art": "redRiding",
       "x": 0.28,
       "y": 0.56,
       "s": 104
      },
      {
       "art": "wolf",
       "x": 0.68,
       "y": 0.52,
       "s": 116,
       "cap": true
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Why do the ears look SO big?",
      "choices": [
       {
        "label": "It is the wolf in a costume",
        "correct": true,
        "why": "Exactly — nightcap, glasses, croaky voice: the clues add up to a wolf in disguise."
       },
       {
        "label": "Grandma has big ears",
        "why": "Grandmas do not suddenly grow ears — the clues point somewhere else!"
       },
       {
        "label": "The room is dark",
        "why": "Nothing in the story mentions darkness — stick to the clues the author gave."
       }
      ]
     }
    },
    {
     "text": "\"Grandma, what BIG teeth you have!\" — \"ALL THE BETTER TO EAT YOU WITH!\"",
     "items": [
      {
       "art": "redRiding",
       "x": 0.26,
       "y": 0.5,
       "s": 100
      },
      {
       "art": "wolf",
       "x": 0.7,
       "y": 0.5,
       "s": 120,
       "cap": true
      },
      {
       "art": "teeth",
       "x": 0.48,
       "y": 0.32,
       "s": 44
      }
     ]
    },
    {
     "text": "Little Red screamed! A woodcutter burst through the door. The wolf leaped out of the window — and away.",
     "items": [
      {
       "art": "woodcutter",
       "x": 0.22,
       "y": 0.54,
       "s": 116
      },
      {
       "art": "redRiding",
       "x": 0.46,
       "y": 0.58,
       "s": 100
      },
      {
       "art": "wolf",
       "x": 0.85,
       "y": 0.44,
       "s": 108
      }
     ]
    },
    {
     "text": "They set Grandma free. They ate the cakes together. And Little Red never talked to strange wolves again.",
     "items": [
      {
       "art": "grandma",
       "x": 0.3,
       "y": 0.58,
       "s": 104
      },
      {
       "art": "redRiding",
       "x": 0.52,
       "y": 0.6,
       "s": 100
      },
      {
       "art": "basket",
       "x": 0.76,
       "y": 0.7,
       "s": 46
      },
      {
       "art": "tree",
       "x": 0.92,
       "y": 0.46,
       "s": 96
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "\"Better to eat you with\" means…",
      "choices": [
       {
        "label": "He wants to share dinner",
        "why": "Sharing is friendly — those teeth were not friendly!"
       },
       {
        "label": "He wants to eat HER",
        "correct": true,
        "why": "Right — you read past the words to what the wolf really meant. That is reading between the lines."
       },
       {
        "label": "He is telling a joke",
        "why": "Nobody screamed at jokes — the story’s clues were scary ones."
       }
      ]
     }
    }
   ]
  },
  {
   "title": "The Boy Who Cried Wolf",
   "fiction": true,
   "strategies": [
    "✍️ Notice word choices",
    "🕵️ Read feelings from clues"
   ],
   "palette": {
    "sky": [
     "#fdf6e8",
     "#f3e2bd"
    ],
    "ground": "#e2c893"
   },
   "pages": [
    {
     "text": "The shepherd boy was bored. Watching sheep all day — bored, bored, BORED.",
     "items": [
      {
       "art": "boy",
       "x": 0.3,
       "y": 0.56,
       "s": 104
      },
      {
       "art": "sheep",
       "x": 0.62,
       "y": 0.63,
       "s": 60
      },
      {
       "art": "sheep",
       "x": 0.77,
       "y": 0.66,
       "s": 54
      },
      {
       "art": "sheep",
       "x": 0.9,
       "y": 0.6,
       "s": 58
      }
     ]
    },
    {
     "text": "He decided to play a trick. \"WOLF! WOLF!\" he shouted. The whole village came running!",
     "items": [
      {
       "art": "boy",
       "x": 0.3,
       "y": 0.5,
       "s": 104
      },
      {
       "art": "gust",
       "x": 0.5,
       "y": 0.36,
       "s": 70
      },
      {
       "art": "villager",
       "x": 0.7,
       "y": 0.6,
       "s": 96
      },
      {
       "art": "villager",
       "x": 0.87,
       "y": 0.64,
       "s": 90
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "The author wrote SHOUTED, not said. Shouting shows alarm — no wonder the villagers came running. Word choices are clues!"
     }
    },
    {
     "text": "\"Where is the wolf?\" they panted. \"Oh… it ran away,\" giggled the boy. Again he cried WOLF. Again — no wolf.",
     "items": [
      {
       "art": "boy",
       "x": 0.3,
       "y": 0.52,
       "s": 100
      },
      {
       "art": "villager",
       "x": 0.72,
       "y": 0.58,
       "s": 94,
       "angry": true
      },
      {
       "art": "villager",
       "x": 0.9,
       "y": 0.64,
       "s": 88,
       "angry": true
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "The villagers now feel…",
      "choices": [
       {
        "label": "Fooled and cross",
        "correct": true,
        "why": "Yes — their faces and the words \"panted\" and \"giggled\" tell us the trick is wearing thin."
       },
       {
        "label": "Excited for more fun",
        "why": "They RAN uphill twice for nothing — excitement is not what the clues show."
       },
       {
        "label": "Sorry for the boy",
        "why": "He tricked them — the clues point to anger, not pity."
       }
      ]
     }
    },
    {
     "text": "Then a real wolf LEAPED over the wall, sharp teeth shining!",
     "items": [
      {
       "art": "wolf",
       "x": 0.55,
       "y": 0.5,
       "s": 124
      },
      {
       "art": "wall",
       "x": 0.16,
       "y": 0.62,
       "s": 120
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Why did the author choose \"leaped\"?",
      "choices": [
       {
        "label": "To show the wolf was fast and dangerous",
        "correct": true,
        "why": "Exactly — one strong verb paints the whole danger. Authors choose every word on purpose."
       },
       {
        "label": "To show the wolf was sleepy",
        "why": "Sleepy animals do not leap walls — try the other clue."
       },
       {
        "label": "Because it rhymes",
        "why": "Nothing rhymes here — word choices carry meaning, not rhyme."
       }
      ]
     }
    },
    {
     "text": "\"WOLF! WOLF!\" the boy cried at the top of his lungs. But nobody came.",
     "items": [
      {
       "art": "boy",
       "x": 0.3,
       "y": 0.5,
       "s": 104
      },
      {
       "art": "gust",
       "x": 0.5,
       "y": 0.34,
       "s": 80
      },
      {
       "art": "village",
       "x": 0.82,
       "y": 0.52,
       "s": 140
      }
     ]
    },
    {
     "text": "That night he counted his sheep — three were gone. Tricks cost more than fun.",
     "items": [
      {
       "art": "boy",
       "x": 0.3,
       "y": 0.56,
       "s": 100
      },
      {
       "art": "sheep",
       "x": 0.56,
       "y": 0.63,
       "s": 56
      },
      {
       "art": "sheep",
       "x": 0.7,
       "y": 0.66,
       "s": 50
      },
      {
       "art": "moon",
       "x": 0.88,
       "y": 0.26,
       "s": 84,
       "fixed": true
      }
     ]
    }
   ]
  },
  {
   "title": "Sharks!",
   "fiction": false,
   "strategies": [
    "🔖 Flag fuzzy words",
    "🔍 Read around them"
   ],
   "palette": {
    "sky": [
     "#bfe6f7",
     "#8fd0ee"
    ],
    "ground": "#3f9edb",
    "kind": "water"
   },
   "pages": [
    {
     "text": "Sharks are fish — but not like the fish in your tank. Their skeletons are made of cartilage, not bone.",
     "items": [
      {
       "art": "shark",
       "x": 0.5,
       "y": 0.5,
       "s": 150
      },
      {
       "art": "fish",
       "x": 0.18,
       "y": 0.62,
       "s": 44
      },
      {
       "art": "fish",
       "x": 0.82,
       "y": 0.66,
       "s": 44
      }
     ]
    },
    {
     "text": "A shark’s skin is covered with tiny tooth-like scales called denticles.",
     "items": [
      {
       "art": "shark",
       "x": 0.5,
       "y": 0.5,
       "s": 150
      },
      {
       "art": "magnifier",
       "x": 0.74,
       "y": 0.28,
       "s": 64,
       "fixed": true
      },
      {
       "art": "bubbles",
       "x": 0.16,
       "y": 0.28,
       "s": 50,
       "fixed": true
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "\"Denticles\" is a brand-new word to me. I flag it 🔖 and read around: \"tooth-like scales\" — that IS the meaning. Fuzzy word fixed!"
     }
    },
    {
     "text": "Sharks never run out of teeth! A new row slides forward whenever one falls out.",
     "items": [
      {
       "art": "teeth",
       "x": 0.24,
       "y": 0.44,
       "s": 60
      },
      {
       "art": "teeth",
       "x": 0.38,
       "y": 0.52,
       "s": 52
      },
      {
       "art": "teeth",
       "x": 0.52,
       "y": 0.58,
       "s": 50
      },
      {
       "art": "shark",
       "x": 0.84,
       "y": 0.5,
       "s": 120
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "\"Never run out of teeth\" means…",
      "choices": [
       {
        "label": "Old teeth are always replaced",
        "correct": true,
        "why": "Yes — \"a new row slides forward\" was the clue. Reading around works!"
       },
       {
        "label": "Sharks have one tooth forever",
        "why": "The opposite of the clue — a NEW row arrives."
       },
       {
        "label": "Sharks never bite",
        "why": "Teeth that replace themselves are for biting — check the clue again."
       }
      ]
     }
    },
    {
     "text": "Most sharks are not dangerous. The whale shark — as long as a bus! — eats only tiny plankton.",
     "items": [
      {
       "art": "shark",
       "x": 0.4,
       "y": 0.5,
       "s": 190,
       "spots": true
      },
      {
       "art": "fish",
       "x": 0.87,
       "y": 0.58,
       "s": 40
      },
      {
       "art": "krill",
       "x": 0.6,
       "y": 0.68,
       "s": 60
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Plankton must be…",
      "choices": [
       {
        "label": "Huge fish",
        "why": "A bus-long shark eating huge fish? The word \"tiny\" is your clue."
       },
       {
        "label": "Tiny drifting sea creatures",
        "correct": true,
        "why": "Right — \"tiny\" + \"only\" tells you plankton are small. You fixed a fuzzy word by reading around!"
       },
       {
        "label": "Shark teeth",
        "why": "Teeth are not food — the clue word is \"tiny\"."
       }
      ]
     }
    },
    {
     "text": "Scientists find new kinds of sharks every year. What will YOU find out?",
     "items": [
      {
       "art": "magnifier",
       "x": 0.24,
       "y": 0.5,
       "s": 70
      },
      {
       "art": "shark",
       "x": 0.62,
       "y": 0.52,
       "s": 140
      },
      {
       "art": "bubbles",
       "x": 0.88,
       "y": 0.28,
       "s": 50,
       "fixed": true
      }
     ]
    }
   ]
  }
 ],
 "upper": [
  {
   "title": "Stone Soup",
   "fiction": true,
   "strategies": [
    "✍️ Word-choice detective",
    "🧩 Theme from clues"
   ],
   "palette": {
    "sky": [
     "#fdf3d8",
     "#f7e3b0"
    ],
    "ground": "#d9c48f"
   },
   "pages": [
    {
     "text": "The travellers came to a village where every door was shut and every pot was empty.",
     "items": [
      {
       "art": "traveller",
       "x": 0.24,
       "y": 0.56,
       "s": 110
      },
      {
       "art": "traveller",
       "x": 0.38,
       "y": 0.6,
       "s": 104,
       "girl": true
      },
      {
       "art": "door",
       "x": 0.74,
       "y": 0.52,
       "s": 110
      },
      {
       "art": "door",
       "x": 0.93,
       "y": 0.56,
       "s": 104
      }
     ]
    },
    {
     "text": "\"We are making STONE SOUP!\" they announced, dropping a round grey stone into a bubbling pot.",
     "items": [
      {
       "art": "stone",
       "x": 0.5,
       "y": 0.62,
       "s": 40
      },
      {
       "art": "soupPot",
       "x": 0.5,
       "y": 0.74,
       "s": 96
      },
      {
       "art": "traveller",
       "x": 0.28,
       "y": 0.48,
       "s": 104
      },
      {
       "art": "traveller",
       "x": 0.7,
       "y": 0.48,
       "s": 100,
       "girl": true
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "ANNOUNCED — not \"said\". The author shows they wanted every door to hear. Word choice reveals purpose!"
     }
    },
    {
     "text": "\"Stone soup is good,\" they sighed, \"but a carrot would make it better.\" A farmer brought a carrot.",
     "items": [
      {
       "art": "veg",
       "x": 0.74,
       "y": 0.64,
       "s": 52,
       "kind": 0
      },
      {
       "art": "villager",
       "x": 0.9,
       "y": 0.56,
       "s": 100
      },
      {
       "art": "soupPot",
       "x": 0.5,
       "y": 0.72,
       "s": 92
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "The author repeats this pattern — carrot, onion, potato. Why?",
      "choices": [
       {
        "label": "Small gifts add up to a feast",
        "correct": true,
        "why": "Exactly — the repeating pattern IS the theme: everyone gives a little, everyone eats a lot."
       },
       {
        "label": "She ran out of words",
        "why": "Authors repeat on purpose — patterns are meaning."
       },
       {
        "label": "To make the soup realistic",
        "why": "Real soup matters less than what the pattern shows about sharing."
       }
      ]
     }
    },
    {
     "text": "Soon the pot smelled rich and warm. The whole village shared the first real meal of a long, cold winter.",
     "items": [
      {
       "art": "soupPot",
       "x": 0.5,
       "y": 0.6,
       "s": 120
      },
      {
       "art": "villager",
       "x": 0.16,
       "y": 0.56,
       "s": 96
      },
      {
       "art": "villager",
       "x": 0.84,
       "y": 0.56,
       "s": 96
      },
      {
       "art": "snowflake",
       "x": 0.92,
       "y": 0.24,
       "s": 44,
       "fixed": true
      }
     ]
    },
    {
     "text": "\"You made soup from a stone!\" laughed the villagers. The travellers smiled — and packed their spoons.",
     "items": [
      {
       "art": "villager",
       "x": 0.26,
       "y": 0.5,
       "s": 92,
       "laugh": true
      },
      {
       "art": "villager",
       "x": 0.74,
       "y": 0.5,
       "s": 92,
       "laugh": true
      },
      {
       "art": "spoon",
       "x": 0.5,
       "y": 0.6,
       "s": 60
      },
      {
       "art": "bag",
       "x": 0.9,
       "y": 0.58,
       "s": 64
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "What did the travellers REALLY make the soup from?",
      "choices": [
       {
        "label": "The stone",
        "why": "Stones make no soup — smile at the trick and read the theme."
       },
       {
        "label": "The village’s own sharing",
        "correct": true,
        "why": "Yes — the stone was the invitation; the feast came from everyone. That is the theme hiding under the story."
       },
       {
        "label": "Rainwater",
        "why": "Rainwater is not in the story — build the theme from the clues given."
       }
      ]
     }
    }
   ]
  },
  {
   "title": "The Tortoise and the Hare",
   "fiction": true,
   "strategies": [
    "🕵️ Infer beyond the text",
    "📄 Prove it with the words"
   ],
   "palette": {
    "sky": [
     "#e8f7ff",
     "#cfeaff"
    ],
    "ground": "#a8d98a"
   },
   "pages": [
    {
     "text": "The hare boasted he was the fastest animal in the valley. His legs were long as beanpoles.",
     "items": [
      {
       "art": "hare",
       "x": 0.35,
       "y": 0.56,
       "s": 104
      },
      {
       "art": "tortoise",
       "x": 0.72,
       "y": 0.64,
       "s": 84
      },
      {
       "art": "sprout",
       "x": 0.1,
       "y": 0.68,
       "s": 40
      },
      {
       "art": "sprout",
       "x": 0.93,
       "y": 0.7,
       "s": 40
      }
     ]
    },
    {
     "text": "\"Race you to the hill!\" yawned the tortoise. The meadow exploded with laughter.",
     "items": [
      {
       "art": "tortoise",
       "x": 0.28,
       "y": 0.6,
       "s": 84
      },
      {
       "art": "hare",
       "x": 0.6,
       "y": 0.56,
       "s": 100
      },
      {
       "art": "confetti",
       "x": 0.5,
       "y": 0.3,
       "s": 70,
       "fixed": true
      },
      {
       "art": "sheep",
       "x": 0.86,
       "y": 0.5,
       "s": 56
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "\"EXPLODED with laughter\" — not just \"laughed\". The author’s word choice shows how huge and surprised the laugh was. Words carry the feeling!"
     }
    },
    {
     "text": "The hare sprinted ahead, then stopped to nap under a mulberry tree. \"Plenty of time,\" he murmured.",
     "items": [
      {
       "art": "hare",
       "x": 0.4,
       "y": 0.5,
       "s": 100
      },
      {
       "art": "sleepZ",
       "x": 0.6,
       "y": 0.34,
       "s": 54,
       "fixed": true
      },
      {
       "art": "tree",
       "x": 0.8,
       "y": 0.44,
       "s": 110
      }
     ]
    },
    {
     "text": "The tortoise walked on. Slowly. Steadily. Past the sleeping hare, up the hill.",
     "items": [
      {
       "art": "tortoise",
       "x": 0.28,
       "y": 0.62,
       "s": 80
      },
      {
       "art": "tortoise",
       "x": 0.54,
       "y": 0.63,
       "s": 74
      },
      {
       "art": "mountain",
       "x": 0.87,
       "y": 0.4,
       "s": 120,
       "fixed": true
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "The text never SAYS \"the hare was over-confident\". What can you INFER from \"stopped to nap\" + \"plenty of time\"?",
      "choices": [
       {
        "label": "The hare was too sure of winning",
        "correct": true,
        "why": "Exactly — clues + your thinking = inference. Napping mid-race only makes sense if you are sure you already won."
       },
       {
        "label": "The hare was tired from running",
        "why": "Possible — but \"plenty of time\" adds the cocky part. Read BOTH clues."
       },
       {
        "label": "The tortoise told him to rest",
        "why": "Not in the text — inferences start from the author’s clues, not new stories."
       }
      ]
     }
    },
    {
     "text": "The cheering woke the hare — too late. The tortoise crossed the line first.",
     "items": [
      {
       "art": "flag",
       "x": 0.84,
       "y": 0.56,
       "s": 90
      },
      {
       "art": "tortoise",
       "x": 0.6,
       "y": 0.63,
       "s": 84
      },
      {
       "art": "hare",
       "x": 0.26,
       "y": 0.56,
       "s": 100
      },
      {
       "art": "confetti",
       "x": 0.85,
       "y": 0.3,
       "s": 60,
       "fixed": true
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Which line PROVES \"slow and steady wins\"?",
      "choices": [
       {
        "label": "\"legs were long as beanpoles\"",
        "why": "That describes speed, not the lesson — find the line about HOW he moved."
       },
       {
        "label": "\"Slowly. Steadily. Past the sleeping hare.\"",
        "correct": true,
        "why": "Yes — that line carries the whole moral. Good readers can point to the exact words."
       },
       {
        "label": "\"exploded with laughter\"",
        "why": "That is the crowd, not the tortoise’s winning way."
       }
      ]
     }
    },
    {
     "text": "Aesop told this fable two and a half thousand years ago. Readers still argue about what it truly means. What do YOU think?",
     "items": [
      {
       "art": "scroll",
       "x": 0.24,
       "y": 0.5,
       "s": 70,
       "fixed": true
      },
      {
       "art": "tortoise",
       "x": 0.52,
       "y": 0.63,
       "s": 84
      },
      {
       "art": "hare",
       "x": 0.79,
       "y": 0.58,
       "s": 100
      }
     ]
    }
   ]
  },
  {
   "title": "The Moon",
   "fiction": false,
   "strategies": [
    "🔖 Flag half-known words",
    "📄 Check the text"
   ],
   "palette": {
    "sky": [
     "#0a1428",
     "#101c33"
    ],
    "ground": "#25304f",
    "kind": "moon",
    "night": true
   },
   "dark": true,
   "pages": [
    {
     "text": "The Moon is Earth’s only natural satellite. It drifts away from us 4 centimetres every year.",
     "items": [
      {
       "art": "moon",
       "x": 0.72,
       "y": 0.28,
       "s": 110,
       "fixed": true
      },
      {
       "art": "earth",
       "x": 0.3,
       "y": 0.55,
       "s": 100
      },
      {
       "art": "satellite",
       "x": 0.52,
       "y": 0.34,
       "s": 50,
       "fixed": true
      }
     ]
    },
    {
     "text": "Its grey \"seas\" are ancient rivers of frozen lava — not water at all.",
     "items": [
      {
       "art": "moon",
       "x": 0.62,
       "y": 0.3,
       "s": 120,
       "fixed": true
      },
      {
       "art": "lavaFlow",
       "x": 0.22,
       "y": 0.56,
       "s": 90
      }
     ],
     "stop": {
      "kind": "model",
      "mentor": "\"Ancient\" is half-fuzzy for me → I flag it 🔖 ancient = very, very old. Naming the fuzziness is a superpower."
     }
    },
    {
     "text": "Moon dust is razor-sharp; it clung to the astronauts’ boots and smelled like gunpowder.",
     "items": [
      {
       "art": "astronaut",
       "x": 0.35,
       "y": 0.5,
       "s": 120
      },
      {
       "art": "moon",
       "x": 0.78,
       "y": 0.32,
       "s": 100,
       "fixed": true
      },
      {
       "art": "prints",
       "x": 0.58,
       "y": 0.66,
       "s": 64
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "A word feels fuzzy: \"clung\". Best reader move?",
      "choices": [
       {
        "label": "Read around and picture it sticking like socks from the dryer",
        "correct": true,
        "why": "Exactly — read around, picture it, keep going. That is a fix-up move!"
       },
       {
        "label": "Close the book",
        "why": "One fuzzy word is no reason to stop reading — fix it and move on."
       },
       {
        "label": "Pretend you know it",
        "why": "Pretending lets fuzz pile up — flag it, fix it, finish it."
       }
      ]
     }
    },
    {
     "text": "Twelve people have walked on the Moon — all between 1969 and 1972. Their footprints are still there, perfectly kept.",
     "items": [
      {
       "art": "prints",
       "x": 0.26,
       "y": 0.62,
       "s": 56
      },
      {
       "art": "prints",
       "x": 0.4,
       "y": 0.66,
       "s": 50
      },
      {
       "art": "astronaut",
       "x": 0.62,
       "y": 0.5,
       "s": 116
      },
      {
       "art": "moon",
       "x": 0.88,
       "y": 0.28,
       "s": 88,
       "fixed": true
      }
     ]
    },
    {
     "text": "Why do the prints last? The Moon has no wind — nothing blows them away. The next visitor might be you.",
     "items": [
      {
       "art": "moon",
       "x": 0.28,
       "y": 0.3,
       "s": 100,
       "fixed": true
      },
      {
       "art": "rocket",
       "x": 0.62,
       "y": 0.52,
       "s": 120
      },
      {
       "art": "spark",
       "x": 0.9,
       "y": 0.26,
       "s": 40,
       "fixed": true
      }
     ],
     "stop": {
      "kind": "child",
      "prompt": "Fact-check like a reader: how do we know the footprints remain?",
      "choices": [
       {
        "label": "The text says the Moon has no wind",
        "correct": true,
        "why": "Yes — you checked the text’s own reason. Non-fiction readers trust the words that PROVE it."
       },
       {
        "label": "The Moon is close to Earth",
        "why": "Distance is not the reason given — find the sentence with \"wind\"."
       },
       {
        "label": "Footprints are heavy",
        "why": "Weight is not mentioned — go back to the wind line."
       }
      ]
     }
    }
   ]
  }
 ]
};
