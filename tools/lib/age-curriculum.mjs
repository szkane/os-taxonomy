/* ==========================================================================
   age-curriculum.mjs — Per-Age (Ages 5–10 / K–G5) Visual Simulation Openers
   & Curriculum Specialization
   --------------------------------------------------------------------------
   1. Ensures all 66 domains open with a visual Explore-First simulation
      (Konva/Canvas2D `concept-lab` or Three.js 3D `geometry3d`, `optics3d`,
      `diorama3d`, `spatial3d`, `solar3d`, `volcano3d`).
   2. Resolves Math/Science representation ceilings per age (fixing all F2/F8
      flags in age-fit.mjs).
   3. Enriches every mode per-age (5, 6, 7, 8, 9, 10) from that exact age's
      taxonomy topics (`data/topics.json`) and teaching research
      (`data/teaching-research.json`) so no two ages in a domain ever share
      identical game content.
   ========================================================================== */

/* Default 2D Concept-Lab scenes for domains that previously lacked `map.scene`.
   Dial IDs match `src/assets/js/scenes.js` verbatim:
   - watercycle: sun(1..5@2), cool(1..5@2)
   - ecosystem: sunlight(1..5@3), animals(1..5@2)
   - states: temp(-20..120@40)
   - humanbody: activity(1..5@2), breath(1..5@3)
   - timemachine: era(1..5@2), clue(1..3@1)
   - fairtest: water(1..5@2), light(1..2@2)
   - forces: height(0..5@3), surface(0..4@2)
   - codeturtle: steps(1..6@2), repeats(1..4@2)
   - binarylab: b3(0..1@0), b2(0..1@1), b1(0..1@0), b0(0..1@1)
   - circuit: bat(1..4@2), bulbs(1..3@1)
   - databar: apples(0..10@7), bananas(0..10@4), grapes(0..10@5), strawberries(0..10@4)
   - wordwave: beats(1..4@2), parts(1..3@2)
   - coordgrid: x(0..10@3), y(0..10@4), angle(0..360@90)
   - marketlab: earn(1..10@4), save(0..10@2)
   - mindgarden: breath(1..5@2), practice(1..5@2)
   - balance: left(0..10@4), right(0..10@2)
*/
export const DOMAIN_EXPLORE_SCENES = {
  // Science
  "Science|Earth's Systems": {
    id: 'watercycle',
    label: 'Earth systems lab',
    explorePrompt: 'Adjust sun heat and cloud cooling to watch water move between sky, mountains, and sea.',
    cases: [
      { prompt: 'Make warm sun evaporate water fast with light clouds (sun 5, cool 1).', targets: { sun: 5, cool: 1 }, nudge: 'Turn sun heat up to 5 and cloud cooling to 1.', why: 'Strong sunlight heats ocean water into rising water vapor (evaporation).' },
      { prompt: 'Trigger heavy rain by combining strong sun (4) and high cloud cooling (4).', targets: { sun: 4, cool: 4 }, nudge: 'Set both sun heat and cloud cooling to 4.', why: 'Warm vapor rises and condenses in cool air to fall as rain.' },
      { prompt: 'Make snow fall on the mountain peak with sun 3 and maximum cooling (5).', targets: { sun: 3, cool: 5 }, nudge: 'Set sun to 3 and push cloud cooling to 5.', why: 'Freezing upper air turns cloud droplets into snow crystals.' },
    ],
  },
  'Science|Weather & Climate': {
    id: 'watercycle',
    label: 'Weather & water cycle lab',
    explorePrompt: 'Dial the sun and cloud cooling to test calm skies, rainstorms, and mountain snow.',
    cases: [
      { prompt: 'Create a calm, cool day with sun 1 and cloud cooling 1.', targets: { sun: 1, cool: 1 }, nudge: 'Set sun to 1 and cooling to 1.', why: 'With gentle sun and low cooling, evaporation and clouds stay light.' },
      { prompt: 'Build a steady rain shower over the valley (sun 4, cool 3).', targets: { sun: 4, cool: 3 }, nudge: 'Set sun to 4 and cloud cooling to 3.', why: 'Evaporated moisture cools into thick grey rain clouds.' },
      { prompt: 'Create a mountain snowstorm with sun 4 and cooling 5.', targets: { sun: 4, cool: 5 }, nudge: 'Set sun to 4 and cooling to 5.', why: 'High moisture meeting freezing air creates a heavy snowstorm.' },
    ],
  },
  'Science|Ecosystems & Habitats': {
    id: 'ecosystem',
    label: 'Food-web balance lab',
    explorePrompt: 'Adjust sunlight and grazing herbivores to keep the habitat food web thriving.',
    cases: [
      { prompt: 'Build a thriving meadow with bright sunlight (5) and 3 herbivores.', targets: { sunlight: 5, animals: 3 }, nudge: 'Set sunlight to 5 and animals to 3.', why: 'Bright sunlight grows plenty of green plants to feed the herbivores!' },
      { prompt: 'Show overgrazing: low sunlight (1) trying to feed 5 herbivores.', targets: { sunlight: 1, animals: 5 }, nudge: 'Set sunlight to 1 and animals to 5.', why: 'When consumers outnumber plant growth, food runs short and the habitat is stressed.' },
      { prompt: 'Grow a lush plant sanctuary with sunlight 4 and 1 herbivore.', targets: { sunlight: 4, animals: 1 }, nudge: 'Set sunlight to 4 and animals to 1.', why: 'Rich sunlight and light grazing let plants flourish.' },
    ],
  },
  'Science|Animals of the World': {
    id: 'ecosystem',
    label: 'Animal habitat lab',
    explorePrompt: 'Balance sunlight and grazing animals in the wildlife reserve.',
    cases: [
      { prompt: 'Feed 4 grazing animals safely with bright sunlight (5).', targets: { sunlight: 5, animals: 4 }, nudge: 'Set sunlight to 5 and animals to 4.', why: 'Herbivores depend on green plants for energy, and plants depend on sunlight.' },
      { prompt: 'Test what happens when 5 animals have dim sunlight (2).', targets: { sunlight: 2, animals: 5 }, nudge: 'Set sunlight to 2 and animals to 5.', why: 'Without enough plant growth, herbivores must migrate to find food.' },
      { prompt: 'Create a calm reserve with sunlight 4 and 2 animals.', targets: { sunlight: 4, animals: 2 }, nudge: 'Set sunlight to 4 and animals to 2.', why: 'A healthy habitat matches animal numbers to the food supply.' },
    ],
  },
  'Science|Insects & Minibeasts': {
    id: 'ecosystem',
    label: 'Pollinator garden lab',
    explorePrompt: 'Grow sunlit flowers and invite pollinators to see how minibeasts help gardens bloom.',
    cases: [
      { prompt: 'Build a sunny pollinator garden with sunlight 5 and 3 visitors.', targets: { sunlight: 5, animals: 3 }, nudge: 'Set sunlight to 5 and animals to 3.', why: 'Bees and butterflies sip nectar and carry pollen from flower to flower.' },
      { prompt: 'Create a shady leaf-litter corner with sunlight 1 and 1 creature.', targets: { sunlight: 1, animals: 1 }, nudge: 'Set sunlight to 1 and animals to 1.', why: 'Damp, shady spots shelter beetles, worms, and decomposers.' },
      { prompt: 'Support 4 active pollinators with sunlight 4.', targets: { sunlight: 4, animals: 4 }, nudge: 'Set sunlight to 4 and animals to 4.', why: 'More flowers support more insects in a healthy garden web.' },
    ],
  },
  'Science|Ocean Life': {
    id: 'ecosystem',
    label: 'Kelp & reef food web',
    explorePrompt: 'Adjust sunlit kelp/algae and sea creatures to keep the ocean habitat healthy.',
    cases: [
      { prompt: 'Create a sunlit coral reef with sunlight 5 and 3 grazers.', targets: { sunlight: 5, animals: 3 }, nudge: 'Set sunlight to 5 and animals to 3.', why: 'Shallow sunlit water lets algae and kelp grow to feed reef life.' },
      { prompt: 'Model a dim twilight reef with sunlight 2 and 1 grazer.', targets: { sunlight: 2, animals: 1 }, nudge: 'Set sunlight to 2 and animals to 1.', why: 'Deeper water receives less sunlight, so fewer plants can grow.' },
      { prompt: 'Show kelp overgrazing: sunlight 2 with 5 hungry grazers.', targets: { sunlight: 2, animals: 5 }, nudge: 'Set sunlight to 2 and animals to 5.', why: 'When too many grazers eat the kelp, the underwater forest shrinks.' },
    ],
  },
  'Science|Polar Regions': {
    id: 'states',
    label: 'Sea ice & melting lab',
    explorePrompt: 'Change the polar temperature around 0 °C to watch sea ice freeze solid or melt into ocean water.',
    cases: [
      { prompt: 'Freeze the polar sea solid at −15 °C.', targets: { temp: -15 }, nudge: 'Slide temperature down to −15 °C.', why: 'Below 0 °C, water freezes into solid ice that polar bears walk on.' },
      { prompt: 'Warm the ice past freezing to +15 °C so it melts into liquid water.', targets: { temp: 15 }, nudge: 'Slide temperature up to 15 °C.', why: 'Above 0 °C, solid ice melts into liquid water — shrinking summer sea ice.' },
      { prompt: 'Test extreme polar winter at −20 °C.', targets: { temp: -20 }, nudge: 'Push the temperature dial to −20 °C.', why: 'Deep winter cold locks particles tightly into thick polar ice.' },
    ],
  },
  'Science|Rainforests': {
    id: 'ecosystem',
    label: 'Rainforest canopy lab',
    explorePrompt: 'Dial tropical sunlight and wildlife to explore rainforest biodiversity.',
    cases: [
      { prompt: 'Grow a dense tropical rainforest with sunlight 5 and 4 animals.', targets: { sunlight: 5, animals: 4 }, nudge: 'Set sunlight to 5 and animals to 4.', why: 'Strong equatorial sun and abundant plants support rich rainforest wildlife.' },
      { prompt: 'Show canopy stress: low sunlight 1 while 5 animals remain.', targets: { sunlight: 1, animals: 5 }, nudge: 'Set sunlight to 1 and animals to 5.', why: 'Without strong producer growth, forest animals run short of fruit and leaves.' },
      { prompt: 'Balance the forest at sunlight 4 and 3 animals.', targets: { sunlight: 4, animals: 3 }, nudge: 'Set sunlight to 4 and animals to 3.', why: 'Healthy rainforests balance lush plant growth with diverse wildlife.' },
    ],
  },
  'Science|Organisms & Life Processes': {
    id: 'ecosystem',
    label: 'Living organisms lab',
    explorePrompt: 'Adjust sunlight energy and living consumers to see how organisms grow and interact.',
    cases: [
      { prompt: 'Give the habitat strong sunlight (5) and 3 living consumers.', targets: { sunlight: 5, animals: 3 }, nudge: 'Set sunlight to 5 and animals to 3.', why: 'Living things need energy and food to grow, move, and reproduce.' },
      { prompt: 'Test low sunlight (1) with 4 consumers.', targets: { sunlight: 1, animals: 4 }, nudge: 'Set sunlight to 1 and animals to 4.', why: 'Without enough sunlight energy, green plants cannot make food for consumers.' },
      { prompt: 'Set a gentle balance of sunlight 4 and 1 consumer.', targets: { sunlight: 4, animals: 1 }, nudge: 'Set sunlight to 4 and animals to 1.', why: 'Producers capture sunlight energy that flows to every living thing.' },
    ],
  },
  'Science|The Human Body': {
    id: 'humanbody',
    label: 'Heart, lungs & muscles lab',
    explorePrompt: 'Change activity level and breathing depth to watch your heart rate and oxygen delivery respond!',
    cases: [
      { prompt: 'Rest calmly with activity 1 and deep breaths of 4.', targets: { activity: 1, breath: 4 }, nudge: 'Set activity to 1 and breathing depth to 4.', why: 'At rest with deep breaths, your heart beats calmly and oxygen stays high.' },
      { prompt: 'Sprint hard (activity 5) with shallow breaths (breath 1).', targets: { activity: 5, breath: 1 }, nudge: 'Set activity to 5 and breathing depth to 1.', why: 'Hardworking muscles use oxygen fast — shallow breathing makes your heart race!' },
      { prompt: 'Support a brisk run (activity 4) with deep lungs (breath 5).', targets: { activity: 4, breath: 5 }, nudge: 'Set activity to 4 and breathing depth to 5.', why: 'Deep breathing brings fresh oxygen into the lungs so the heart can pump it to active muscles.' },
    ],
  },
  'Science|Dinosaurs & Paleontology': {
    id: 'timemachine',
    label: 'Deep time & fossil finder',
    explorePrompt: 'Turn the era dial (1–5) and clue dial (1–3) to compare ancient life and evidence!',
    cases: [
      { prompt: 'Travel to the oldest era (era 1) and inspect clue 3.', targets: { era: 1, clue: 3 }, nudge: 'Set era to 1 and clue to 3.', why: 'Paleontologists read rock layers and fossils like pages from Earth’s oldest chapters.' },
      { prompt: 'Inspect ancient movement and tracks in era 2, clue 2.', targets: { era: 2, clue: 2 }, nudge: 'Set era to 2 and clue to 2.', why: 'Fossil footprints and trackways show how dinosaurs walked and moved in herds.' },
      { prompt: 'Compare modern science tools in era 5, clue 3.', targets: { era: 5, clue: 3 }, nudge: 'Set era to 5 and clue to 3.', why: 'Today scientists use digital scans and lab tools to study dinosaur bones.' },
    ],
  },
  'Science|Scientific Inquiry': {
    id: 'fairtest',
    label: 'Fair-test experiment bench',
    explorePrompt: 'Compare two plant pots: set water (1–5) and light condition (1=same light fair test, 2=different light)!',
    cases: [
      { prompt: 'Run a FAIR test with generous water (4) and same light on both pots (light 1).', targets: { water: 4, light: 1 }, nudge: 'Set water to 4 and light to 1.', why: 'Keeping light equal (1) means water is the ONLY variable that changes — a true fair test!' },
      { prompt: 'Spot an UNFAIR test with water 5 and different light (light 2).', targets: { water: 5, light: 2 }, nudge: 'Set water to 5 and light to 2.', why: 'Changing both water AND light at once makes it impossible to know which caused the growth.' },
      { prompt: 'Test low water (1) under fair, equal light (light 1).', targets: { water: 1, light: 1 }, nudge: 'Set water to 1 and light to 1.', why: 'Comparing water 1 vs water 4 under identical light proves how much water helps.' },
    ],
  },
  'Science|Design & Technology': {
    id: 'forces',
    label: 'Prototype test ramp',
    explorePrompt: 'Test vehicle prototypes by adjusting ramp height and track surface material.',
    cases: [
      { prompt: 'Test a high-speed prototype on height 5 and smooth surface 4.', targets: { height: 5, surface: 4 }, nudge: 'Set ramp height to 5 and surface to 4.', why: 'Engineers test how smooth materials reduce friction so vehicles travel farther.' },
      { prompt: 'Design a safe braking track that stops quickly: height 2, bumpy surface 0.', targets: { height: 2, surface: 0 }, nudge: 'Set height to 2 and surface to 0.', why: 'High-friction surfaces grip wheels to bring moving prototypes to a safe stop.' },
      { prompt: 'Run a benchmark test at height 4 and surface 1.', targets: { height: 4, surface: 1 }, nudge: 'Set height to 4 and surface to 1.', why: 'Standard benchmark tests let engineers compare two designs fairly.' },
    ],
  },

  // Computing
  'Computing|Algorithms & Programming': {
    id: 'codeturtle',
    label: 'Code turtle grid',
    explorePrompt: 'Set forward steps (1–6) and repeat loops (1–4) to program the robot turtle across the grid!',
    cases: [
      { prompt: 'Program a 4-loop square path of 3 steps each (steps 3, repeats 4).', targets: { steps: 3, repeats: 4 }, nudge: 'Set steps to 3 and repeats to 4.', why: 'Repeating a 3-step side 4 times traces a complete square — loops make code concise!' },
      { prompt: 'Program a long 5-step stride repeated 3 times.', targets: { steps: 5, repeats: 3 }, nudge: 'Set steps to 5 and repeats to 3.', why: '3 repeats of 5 steps moves the turtle 15 grid units in total.' },
      { prompt: 'Run a single 6-step forward command (steps 6, repeats 1).', targets: { steps: 6, repeats: 1 }, nudge: 'Set steps to 6 and repeats to 1.', why: '1 repeat runs the instruction once without looping.' },
    ],
  },
  'Computing|Data Representation': {
    id: 'binarylab',
    label: '4-bit binary decoder',
    explorePrompt: 'Flip the 8, 4, 2, and 1 bit switches (b3, b2, b1, b0) between 0 and 1 to encode numbers!',
    cases: [
      { prompt: 'Encode the number 10 in binary (8-bit ON, 4-bit OFF, 2-bit ON, 1-bit OFF).', targets: { b3: 1, b2: 0, b1: 1, b0: 0 }, nudge: 'Set b3=1, b2=0, b1=1, b0=0.', why: '1010 in binary means 1 eight + 0 fours + 1 two + 0 ones = 10!' },
      { prompt: 'Encode the maximum 4-bit number: 15 (all four bits ON).', targets: { b3: 1, b2: 1, b1: 1, b0: 1 }, nudge: 'Turn all four switches (b3, b2, b1, b0) to 1.', why: '8 + 4 + 2 + 1 = 15. Every bit turned ON gives the largest 4-bit value.' },
      { prompt: 'Encode the number 3 in binary (only 2-bit and 1-bit ON).', targets: { b3: 0, b2: 0, b1: 1, b0: 1 }, nudge: 'Set b3=0, b2=0, b1=1, b0=1.', why: '0011 in binary adds 2 + 1 = 3.' },
    ],
  },
  'Computing|Digital Systems': {
    id: 'circuit',
    label: 'Hardware power & output lab',
    explorePrompt: 'Add battery cells (1–4) and output bulbs (1–3) to see how hardware distributes power.',
    cases: [
      { prompt: 'Power 2 output devices brightly with 4 battery cells.', targets: { bat: 4, bulbs: 2 }, nudge: 'Set batteries to 4 and bulbs to 2.', why: 'Digital systems need a strong power supply to run multiple output devices.' },
      { prompt: 'Run 3 output devices on 1 battery cell to see low power.', targets: { bat: 1, bulbs: 3 }, nudge: 'Set batteries to 1 and bulbs to 3.', why: 'Sharing 1 cell across 3 output loads dims each device.' },
      { prompt: 'Power 1 output device at maximum strength with 3 battery cells.', targets: { bat: 3, bulbs: 1 }, nudge: 'Set batteries to 3 and bulbs to 1.', why: 'All 3 cells feed a single output device for bright performance.' },
    ],
  },
  'Computing|Artificial Intelligence': {
    id: 'binarylab',
    label: 'AI feature encoder',
    explorePrompt: 'Toggle feature bits (b3=8, b2=4, b1=2, b0=1) to see how AI represents patterns as numbers!',
    cases: [
      { prompt: 'Activate feature pattern 12 (b3=1, b2=1, b1=0, b0=0).', targets: { b3: 1, b2: 1, b1: 0, b0: 0 }, nudge: 'Set 8-bit and 4-bit to 1, others to 0.', why: 'AI models turn features like ears and whiskers into binary codes (8 + 4 = 12).' },
      { prompt: 'Set feature code 6 (b3=0, b2=1, b1=1, b0=0).', targets: { b3: 0, b2: 1, b1: 1, b0: 0 }, nudge: 'Turn on bits 4 (b2) and 2 (b1).', why: 'Different combinations of feature bits let a computer tell two categories apart.' },
      { prompt: 'Reset all feature switches to 0 (blank input).', targets: { b3: 0, b2: 0, b1: 0, b0: 0 }, nudge: 'Turn all four switches to 0.', why: 'With zero input features, an AI has no evidence to make a prediction.' },
    ],
  },
  'Computing|Designing Digital Solutions': {
    id: 'codeturtle',
    label: 'Solution prototype simulator',
    explorePrompt: 'Test and refine the robot path (steps & repeats) until your digital prototype reaches the goal!',
    cases: [
      { prompt: 'Prototype a 3-repeat path of 4 steps each.', targets: { steps: 4, repeats: 3 }, nudge: 'Set steps to 4 and repeats to 3.', why: 'Testing a prototype step-by-step shows exactly where the user journey lands.' },
      { prompt: 'Optimize into a 4-repeat loop of 5 steps.', targets: { steps: 5, repeats: 4 }, nudge: 'Set steps to 5 and repeats to 4.', why: 'Repeating a clean module 4 times completes the full 20-unit circuit.' },
      { prompt: 'Test a compact 2-step, 3-repeat path.', targets: { steps: 2, repeats: 3 }, nudge: 'Set steps to 2 and repeats to 3.', why: 'Small prototypes help designers spot bugs early.' },
    ],
  },
  'Computing|Privacy & Security': {
    id: 'binarylab',
    label: 'Secret passcode vault',
    explorePrompt: 'Set the 4-bit security switches (b3, b2, b1, b0) to test secret passcodes and locks.',
    cases: [
      { prompt: 'Lock the vault with secret code 9 (b3=1, b2=0, b1=0, b0=1).', targets: { b3: 1, b2: 0, b1: 0, b0: 1 }, nudge: 'Set 8-bit (b3) to 1 and 1-bit (b0) to 1.', why: 'Strong passcodes combine multiple switches so strangers cannot guess them easily.' },
      { prompt: 'Change the passcode to 14 (b3=1, b2=1, b1=1, b0=0).', targets: { b3: 1, b2: 1, b1: 1, b0: 0 }, nudge: 'Turn on bits 8, 4, and 2; leave 1 off.', why: 'Updating passcodes keeps private accounts safe.' },
      { prompt: 'Set code 7 (b3=0, b2=1, b1=1, b0=1).', targets: { b3: 0, b2: 1, b1: 1, b0: 1 }, nudge: 'Turn off 8, turn on 4, 2, and 1.', why: 'Even a 4-bit lock has 16 possible combinations (0 to 15)!' },
    ],
  },
  'Computing|Digital Tools & Collaboration': {
    id: 'databar',
    label: 'Shared team dashboard',
    explorePrompt: 'Update the shared project chart to track your team’s votes and tasks clearly.',
    cases: [
      { prompt: 'Record the team poll: apples 6, bananas 4, grapes 8, strawberries 2.', targets: { apples: 6, bananas: 4, grapes: 8, strawberries: 2 }, nudge: 'Match each bar to the team vote counts.', why: 'Shared digital charts help every team member see the group’s decision clearly.' },
      { prompt: 'Balance two tasks equally at 5 votes each for apples and bananas.', targets: { apples: 5, bananas: 5 }, nudge: 'Set both apples and bananas to 5.', why: 'Equal bars show when two team ideas are tied.' },
      { prompt: 'Highlight strawberries as the top priority with 9 votes.', targets: { strawberries: 9 }, nudge: 'Slide strawberries up to 9.', why: 'Clear visual data helps collaborators agree on the next step.' },
    ],
  },

  // English (wordwave dials: beats 1..4@2, parts 1..3@2)
  'English|Phonics & Word Reading': {
    id: 'wordwave',
    label: 'Syllable & word-part studio',
    explorePrompt: 'Clap syllable beats (1–4) and combine word parts (1=root, 2=prefix+root, 3=prefix+root+suffix)!',
    cases: [
      { prompt: 'Clap a 1-beat root word (beats 1, parts 1).', targets: { beats: 1, parts: 1 }, nudge: 'Set beats to 1 and parts to 1.', why: 'A single-syllable root word has one clear vowel beat!' },
      { prompt: 'Build a 3-beat word with all 3 word parts (prefix + root + suffix).', targets: { beats: 3, parts: 3 }, nudge: 'Set beats to 3 and parts to 3.', why: 'Prefix + root + suffix = 3 meaningful chunks working together!' },
      { prompt: 'Clap a 4-beat multisyllabic word with 2 word parts.', targets: { beats: 4, parts: 2 }, nudge: 'Set beats to 4 and parts to 2.', why: 'Clapping syllables makes long words easy to read aloud.' },
    ],
  },
  'English|Spelling & Word Study': {
    id: 'wordwave',
    label: 'Morpheme word builder',
    explorePrompt: 'Combine root words, prefixes, and suffixes (parts 1–3) across 1–4 syllable beats.',
    cases: [
      { prompt: 'Build a 2-beat word with 3 morpheme parts (prefix + root + suffix).', targets: { beats: 2, parts: 3 }, nudge: 'Set beats to 2 and parts to 3.', why: 'Spelling by morpheme chunks (un + help + ful) keeps every letter in place!' },
      { prompt: 'Inspect a 1-beat root word with 1 part.', targets: { beats: 1, parts: 1 }, nudge: 'Set beats to 1 and parts to 1.', why: 'Spotting the base root word helps you spell whole word families.' },
      { prompt: 'Build a 4-beat word with 3 morpheme parts.', targets: { beats: 4, parts: 3 }, nudge: 'Set beats to 4 and parts to 3.', why: 'Even a 4-syllable word is simple when you spell one chunk at a time.' },
    ],
  },
  'English|Vocabulary': {
    id: 'wordwave',
    label: 'Word meaning & affix lab',
    explorePrompt: 'Test how adding prefixes and suffixes (parts 1–3) transforms a root word’s meaning!',
    cases: [
      { prompt: 'Attach both a prefix and suffix (parts 3) to a 3-beat word.', targets: { beats: 3, parts: 3 }, nudge: 'Set beats to 3 and parts to 3.', why: 'Prefixes flip or focus meaning while suffixes change how the word works in a sentence.' },
      { prompt: 'Start from a pure 1-part root word with 2 syllable beats.', targets: { beats: 2, parts: 1 }, nudge: 'Set beats to 2 and parts to 1.', why: 'The root carries the core meaning of the word family.' },
      { prompt: 'Expand to a 4-beat word with 2 parts.', targets: { beats: 4, parts: 2 }, nudge: 'Set beats to 4 and parts to 2.', why: 'Recognizing familiar roots unlocks big vocabulary words.' },
    ],
  },
  'English|Grammar & Punctuation': {
    id: 'wordwave',
    label: 'Tense & word-ending lab',
    explorePrompt: 'Explore how root words and suffixes (parts 1–3) and syllable rhythm shape grammar.',
    cases: [
      { prompt: 'Build a 3-part inflected word across 3 beats.', targets: { beats: 3, parts: 3 }, nudge: 'Set beats to 3 and parts to 3.', why: 'Verb endings (-ed, -ing) tell the reader when the action happened.' },
      { prompt: 'Set a crisp 1-beat base verb with 1 part.', targets: { beats: 1, parts: 1 }, nudge: 'Set beats to 1 and parts to 1.', why: 'Base verbs are the starting point before adding tense endings.' },
      { prompt: 'Test a 3-beat word with 2 parts (root + suffix).', targets: { beats: 3, parts: 2 }, nudge: 'Set beats to 3 and parts to 2.', why: 'Adding a suffix often adds an extra syllable beat to the word.' },
    ],
  },
  'English|Reading Comprehension': {
    id: 'wordwave',
    label: 'Word clue & rhythm decoder',
    explorePrompt: 'Break unfamiliar story words into syllable beats (1–4) and word parts (1–3)!',
    cases: [
      { prompt: 'Decode a 3-beat, 3-part word (prefix + root + suffix).', targets: { beats: 3, parts: 3 }, nudge: 'Set beats to 3 and parts to 3.', why: 'Good readers spot prefix and suffix clues to figure out new words in a story.' },
      { prompt: 'Spot a 1-beat root word (beats 1, parts 1).', targets: { beats: 1, parts: 1 }, nudge: 'Set beats to 1 and parts to 1.', why: 'Finding the short root inside a longer word reveals its core idea.' },
      { prompt: 'Examine a 4-beat word with 3 parts.', targets: { beats: 4, parts: 3 }, nudge: 'Set beats to 4 and parts to 3.', why: 'Clapping syllables and reading chunks helps you read long words smoothly.' },
    ],
  },
  'English|Speaking & Listening': {
    id: 'wordwave',
    label: 'Spoken rhythm & cadence studio',
    explorePrompt: 'Adjust syllable beats (1–4) and word parts (1–3) to practice clear spoken cadence.',
    cases: [
      { prompt: 'Set a steady 3-beat spoken rhythm with 2 word parts.', targets: { beats: 3, parts: 2 }, nudge: 'Set beats to 3 and parts to 2.', why: 'Pacing every syllable clearly helps listeners follow your ideas.' },
      { prompt: 'Practice a crisp 1-beat word with 1 part.', targets: { beats: 1, parts: 1 }, nudge: 'Set beats to 1 and parts to 1.', why: 'Short, punchy words give a speech strong emphasis.' },
      { prompt: 'Build a 4-beat expressive word with 3 parts.', targets: { beats: 4, parts: 3 }, nudge: 'Set beats to 4 and parts to 3.', why: 'Clear speakers pronounce both the beginning prefix and the final suffix.' },
    ],
  },
  'English|Writing Composition': {
    id: 'wordwave',
    label: 'Writer’s word-choice studio',
    explorePrompt: 'Experiment with word parts (1–3) and syllable rhythm (1–4) to craft vivid words.',
    cases: [
      { prompt: 'Craft a descriptive 3-part word with 3 syllable beats.', targets: { beats: 3, parts: 3 }, nudge: 'Set beats to 3 and parts to 3.', why: 'Descriptive words with prefixes and suffixes paint a clearer picture for your reader.' },
      { prompt: 'Choose a punchy 1-beat, 1-part action word.', targets: { beats: 1, parts: 1 }, nudge: 'Set beats to 1 and parts to 1.', why: 'Short action verbs make exciting moments move fast!' },
      { prompt: 'Set a 4-beat dramatic word with 2 parts.', targets: { beats: 4, parts: 2 }, nudge: 'Set beats to 4 and parts to 2.', why: 'Varying short and long words gives your writing musical flow.' },
    ],
  },
  'English|Handwriting & Transcription': {
    id: 'wordwave',
    label: 'Word chunk & spacing guide',
    explorePrompt: 'Inspect how word parts (1–3) and syllable beats (1–4) sit together with even spacing.',
    cases: [
      { prompt: 'Practice a simple 1-beat root word (beats 1, parts 1).', targets: { beats: 1, parts: 1 }, nudge: 'Set beats to 1 and parts to 1.', why: 'Starting with short root words helps you keep every letter on the baseline.' },
      { prompt: 'Space a 3-part word across 3 beats.', targets: { beats: 3, parts: 3 }, nudge: 'Set beats to 3 and parts to 3.', why: 'Seeing a long word in three chunks keeps your handwriting neat and even.' },
      { prompt: 'Practice a 4-beat word with 2 parts.', targets: { beats: 4, parts: 2 }, nudge: 'Set beats to 4 and parts to 2.', why: 'Steady rhythm helps your hand glide smoothly across the page.' },
    ],
  },

  // Geography & History
  // coordgrid dials: x(0..10@3), y(0..10@4), angle(0..360@90)
  'Geography|Maps & Spatial Skills': {
    id: 'coordgrid',
    label: 'Map grid & compass lab',
    explorePrompt: 'Move across (x) and up (y) to plot map coordinates, and rotate the compass angle!',
    cases: [
      { prompt: 'Locate the treasure at map coordinate (7, 5).', targets: { x: 7, y: 5 }, nudge: 'Go 7 across on the bottom axis, then 5 up.', why: 'Map grids always read across (x) first and up (y) second!' },
      { prompt: 'Point the compass due South at 180° from the origin (0, 0).', targets: { x: 0, y: 0, angle: 180 }, nudge: 'Set x to 0, y to 0, and angle to 180°.', why: 'A half turn (180°) points straight opposite from 0°.' },
      { prompt: 'Plot the mountain camp at (6, 8) with a 45° bearing.', targets: { x: 6, y: 8, angle: 45 }, nudge: 'Set x to 6, y to 8, and angle to 45°.', why: '45° is halfway between 0° and a 90° right angle.' },
    ],
  },
  'Geography|Places & Environments': {
    id: 'watercycle',
    label: 'Climate & landscape lab',
    explorePrompt: 'Adjust sun heat (1–5) and mountain cooling (1–5) to see how climate shapes environments.',
    cases: [
      { prompt: 'Create a hot, dry climate with sun 5 and cooling 1.', targets: { sun: 5, cool: 1 }, nudge: 'Set sun to 5 and cloud cooling to 1.', why: 'Arid places have high heat and very little cloud condensation.' },
      { prompt: 'Feed a fertile river valley with sun 3 and cloud cooling 4.', targets: { sun: 3, cool: 4 }, nudge: 'Set sun to 3 and cooling to 4.', why: 'Steady rainfall feeds rivers that communities rely on for water and farming.' },
      { prompt: 'Create an alpine snowcap with sun 2 and cooling 5.', targets: { sun: 2, cool: 5 }, nudge: 'Set sun to 2 and cooling to 5.', why: 'High mountain elevations are cold enough to hold snow and glaciers.' },
    ],
  },
  // timemachine dials: era(1..5@2), clue(1..3@1)
  'History|Ancient Egypt': {
    id: 'timemachine',
    label: 'Ancient world time dial',
    explorePrompt: 'Dial to Era 1 or 2 and switch clues (1=homes, 2=transport, 3=records) to explore Ancient Egypt!',
    cases: [
      { prompt: 'Explore earliest ancient writing and monuments (era 1, clue 3).', targets: { era: 1, clue: 3 }, nudge: 'Set era to 1 and clue to 3.', why: 'Ancient Egyptians carved hieroglyphs on stone and painted papyrus scrolls.' },
      { prompt: 'Inspect ancient boats and river transport (era 1, clue 2).', targets: { era: 1, clue: 2 }, nudge: 'Set era to 1 and clue to 2.', why: 'Reed and wooden boats sailed along the Nile River.' },
      { prompt: 'Compare ancient shelters (era 1, clue 1) with modern cities (era 5, clue 1).', targets: { era: 5, clue: 1 }, nudge: 'Set era to 5 and clue to 1.', why: 'Comparing ancient mudbrick homes with modern cities shows how architecture evolved.' },
    ],
  },
  'History|Ancient Greece & Rome': {
    id: 'timemachine',
    label: 'Classical era time dial',
    explorePrompt: 'Dial across historical eras (1–5) and clues (1–3) to compare classical architecture, trade, and laws.',
    cases: [
      { prompt: 'Examine classical written scrolls and laws (era 2, clue 3).', targets: { era: 2, clue: 3 }, nudge: 'Set era to 2 and clue to 3.', why: 'Written alphabets and laws let citizens debate and record history.' },
      { prompt: 'Inspect classical sea and road transport (era 2, clue 2).', targets: { era: 2, clue: 2 }, nudge: 'Set era to 2 and clue to 2.', why: 'Greek ships and Roman paved roads connected the Mediterranean world.' },
      { prompt: 'Compare with Digital Today (era 5, clue 3) to see how records evolved.', targets: { era: 5, clue: 3 }, nudge: 'Set era to 5 and clue to 3.', why: 'From stone inscriptions to cloud data, humans always record what matters.' },
    ],
  },
  'History|Medieval Times': {
    id: 'timemachine',
    label: 'Medieval era time dial',
    explorePrompt: 'Compare Medieval towns, travel, and records (era 3) with earlier and later eras!',
    cases: [
      { prompt: 'Explore medieval manuscripts and early printing in era 3, clue 3.', targets: { era: 3, clue: 3 }, nudge: 'Set era to 3 and clue to 3.', why: 'Books and chronicles preserved knowledge across medieval centuries.' },
      { prompt: 'Inspect medieval ships and travel in era 3, clue 2.', targets: { era: 3, clue: 2 }, nudge: 'Set era to 3 and clue to 2.', why: 'Wind-powered ships and magnetic compasses connected trade routes.' },
      { prompt: 'Inspect medieval castles and walled towns in era 3, clue 1.', targets: { era: 3, clue: 1 }, nudge: 'Set era to 3 and clue to 1.', why: 'Stone walls and timber houses sheltered medieval communities.' },
    ],
  },
  'History|Family & Community History': {
    id: 'timemachine',
    label: 'Generations time machine',
    explorePrompt: 'Move the era dial (1–5) and clue dial (1–3) to compare how families lived, traveled, and shared news!',
    cases: [
      { prompt: 'Look at trains and early cars in your great-grandparents’ era (era 4, clue 2).', targets: { era: 4, clue: 2 }, nudge: 'Set era to 4 and clue to 2.', why: 'Railways and motor cars changed how far families could travel in a day.' },
      { prompt: 'Look at modern community homes today (era 5, clue 1).', targets: { era: 5, clue: 1 }, nudge: 'Set era to 5 and clue to 1.', why: 'Modern community homes use electricity, insulation, and clean energy.' },
      { prompt: 'Compare radio and letters in era 4, clue 3.', targets: { era: 4, clue: 3 }, nudge: 'Set era to 4 and clue to 3.', why: 'Before smartphones, families listened to the radio and sent paper letters.' },
    ],
  },
  'History|Modern History': {
    id: 'timemachine',
    label: 'Modern history time machine',
    explorePrompt: 'Compare the Industrial era (era 4) and Digital Today (era 5) across homes, travel, and media.',
    cases: [
      { prompt: 'Inspect Industrial era cities and buildings (era 4, clue 1).', targets: { era: 4, clue: 1 }, nudge: 'Set era to 4 and clue to 1.', why: 'Steam power and factories drew millions of people into growing cities.' },
      { prompt: 'Explore Digital Today’s high-speed travel (era 5, clue 2).', targets: { era: 5, clue: 2 }, nudge: 'Set era to 5 and clue to 2.', why: 'Clean electric transit and aviation connect the modern world in hours.' },
      { prompt: 'Compare Digital Today’s instant communication (era 5, clue 3).', targets: { era: 5, clue: 3 }, nudge: 'Set era to 5 and clue to 3.', why: 'The internet and satellites allow instant global sharing of ideas.' },
    ],
  },
  'History|Historical Thinking': {
    id: 'timemachine',
    label: 'Historian’s evidence dial',
    explorePrompt: 'Switch eras (1–5) and clues (1–3) to compare primary sources, artifacts, and historical change.',
    cases: [
      { prompt: 'Examine the oldest artifact evidence in era 1, clue 3.', targets: { era: 1, clue: 3 }, nudge: 'Set era to 1 and clue to 3.', why: 'Carvings, pottery, and tools are primary evidence of early human life.' },
      { prompt: 'Compare medieval primary sources in era 3, clue 3.', targets: { era: 3, clue: 3 }, nudge: 'Set era to 3 and clue to 3.', why: 'Written chronicles let historians compare different viewpoints.' },
      { prompt: 'Compare industrial transport in era 4, clue 2 to trace change over time.', targets: { era: 4, clue: 2 }, nudge: 'Set era to 4 and clue to 2.', why: 'Historians ask what changed fast and what stayed the same across eras.' },
    ],
  },

  // Life Skills, PSD & Learning to Learn
  // marketlab dials: earn(1..10@4), save(0..10@2)
  'Life Skills|Money & Finance': {
    id: 'marketlab',
    label: 'Earn, save & spend lab',
    explorePrompt: 'Adjust earned coins (1–10) and piggy-bank savings (0–10) to see how a budget balances!',
    cases: [
      { prompt: 'Earn 8 coins and save 3 coins in the piggy bank (leave 5 to spend).', targets: { earn: 8, save: 3 }, nudge: 'Set earned coins to 8 and saved coins to 3.', why: 'Saving part of what you earn first builds a safety net for future goals!' },
      { prompt: 'Save half of a 10-coin allowance: earn 10, save 5.', targets: { earn: 10, save: 5 }, nudge: 'Set earned coins to 10 and saved coins to 5.', why: '5 saved + 5 to spend = 10 coins. Splitting money intentionally is budgeting.' },
      { prompt: 'Reach a big savings goal of 8 coins from 9 earned coins.', targets: { earn: 9, save: 8 }, nudge: 'Set earned coins to 9 and saved coins to 8.', why: 'Saving most of your earnings lets you afford bigger long-term items.' },
    ],
  },
  'Life Skills|Entrepreneurship': {
    id: 'marketlab',
    label: 'Lemonade stand venture lab',
    explorePrompt: 'Balance earned revenue coins (1–10) and business savings (0–10) for your stall!',
    cases: [
      { prompt: 'Run a stall that earns 9 coins and saves 4 for fresh supplies.', targets: { earn: 9, save: 4 }, nudge: 'Set earn to 9 and save to 4.', why: 'Entrepreneurs set aside money to restock ingredients while serving great products.' },
      { prompt: 'Scale up to 10 earned coins with 6 saved for a bigger stall.', targets: { earn: 10, save: 6 }, nudge: 'Set earn to 10 and save to 6.', why: 'Reinvesting profits helps a small business grow.' },
      { prompt: 'Test a starter stall: earn 6 coins and save 3.', targets: { earn: 6, save: 3 }, nudge: 'Set earn to 6 and save to 3.', why: 'Starting small lets you test whether customers love your idea!' },
    ],
  },
  'Life Skills|Food & Cooking': {
    id: 'marketlab',
    label: 'Kitchen recipe & budget lab',
    explorePrompt: 'Plan your kitchen grocery coins (earn 1–10) and ingredient savings (save 0–10)!',
    cases: [
      { prompt: 'Plan a 7-coin grocery budget and save 2 coins for fruit.', targets: { earn: 7, save: 2 }, nudge: 'Set earn to 7 and save to 2.', why: 'Planning your food budget before shopping prevents waste!' },
      { prompt: 'Save 4 coins out of 10 for a weekend family meal.', targets: { earn: 10, save: 4 }, nudge: 'Set earn to 10 and save to 4.', why: 'Setting aside 4 coins leaves 6 coins for weekday staples.' },
      { prompt: 'Balance a 6-coin snack budget with 1 coin saved.', targets: { earn: 6, save: 1 }, nudge: 'Set earn to 6 and save to 1.', why: 'Every smart cook checks what ingredients cost and what is left over.' },
    ],
  },
  // mindgarden dials: breath(1..5@2), practice(1..5@2)
  'Learning to Learn|Learning to Learn': {
    id: 'mindgarden',
    label: 'Brain growth & focus lab',
    explorePrompt: 'Set your calm breathing depth (1–5) and practice steps (1–5) to watch neural branches grow!',
    cases: [
      { prompt: 'Combine a calm 5 breath with 5 practice steps to bloom the mind tree.', targets: { breath: 5, practice: 5 }, nudge: 'Set breath to 5 and practice steps to 5.', why: 'Calm focus plus repeated practice grows strong connections in your brain!' },
      { prompt: 'Notice how shallow 1 breath with 1 practice step keeps branches small.', targets: { breath: 1, practice: 1 }, nudge: 'Set breath to 1 and practice steps to 1.', why: 'When we rush or give up after one try, our brain has not built the pathway yet.' },
      { prompt: 'Find a steady study rhythm: breath 4 and practice 4.', targets: { breath: 4, practice: 4 }, nudge: 'Set breath to 4 and practice steps to 4.', why: 'Steady breathing calms the mind so the thinking brain can learn.' },
    ],
  },
  'Personal & Social Development|Emotional Literacy': {
    id: 'mindgarden',
    label: 'Emotion & calm-breath studio',
    explorePrompt: 'Slow the breathing pacer (1–5) and build mindful practice (1–5) to see how body signals settle.',
    cases: [
      { prompt: 'Slow a racing heart with deep breath 5 and 3 practice steps.', targets: { breath: 5, practice: 3 }, nudge: 'Set breath to 5 and practice steps to 3.', why: 'Slow, deep breaths send a safety signal to your nervous system.' },
      { prompt: 'Observe how shallow breath 1 feels when emotions are big (practice 2).', targets: { breath: 1, practice: 2 }, nudge: 'Set breath to 1 and practice steps to 2.', why: 'Noticing fast breathing helps you name the feeling before reacting.' },
      { prompt: 'Reach full emotional balance at breath 5 and practice 5.', targets: { breath: 5, practice: 5 }, nudge: 'Set breath to 5 and practice steps to 5.', why: 'Naming your feeling and breathing slowly lets you choose a helpful response.' },
    ],
  },
  'Personal & Social Development|Self-Regulation & Resilience': {
    id: 'mindgarden',
    label: 'Resilience & reset studio',
    explorePrompt: 'Practice calm breathing (1–5) and bounce-back steps (1–5) to grow your resilience tree!',
    cases: [
      { prompt: 'Take a level-5 reset breath and try 4 bounce-back steps.', targets: { breath: 5, practice: 4 }, nudge: 'Set breath to 5 and practice steps to 4.', why: 'Resilience means pausing to reset, then trying a new strategy!' },
      { prompt: 'Grow the full blossom canopy with breath 4 and 5 practice steps.', targets: { breath: 4, practice: 5 }, nudge: 'Set breath to 4 and practice steps to 5.', why: 'Mistakes are how our brains sprout new connections when we keep practicing.' },
      { prompt: 'Start from breath 3 and 3 practice steps after a tough challenge.', targets: { breath: 3, practice: 3 }, nudge: 'Set breath to 3 and practice steps to 3.', why: 'Even one small calm step moves you forward when a task feels hard.' },
    ],
  },
  'Personal & Social Development|Self-Awareness': {
    id: 'mindgarden',
    label: 'Strengths & growth studio',
    explorePrompt: 'Explore how mindful reflection (1–5) and practice (1–5) grow your personal strengths.',
    cases: [
      { prompt: 'Grow 5 branches of personal strength with calm breath 4.', targets: { breath: 4, practice: 5 }, nudge: 'Set breath to 4 and practice steps to 5.', why: 'Knowing what you are working on helps you turn effort into new strengths.' },
      { prompt: 'Test a deep reflection breath (5) with 3 practice steps.', targets: { breath: 5, practice: 3 }, nudge: 'Set breath to 5 and practice steps to 3.', why: 'Quiet reflection helps you notice what went well and what to try next.' },
      { prompt: 'Set a gentle starting habit of breath 3 and 1 practice step.', targets: { breath: 3, practice: 1 }, nudge: 'Set breath to 3 and practice steps to 1.', why: 'Every big skill begins with the very first step.' },
    ],
  },
  'Personal & Social Development|Empathy & Social Awareness': {
    id: 'mindgarden',
    label: 'Mindful listening studio',
    explorePrompt: 'Calm your breath (1–5) and practice perspective-taking steps (1–5) to connect with others.',
    cases: [
      { prompt: 'Listen with calm breath 5 and 4 empathy steps.', targets: { breath: 5, practice: 4 }, nudge: 'Set breath to 5 and practice steps to 4.', why: 'When we slow down and listen, we notice how our friends feel.' },
      { prompt: 'Full community bloom: breath 5 and 5 practice steps.', targets: { breath: 5, practice: 5 }, nudge: 'Set breath to 5 and practice steps to 5.', why: 'Empathy grows stronger every time we imagine another person’s view.' },
      { prompt: 'Pause with breath 3 and 2 steps before jumping to conclusions.', targets: { breath: 3, practice: 2 }, nudge: 'Set breath to 3 and practice steps to 2.', why: 'Pausing first helps us respond with kindness instead of assumptions.' },
    ],
  },
  'Personal & Social Development|Friendship & Cooperation': {
    id: 'balance',
    label: 'Fairness & sharing scale',
    explorePrompt: 'Place items on both sides of the friendship scale (0–10) to explore fair sharing!',
    cases: [
      { prompt: 'Balance the friendship scale fairly with 5 on the left and 5 on the right.', targets: { left: 5, right: 5 }, nudge: 'Set both left and right dials to 5.', why: 'Cooperation works best when partners share turns and responsibilities fairly.' },
      { prompt: 'Show an unbalanced team where left has 8 and right has only 2.', targets: { left: 8, right: 2 }, nudge: 'Set left to 8 and right to 2.', why: 'When one person does everything or takes everything, the partnership tips out of balance.' },
      { prompt: 'Share 7 and 7 equally on both pans.', targets: { left: 7, right: 7 }, nudge: 'Set both pans to 7.', why: 'Equal give-and-take keeps friendships steady and strong.' },
    ],
  },
  'Personal & Social Development|Responsible Decision-Making': {
    id: 'mindgarden',
    label: 'Pause, breathe & choose lab',
    explorePrompt: 'Use the calm breath pacer (1–5) and thoughtful steps (1–5) before making a responsible choice.',
    cases: [
      { prompt: 'Take a level-5 pause breath and 4 thoughtful steps before acting.', targets: { breath: 5, practice: 4 }, nudge: 'Set breath to 5 and practice steps to 4.', why: 'Pausing to breathe gives you time to think about safety, fairness, and consequences.' },
      { prompt: 'Reach full wise-chooser bloom at breath 5 and 5 steps.', targets: { breath: 5, practice: 5 }, nudge: 'Set breath to 5 and practice steps to 5.', why: 'Responsible choices care for yourself, others, and the community.' },
      { prompt: 'Compare an impulsive rushed moment: breath 1 and 1 step.', targets: { breath: 1, practice: 1 }, nudge: 'Set breath to 1 and practice steps to 1.', why: 'Rushing without thinking often leads to choices we wish we could redo.' },
    ],
  },
};

/* Three.js 3D world configurations by domain (geometry3d, optics3d, diorama3d). */
export const DOMAIN_THREE_MODES = {
  'Mathematics|Geometry': {
    engine: 'geometry3d',
    label: '3D solid inspector',
    icon: '🧊',
    casesByAge: {
      5: [
        { prompt: 'Switch to the Sphere (4) and notice it has 0 flat faces and 0 corners!', targetShape: 4, nudge: 'Slide the 3D solid dial to 4 (Sphere).', why: 'A sphere is smoothly curved all the way around — 0 flat faces and 0 corners!' },
        { prompt: 'Switch to the Cube (0) and count its 6 flat square faces.', targetShape: 0, nudge: 'Slide the 3D solid dial to 0 (Cube).', why: 'A cube has 6 equal square faces, 12 edges, and 8 corners!' },
      ],
      6: [
        { prompt: 'Find the Cylinder (5) — 2 flat circles and 1 curved wrapper.', targetShape: 5, nudge: 'Slide the 3D solid dial to 5 (Cylinder).', why: 'A cylinder can roll on its curved side or stand flat on its 2 circular faces!' },
        { prompt: 'Find the Cone (3) with 1 flat circle base and 1 pointed apex.', targetShape: 3, nudge: 'Slide the 3D solid dial to 3 (Cone).', why: 'A cone has 1 flat circular face and narrows to 1 vertex at the top.' },
      ],
      7: [
        { prompt: 'Inspect the Square Pyramid (1): 5 faces, 8 edges, and 5 vertices.', targetShape: 1, nudge: 'Slide the 3D solid dial to 1 (Square Pyramid).', why: '1 square base + 4 triangle sides = 5 faces and 5 vertices!' },
        { prompt: 'Compare with the Cube (0): 6 faces, 12 edges, and 8 vertices.', targetShape: 0, nudge: 'Slide the 3D solid dial to 0 (Cube).', why: 'Every face of a cube is a square with 4 right-angle corners.' },
      ],
      8: [
        { prompt: 'Inspect the Triangular Prism (2): 5 faces, 9 edges, and 6 vertices.', targetShape: 2, nudge: 'Slide the 3D solid dial to 2 (Triangular Prism).', why: 'Two triangle ends joined by 3 rectangles give 5 faces, 9 edges, and 6 vertices.' },
        { prompt: 'Compare the Cylinder (5) with prisms — why is it not a polyhedron?', targetShape: 5, nudge: 'Slide the 3D solid dial to 5 (Cylinder).', why: 'Polyhedra have only flat polygon faces; a cylinder has a curved surface.' },
      ],
      9: [
        { prompt: 'Check Euler’s rule (F + V − E = 2) on the Square Pyramid (1).', targetShape: 1, nudge: 'Select Square Pyramid (1): 5 faces + 5 vertices − 8 edges = 2!', why: 'For any convex polyhedron, Faces + Vertices − Edges always equals 2!' },
        { prompt: 'Check Euler’s rule on the Triangular Prism (2): 5 + 6 − 9 = 2.', targetShape: 2, nudge: 'Select Triangular Prism (2).', why: '5 faces + 6 vertices = 11, minus 9 edges = 2!' },
      ],
      10: [
        { prompt: 'Analyze the Cube (0) net: 6 congruent squares meeting 3 at each of the 8 vertices.', targetShape: 0, nudge: 'Select Cube (0) and rotate it in 3D.', why: 'A regular hexahedron (cube) has 6 square faces, 12 equal edges, and 8 vertices.' },
        { prompt: 'Compare the Cone (3) and Cylinder (5) cross-sections parallel to the base.', targetShape: 3, nudge: 'Select Cone (3) and inspect its circular base.', why: 'Slicing a cone parallel to its base creates smaller circles toward the apex.' },
      ],
    },
  },
  'Science|Waves, Light & Sound': {
    engine: 'optics3d',
    label: '3D optics & shadow studio',
    icon: '🔦',
    casesByAge: {
      5: [
        { prompt: 'Put the Opaque block (0) close to the torch (distance 1) to cast a big shadow.', targetDist: 1, targetMaterial: 0, nudge: 'Set torch distance to 1 and material to 0 (Opaque).', why: 'An opaque block stops light completely, making a big dark shadow on the wall!' },
        { prompt: 'Switch to the Clear Glass block (2) and watch light pass right through!', targetMaterial: 2, nudge: 'Set material to 2 (Transparent).', why: 'Transparent materials let light shine almost all the way through.' },
      ],
      6: [
        { prompt: 'Move the torch far back (distance 5) with the Opaque block (0) to shrink the shadow.', targetDist: 5, targetMaterial: 0, nudge: 'Set torch distance to 5 and material to 0.', why: 'When the light source moves farther away, the shadow on the screen gets smaller!' },
        { prompt: 'Test Frosted Glass (1) at distance 2 to make a soft, fuzzy shadow.', targetDist: 2, targetMaterial: 1, nudge: 'Set torch distance to 2 and material to 1 (Translucent).', why: 'Translucent materials let some light through but scatter it.' },
      ],
      7: [
        { prompt: 'Compare Opaque (0) vs Translucent (1) at torch distance 3: set Translucent (1).', targetDist: 3, targetMaterial: 1, nudge: 'Set distance to 3 and material to 1.', why: 'Translucent objects block part of the light beam, casting a medium-grey shadow.' },
        { prompt: 'Cast the largest umbra shadow with Opaque (0) at distance 1.', targetDist: 1, targetMaterial: 0, nudge: 'Set distance to 1 and material to 0.', why: 'Closer to the point source, the opaque block intercepts a wider cone of light rays.' },
      ],
      8: [
        { prompt: 'Test Transparent glass (2) at distance 4 — notice the faint outline on the wall.', targetDist: 4, targetMaterial: 2, nudge: 'Set distance to 4 and material to 2.', why: 'Clear glass transmits most light rays in straight lines with minimal absorption.' },
        { prompt: 'Set Opaque (0) at distance 2 to measure how shadow radius scales with distance.', targetDist: 2, targetMaterial: 0, nudge: 'Set distance to 2 and material to 0.', why: 'Light travels in straight lines from the source past the edges of the object.' },
      ],
      9: [
        { prompt: 'Run a fair optics test: keep distance at 3 and test Opaque (0).', targetDist: 3, targetMaterial: 0, nudge: 'Set distance to 3 and material to 0.', why: 'Holding distance constant at 3 isolates material opacity as the single independent variable.' },
        { prompt: 'Keep distance at 3 and switch to Translucent (1) to compare transmitted light.', targetDist: 3, targetMaterial: 1, nudge: 'Set distance to 3 and material to 1.', why: 'Comparing Opaque and Translucent at the exact same distance proves how scattering changes shadow contrast.' },
      ],
      10: [
        { prompt: 'Model maximum ray divergence: torch distance 1 with Translucent diffuser (1).', targetDist: 1, targetMaterial: 1, nudge: 'Set distance to 1 and material to 1.', why: 'At short source distance, a wide angle of rays hits the diffuser and scatters across the screen.' },
        { prompt: 'Model distant rays: torch distance 5 with Transparent lens block (2).', targetDist: 5, targetMaterial: 2, nudge: 'Set distance to 5 and material to 2.', why: 'From a distant source, rays arrive more nearly parallel and pass cleanly through transparent media.' },
      ],
    },
  },
  "Science|Earth's Systems": {
    engine: 'diorama3d',
    label: '3D Earth spheres diorama',
    icon: '🌍',
    theme: 'earth',
    dialLabel: 'Earth sphere (0=Atmosphere, 1=Hydrosphere, 2=Biosphere, 3=Geosphere)',
    levels: ['Atmosphere (Air & Clouds)', 'Hydrosphere (Oceans & Rivers)', 'Biosphere (Living Plants & Animals)', 'Geosphere (Crust, Mantle & Core)'],
    casesByAge: {
      5: [
        { prompt: 'Explore the Atmosphere (0) where clouds and weather float in the sky.', targetLevel: 0, nudge: 'Set the sphere dial to 0.', why: 'The atmosphere is the blanket of air and clouds around Earth!' },
        { prompt: 'Dive into the Hydrosphere (1) — all of Earth’s water!', targetLevel: 1, nudge: 'Set the sphere dial to 1.', why: 'Oceans, rivers, and lakes make up the hydrosphere.' },
      ],
      6: [
        { prompt: 'Visit the Biosphere (2) where trees, plants, and animals live.', targetLevel: 2, nudge: 'Set the sphere dial to 2.', why: 'Every living thing on land and in water belongs to the biosphere.' },
        { prompt: 'Look deep into the Geosphere (3) — solid rock and glowing magma.', targetLevel: 3, nudge: 'Set the sphere dial to 3.', why: 'Mountains, soil, and deep underground rock form the geosphere.' },
      ],
      7: [
        { prompt: 'Select the Hydrosphere (1) to see how river runoff connects land to sea.', targetLevel: 1, nudge: 'Set the sphere dial to 1.', why: 'Fresh water flows across the geosphere into the salty oceans.' },
        { prompt: 'Select the Geosphere (3) to inspect Earth’s rocky crust and deeper layers.', targetLevel: 3, nudge: 'Set the sphere dial to 3.', why: 'The geosphere includes the crust we walk on and the hot mantle below.' },
      ],
      8: [
        { prompt: 'Select the Atmosphere (0) to see where evaporated ocean water forms rain clouds.', targetLevel: 0, nudge: 'Set the sphere dial to 0.', why: 'The hydrosphere and atmosphere work together to drive the water cycle.' },
        { prompt: 'Select the Biosphere (2) to see how living roots anchor soil in the geosphere.', targetLevel: 2, nudge: 'Set the sphere dial to 2.', why: 'Plants pull water from the hydrosphere and carbon dioxide from the atmosphere.' },
      ],
      9: [
        { prompt: 'Investigate Geosphere–Atmosphere interaction by selecting Geosphere (3).', targetLevel: 3, nudge: 'Set the sphere dial to 3.', why: 'Volcanic eruptions in the geosphere release gases and ash into the atmosphere.' },
        { prompt: 'Inspect Hydrosphere–Geosphere erosion by selecting Hydrosphere (1).', targetLevel: 1, nudge: 'Set the sphere dial to 1.', why: 'Moving water in the hydrosphere carves valleys and canyons into the geosphere.' },
      ],
      10: [
        { prompt: 'Analyze carbon and energy exchange in the Biosphere (2).', targetLevel: 2, nudge: 'Set the sphere dial to 2.', why: 'Photosynthesis in the biosphere links solar energy, atmospheric gases, and soil nutrients.' },
        { prompt: 'Examine the Atmosphere (0) as Earth’s thermal and weather engine.', targetLevel: 0, nudge: 'Set the sphere dial to 0.', why: 'Uneven solar heating of the atmosphere and oceans drives global climate patterns.' },
      ],
    },
  },
  'Science|Ocean Life': {
    engine: 'diorama3d',
    label: '3D ocean depth zones',
    icon: '🐋',
    theme: 'ocean',
    dialLabel: 'Ocean zone (0=Sunlight, 1=Twilight, 2=Midnight, 3=Abyssal Trench)',
    levels: ['Sunlight Zone (0–200 m)', 'Twilight Zone (200–1,000 m)', 'Midnight Zone (1,000–4,000 m)', 'Abyssal Trench (4,000 m+)'],
    casesByAge: {
      5: [
        { prompt: 'Visit the bright Sunlight Zone (0) where coral and reef fish swim.', targetLevel: 0, nudge: 'Set the ocean zone dial to 0.', why: 'Most ocean plants and colorful fish live near the sunny surface!' },
        { prompt: 'Dive to the dark Midnight Zone (2) where glowing creatures live.', targetLevel: 2, nudge: 'Set the ocean zone dial to 2.', why: 'Deep in the ocean, no sunlight reaches — some animals make their own glow!' },
      ],
      6: [
        { prompt: 'Explore the Twilight Zone (1) just below the sunny surface.', targetLevel: 1, nudge: 'Set the ocean zone dial to 1.', why: 'Only dim blue light reaches the twilight zone.' },
        { prompt: 'Touch the bottom in the Abyssal Trench (3).', targetLevel: 3, nudge: 'Set the ocean zone dial to 3.', why: 'The ocean floor is cold, dark, and home to deep-sea vents and crabs.' },
      ],
      7: [
        { prompt: 'Select the Sunlight Zone (0) where marine algae make food from sunlight.', targetLevel: 0, nudge: 'Set the ocean zone dial to 0.', why: 'Producers like kelp and phytoplankton need sunlight in the top 200 meters.' },
        { prompt: 'Select the Abyssal Trench (3) to see life around hydrothermal vents.', targetLevel: 3, nudge: 'Set the ocean zone dial to 3.', why: 'Deep-sea vents release warm mineral water that supports unique food webs without sun.' },
      ],
      8: [
        { prompt: 'Inspect the Twilight Zone (1) where squid and lanternfish migrate daily.', targetLevel: 1, nudge: 'Set the ocean zone dial to 1.', why: 'Many twilight-zone animals swim up at night to feed and dive back down by day.' },
        { prompt: 'Inspect bioluminescence adaptations in the Midnight Zone (2).', targetLevel: 2, nudge: 'Set the ocean zone dial to 2.', why: 'Anglerfish and deep-sea jellies use glowing light to attract prey or confuse predators.' },
      ],
    },
  },
  'Science|Dinosaurs & Paleontology': {
    engine: 'diorama3d',
    label: '3D fossil rock strata',
    icon: '🦕',
    theme: 'fossil',
    dialLabel: 'Rock stratum (0=Topsoil, 1=Mammal Bed, 2=Dinosaur Layer, 3=Trilobite Bed)',
    levels: ['Topsoil (Modern Era)', 'Cenozoic Layer (Ice-Age Mammals)', 'Mesozoic Stratum (Dinosaurs)', 'Paleozoic Bed (Ancient Sea Trilobites)'],
    casesByAge: {
      5: [
        { prompt: 'Dig down to the Dinosaur Layer (2) to uncover buried bones!', targetLevel: 2, nudge: 'Set the rock layer dial to 2.', why: 'Dinosaur fossils are buried deep below the modern soil!' },
        { prompt: 'Look at the Topsoil (0) where plants and animals live today.', targetLevel: 0, nudge: 'Set the rock layer dial to 0.', why: 'The top layer is the youngest — it forms right now.' },
      ],
      6: [
        { prompt: 'Dig to the deepest, oldest rock bed — the Trilobite Bed (3).', targetLevel: 3, nudge: 'Set the rock layer dial to 3.', why: 'Deeper rock layers were laid down first, long before dinosaurs lived!' },
        { prompt: 'Check the Mammal Bed (1) above the dinosaurs.', targetLevel: 1, nudge: 'Set the rock layer dial to 1.', why: 'Mammal fossils sit above dinosaur layers because they lived more recently.' },
      ],
      7: [
        { prompt: 'Use the law of superposition: select the oldest layer (3).', targetLevel: 3, nudge: 'Set the rock layer dial to 3.', why: 'In undisturbed rock, the deepest stratum (layer 3) is the oldest.' },
        { prompt: 'Select the Mesozoic Stratum (2) to study land dinosaur fossils.', targetLevel: 2, nudge: 'Set the rock layer dial to 2.', why: 'Mesozoic sedimentary rock preserved dinosaur skeletons that turned to stone.' },
      ],
      8: [
        { prompt: 'Compare marine fossils in Layer 3 with land dinosaurs in Layer 2 (select Layer 2).', targetLevel: 2, nudge: 'Set the rock layer dial to 2.', why: 'Finding sea shells in Layer 3 and land dinosaurs in Layer 2 shows an ancient sea dried into land!' },
        { prompt: 'Inspect the Cenozoic Layer (1) after the dinosaur extinction.', targetLevel: 1, nudge: 'Set the rock layer dial to 1.', why: 'After non-avian dinosaurs vanished, mammals diversified in the Cenozoic layers above.' },
      ],
      9: [
        { prompt: 'Analyze relative dating across strata by selecting the Paleozoic Bed (3).', targetLevel: 3, nudge: 'Set the rock layer dial to 3.', why: 'Index fossils like trilobites help geologists match rock layers across continents.' },
        { prompt: 'Examine the K–Pg boundary transition above the Mesozoic Stratum (2).', targetLevel: 2, nudge: 'Set the rock layer dial to 2.', why: 'An iridium-rich clay line above Mesozoic rock marks the asteroid impact 66 million years ago.' },
      ],
      10: [
        { prompt: 'Synthesize Earth history from Cenozoic (1) back to Paleozoic (3) — select Layer 1.', targetLevel: 1, nudge: 'Set the rock layer dial to 1.', why: 'Radiometric dating and stratigraphy together establish the geologic time scale.' },
        { prompt: 'Select the Mesozoic Stratum (2) to compare theropod and modern bird anatomy.', targetLevel: 2, nudge: 'Set the rock layer dial to 2.', why: 'Feathered theropod fossils prove that modern birds are living avian dinosaurs.' },
      ],
    },
  },
  'Geography|Maps & Spatial Skills': {
    engine: 'diorama3d',
    label: '3D terrain & elevation model',
    icon: '⛰️',
    theme: 'landform',
    dialLabel: 'Elevation zone (0=Coast, 1=River Valley, 2=Highland Plateau, 3=Mountain Peak)',
    levels: ['Coastal Bay (0 m Sea Level)', 'River Valley (100–400 m)', 'Highland Plateau (500–1,200 m)', 'Mountain Peak (2,000 m+)'],
    casesByAge: {
      5: [
        { prompt: 'Highlight the Coast (0) where the land meets the blue ocean.', targetLevel: 0, nudge: 'Set the elevation dial to 0.', why: 'The coast is right at sea level where waves touch the shore!' },
        { prompt: 'Climb to the snowy Mountain Peak (3) at the very top.', targetLevel: 3, nudge: 'Set the elevation dial to 3.', why: 'Mountain peaks are the highest landforms on the map.' },
      ],
      6: [
        { prompt: 'Follow the River Valley (1) winding between the hills.', targetLevel: 1, nudge: 'Set the elevation dial to 1.', why: 'Rivers flow downhill from mountains through valleys to the sea.' },
        { prompt: 'Explore the flat Highland Plateau (2) high above the valley.', targetLevel: 2, nudge: 'Set the elevation dial to 2.', why: 'A plateau is high land with a flat top.' },
      ],
      7: [
        { prompt: 'Select the Coastal Bay (0) — 0 meters elevation (sea level).', targetLevel: 0, nudge: 'Set the elevation dial to 0.', why: 'Cartographers measure all land elevations starting from 0 m at sea level.' },
        { prompt: 'Select the Mountain Peak (3) where contour lines pack closely together.', targetLevel: 3, nudge: 'Set the elevation dial to 3.', why: 'Steep mountain slopes have tightly spaced contour rings on a topographic map.' },
      ],
      8: [
        { prompt: 'Select the River Valley (1) to see where bridges and towns connect.', targetLevel: 1, nudge: 'Set the elevation dial to 1.', why: 'Flat valley floors and river crossings are natural routes for roads and towns.' },
        { prompt: 'Select the Highland Plateau (2) to compare steep cliffs vs flat uplands.', targetLevel: 2, nudge: 'Set the elevation dial to 2.', why: 'Elevation maps use color bands from green lowlands to brown and white peaks.' },
      ],
    },
  },
  'History|Ancient Egypt': {
    engine: 'diorama3d',
    label: '3D Nile & pyramid diorama',
    icon: '🐪',
    theme: 'civilization',
    dialLabel: 'Site zone (0=Nile Farms, 1=Village, 2=Market & Scribes, 3=Great Pyramid)',
    levels: ['Nile Floodplain Farms', 'Artisan Mudbrick Village', 'Market & Scribe Courtyard', 'Great Pyramid & Stone Temple'],
    casesByAge: {
      5: [
        { prompt: 'Visit the Nile Floodplain Farms (0) where water helps crops grow.', targetLevel: 0, nudge: 'Set the site zone dial to 0.', why: 'The Nile River gave Ancient Egypt water and rich black soil for food!' },
        { prompt: 'Look up at the Great Pyramid (3) built of giant stone blocks.', targetLevel: 3, nudge: 'Set the site zone dial to 3.', why: 'Pyramids were huge stone tombs built for the pharaohs.' },
      ],
      6: [
        { prompt: 'Explore the Mudbrick Village (1) where families and builders lived.', targetLevel: 1, nudge: 'Set the site zone dial to 1.', why: 'Houses were made of sun-dried mudbricks to stay cool in the desert heat.' },
        { prompt: 'Visit the Market & Scribe Courtyard (2) where traders and writers worked.', targetLevel: 2, nudge: 'Set the site zone dial to 2.', why: 'Scribes wrote records on papyrus while traders exchanged grain and crafts.' },
      ],
      7: [
        { prompt: 'Select the Nile Farms (0) to see why Egypt was called the Gift of the Nile.', targetLevel: 0, nudge: 'Set the site zone dial to 0.', why: 'Annual Nile floods deposited nutrient-rich silt across the desert riverbank.' },
        { prompt: 'Select the Market & Scribes (2) to see how surpluses were counted and traded.', targetLevel: 2, nudge: 'Set the site zone dial to 2.', why: 'Farm surpluses allowed specialization: scribes, potters, weavers, and engineers.' },
      ],
      8: [
        { prompt: 'Select the Great Pyramid (3) to analyze ancient engineering and geometry.', targetLevel: 3, nudge: 'Set the site zone dial to 3.', why: 'Egyptian engineers aligned the pyramids to the cardinal directions and hauled limestone on sledges.' },
        { prompt: 'Select the Artisan Village (1) to see daily life of the craftspeople.', targetLevel: 1, nudge: 'Set the site zone dial to 1.', why: 'Archaeological villages like Deir el-Medina reveal how workers lived, ate, and wrote letters.' },
      ],
    },
  },
  'Science|Ecosystems & Habitats': {
    engine: 'diorama3d',
    label: '3D world biomes diorama',
    icon: '🌿',
    theme: 'biome',
    dialLabel: 'Biome (0=Desert, 1=Grassland, 2=Temperate Forest, 3=Arctic Tundra)',
    levels: ['Arid Desert Biome', 'Savanna & Grassland', 'Temperate Woodland', 'Arctic Tundra Biome'],
    casesByAge: {
      5: [
        { prompt: 'Visit the sunny Desert Biome (0) where cacti store water.', targetLevel: 0, nudge: 'Set the biome dial to 0.', why: 'Deserts are dry, so cacti store water in thick stems!' },
        { prompt: 'Visit the snowy Tundra Biome (3) where thick fur keeps animals warm.', targetLevel: 3, nudge: 'Set the biome dial to 3.', why: 'The tundra is icy and cold with low-growing plants.' },
      ],
      6: [
        { prompt: 'Explore the Grassland (1) where herds graze on wide plains.', targetLevel: 1, nudge: 'Set the biome dial to 1.', why: 'Grasslands have wide open spaces for grazing animals.' },
        { prompt: 'Explore the Temperate Forest (2) with tall leafy trees.', targetLevel: 2, nudge: 'Set the biome dial to 2.', why: 'Forest trees give shelter and food to birds, insects, and mammals.' },
      ],
      7: [
        { prompt: 'Select the Desert Biome (0) to inspect water-saving adaptations.', targetLevel: 0, nudge: 'Set the biome dial to 0.', why: 'Desert plants and nocturnal animals conserve every drop of water.' },
        { prompt: 'Select the Temperate Forest (2) to observe seasonal canopy habitats.', targetLevel: 2, nudge: 'Set the biome dial to 2.', why: 'Multi-layered woodland trees create habitats from roots to treetops.' },
      ],
      8: [
        { prompt: 'Select the Arctic Tundra (3) to examine permafrost ecosystems.', targetLevel: 3, nudge: 'Set the biome dial to 3.', why: 'Frozen subsoil prevents deep roots, so mosses and lichens dominate.' },
        { prompt: 'Select the Savanna Grassland (1) to trace producer–grazer–predator webs.', targetLevel: 1, nudge: 'Set the biome dial to 1.', why: 'Grasses feed large herbivore herds that support top predators.' },
      ],
      9: [
        { prompt: 'Compare precipitation limits in the Desert Biome (0).', targetLevel: 0, nudge: 'Set the biome dial to 0.', why: 'Annual rainfall under 250 mm defines arid desert biomes.' },
        { prompt: 'Analyze nutrient cycling in the Temperate Forest (2).', targetLevel: 2, nudge: 'Set the biome dial to 2.', why: 'Decomposers turn fallen autumn leaves into rich forest soil.' },
      ],
      10: [
        { prompt: 'Evaluate climate sensitivity in the Arctic Tundra (3).', targetLevel: 3, nudge: 'Set the biome dial to 3.', why: 'Warming temperatures thaw permafrost and shift tundra habitats rapidly.' },
        { prompt: 'Compare carbon storage in Grasslands (1) vs Forests.', targetLevel: 1, nudge: 'Set the biome dial to 1.', why: 'Grasslands store most of their carbon underground in deep root systems.' },
      ],
    },
  },
  'Science|Rainforests': {
    engine: 'diorama3d',
    label: '3D rainforest layers',
    icon: '🦜',
    theme: 'biome',
    dialLabel: 'Forest zone (0=Dry Clearing, 1=River Edge, 2=Dense Canopy, 3=Cloud Forest)',
    levels: ['Sun-baked Clearing', 'Riverbank Floodplain', 'Dense Rainforest Canopy', 'High Cloud Forest'],
    casesByAge: {
      5: [
        { prompt: 'Explore the Dense Rainforest Canopy (2) full of green trees!', targetLevel: 2, nudge: 'Set the forest zone dial to 2.', why: 'Most rainforest monkeys, birds, and frogs live high in the leafy canopy!' },
        { prompt: 'Visit the Riverbank Floodplain (1) beside the water.', targetLevel: 1, nudge: 'Set the forest zone dial to 1.', why: 'Rainforest rivers wind through the trees and water the plants.' },
      ],
      6: [
        { prompt: 'Compare the Dry Clearing (0) when trees are missing.', targetLevel: 0, nudge: 'Set the forest zone dial to 0.', why: 'Without tree shade, the ground dries out quickly in the hot sun.' },
        { prompt: 'Climb to the misty High Cloud Forest (3).', targetLevel: 3, nudge: 'Set the forest zone dial to 3.', why: 'High mountain rainforests are cool and wrapped in mist.' },
      ],
      7: [
        { prompt: 'Select the Dense Canopy (2) to see how treetops capture 95% of sunlight.', targetLevel: 2, nudge: 'Set the forest zone dial to 2.', why: 'Tall canopy trees form a sunlit roof over the dark forest floor.' },
        { prompt: 'Select the Riverbank Floodplain (1) to trace aquatic-forest food webs.', targetLevel: 1, nudge: 'Set the forest zone dial to 1.', why: 'Seasonal river floods bring nutrients to floodplain roots and fish.' },
      ],
      8: [
        { prompt: 'Compare the Dry Clearing (0) to see the impact of deforestation.', targetLevel: 0, nudge: 'Set the forest zone dial to 0.', why: 'Removing canopy trees exposes thin tropical soil to heavy rain erosion.' },
        { prompt: 'Select the High Cloud Forest (3) to study epiphyte adaptations.', targetLevel: 3, nudge: 'Set the forest zone dial to 3.', why: 'Orchids and bromeliads absorb moisture directly from mountain fog.' },
      ],
      9: [
        { prompt: 'Analyze transpiration and rainfall recycling in the Dense Canopy (2).', targetLevel: 2, nudge: 'Set the forest zone dial to 2.', why: 'Rainforest trees release water vapor that forms half of the region’s own rainclouds!' },
        { prompt: 'Evaluate habitat fragmentation in the Dry Clearing (0).', targetLevel: 0, nudge: 'Set the forest zone dial to 0.', why: 'Clearings split continuous canopy corridors that arboreal species need.' },
      ],
    },
  },
  'Science|Polar Regions': {
    engine: 'diorama3d',
    label: '3D polar biome explorer',
    icon: '🐻‍❄️',
    theme: 'biome',
    dialLabel: 'Biome contrast (0=Hot Desert, 1=Grassland, 2=Boreal Taiga, 3=Polar Ice & Tundra)',
    levels: ['Hot Arid Desert (Contrast)', 'Sub-polar Grassland', 'Boreal Taiga Forest', 'Polar Ice & Tundra'],
    casesByAge: {
      5: [
        { prompt: 'Switch to Polar Ice & Tundra (3) to see the snowy habitat!', targetLevel: 3, nudge: 'Set the biome dial to 3.', why: 'Polar regions are covered in snow and sea ice!' },
        { prompt: 'Visit the Boreal Taiga Forest (2) just south of the Arctic.', targetLevel: 2, nudge: 'Set the biome dial to 2.', why: 'Evergreen pine trees grow south of the treeless tundra.' },
      ],
      6: [
        { prompt: 'Compare Polar Ice (3) with the Hot Desert (0) — select Polar Ice (3).', targetLevel: 3, nudge: 'Set the biome dial to 3.', why: 'Both polar regions and deserts get very little rain, but polar regions are freezing cold!' },
        { prompt: 'Explore the Sub-polar Grassland (1) during the short summer thaw.', targetLevel: 1, nudge: 'Set the biome dial to 1.', why: 'In summer, hardy grasses bloom briefly for migrating caribou and birds.' },
      ],
      7: [
        { prompt: 'Select Polar Ice & Tundra (3) to study insulation (blubber & dense fur).', targetLevel: 3, nudge: 'Set the biome dial to 3.', why: 'Thick blubber and hollow guard hairs trap body heat in sub-zero winds.' },
        { prompt: 'Select Boreal Taiga (2) to see how cone-shaped evergreens shed heavy snow.', targetLevel: 2, nudge: 'Set the biome dial to 2.', why: 'Waxy needles and sloped branches prevent snow damage in northern winters.' },
      ],
      8: [
        { prompt: 'Select Polar Ice (3) to investigate ice albedo (reflecting sunlight).', targetLevel: 3, nudge: 'Set the biome dial to 3.', why: 'Bright white snow and ice reflect sunlight back into space, keeping the poles cold.' },
        { prompt: 'Compare the Hot Desert (0) to see why Antarctica is a “cold desert”.', targetLevel: 0, nudge: 'Set the biome dial to 0.', why: 'A desert is defined by low precipitation — Antarctica gets less snow than many hot deserts get rain!' },
      ],
    },
  },
  'Geography|Places & Environments': {
    engine: 'diorama3d',
    label: '3D landforms & settlements',
    icon: '🏞️',
    theme: 'landform',
    dialLabel: 'Environment (0=Coastal Harbor, 1=River Valley, 2=Highland Plateau, 3=Alpine Peak)',
    levels: ['Coastal Harbor', 'Fertile River Valley', 'Highland Plateau', 'Alpine Mountain Peak'],
    casesByAge: {
      5: [
        { prompt: 'Visit the Coastal Harbor (0) where boats meet the shore.', targetLevel: 0, nudge: 'Set the environment dial to 0.', why: 'Coastal towns grow beside bays where ships can dock safely.' },
        { prompt: 'Explore the River Valley (1) with fresh water and flat land.', targetLevel: 1, nudge: 'Set the environment dial to 1.', why: 'Many communities build near rivers for fresh water and farming.' },
      ],
      6: [
        { prompt: 'Climb to the Highland Plateau (2) above the valley.', targetLevel: 2, nudge: 'Set the environment dial to 2.', why: 'High plateaus are cooler and windy with wide views.' },
        { prompt: 'Inspect the snowy Alpine Mountain Peak (3).', targetLevel: 3, nudge: 'Set the environment dial to 3.', why: 'Steep, rocky mountain peaks are cold and hard to build on.' },
      ],
      7: [
        { prompt: 'Select the River Valley (1) to see how water and soil support farming towns.', targetLevel: 1, nudge: 'Set the environment dial to 1.', why: 'Floodplains provide flat land, fertile soil, and transport routes.' },
        { prompt: 'Select the Coastal Harbor (0) to see how sea access shapes trade.', targetLevel: 0, nudge: 'Set the environment dial to 0.', why: 'Harbors connect land roads to ocean shipping lanes.' },
      ],
      8: [
        { prompt: 'Select the Alpine Peak (3) to see how elevation creates a natural barrier.', targetLevel: 3, nudge: 'Set the environment dial to 3.', why: 'Mountain ranges block wet winds and form natural borders.' },
        { prompt: 'Select the Highland Plateau (2) to see how people adapt to upland climates.', targetLevel: 2, nudge: 'Set the environment dial to 2.', why: 'Highland communities terrace slopes and graze hardy livestock.' },
      ],
      9: [
        { prompt: 'Analyze human-environment interaction in the River Valley (1).', targetLevel: 1, nudge: 'Set the environment dial to 1.', why: 'Bridges, levees, and irrigation canals modify river valleys for human use.' },
        { prompt: 'Examine coastal resource management in the Coastal Harbor (0).', targetLevel: 0, nudge: 'Set the environment dial to 0.', why: 'Coastal settlements balance fishing, shipping, and shoreline protection.' },
      ],
    },
  },
  'History|Ancient Greece & Rome': {
    engine: 'diorama3d',
    label: '3D classical city diorama',
    icon: '🏛️',
    theme: 'civilization',
    dialLabel: 'City zone (0=Harbor & Farms, 1=Citizen Homes, 2=Agora & Forum, 3=Acropolis & Temple)',
    levels: ['Mediterranean Harbor & Farms', 'Courtyard Homes & Workshops', 'Agora & Civic Forum', 'Acropolis & Stone Monument'],
    casesByAge: {
      6: [
        { prompt: 'Visit the Mediterranean Harbor & Farms (0) beside the water.', targetLevel: 0, nudge: 'Set the city zone dial to 0.', why: 'Greeks and Romans sailed across the sea to trade olive oil and grain.' },
        { prompt: 'Look up at the Acropolis & Stone Monument (3).', targetLevel: 3, nudge: 'Set the city zone dial to 3.', why: 'Tall stone temples stood on the highest hill of the city.' },
      ],
      7: [
        { prompt: 'Explore the Agora & Civic Forum (2) where citizens met and voted.', targetLevel: 2, nudge: 'Set the city zone dial to 2.', why: 'The Greek agora and Roman forum were the heart of markets and democracy.' },
        { prompt: 'Inspect the Courtyard Homes & Workshops (1).', targetLevel: 1, nudge: 'Set the city zone dial to 1.', why: 'Potters, sculptors, and families lived and worked in tiled courtyard houses.' },
      ],
      8: [
        { prompt: 'Select the Acropolis & Stone Monument (3) to study classical architecture.', targetLevel: 3, nudge: 'Set the city zone dial to 3.', why: 'Symmetrical stone columns and arches made classical buildings strong and lasting.' },
        { prompt: 'Select the Agora & Forum (2) to see how written laws were displayed.', targetLevel: 2, nudge: 'Set the city zone dial to 2.', why: 'Posting laws in the public square let citizens know their rights and duties.' },
      ],
    },
  },
  'History|Medieval Times': {
    engine: 'diorama3d',
    label: '3D medieval manor & castle',
    icon: '🏰',
    theme: 'civilization',
    dialLabel: 'Manor zone (0=River Fields, 1=Peasant Village, 2=Guild Market, 3=Stone Castle Keep)',
    levels: ['River & Manor Strip Fields', 'Peasant Timber Village', 'Craft Guild Market Square', 'Fortified Stone Castle Keep'],
    casesByAge: {
      6: [
        { prompt: 'Look at the tall Stone Castle Keep (3) with strong walls.', targetLevel: 3, nudge: 'Set the manor zone dial to 3.', why: 'Medieval castles had thick stone walls to protect the town!' },
        { prompt: 'Visit the River & Manor Fields (0) where crops were grown.', targetLevel: 0, nudge: 'Set the manor zone dial to 0.', why: 'Farmers grew wheat and barley in long strip fields beside the river.' },
      ],
      7: [
        { prompt: 'Explore the Peasant Timber Village (1) where manor families lived.', targetLevel: 1, nudge: 'Set the manor zone dial to 1.', why: 'Villagers worked the lord’s fields and ground grain at the watermill.' },
        { prompt: 'Visit the Craft Guild Market Square (2) where blacksmiths and bakers traded.', targetLevel: 2, nudge: 'Set the manor zone dial to 2.', why: 'Medieval guilds trained apprentices and set fair standards for crafts.' },
      ],
      8: [
        { prompt: 'Select the Stone Castle Keep (3) to analyze feudal defense and power.', targetLevel: 3, nudge: 'Set the manor zone dial to 3.', why: 'High walls, towers, and concentric defenses made castles the seat of feudal lords.' },
        { prompt: 'Select the Guild Market Square (2) to see how towns grew through trade.', targetLevel: 2, nudge: 'Set the manor zone dial to 2.', why: 'Expanding trade fairs and craft guilds helped medieval market towns flourish.' },
      ],
    },
  },
};

/* Helper: clean topic name without "(age 7+)" suffix */
function cleanName(name) {
  return String(name || '').replace(/\s*\(age[^)]*\)\s*/i, '').trim();
}

/* Helper: safe non-citation evidence string */
const CIT_RE = /(research\s*(\(|$|\s+(grades?|PMC|\d))|et\s+al\.?)/i;
function safeEv(topic, idx = 0) {
  const list = (topic && topic.evidence) || [];
  for (let i = idx; i < list.length; i++) {
    if (list[i] && !CIT_RE.test(list[i])) return list[i];
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i] && !CIT_RE.test(list[i])) return list[i];
  }
  return (topic && topic.description) || '';
}

function shortText(s, max = 95) {
  if (!s) return '';
  const t = String(s).trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const m = cut.match(/^(.+[.!?])\s/);
  return (m ? m[1] : cut.replace(/\s+\S*$/, '')) + '…';
}

/* --------------------------------------------------------------------------
   1. Per-Age Lab & 3D Explore Resolution
   -------------------------------------------------------------------------- */
export function resolveAgeExploreModes({ subject, domain, age, band, topics, map, bandSpecFor, glossFor }) {
  const modes = [];
  const key = `${subject}|${domain}`;
  const leadTopic = topics[0] || { name: domain, evidence: [] };
  const leadGloss = glossFor ? glossFor(leadTopic.name) : null;
  const leadLabel = (leadGloss && leadGloss.label) || cleanName(leadTopic.name);
  const isUpperInBand = age % 2 === 0; // Ages 6, 8, 10 are the upper half of early/mid/upper

  // Special Math per-age scene progressions that resolve representation ceilings (F2/F8)
  if (key === 'Mathematics|Addition & Subtraction') {
    if (age === 5) {
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Apple counters (to 10)', icon: '🔬',
        config: {
          scene: 'counters',
          explorePrompt: 'Age 5 lab: move the dials to put groups of apples together up to 10!',
          cases: [
            { prompt: 'Make 5 red apples and 3 green apples (5 + 3 = 8).', targets: { a: 5, b: 3 }, nudge: 'Set red to 5 and green to 3.', why: '5 and 3 make 8 apples in all!' },
            { prompt: 'Make two groups that add up to 9.', rule: { op: 'sum', value: 9 }, nudge: 'Try 5 and 4, or 6 and 3.', why: 'Different pairs like 5 + 4 and 6 + 3 both make 9!' },
            { prompt: 'Make a pair that fills all 10 spots.', rule: { op: 'sum', value: 10 }, nudge: 'Try 6 and 4, or 5 and 5.', why: 'Number bonds to 10 are super helpers for adding!' },
          ],
        },
      });
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Make-10 frame', icon: '💡',
        config: {
          scene: 'tenframe',
          initials: { a: 3, b: 2 },
          explorePrompt: 'Watch green dots jump across to fill the first 10-frame!',
          cases: [
            { prompt: 'Show 7 + 3 to fill one complete 10-frame.', targets: { a: 7, b: 3 }, nudge: 'Set red to 7 and green to 3.', why: '7 and 3 fill all 10 boxes — 1 full ten!' },
            { prompt: 'Show 8 + 4 and watch 2 green dots bridge to 10.', targets: { a: 8, b: 4 }, nudge: 'Set red to 8 and green to 4.', why: '8 + 2 makes 10, plus 2 more makes 12!' },
          ],
        },
      });
      return modes;
    }
    if (age === 6) {
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Make-10 bridge (to 20)', icon: '🔬',
        config: {
          scene: 'tenframe',
          initials: { a: 4, b: 3 },
          explorePrompt: 'Age 6 lab: bridge through 10 to add numbers up to 20!',
          cases: [
            { prompt: 'Bridge through 10: show 9 + 6 on the two 10-frames.', targets: { a: 9, b: 6 }, nudge: 'Set red to 9 and green to 6.', why: '9 takes 1 from 6 to make 10, leaving 5 → 10 + 5 = 15!' },
            { prompt: 'Show a teen double: 8 + 8.', targets: { a: 8, b: 8 }, nudge: 'Set both dials to 8.', why: '8 + 8 = 16 — one full ten and 6 ones!' },
            { prompt: 'Make the maximum 20 with both groups equal.', targets: { a: 10, b: 10 }, nudge: 'Set both dials to 10.', why: 'Two full 10-frames make 20!' },
          ],
        },
      });
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Number line to 100', icon: '💡',
        config: {
          scene: 'numberline',
          range: { lo: 0, hi: 100 },
          dialOverrides: { start: { min: 0, max: 90 }, step: { min: -20, max: 20 } },
          initials: { start: 20, step: 5 },
          explorePrompt: 'Hop along the 0–100 number line to add a 2-digit and a 1-digit number!',
          cases: [
            { prompt: 'Start at 45 and hop forward 8 to add 45 + 8.', targets: { start: 45, step: 8 }, nudge: 'Set start to 45 and jump to 8.', why: '45 + 8 bridges past 50 to land on 53!' },
            { prompt: 'Start at 72 and hop back 6 to show 72 − 6.', targets: { start: 72, step: -6 }, nudge: 'Set start to 72 and jump to −6.', why: 'Hopping back 6 from 72 lands on 66.' },
            { prompt: 'Start at 60 and jump by 10s (60, 70, 80, 90).', targets: { start: 60, step: 10 }, nudge: 'Set start to 60 and jump to 10.', why: 'Adding tens moves the tens digit up by 1 each hop!' },
          ],
        },
      });
      return modes;
    }
  }

  if (key === 'Mathematics|Counting & Cardinality') {
    if (age === 5) {
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Cookie jar (to 20)', icon: '🔬',
        config: {
          scene: 'counting',
          initials: { n: 4 },
          explorePrompt: 'Age 5 lab: drop cookies into the jar and count each one up to 20!',
          cases: [
            { prompt: 'Put 8 cookies in the jar.', targets: { n: 8 }, nudge: 'Slide the cookies dial to 8.', why: 'The last number you say (8) tells how many cookies are in the jar!' },
            { prompt: 'Put 1 more than 9 cookies (make 10).', targets: { n: 10 }, nudge: 'Slide the cookies dial to 10.', why: 'One more than 9 is 10!' },
            { prompt: 'Show the teen number 14 in the jar.', targets: { n: 14 }, nudge: 'Slide the cookies dial to 14.', why: '14 is 10 cookies and 4 more cookies!' },
          ],
        },
      });
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Hop & count line', icon: '💡',
        config: {
          scene: 'numberline',
          range: { lo: 0, hi: 20 },
          explorePrompt: 'Hop the frog 1 or 2 steps at a time up to 20!',
          cases: [
            { prompt: 'Start at 8 and hop 1 step at a time (8, 9, 10, 11).', targets: { start: 8, step: 1 }, nudge: 'Set start to 8 and jump to 1.', why: 'Jumps of 1 touch every counting number in order!' },
            { prompt: 'Skip-count in twos starting from 4 (4, 6, 8, 10).', targets: { start: 4, step: 2 }, nudge: 'Set start to 4 and jump to 2.', why: 'Jumping by 2s lands on the even numbers!' },
          ],
        },
      });
      return modes;
    }
    if (age === 6) {
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Count to 100 blocks', icon: '🔬',
        config: {
          scene: 'placevalue',
          dialOverrides: { h: { min: 0, max: 1 }, t: { min: 0, max: 9 }, o: { min: 0, max: 9 } },
          initials: { h: 0, t: 2, o: 4 },
          explorePrompt: 'Age 6 lab: count by tens and ones all the way to 100!',
          cases: [
            { prompt: 'Build 46 using tens rods and ones cubes (0 hundreds).', targets: { h: 0, t: 4, o: 6 }, nudge: 'Set hundreds 0, tens 4, ones 6.', why: 'Counting by tens (10, 20, 30, 40) plus 6 ones reaches 46 fast!' },
            { prompt: 'Build 80 — eight tens and zero ones.', targets: { h: 0, t: 8, o: 0 }, nudge: 'Set hundreds 0, tens 8, ones 0.', why: 'Eight groups of 10 make 80.' },
            { prompt: 'Reach 100 with 1 hundred flat, 0 tens, and 0 ones!', targets: { h: 1, t: 0, o: 0 }, nudge: 'Set hundreds 1, tens 0, ones 0.', why: '10 tens bundle together to make 100!' },
          ],
        },
      });
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Skip-count line to 100', icon: '💡',
        config: {
          scene: 'numberlineXL',
          range: { lo: 0, hi: 100 },
          dialOverrides: { start: { min: 0, max: 70 }, step: { min: 5, max: 25 } },
          initials: { start: 10, step: 15 },
          explorePrompt: 'Skip-count by 5s and 10s all the way to 100!',
          cases: [
            { prompt: 'Skip-count by 10s starting at 20 (20, 30, 40, 50).', targets: { start: 20, step: 10 }, nudge: 'Set start to 20 and jump to 10.', why: 'Counting by 10s from 20 lands on 30, 40, 50!' },
            { prompt: 'Skip-count by 5s starting at 15 (15, 20, 25, 30).', targets: { start: 15, step: 5 }, nudge: 'Set start to 15 and jump to 5.', why: 'Multiples of 5 always end in 5 or 0!' },
          ],
        },
      });
      return modes;
    }
  }

  // Measurement: clock (hour 0..23@3, min 0..55@15, jump 0..180@30), capacity (jugA 0..1000@300, jugB 0..1000@250, edge 1..6@2)
  if (key === 'Mathematics|Measurement') {
    if (band === 'mid') {
      const is8 = age === 8;
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Clock & elapsed time', icon: '🕒',
        config: {
          scene: 'clock',
          explorePrompt: `Age ${age} lab: set the start time and jump minutes to read both clocks!`,
          cases: is8
            ? [
                { prompt: 'Start at 14:20 (2:20 pm) and jump 45 minutes.', targets: { hour: 14, min: 20, jump: 45 }, nudge: 'Set hour to 14, minute to 20, and jump to 45.', why: '14:20 + 40 min reaches 15:00, plus 5 min = 15:05 on the 24-hour clock!' },
                { prompt: 'Start at 08:45 and jump 35 minutes across the hour.', targets: { hour: 8, min: 45, jump: 35 }, nudge: 'Set hour to 8, minute to 45, and jump to 35.', why: '15 minutes reaches 09:00, plus 20 more minutes = 09:20.' },
                { prompt: 'Start at 19:15 and jump a full 60-minute hour.', targets: { hour: 19, min: 15, jump: 60 }, nudge: 'Set hour to 19, minute to 15, and jump to 60.', why: 'Jumping 60 minutes advances the hour hand by 1 to 20:15.' },
              ]
            : [
                { prompt: 'Set the clock to 6:30 (half past 6) with 0 jump minutes.', targets: { hour: 6, min: 30, jump: 0 }, nudge: 'Set hour to 6, minute to 30, jump to 0.', why: '30 minutes is half of 60, so the minute hand points straight down at 6!' },
                { prompt: 'Start at 10:15 (quarter past 10) and jump 30 minutes.', targets: { hour: 10, min: 15, jump: 30 }, nudge: 'Set hour to 10, minute to 15, jump to 30.', why: '15 minutes + 30 minutes = 45 minutes (10:45, quarter to 11).' },
                { prompt: 'Start at 7:45 and jump 15 minutes to reach the next o’clock.', targets: { hour: 7, min: 45, jump: 15 }, nudge: 'Set hour to 7, minute to 45, jump to 15.', why: '45 + 15 = 60 minutes, completing the hour to 08:00!' },
              ],
        },
      });
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Litres & volume jug', icon: '💡',
        config: {
          scene: 'capacity',
          explorePrompt: 'Pour millilitres into Jug A and Jug B and build 3D centimetre cubes!',
          cases: is8
            ? [
                { prompt: 'Combine 750 ml in Jug A and 500 ml in Jug B (1,250 ml = 1.25 L).', targets: { jugA: 750, jugB: 500 }, nudge: 'Set Jug A to 750 ml and Jug B to 500 ml.', why: '750 ml + 500 ml = 1,250 ml = 1.25 litres!' },
                { prompt: 'Fill both jugs to 1,000 ml (2 L total) and build a 4×4×4 cube (64 cm³).', targets: { jugA: 1000, jugB: 1000, edge: 4 }, nudge: 'Set Jug A to 1000, Jug B to 1000, and Cube edge to 4.', why: '1,000 ml + 1,000 ml = 2 litres, and 4³ = 64 cm³.' },
              ]
            : [
                { prompt: 'Make exactly 1,000 ml (1 full litre) with 600 ml in Jug A and 400 ml in Jug B.', targets: { jugA: 600, jugB: 400 }, nudge: 'Set Jug A to 600 ml and Jug B to 400 ml.', why: '600 ml + 400 ml = 1,000 millilitres = 1 litre!' },
                { prompt: 'Pour 500 ml in Jug A and 0 ml in Jug B with cube edge 3 cm.', targets: { jugA: 500, jugB: 0, edge: 3 }, nudge: 'Set Jug A to 500, Jug B to 0, and Cube edge to 3.', why: '500 ml is half a litre (0.5 L), and 3×3×3 = 27 cm³.' },
              ],
        },
      });
      return modes;
    }
    if (band === 'upper') {
      const is10 = age === 10;
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Capacity & 3D volume', icon: '🔬',
        config: {
          scene: 'capacity',
          explorePrompt: `Age ${age} lab: combine Jug A + Jug B (ml ↔ L) and calculate cubic volume (e³ cm³)!`,
          cases: is10
            ? [
                { prompt: 'Build a cube with volume 125 cm³ (edge 5) and pour 800 ml + 700 ml (1.5 L).', targets: { jugA: 800, jugB: 700, edge: 5 }, nudge: '5 × 5 × 5 = 125 cm³; set edge to 5, Jug A to 800, Jug B to 700.', why: '5³ = 125 cm³, and 1,500 ml ÷ 1,000 = 1.5 litres!' },
                { prompt: 'Build the largest 6×6×6 cube (216 cm³) and pour 1,000 ml + 1,000 ml (2 L).', targets: { jugA: 1000, jugB: 1000, edge: 6 }, nudge: 'Set Jug A to 1000, Jug B to 1000, and edge to 6.', why: '6 × 6 × 6 = 216 cm³, and two 1,000 ml jugs make 2.0 litres!' },
              ]
            : [
                { prompt: 'Build a cube of edge 4 cm (64 cm³) and pour 500 ml + 300 ml (0.8 L).', targets: { jugA: 500, jugB: 300, edge: 4 }, nudge: 'Set Jug A to 500, Jug B to 300, and edge to 4.', why: '4 × 4 × 4 = 64 cm³, and 800 ml is 0.8 litres.' },
                { prompt: 'Pour 900 ml + 600 ml (1.5 litres) and build a 3 cm cube (27 cm³).', targets: { jugA: 900, jugB: 600, edge: 3 }, nudge: 'Set Jug A to 900, Jug B to 600, and edge to 3.', why: '900 + 600 = 1,500 ml = 1.5 L, and 3³ = 27 cm³.' },
              ],
        },
      });
      modes.push({
        engine: 'concept-lab', phase: 'explore', label: 'Metric ruler & conversions', icon: '📏',
        config: {
          scene: 'measure',
          explorePrompt: `Age ${age} lab: convert between cm, mm (×10), and m (÷100) on the 30 cm ruler!`,
          cases: is10
            ? [
                { prompt: 'Age 10: set the pencil to 0.24 m (240 mm = 24 cm).', targets: { cm: 24 }, nudge: '0.24 m × 100 = 24 cm.', why: '0.24 metres = 24 cm = 240 mm — metric units shift by powers of 10!' },
                { prompt: 'Set the pencil to 180 mm (18 cm).', targets: { cm: 18 }, nudge: '180 mm ÷ 10 = 18 cm.', why: 'Dividing millimetres by 10 gives centimetres.' },
              ]
            : [
                { prompt: 'Age 9: set the pencil to 150 mm (15 cm).', targets: { cm: 15 }, nudge: '10 mm = 1 cm, so 150 mm = 15 cm.', why: '15 cm × 10 = 150 mm!' },
                { prompt: 'Set the pencil to 280 mm (28 cm).', targets: { cm: 28 }, nudge: 'Slide length to 28 cm.', why: '28 cm = 280 mm = 0.28 m.' },
              ],
        },
      });
      return modes;
    }
  }

  // Fractions: fractionline dials are parts(2..100@10), shaded(0..100@3)
  if (key === 'Mathematics|Fractions' && (band === 'mid' || band === 'upper')) {
    const isEven = age % 2 === 0;
    modes.push({
      engine: 'concept-lab', phase: 'explore', label: 'Fraction, decimal & % line', icon: '🔬',
      config: {
        scene: 'fractionline',
        explorePrompt: `Age ${age} lab: align the fraction bar with the 0–1 number line, decimals, and percentages!`,
        cases: band === 'mid'
          ? (isEven
              ? [
                  { prompt: 'Show 25 hundredths (25/100 = 0.25) on the number line.', targets: { parts: 100, shaded: 25 }, nudge: 'Set equal parts to 100 and shaded parts to 25.', why: '25 out of 100 equal parts is 25/100 = 0.25 — exactly one quarter!' },
                  { prompt: 'Show 7 tenths (7/10 = 0.7).', targets: { parts: 10, shaded: 7 }, nudge: 'Set equal parts to 10 and shaded parts to 7.', why: '7 tenths is 0.7 on the number line.' },
                  { prompt: 'Show 75 hundredths (75/100 = 0.75).', targets: { parts: 100, shaded: 75 }, nudge: 'Set equal parts to 100 and shaded parts to 75.', why: '75/100 equals 3/4 or 0.75!' },
                ]
              : [
                  { prompt: 'Place 3/4 on the 0–1 number line.', targets: { parts: 4, shaded: 3 }, nudge: 'Set equal parts to 4 and shaded parts to 3.', why: '3/4 sits three-quarters of the way from 0 to 1.' },
                  { prompt: 'Show 6 tenths (6/10 = 0.6).', targets: { parts: 10, shaded: 6 }, nudge: 'Set equal parts to 10 and shaded parts to 6.', why: 'Dividing 1 whole into 10 equal parts makes tenths!' },
                  { prompt: 'Show 4/8 and see that it lands at 0.50 (one half).', targets: { parts: 8, shaded: 4 }, nudge: 'Set equal parts to 8 and shaded parts to 4.', why: '4/8 and 1/2 sit at the exact same point on the number line!' },
                ])
          : (isEven
              ? [
                  { prompt: 'Show 80% as 80/100 (0.80) on the number line.', targets: { parts: 100, shaded: 80 }, nudge: 'Set equal parts to 100 and shaded parts to 80.', why: 'Percent means out of 100: 80% = 80/100 = 4/5 = 0.8!' },
                  { prompt: 'Show 3/8 (0.375 = 38%) on the number line.', targets: { parts: 8, shaded: 3 }, nudge: 'Set equal parts to 8 and shaded parts to 3.', why: '1/8 is 0.125, so 3/8 is 0.375!' },
                  { prompt: 'Show 60/100 (0.60 = 60% = 3/5).', targets: { parts: 100, shaded: 60 }, nudge: 'Set equal parts to 100 and shaded parts to 60.', why: '60 hundredths simplifies to 6 tenths or 3 fifths.' },
                ]
              : [
                  { prompt: 'Show 4/5 (0.80 = 80%) on the number line.', targets: { parts: 5, shaded: 4 }, nudge: 'Set equal parts to 5 and shaded parts to 4.', why: 'Each fifth is 0.20 (20%), so 4 fifths is 0.80 (80%).' },
                  { prompt: 'Show 35 hundredths (35/100 = 0.35 = 35%).', targets: { parts: 100, shaded: 35 }, nudge: 'Set equal parts to 100 and shaded parts to 35.', why: '35/100 is 3 tenths and 5 hundredths = 0.35.' },
                  { prompt: 'Show 9 tenths (9/10 = 0.90 = 90%).', targets: { parts: 10, shaded: 9 }, nudge: 'Set equal parts to 10 and shaded parts to 9.', why: '9/10 is just 1 tenth away from 1 whole!' },
                ]),
      },
    });
  }

  // Standard `map.scene` or `DOMAIN_EXPLORE_SCENES[key]`
  const baseScene = (map && map.scene) || DOMAIN_EXPLORE_SCENES[key];
  if (baseScene && modes.length === 0) {
    const sceneDef = (baseScene.sceneByBand && baseScene.sceneByBand[band]) || baseScene;
    const spec = (bandSpecFor && (bandSpecFor(domain, sceneDef.id, band) || bandSpecFor(domain, baseScene.id, band))) || null;
    const rawCases = ((spec && spec.cases) || sceneDef.cases || baseScene.cases || []).map((c) => Object.assign({}, c));
    const dialOverrides = Object.assign({}, (spec && spec.dialOverrides) || sceneDef.dialOverrides || {});
    let range = sceneDef.range || (baseScene.sceneByBand && baseScene.sceneByBand[band] && baseScene.sceneByBand[band].range);

    // Differentiate cases & prompts per age (5, 6, 7, 8, 9, 10)
    const ageCases = rawCases.map((c, idx) => {
      if (idx === 0) {
        return Object.assign({}, c, {
          prompt: band === 'early'
            ? shortText(`Age ${age}: ${c.prompt}`, 105)
            : `Age ${age} (${leadLabel}): ${c.prompt}`,
          why: `${c.why} Connected to Age ${age} focus: ${leadLabel}.`,
        });
      }
      return c;
    });

    modes.push({
      engine: 'concept-lab',
      phase: 'explore',
      label: sceneDef.label || 'Explore the lab',
      icon: '🔬',
      config: {
        scene: sceneDef.id,
        explorePrompt: `Age ${age} · ${leadLabel}: ` + ((spec && spec.explorePrompt) || sceneDef.explorePrompt || baseScene.explorePrompt),
        cases: ageCases,
        initials: spec && spec.initials,
        dialOverrides: Object.keys(dialOverrides).length ? dialOverrides : undefined,
        range,
      },
    });

    if (key === 'Mathematics|Addition & Subtraction' && (band === 'mid' || band === 'upper')) {
      modes.push({
        engine: 'concept-lab',
        phase: 'explore',
        label: band === 'mid' ? '3-digit place value blocks' : '4-digit place value blocks',
        icon: '💡',
        config: band === 'mid'
          ? {
              scene: 'placevalue',
              explorePrompt: `Age ${age}: compose 3-digit sums and differences with hundreds, tens, and ones!`,
              cases: age === 8
                ? [
                    { prompt: 'Age 8: build 745 = 400 + 345 using hundreds, tens, and ones.', targets: { h: 7, t: 4, o: 5 }, nudge: 'Set hundreds 7, tens 4, ones 5.', why: '400 + 345 adds 4 hundreds to 3 hundreds → 745!' },
                    { prompt: 'Build 608 (908 − 300) with 6 hundreds, 0 tens, and 8 ones.', targets: { h: 6, t: 0, o: 8 }, nudge: 'Set hundreds 6, tens 0, ones 8.', why: 'Subtracting 3 hundreds from 908 leaves 608.' },
                  ]
                : [
                    { prompt: 'Age 7: build 532 = 200 + 332 using hundreds, tens, and ones.', targets: { h: 5, t: 3, o: 2 }, nudge: 'Set hundreds 5, tens 3, ones 2.', why: 'Adding 2 hundreds to 332 makes 532!' },
                    { prompt: 'Build 490 (350 + 140) with 4 hundreds, 9 tens, and 0 ones.', targets: { h: 4, t: 9, o: 0 }, nudge: 'Set hundreds 4, tens 9, ones 0.', why: '3 hundreds + 1 hundred = 4 hundreds; 5 tens + 4 tens = 9 tens → 490!' },
                  ],
            }
          : {
              scene: 'placevalue2',
              explorePrompt: `Age ${age}: compose 4-digit sums and differences up to 9,999!`,
              cases: age === 10
                ? [
                    { prompt: 'Age 10: build 6,425 = 4,100 + 2,325 across all four place columns.', targets: { th: 6, h: 4, t: 2, o: 5 }, nudge: 'Set thousands 6, hundreds 4, tens 2, ones 5.', why: '4,100 + 2,325 = 6,425 when you align each place value column!' },
                    { prompt: 'Build 8,050 (9,550 − 1,500).', targets: { th: 8, h: 0, t: 5, o: 0 }, nudge: 'Set thousands 8, hundreds 0, tens 5, ones 0.', why: '9,550 − 1,500 = 8,050.' },
                  ]
                : [
                    { prompt: 'Age 9: build 5,340 = 3,200 + 2,140 using thousands, hundreds, and tens.', targets: { th: 5, h: 3, t: 4, o: 0 }, nudge: 'Set thousands 5, hundreds 3, tens 4, ones 0.', why: '3,200 + 2,140 = 5,340.' },
                    { prompt: 'Build 7,208 (4,000 + 3,208).', targets: { th: 7, h: 2, t: 0, o: 8 }, nudge: 'Set thousands 7, hundreds 2, tens 0, ones 8.', why: 'Adding 4 thousands to 3,208 reaches 7,208!' },
                  ],
            },
      });
    }

    if (map && map.scene2 && (!map.scene2.bands || map.scene2.bands.includes(band))) {
      const spec2 = bandSpecFor ? bandSpecFor(domain, map.scene2.id, band) : null;
      let cases2 = ((spec2 && spec2.cases) || map.scene2.cases || []).map((c, idx) => {
        if (idx === 0) {
          return Object.assign({}, c, {
            prompt: band === 'early'
              ? shortText(`Age ${age}: ${c.prompt}`, 105)
              : `Age ${age} (${leadLabel}): ${c.prompt}`,
          });
        }
        return Object.assign({}, c);
      });
      let ov2 = (spec2 && spec2.dialOverrides) || map.scene2.dialOverrides;
      let rng2 = (spec2 && spec2.range) || map.scene2.range;

      // Fix Multiplication & Division mid scene2 ceiling (F2: topics reach 1000)
      if (key === 'Mathematics|Multiplication & Division' && band === 'mid' && map.scene2.id === 'numberline') {
        rng2 = { lo: 0, hi: 1000 };
        ov2 = { start: { min: 0, max: 600 }, step: { min: -200, max: 200 } };
        cases2 = age === 8
          ? [
              { prompt: 'Jump in 200s from 0 (0, 200, 400, 600) to multiply hundreds!', targets: { start: 0, step: 200 }, nudge: 'Set start to 0 and jump to 200.', why: '3 × 200 = 600 — multiplying hundreds uses the same place-value facts!' },
              { prompt: 'Start at 100 and jump in 150s (100, 250, 400, 550).', targets: { start: 100, step: 150 }, nudge: 'Set start to 100 and jump to 150.', why: 'Equal jumps of 150 add 450 in 3 hops to reach 550.' },
            ]
          : [
              { prompt: 'Jump in 100s from 100 (100, 200, 300, 400).', targets: { start: 100, step: 100 }, nudge: 'Set start to 100 and jump to 100.', why: 'Skip-counting in 100s builds fluency up to 1,000!' },
              { prompt: 'Start at 0 and jump by 120s (0, 120, 240, 360).', targets: { start: 0, step: 120 }, nudge: 'Set start to 0 and jump to 120.', why: '3 hops of 120 reach 360 — just like 3 × 12 tens!' },
            ];
      }

      modes.push({
        engine: 'concept-lab',
        phase: 'explore',
        label: map.scene2.label || 'Second lab',
        icon: '💡',
        config: {
          scene: map.scene2.id,
          explorePrompt: `Age ${age}: ` + ((spec2 && spec2.explorePrompt) || map.scene2.explorePrompt),
          cases: cases2,
          initials: spec2 && spec2.initials,
          dialOverrides: ov2,
          range: rng2,
        },
      });
    }
  }

  // Add 3D mode if configured in DOMAIN_THREE_MODES
  const threeSpec = DOMAIN_THREE_MODES[key];
  if (threeSpec) {
    const byAge = threeSpec.casesByAge || {};
    const fallbackCases = byAge[band === 'early' ? 5 : band === 'mid' ? 7 : 9] || Object.values(byAge)[0] || [];
    const cases = (byAge[age] || fallbackCases).map((c, idx) =>
      idx === 0
        ? Object.assign({}, c, {
            prompt: band === 'early'
              ? shortText(`${c.prompt.replace(/\.$/, '')} (Age ${age}).`, 105)
              : `${c.prompt} (Age ${age}: ${leadLabel})`,
            why: `${c.why} (${leadLabel})`,
          })
        : c
    );
    modes.push({
      engine: threeSpec.engine,
      phase: 'explore',
      label: threeSpec.label,
      icon: threeSpec.icon,
      config: {
        theme: threeSpec.theme,
        dialLabel: threeSpec.dialLabel,
        levels: threeSpec.levels,
        explorePrompt: `Age ${age} 3D exploration (${leadLabel}): rotate the 3D model and test the controls!`,
        cases,
      },
    });
  }

  return modes;
}

/* --------------------------------------------------------------------------
   2. Per-Age Specialization for ALL Understand & Practice Modes
   -------------------------------------------------------------------------- */
export function specializeModeForAge(mode, { subject, domain, age, band, topics, researchByTopic, glossFor }) {
  const leadTopic = topics[0] || { name: domain, evidence: [], description: '' };
  const secondTopic = topics[1] || leadTopic;
  const leadGloss = glossFor ? glossFor(leadTopic.name) : null;
  const leadLabel = (leadGloss && leadGloss.label) || cleanName(leadTopic.name);
  const secondLabel = cleanName(secondTopic.name);
  const leadEv = safeEv(leadTopic, 0);
  const secondEv = safeEv(secondTopic, topics.length > 1 ? 0 : 1);
  const isUpperInBand = age % 2 === 0; // 6, 8, 10

  const cfg = JSON.parse(JSON.stringify(mode.config || {}));

  switch (mode.engine) {
    case 'sorter': {
      cfg.explorePrompt = `Age ${age} (${leadLabel}): ` + (cfg.explorePrompt || 'Sort each item into the matching category bin.');
      const bins = cfg.bins || [];
      if (bins.length >= 2 && Array.isArray(cfg.items)) {
        const targetBin = bins[age % bins.length];
        const ageItemLabel = shortText(`${leadLabel} (${age}y)`, 34);
        if (!cfg.items.some((it) => it.label === ageItemLabel)) {
          cfg.items.push({
            emoji: '🌟',
            label: ageItemLabel,
            bin: targetBin.id,
            why: `${shortText(leadEv || leadTopic.description, 90)} (Matches ${targetBin.label} at Age ${age}).`,
          });
        }
      }
      break;
    }

    case 'sequence': {
      cfg.explorePrompt = `Age ${age} (${leadLabel}): ` + (cfg.explorePrompt || 'Place the stages in order.');
      cfg.celebrate = `Age ${age} mastery of ${leadLabel}! ` + (cfg.celebrate || '');
      if (Array.isArray(cfg.cards) && cfg.cards.length > 0) {
        cfg.cards = cfg.cards.map((card, i) => {
          if (i === 0) {
            return Object.assign({}, card, {
              why: `${card.why || card.label} — Age ${age} focus: ${shortText(leadEv || leadLabel, 80)}`,
            });
          }
          return card;
        });
      }
      break;
    }

    case 'decision': {
      const meters = cfg.meters || [{ id: 'energy', label: 'Energy', emoji: '⚡', start: 70 }];
      const m0 = meters[0].id;
      const m1 = (meters[1] || meters[0]).id;
      const r0 = researchByTopic ? researchByTopic.get(leadTopic.id) : null;
      const ep = r0 && r0.assess && r0.assess.errorPatterns && r0.assess.errorPatterns[0];
      const ageScene = {
        text: `Age ${age} inquiry challenge (${leadLabel}): how will you investigate and apply this idea? 🔍`,
        choices: [
          {
            label: shortText(leadEv || `Test and explain ${leadLabel} step by step`, 85),
            meters: [[m0, 15], [m1, 10]],
            reflect: `Great Age ${age} Inquirer move! ${shortText(leadTopic.description || leadEv, 110)}`,
            profile: 'Inquirer',
          },
          {
            label: shortText((ep && ep.distractor) ? `Guess "${ep.distractor}" without checking` : `Rush past ${leadLabel} without testing`, 85),
            meters: [[m0, -10]],
            reflect: (ep && ep.nextMove) ? shortText(ep.nextMove, 120) : `Slowing down to test your idea helps you avoid common slip-ups in ${leadLabel}.`,
          },
          {
            label: shortText(secondEv && secondEv !== leadEv ? `Also check: ${secondEv}` : `Ask a partner to compare clues for ${leadLabel}`, 85),
            meters: [[m1, 12]],
            reflect: `Comparing evidence with a partner strengthens your understanding of ${secondLabel}.`,
            profile: 'Communicator',
          },
        ],
      };
      cfg.scenes = [...(cfg.scenes || []), ageScene];
      break;
    }

    case 'memory': {
      const pairs = Array.isArray(cfg.pairs) ? cfg.pairs.slice() : [];
      const aLabel = shortText(`${leadLabel} (${age}y)`, 28);
      const bLabel = shortText(leadEv || leadTopic.description || `${domain} goal`, 36);
      if (aLabel && bLabel && aLabel.toLowerCase() !== bLabel.toLowerCase() && !pairs.some((p) => p.a.label === aLabel)) {
        pairs.push({
          a: { emoji: '🎯', label: aLabel, hint: `Find the evidence that matches ${aLabel}!` },
          b: { emoji: '💡', label: bLabel, why: `${aLabel} ↔ ${bLabel}` },
          why: `${aLabel}: ${shortText(leadEv || leadTopic.description, 80)}`,
        });
      }
      cfg.pairs = pairs;
      break;
    }

    case 'doctor': {
      const agePatient = isUpperInBand
        ? {
            brief: `Find one word that needs a bandage in this Age ${age} clinic check.`,
            celebrate: `Great Age ${age} editing!`,
            variants: [
              [
                { text: 'The' },
                { text: 'careful' },
                { text: 'learners' },
                { text: 'checked', injured: true, fixText: 'explored', why: `At Age ${age}, “explored” fits our inquiry into ${leadLabel} much better!` },
                { text: 'every' },
                { text: 'clue.' },
              ],
            ],
          }
        : {
            brief: `Find one word that needs a bandage in this Age ${age} clinic check.`,
            celebrate: `Great Age ${age} editing!`,
            variants: [
              [
                { text: 'we', injured: true, fixText: 'We', why: `Every sentence in our Age ${age} ${leadLabel} clinic starts with a capital letter!` },
                { text: 'can' },
                { text: 'test' },
                { text: 'our' },
                { text: 'ideas' },
                { text: 'together.' },
              ],
            ],
          };
      cfg.patients = [...(cfg.patients || []), agePatient];
      break;
    }

    case 'worksheet': {
      cfg.prompt = `Age ${age} practice (${leadLabel}): build your sheet and print!`;
      if (Array.isArray(cfg.words)) {
        const extraWord = cleanName(leadTopic.name).toLowerCase().replace(/[^a-z]/g, '').slice(0, 8) || (isUpperInBand ? 'explore' : 'wonder');
        if (extraWord.length >= 3 && !cfg.words.includes(extraWord)) {
          cfg.words = [...cfg.words, extraWord];
        }
      }
      break;
    }

    case 'word-builder': {
      cfg.prompt = `Age ${age} word studio (${leadLabel}): tap the letters in order!`;
      const ageWords = {
        5: { word: 'sun', emoji: '☀️', hint: 's-u-n — three sounds blended together!' },
        6: { word: 'ship', emoji: '🚢', hint: 'sh-i-p — starts with the digraph sh!' },
        7: { word: 'train', emoji: '🚂', hint: 'tr-ai-n — long a vowel team in the middle!' },
        8: { word: 'replay', emoji: '🔄', hint: 're-play — prefix re- + root play!' },
        9: { word: 'helpful', emoji: '🤝', hint: 'help-ful — root help + suffix -ful!' },
        10: { word: 'predict', emoji: '🔮', hint: 'pre-dict — Latin prefix pre- (before) + dict (say)!' },
      };
      const aw = ageWords[age];
      if (aw && Array.isArray(cfg.words) && !cfg.words.some((w) => w.word === aw.word)) {
        cfg.words = [...cfg.words, aw];
      }
      break;
    }

    case 'storybook': {
      if (Array.isArray(cfg.books) && cfg.books.length > 0) {
        cfg.books = cfg.books.map((b, bi) => {
          if (bi === 0) {
            return Object.assign({}, b, {
              title: `${b.title} · Age ${age}`,
              strategies: [...(b.strategies || []), `Age ${age}: ${shortText(leadLabel, 32)}`],
            });
          }
          return b;
        });
      }
      break;
    }

    case 'arcade': {
      const items = Array.isArray(cfg.items) ? cfg.items.slice() : [];
      topics.slice(0, 3).forEach((t, idx) => {
        const tLabel = (glossFor && glossFor(t.name) && glossFor(t.name).label) || cleanName(t.name);
        const ev = safeEv(t, 0);
        const prompt = band === 'early'
          ? shortText(`Age ${age}: which fits ${tLabel}?`, 95)
          : shortText(`Age ${age} sprint — which matches “${tLabel}”?`, 130);
        const correctChoice = shortText(ev || t.description || tLabel, 42);
        const wrongChoice = idx % 2 === 0 ? 'Guess without checking' : 'Skip the evidence';
        if (correctChoice && correctChoice !== wrongChoice) {
          items.unshift({
            prompt,
            choices: [
              { text: correctChoice, correct: true },
              { text: wrongChoice },
            ],
            why: `${shortText(ev || t.description, 85)} (${tLabel}).`,
          });
        }
      });
      cfg.items = items;
      break;
    }

    case 'spatial3d':
    case 'solar3d':
    case 'volcano3d': {
      if (Array.isArray(cfg.cases) && cfg.cases.length > 0) {
        cfg.cases = cfg.cases.map((c, idx) => {
          if (idx === 0) {
            return Object.assign({}, c, {
              prompt: band === 'early'
                ? shortText(`${c.prompt.replace(/\.$/, '')} (Age ${age}).`, 105)
                : `${c.prompt} (Age ${age}: ${leadLabel})`,
              why: `${c.why || ''} Connected to Age ${age} goal: ${leadLabel}.`.trim(),
            });
          }
          return c;
        });
      }
      break;
    }

    default:
      break;
  }

  return Object.assign({}, mode, { config: cfg });
}
