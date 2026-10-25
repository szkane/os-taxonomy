/* ==========================================================================
   band-modes.mjs — band-specific interactive mode content (spiral curriculum)
   Key: '<subject>|<domain>|<engine>' → { early, mid, upper } full engine
   configs in the SAME shapes mapping.mjs uses. derive.mjs resolves this file
   FIRST and falls back to the shared mapping config. Content in every band
   set is drawn from that band's own taxonomy topics (see
   .audit/band-palettes.md); validate-content.mjs fails the build when the
   same content fingerprint appears in two different bands.
   ========================================================================== */

export const BAND_MODES = {

  /* =================== Batch 1 — Science sorters =================== */

  /* Animals of the World — topics per band:
     early(5): camouflage, homes, record-holders, babies, nocturnal, wild/farm
     mid(7):   communication, migration, desert, polar, predators, rainforest, savanna
     upper(9): intelligence, biodiversity, endangered, invasive, protection, adaptations, symbiosis */
  'Science|Animals of the World|sorter': {
    early: {
      explorePrompt: 'Tap each animal to hear its group’s secret, then sort it.',
      bins: [
        { id: 'mammal', label: 'Mammals', emoji: '🐻' },
        { id: 'bird', label: 'Birds', emoji: '🐦' },
        { id: 'fish', label: 'Fish', emoji: '🐟' },
        { id: 'reptile', label: 'Reptiles', emoji: '🦎' },
      ],
      items: [
        { label: 'Dolphin', emoji: '🐬', bin: 'mammal', why: 'Breathes air and feeds milk — a mammal in the sea!' },
        { label: 'Eagle', emoji: '🦅', bin: 'bird', why: 'Feathers, beak and eggs — a flying bird.' },
        { label: 'Goldfish', emoji: '🐠', bin: 'fish', why: 'Gills and fins — a fish lives in water.' },
        { label: 'Turtle', emoji: '🐢', bin: 'reptile', why: 'Scaly skin and shelled eggs — a reptile.' },
        { label: 'Bat', emoji: '🦇', bin: 'mammal', why: 'It flies, but it feeds milk — a mammal!' },
        { label: 'Penguin', emoji: '🐧', bin: 'bird', why: 'A bird that swims instead of flying.' },
        { label: 'Salmon', emoji: '🐟', bin: 'fish', why: 'Lives in water and breathes with gills.' },
        { label: 'Crocodile', emoji: '🐊', bin: 'reptile', why: 'Big scales and a long tail — a reptile.' },
      ],
    },
    mid: {
      explorePrompt: 'These animals mastered tough homes. Sort each by its super-skill.',
      bins: [
        { id: 'desert', label: 'Desert survivors', emoji: '🏜️' },
        { id: 'polar', label: 'Polar survivors', emoji: '🧊' },
        { id: 'traveler', label: 'Great travelers', emoji: '🧭' },
        { id: 'hunter', label: 'Clever hunters', emoji: '🎯' },
      ],
      items: [
        { label: 'Camel', emoji: '🐪', bin: 'desert', why: 'Stores fat in humps and marches miles without water.' },
        { label: 'Fennec fox', emoji: '🦊', bin: 'desert', why: 'Giant ears let heat out — cool nights, hot days.' },
        { label: 'Polar bear', emoji: '🐻‍❄️', bin: 'polar', why: 'A thick coat and black skin soak up the scarce sun.' },
        { label: 'Emperor penguin', emoji: '🐧', bin: 'polar', why: 'Huddles in groups through the freezing dark winter.' },
        { label: 'Arctic tern', emoji: '🕊️', bin: 'traveler', why: 'Flies pole to pole every year — the longest trip.' },
        { label: 'Wildebeest', emoji: '🦬', bin: 'traveler', why: 'Follows the rain across the savanna in huge herds.' },
        { label: 'Owl', emoji: '🦉', bin: 'hunter', why: 'Hears a mouse under the snow — a silent night hunter.' },
        { label: 'Crocodile', emoji: '🐊', bin: 'hunter', why: 'Waits still as a log, then strikes at the water’s edge.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each species by the role it plays in its ecosystem.',
      bins: [
        { id: 'predator', label: 'Predators', emoji: '🦅' },
        { id: 'prey', label: 'Prey animals', emoji: '🐇' },
        { id: 'engineer', label: 'Ecosystem engineers', emoji: '🛠️' },
        { id: 'invader', label: 'Invasive species', emoji: '⚠️' },
      ],
      items: [
        { label: 'Lion', emoji: '🦁', bin: 'predator', why: 'Top predator — keeps herds moving and grasslands healthy.' },
        { label: 'Snow hare', emoji: '🐇', bin: 'prey', why: 'Fur turns white in winter — food for lynx and foxes.' },
        { label: 'Beaver', emoji: '🦫', bin: 'engineer', why: 'Its dams build wetlands whole food chains depend on.' },
        { label: 'Coral polyp', emoji: '🪸', bin: 'engineer', why: 'Builds the reef city — a quarter of ocean life lives there.' },
        { label: 'Cane toad', emoji: '🐸', bin: 'invader', why: 'Carried to Australia — toxic to predators that tried it.' },
        { label: 'Grey squirrel', emoji: '🐿️', bin: 'invader', why: 'Outcompetes red squirrels for food and territory.' },
        { label: 'Wolf', emoji: '🐺', bin: 'predator', why: 'Culls the weak — deer herds stay healthy and forests regrow.' },
        { label: 'Zebra', emoji: '🦓', bin: 'prey', why: 'Grazes the grass layer lions and hyenas feed on.' },
      ],
    },
  },

  /* Weather & Climate — topics per band:
     early(5): dressing for weather, rain & puddles, seasons, storm safety, temperature, wind
     mid(7):   cloud types, water cycle, thunder & lightning, instruments, forecasting, weather vs climate
     upper(9): climate change, climate zones, extreme events, atmosphere, weather maps, sun-driven systems */
  'Science|Weather & Climate|sorter': {
    early: {
      explorePrompt: 'What do you wear or carry? Sort each thing by its weather.',
      bins: [
        { id: 'rainy', label: 'Rainy day', emoji: '🌧️' },
        { id: 'sunny', label: 'Sunny day', emoji: '☀️' },
        { id: 'snowy', label: 'Snowy day', emoji: '❄️' },
        { id: 'windy', label: 'Windy day', emoji: '🌬️' },
      ],
      items: [
        { label: 'Umbrella', emoji: '☂️', bin: 'rainy', why: 'Pops open to keep the rain off you.' },
        { label: 'Puddle', emoji: '💧', bin: 'rainy', why: 'Rain gathers in puddles on the ground.' },
        { label: 'Sun hat', emoji: '👒', bin: 'sunny', why: 'Shades your head on bright days.' },
        { label: 'Sunglasses', emoji: '🕶️', bin: 'sunny', why: 'Protect your eyes from bright sun.' },
        { label: 'Mittens', emoji: '🧤', bin: 'snowy', why: 'Keep little hands warm in the snow.' },
        { label: 'Snowman', emoji: '⛄', bin: 'snowy', why: 'Only appears when snow can pack.' },
        { label: 'Kite', emoji: '🪁', bin: 'windy', why: 'Wind pushes it up to dance in the sky.' },
        { label: 'Blowing leaves', emoji: '🍃', bin: 'windy', why: 'Leaves skitter when the wind blows.' },
      ],
    },
    mid: {
      explorePrompt: 'Water never sits still. Sort each step of its journey.',
      bins: [
        { id: 'air', label: 'Up in the air', emoji: '☁️' },
        { id: 'fall', label: 'Falling down', emoji: '🌧️' },
        { id: 'ground', label: 'On the ground', emoji: '🏞️' },
        { id: 'tool', label: 'Weather tools', emoji: '🧰' },
      ],
      items: [
        { label: 'Evaporation', emoji: '♨️', bin: 'air', why: 'The sun lifts water up as invisible vapor.' },
        { label: 'Cloud formation', emoji: '☁️', bin: 'air', why: 'Vapor cools high up and packs into droplets — a cloud.' },
        { label: 'Rain', emoji: '🌧️', bin: 'fall', why: 'Droplets grow heavy and fall as rain.' },
        { label: 'Hail', emoji: '🧊', bin: 'fall', why: 'Iced pellets ride storm winds until they drop.' },
        { label: 'Rivers', emoji: '🏞️', bin: 'ground', why: 'Fallen water runs downhill back toward the sea.' },
        { label: 'Puddles drying', emoji: '💧', bin: 'air', why: 'The sun lifts puddles back into the cycle.' },
        { label: 'Thermometer', emoji: '🌡️', bin: 'tool', why: 'Measures how hot or cold the air is.' },
        { label: 'Rain gauge', emoji: '🥛', bin: 'tool', why: 'Collects rain so you can measure how much fell.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each item into the climate zone or system it belongs to.',
      bins: [
        { id: 'tropical', label: 'Tropical zone', emoji: '🌴' },
        { id: 'polar', label: 'Polar zone', emoji: '🧊' },
        { id: 'temperate', label: 'Temperate zone', emoji: '🍂' },
        { id: 'warming', label: 'Signals of climate change', emoji: '🌡️' },
      ],
      items: [
        { label: 'Rainforests', emoji: '🌴', bin: 'tropical', why: 'Straddling the equator, the sun stays high — hot and wet all year.' },
        { label: 'Ice sheets', emoji: '🧊', bin: 'polar', why: 'Sunlight strikes at a slant — too weak to melt the ice.' },
        { label: 'Four seasons', emoji: '🍂', bin: 'temperate', why: 'Mid-latitude tilt gives spring, summer, autumn, winter.' },
        { label: 'Deciduous forests', emoji: '🌳', bin: 'temperate', why: 'Trees drop leaves to survive the cold season.' },
        { label: 'Melting glaciers', emoji: '🏔️', bin: 'warming', why: 'A warming atmosphere shrinks ice that took millennia to grow.' },
        { label: 'Rising seas', emoji: '🌊', bin: 'warming', why: 'Warmer water expands and meltwater adds — coastlines creep inland.' },
        { label: 'Coral bleaching', emoji: '🪸', bin: 'warming', why: 'Stressed corals eject their algae when the sea heats.' },
        { label: 'Monsoon rains', emoji: '🌦️', bin: 'tropical', why: 'Sun-driven winds drag ocean moisture onto the land each season.' },
      ],
    },
  },

  /* The Human Body — topics per band:
     early(5): body needs, bones & muscles, breathing, brain, five senses, heart & blood
     mid(7):   cells/tissues/organs, muscles move bones, eye, bones, digestion, teeth
     upper(9): circulation together, heart, lungs, immune system, nervous system */
  'Science|The Human Body|sorter': {
    early: {
      explorePrompt: 'Sort each body part by what its job is.',
      bins: [
        { id: 'move', label: 'Helps me move', emoji: '🏃' },
        { id: 'sense', label: 'Helps me sense', emoji: '👀' },
        { id: 'breathe', label: 'Helps me breathe', emoji: '🫁' },
        { id: 'think', label: 'Helps me think', emoji: '🧠' },
      ],
      items: [
        { label: 'Legs', emoji: '🦵', bin: 'move', why: 'Muscles and bones in your legs carry you everywhere.' },
        { label: 'Fingers', emoji: '🖐️', bin: 'move', why: 'Fingers grip, pinch and point — tiny movers.' },
        { label: 'Ears', emoji: '👂', bin: 'sense', why: 'Ears catch sounds for your brain to understand.' },
        { label: 'Nose', emoji: '👃', bin: 'sense', why: 'Your nose smells — and warms the air you breathe.' },
        { label: 'Lungs', emoji: '🫁', bin: 'breathe', why: 'Two balloons that fill with fresh air.' },
        { label: 'Nose airway', emoji: '💨', bin: 'breathe', why: 'Air rides in through your nose down to the lungs.' },
        { label: 'Brain', emoji: '🧠', bin: 'think', why: 'The boss organ — it runs the whole body.' },
        { label: 'Eyes', emoji: '👀', bin: 'sense', why: 'Eyes catch light and send pictures to the brain.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each part into the job it does inside you.',
      bins: [
        { id: 'frame', label: 'Frame & movement', emoji: '🦴' },
        { id: 'fuel', label: 'Fuel processing', emoji: '🍎' },
        { id: 'control', label: 'Control center', emoji: '🧠' },
        { id: 'sensors', label: 'Sense organs', emoji: '👁️' },
      ],
      items: [
        { label: 'Femur', emoji: '🦴', bin: 'frame', why: 'The thigh bone — your longest lever for walking.' },
        { label: 'Joints', emoji: '🔧', bin: 'frame', why: 'Hinges where bones meet so muscles can bend them.' },
        { label: 'Stomach', emoji: '🫙', bin: 'fuel', why: 'Churns food with juices into a soupy mix.' },
        { label: 'Small intestine', emoji: '🌀', bin: 'fuel', why: 'A long, folded tube that soaks nutrients into the blood.' },
        { label: 'Spinal cord', emoji: '🧵', bin: 'control', why: 'The brain’s cable — messages race up and down it.' },
        { label: 'Nerves', emoji: '⚡', bin: 'control', why: 'Tiny wires reaching every fingertip and toe.' },
        { label: 'Retina', emoji: '🖼️', bin: 'sensors', why: 'The screen at the back of the eye that catches light.' },
        { label: 'Taste buds', emoji: '👅', bin: 'sensors', why: 'Taste sensors sort sweet, salty, sour and bitter.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each part into the body system it belongs to.',
      bins: [
        { id: 'circulatory', label: 'Circulatory system', emoji: '❤️' },
        { id: 'respiratory', label: 'Respiratory system', emoji: '🫁' },
        { id: 'nervous', label: 'Nervous system', emoji: '🧠' },
        { id: 'immune', label: 'Immune system', emoji: '🛡️' },
      ],
      items: [
        { label: 'Heart', emoji: '❤️', bin: 'circulatory', why: 'A muscle pump pushing blood on a two-loop journey.' },
        { label: 'Arteries', emoji: '🩸', bin: 'circulatory', why: 'Carry oxygen-rich blood away from the heart.' },
        { label: 'Trachea', emoji: '🫧', bin: 'respiratory', why: 'The windpipe — air’s highway to the lungs.' },
        { label: 'Alveoli', emoji: '🎈', bin: 'respiratory', why: 'Grapes of air sacs where oxygen swaps into the blood.' },
        { label: 'Neurons', emoji: '⚡', bin: 'nervous', why: 'Cells that fire signals — billions of them, networked.' },
        { label: 'Reflex arc', emoji: '🤚', bin: 'nervous', why: 'Hot pan? The spine jerks your hand before you think.' },
        { label: 'White blood cells', emoji: '🛡️', bin: 'immune', why: 'Patrol soldiers that hunt germs down and eat them.' },
        { label: 'Antibodies', emoji: '🔑', bin: 'immune', why: 'Lock onto a germ’s shape so the body can target it.' },
      ],
    },
  },

  /* Ecosystems & Habitats — topics: early(5) homes/needs; mid(8) habitats/food chains; upper(9) relationships/energy/protection */
  'Science|Ecosystems & Habitats|sorter': {
    early: {
      explorePrompt: 'Every animal needs a home. Sort each one by where it lives.',
      bins: [
        { id: 'ocean', label: 'Ocean', emoji: '🌊' },
        { id: 'desert', label: 'Desert', emoji: '🏜️' },
        { id: 'forest', label: 'Forest', emoji: '🌲' },
        { id: 'polar', label: 'Polar ice', emoji: '🧊' },
      ],
      items: [
        { label: 'Shark', emoji: '🦈', bin: 'ocean', why: 'Fins and gills make the shark a perfect swimmer.' },
        { label: 'Crab', emoji: '🦀', bin: 'ocean', why: 'Scuttles between rock pools and the sea floor.' },
        { label: 'Camel', emoji: '🐪', bin: 'desert', why: 'Stores fat in humps and marches miles without water.' },
        { label: 'Scorpion', emoji: '🦂', bin: 'desert', why: 'Hides in the day, hunts in the cool night.' },
        { label: 'Owl', emoji: '🦉', bin: 'forest', why: 'Nests in tree hollows and hunts at dusk.' },
        { label: 'Deer', emoji: '🦌', bin: 'forest', why: 'Browses leaves and hides between the trees.' },
        { label: 'Penguin', emoji: '🐧', bin: 'polar', why: 'Toboggans on the ice and fishes in cold seas.' },
        { label: 'Arctic fox', emoji: '🦊', bin: 'polar', why: 'A fluffy coat that turns white in winter snow.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each living thing by how it gets its food.',
      bins: [
        { id: 'producer', label: 'Makes its own food', emoji: '🌱' },
        { id: 'herbivore', label: 'Eats plants', emoji: '🐛' },
        { id: 'carnivore', label: 'Eats animals', emoji: '🦅' },
        { id: 'decomposer', label: 'Breaks down leftovers', emoji: '🍄' },
      ],
      items: [
        { label: 'Grass', emoji: '🌿', bin: 'producer', why: 'Sunlight + water + air = new grass. A food-chain start.' },
        { label: 'Seaweed', emoji: '🪸', bin: 'producer', why: 'The ocean’s sun-catcher — the base of sea food chains.' },
        { label: 'Caterpillar', emoji: '🐛', bin: 'herbivore', why: 'Munches leaves nonstop to fuel its change.' },
        { label: 'Rabbit', emoji: '🐇', bin: 'herbivore', why: 'Nibbles grass and clover with ever-growing teeth.' },
        { label: 'Hawk', emoji: '🦅', bin: 'carnivore', why: 'Spots a vole from high above and stoops.' },
        { label: 'Ladybird', emoji: '🐞', bin: 'carnivore', why: 'Hunts aphids — a tiny gardener’s friend.' },
        { label: 'Earthworm', emoji: '🪱', bin: 'decomposer', why: 'Recycles dead leaves into soil plants can use.' },
        { label: 'Mushroom', emoji: '🍄', bin: 'decomposer', why: 'Feeds on dead wood — the forest’s clean-up crew.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each relationship by how the two species affect each other.',
      bins: [
        { id: 'mutual', label: 'Both benefit', emoji: '🤝' },
        { id: 'parasite', label: 'One gains, one loses', emoji: '🦟' },
        { id: 'competition', label: 'Competing', emoji: '⚔️' },
        { id: 'protection', label: 'Protection effort', emoji: '🛡️' },
      ],
      items: [
        { label: 'Bee & flower', emoji: '🐝', bin: 'mutual', why: 'Bee takes nectar, flower gets pollinated — both win.' },
        { label: 'Clownfish & anemone', emoji: '🐠', bin: 'mutual', why: 'The fish hides safe; it cleans and guards its host.' },
        { label: 'Flea & dog', emoji: '🦟', bin: 'parasite', why: 'The flea feeds; the dog just itches — one-sided deal.' },
        { label: 'Mistletoe & tree', emoji: '🌿', bin: 'parasite', why: 'Steals water and minerals from its host branch.' },
        { label: 'Lions & hyenas', emoji: '⚔️', bin: 'competition', why: 'Both hunt the same herds — they steal each other’s meals.' },
        { label: 'Weeds & crops', emoji: '🌾', bin: 'competition', why: 'Both want the same sunlight, water and soil.' },
        { label: 'Breeding sanctuaries', emoji: '🏝️', bin: 'protection', why: 'Safe zones let endangered species raise young undisturbed.' },
        { label: 'Seed banks', emoji: '🏦', bin: 'protection', why: 'Frozen seeds guard plant species against extinction.' },
      ],
    },
  },

  /* Ocean Life — topics: early(5) sea animals/homes; mid(7) food chains/adaptations; upper(9) ecosystems/threats/protection */
  'Science|Ocean Life|sorter': {
    early: {
      explorePrompt: 'Sort each sea creature by the way it moves.',
      bins: [
        { id: 'swim', label: 'Swims with fins', emoji: '🐟' },
        { id: 'shell', label: 'Clings with a shell', emoji: '🐚' },
        { id: 'drift', label: 'Drifts with the current', emoji: '🪼' },
        { id: 'walk', label: 'Scuttles on legs', emoji: '🦀' },
      ],
      items: [
        { label: 'Tuna', emoji: '🐟', bin: 'swim', why: 'A stiff tail drives it fast through open water.' },
        { label: 'Seahorse', emoji: '🐠', bin: 'swim', why: 'A tiny dorsal fin flutters — slow but steady.' },
        { label: 'Limpet', emoji: '🐚', bin: 'shell', why: 'Clamps to rocks so waves cannot tear it off.' },
        { label: 'Oyster', emoji: '🦪', bin: 'shell', why: 'Anchored in its bed, filtering the water.' },
        { label: 'Jellyfish', emoji: '🪼', bin: 'drift', why: 'Pulses softly and lets the ocean carry it.' },
        { label: 'Plankton', emoji: '🦐', bin: 'drift', why: 'Too tiny to swim against the current — it rides.' },
        { label: 'Crab', emoji: '🦀', bin: 'walk', why: 'Ten legs scuttle sideways across the sand.' },
        { label: 'Lobster', emoji: '🦞', bin: 'walk', why: 'Walks the sea floor, flicking its tail to dart back.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each hunter by the trick it uses to catch food.',
      bins: [
        { id: 'speed', label: 'Speed chaser', emoji: '💨' },
        { id: 'ambush', label: 'Ambush waiter', emoji: '🪨' },
        { id: 'filter', label: 'Filter feeder', emoji: '🫧' },
        { id: 'tool', label: 'Built-in tools', emoji: '🛠️' },
      ],
      items: [
        { label: 'Marlin', emoji: '🗡️', bin: 'speed', why: 'Spear-snouted torpedo — one of the fastest fish alive.' },
        { label: 'Dolphin', emoji: '🐬', bin: 'speed', why: 'Herd fish into bait balls, then dart through.' },
        { label: 'Stonefish', emoji: '🪨', bin: 'ambush', why: 'Looks like a rock until prey swims a whisker away.' },
        { label: 'Anglerfish', emoji: '🎣', bin: 'ambush', why: 'Dangles a glowing lure in the dark deep sea.' },
        { label: 'Baleen whale', emoji: '🐋', bin: 'filter', why: 'Gulps tons of water, sieves out krill like a net.' },
        { label: 'Oyster', emoji: '🦪', bin: 'filter', why: 'Pumps water through its gills and keeps the good bits.' },
        { label: 'Octopus', emoji: '🐙', bin: 'tool', why: 'Eight arms, a parrot beak, and color-changing skin.' },
        { label: 'Mantis shrimp', emoji: '🦐', bin: 'tool', why: 'Punches with a club limb faster than a bullet leaves a gun.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each problem or protector by how it affects ocean life.',
      bins: [
        { id: 'pollution', label: 'Pollution threat', emoji: '🗑️' },
        { id: 'overfishing', label: 'Overfishing threat', emoji: '🎣' },
        { id: 'warming', label: 'Warming threat', emoji: '🌡️' },
        { id: 'hope', label: 'Protection in action', emoji: '🛟' },
      ],
      items: [
        { label: 'Plastic gyres', emoji: '🛍️', bin: 'pollution', why: 'Currents gather floating plastic into huge slow swirls.' },
        { label: 'Oil spills', emoji: '🛢️', bin: 'pollution', why: 'A slick coats feathers and gills — oxygen and warmth fail.' },
        { label: 'Nets & bycatch', emoji: '🕸️', bin: 'overfishing', why: 'Dolphins and turtles drown in nets meant for other fish.' },
        { label: 'Empty reefs', emoji: '🎣', bin: 'overfishing', why: 'Take the fish faster than they breed and the reef falls quiet.' },
        { label: 'Bleached coral', emoji: '🪸', bin: 'warming', why: 'Hot seas stress corals into starving white skeletons.' },
        { label: 'Acidifying water', emoji: '🧪', bin: 'warming', why: 'Extra CO₂ thins the water’s chemistry — shells get brittle.' },
        { label: 'Marine reserves', emoji: '🛟', bin: 'hope', why: 'No-fishing zones refill like banks — fish spill back out.' },
        { label: 'Mangrove restoration', emoji: '🌱', bin: 'hope', why: 'Mangroves nurse baby fish and lock away carbon.' },
      ],
    },
  },

  /* Insects & Minibeasts — topics: early(5) bodies/moves; mid(7) life cycles/roles; upper(9) colonies/interactions/science */
  'Science|Insects & Minibeasts|sorter': {
    early: {
      explorePrompt: 'Sort each minibeast by how many legs it has.',
      bins: [
        { id: 'six', label: 'Six legs (insects)', emoji: '🐜' },
        { id: 'eight', label: 'Eight legs', emoji: '🕷️' },
        { id: 'many', label: 'Lots of legs', emoji: '🐛' },
        { id: 'none', label: 'No legs', emoji: '🐌' },
      ],
      items: [
        { label: 'Ant', emoji: '🐜', bin: 'six', why: 'Six legs, three body parts — a true insect.' },
        { label: 'Butterfly', emoji: '🦋', bin: 'six', why: 'Six legs and wings — an insect in its flying costume.' },
        { label: 'Spider', emoji: '🕷️', bin: 'eight', why: 'Eight legs — a spider is not an insect!' },
        { label: 'Harvestman', emoji: '🕸️', bin: 'eight', why: 'Long spindly legs — an arachnid cousin.' },
        { label: 'Centipede', emoji: '🐛', bin: 'many', why: 'One pair of legs per body segment — dozens altogether.' },
        { label: 'Woodlouse', emoji: '🪳', bin: 'many', why: 'Seven pairs of legs — a little armoured crawler.' },
        { label: 'Snail', emoji: '🐌', bin: 'none', why: 'One strong foot ripples along under its shell.' },
        { label: 'Worm', emoji: '🪱', bin: 'none', why: 'No legs — bristles and muscles squeeze it forward.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each minibeast by its job in the garden.',
      bins: [
        { id: 'pollinator', label: 'Pollinators', emoji: '🌸' },
        { id: 'recycler', label: 'Recyclers', emoji: '🍂' },
        { id: 'hunter', label: 'Garden hunters', emoji: '🎯' },
        { id: 'menu', label: 'Bird food', emoji: '🐦' },
      ],
      items: [
        { label: 'Bumblebee', emoji: '🐝', bin: 'pollinator', why: 'Carries pollen between flowers as it sips nectar.' },
        { label: 'Hoverfly', emoji: '🪰', bin: 'pollinator', why: 'A bee copycat that pollinates while it feeds.' },
        { label: 'Dung beetle', emoji: '🪲', bin: 'recycler', why: 'Rolls waste underground — soil gets rich again.' },
        { label: 'Woodlouse', emoji: '🪳', bin: 'recycler', why: 'Chews dead leaves into smaller pieces for soil.' },
        { label: 'Ladybird', emoji: '🐞', bin: 'hunter', why: 'Eats dozens of aphids a day — the gardener’s friend.' },
        { label: 'Ground beetle', emoji: '🪲', bin: 'hunter', why: 'Night patrol that hunts slugs and caterpillars.' },
        { label: 'Caterpillar', emoji: '🐛', bin: 'menu', why: 'Soft and slow — a favourite chick meal in spring.' },
        { label: 'Greenfly', emoji: '🐜', bin: 'menu', why: 'Saps plants — and feeds armies of ladybirds and birds.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each insect strategy into its group.',
      bins: [
        { id: 'complete', label: 'Full change (4 stages)', emoji: '🦋' },
        { id: 'incomplete', label: 'Gradual growth (3 stages)', emoji: '🦗' },
        { id: 'social', label: 'Colony team', emoji: '👑' },
        { id: 'defence', label: 'Clever defences', emoji: '🛡️' },
      ],
      items: [
        { label: 'Butterfly', emoji: '🦋', bin: 'complete', why: 'Egg → caterpillar → chrysalis → adult. Total rebuild!' },
        { label: 'Ladybird', emoji: '🐞', bin: 'complete', why: 'A spiky larva becomes a totally different adult.' },
        { label: 'Grasshopper', emoji: '🦗', bin: 'incomplete', why: 'Hatches as a mini-adult — wings grow with each moult.' },
        { label: 'Dragonfly', emoji: '🪰', bin: 'incomplete', why: 'Nymph hunts underwater, then climbs out to fly.' },
        { label: 'Honeybee', emoji: '🐝', bin: 'social', why: 'One queen, thousands of workers — every job assigned.' },
        { label: 'Leafcutter ant', emoji: '🐜', bin: 'social', why: 'Farms fungus underground — a superorganism at work.' },
        { label: 'Stick insect', emoji: '🥢', bin: 'defence', why: 'Disguised as a twig — hides in plain sight.' },
        { label: 'Bombardier beetle', emoji: '💥', bin: 'defence', why: 'Sprays a hot chemical puff from its own rear nozzle.' },
      ],
    },
  },

  /* Polar Regions — topics: early(5) animals/cold; mid(7) adaptations/food; upper(9) climate/ice/conservation */
  'Science|Polar Regions|sorter': {
    early: {
      explorePrompt: 'Sort each polar animal by its coat.',
      bins: [
        { id: 'fur', label: 'Fur coat', emoji: '🐻‍❄️' },
        { id: 'feathers', label: 'Feather coat', emoji: '🐧' },
        { id: 'blubber', label: 'Fat layer', emoji: '🦭' },
        { id: 'visitor', label: 'Warm-weather visitor', emoji: '🧭' },
      ],
      items: [
        { label: 'Arctic fox', emoji: '🦊', bin: 'fur', why: 'A winter-white coat — the warmest fur in the Arctic.' },
        { label: 'Polar bear', emoji: '🐻‍❄️', bin: 'fur', why: 'Two layers of fur over black heat-grabbing skin.' },
        { label: 'Penguin', emoji: '🐧', bin: 'feathers', why: 'Overlapping feathers zip tight against wind and water.' },
        { label: 'Snowy owl', emoji: '🦉', bin: 'feathers', why: 'Feathered even down to its toes.' },
        { label: 'Seal', emoji: '🦭', bin: 'blubber', why: 'A fat blanket keeps its body warm in icy seas.' },
        { label: 'Whale', emoji: '🐋', bin: 'blubber', why: 'Thick blubber — a wetsuit it never takes off.' },
        { label: 'Swallow', emoji: '🐦', bin: 'visitor', why: 'Flies north only when summer ice melts to green.' },
        { label: 'Caribou', emoji: '🦌', bin: 'fur', why: 'Migrates with the seasons — thick coat for winter.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each polar skill into its group.',
      bins: [
        { id: 'keepwarm', label: 'Keeping warm', emoji: '🔥' },
        { id: 'findfood', label: 'Finding food', emoji: '🐟' },
        { id: 'raising', label: 'Raising young', emoji: '🥚' },
        { id: 'moving', label: 'Getting around', emoji: '🛷' },
      ],
      items: [
        { label: 'Huddling', emoji: '🐧', bin: 'keepwarm', why: 'Emperor penguins rotate — everyone gets a turn inside.' },
        { label: 'Denning', emoji: '🕳️', bin: 'keepwarm', why: 'Bears sleep out the worst cold in snow dens.' },
        { label: 'Diving deep', emoji: '🤿', bin: 'findfood', why: 'Seals hold their breath to hunt fish far below ice.' },
        { label: 'Sharp eyes', emoji: '👁️', bin: 'findfood', why: 'Owls and foxes hear and see prey under the snow.' },
        { label: 'Egg on feet', emoji: '🥚', bin: 'raising', why: 'Emperor dads balance one egg on their feet all winter.' },
        { label: 'Musk ox calves', emoji: '🐂', bin: 'raising', why: 'Calves stand and follow the herd within hours.' },
        { label: 'Tobogganing', emoji: '🛷', bin: 'moving', why: 'Penguins belly-slide — faster than walking on ice!' },
        { label: 'Wide paws', emoji: '🐾', bin: 'moving', why: 'Polar bears’ big paws spread out like snowshoes.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each item by what it tells us about the changing poles.',
      bins: [
        { id: 'iceevidence', label: 'Ice evidence', emoji: '🧊' },
        { id: 'wildlife', label: 'Wildlife impact', emoji: '🐻‍❄️' },
        { id: 'people', label: 'Impact on people', emoji: '🏘️' },
        { id: 'action', label: 'Global action', emoji: '🌍' },
      ],
      items: [
        { label: 'Ice cores', emoji: '🧊', bin: 'iceevidence', why: 'Bubbles in ancient ice record the atmosphere’s history.' },
        { label: 'Sea-ice records', emoji: '📉', bin: 'iceevidence', why: 'Satellites track summer ice shrinking year by year.' },
        { label: 'Bear hunting trouble', emoji: '🐻‍❄️', bin: 'wildlife', why: 'Less ice means shorter seal-hunting seasons for bears.' },
        { label: 'Krill decline', emoji: '🦐', bin: 'wildlife', why: 'Krill need sea ice to breed — penguins and whales feel it.' },
        { label: 'Coastal villages', emoji: '🏘️', bin: 'people', why: 'Thawing permafrost and waves erode Arctic settlements.' },
        { label: 'New shipping lanes', emoji: '🚢', bin: 'people', why: 'Melting ice opens routes — bringing new risks north.' },
        { label: 'Research stations', emoji: '🔬', bin: 'action', why: 'Nations share polar science to understand the planet.' },
        { label: 'Whale protection', emoji: '🐋', bin: 'action', why: 'Bans let whale populations slowly climb back.' },
      ],
    },
  },

  /* Rainforests — topics: early(5) animals/layers; mid(7) layers/food/plants; upper(9) biodiversity/threats/sustainable */
  'Science|Rainforests|sorter': {
    early: {
      explorePrompt: 'The rainforest is a tower of homes. Sort each animal by its floor.',
      bins: [
        { id: 'sky', label: 'Emergent tops', emoji: '🦅' },
        { id: 'canopy', label: 'Leafy canopy', emoji: '🐒' },
        { id: 'under', label: 'Understory', emoji: '🦜' },
        { id: 'floor', label: 'Dark floor', emoji: '🐆' },
      ],
      items: [
        { label: 'Eagle', emoji: '🦅', bin: 'sky', why: 'Harpy eagles nest in the very tallest trees.' },
        { label: 'Butterfly', emoji: '🦋', bin: 'sky', why: 'Sun-catching butterflies ride the highest breezes.' },
        { label: 'Monkey', emoji: '🐒', bin: 'canopy', why: 'Swings branch to branch where fruit is thickest.' },
        { label: 'Sloth', emoji: '🦥', bin: 'canopy', why: 'Hangs still in the canopy — algae even grows on it.' },
        { label: 'Tree frog', emoji: '🐸', bin: 'under', why: 'Sticky toes grip leaves in the shady middle layer.' },
        { label: 'Jaguar', emoji: '🐆', bin: 'floor', why: 'Prowls the dim floor, camouflaged by dappled light.' },
        { label: 'Leafcutter ant', emoji: '🐜', bin: 'floor', why: 'Carries leaf bits along highways on the forest floor.' },
        { label: 'Tapir', emoji: '🐖', bin: 'floor', why: 'Roots through leaf litter for fallen fruit.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each plant trick by what it is chasing.',
      bins: [
        { id: 'light', label: 'Chasing light', emoji: '☀️' },
        { id: 'water', label: 'Catching water', emoji: '💧' },
        { id: 'pollinate', label: 'Getting pollinated', emoji: '🌸' },
        { id: 'spreading', label: 'Spreading seeds', emoji: '🌰' },
      ],
      items: [
        { label: 'Lianas', emoji: '🌿', bin: 'light', why: 'Vine ropes climb trunks to burst into the sunny canopy.' },
        { label: 'Epiphytes', emoji: '🌱', bin: 'light', why: 'Perch on branches just to reach the light.' },
        { label: 'Drip-tip leaves', emoji: '🍃', bin: 'water', why: 'Pointed tips shed rain so leaves do not rot.' },
        { label: 'Buttress roots', emoji: '🌲', bin: 'water', why: 'Giant walls of root grip thin rainforest soil.' },
        { label: 'Big bright flowers', emoji: '🌺', bin: 'pollinate', why: 'Shout “here!” to bats, birds and bees in the gloom.' },
        { label: 'Night blooms', emoji: '🌙', bin: 'pollinate', why: 'Open after dark for moths and night creatures.' },
        { label: 'Tasty fruit', emoji: '🥭', bin: 'spreading', why: 'Animals eat the fruit and plant the seeds far away.' },
        { label: 'Exploding pods', emoji: '💥', bin: 'spreading', why: 'Some pods burst and fling their own seeds.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each issue by what it means for the rainforest.',
      bins: [
        { id: 'whyvaluable', label: 'Why it matters', emoji: '💎' },
        { id: 'threat', label: 'Threat', emoji: '🪓' },
        { id: 'chain', label: 'Chain reaction', emoji: '🧨' },
        { id: 'solution', label: 'Sustainable solution', emoji: '♻️' },
      ],
      items: [
        { label: 'Medicine plants', emoji: '💊', bin: 'whyvaluable', why: 'A quarter of medicines trace back to rainforest plants.' },
        { label: 'Carbon store', emoji: '🫁', bin: 'whyvaluable', why: 'Rainforests breathe in carbon and lock it in wood.' },
        { label: 'Clearing for farms', emoji: '🪓', bin: 'threat', why: 'Forest becomes pasture and soy fields — habitats gone.' },
        { label: 'Mining roads', emoji: '🛣️', bin: 'threat', why: 'Roads slice forest into islands too small for jaguars.' },
        { label: 'Frog extinctions', emoji: '🐸', bin: 'chain', why: 'Lose one frog species and its prey and hunters wobble too.' },
        { label: 'Drier climate', emoji: '🏜️', bin: 'chain', why: 'Less forest means less rain — the forest dries itself out.' },
        { label: 'Rubber tapping', emoji: '🧴', bin: 'solution', why: 'Tapping trees pays better than felling them — forest kept.' },
        { label: 'Ecotourism', emoji: '🥾', bin: 'solution', why: 'Guides and lodges earn more with the forest standing.' },
      ],
    },
  },

  /* Organisms & Life Processes — topics: early(5) needs/growth; mid(7) life cycles/plant parts; upper(9) systems/photosynthesis */
  'Science|Organisms & Life Processes|sorter': {
    early: {
      explorePrompt: 'Living things all do the same big jobs. Sort each one.',
      bins: [
        { id: 'eat', label: 'Takes in food', emoji: '🍎' },
        { id: 'breathe', label: 'Breathes', emoji: '💨' },
        { id: 'grow', label: 'Grows and changes', emoji: '🌱' },
        { id: 'babies', label: 'Makes new life', emoji: '🥚' },
      ],
      items: [
        { label: 'Rabbit eating', emoji: '🐇', bin: 'eat', why: 'Animals eat plants or other animals for energy.' },
        { label: 'Cat drinking', emoji: '🐈', bin: 'eat', why: 'Water counts too — every body needs it.' },
        { label: 'Fish gills', emoji: '🐟', bin: 'breathe', why: 'Gills grab oxygen straight out of the water.' },
        { label: 'Baby breathing', emoji: '👶', bin: 'breathe', why: 'Lungs pull in air — even before we are born, sort of!' },
        { label: 'Seedling', emoji: '🌱', bin: 'grow', why: 'A seed cracks open and reaches for the light.' },
        { label: 'Kitten', emoji: '🐈', bin: 'grow', why: 'Grows bigger every week on its mother’s milk.' },
        { label: 'Bird nest', emoji: '🥚', bin: 'babies', why: 'Eggs hold new life until it is ready to hatch.' },
        { label: 'Frogspawn', emoji: '🐸', bin: 'babies', why: 'Jelly eggs in the pond — hundreds of tiny futures.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each plant part by the job it does.',
      bins: [
        { id: 'anchor', label: 'Anchors and drinks', emoji: '🌱' },
        { id: 'transport', label: 'Carries water', emoji: '🚚' },
        { id: 'foodfactory', label: 'Makes food', emoji: '🍃' },
        { id: 'reproduce', label: 'Makes seeds', emoji: '🌸' },
      ],
      items: [
        { label: 'Roots', emoji: '🌿', bin: 'anchor', why: 'Grip the soil and drink up water and minerals.' },
        { label: 'Root hairs', emoji: '🧵', bin: 'anchor', why: 'Microscopic fuzz that multiplies the drinking surface.' },
        { label: 'Stem', emoji: '🪵', bin: 'transport', why: 'A lift shaft carrying water up to every leaf.' },
        { label: 'Xylem tubes', emoji: '🔧', bin: 'transport', why: 'Straws inside the stem — water rides up through them.' },
        { label: 'Leaf', emoji: '🍃', bin: 'foodfactory', why: 'The sunlight kitchen where plant sugar is made.' },
        { label: 'Chlorophyll', emoji: '🟢', bin: 'foodfactory', why: 'The green that catches sunlight for the recipe.' },
        { label: 'Flower', emoji: '🌸', bin: 'reproduce', why: 'Petals advertise; pollen carries the plan.' },
        { label: 'Seed pod', emoji: '🫘', bin: 'reproduce', why: 'Seeds packed with a snack and a travel plan.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each part of the life-process story.',
      bins: [
        { id: 'inputs', label: 'Photosynthesis needs', emoji: '☀️' },
        { id: 'outputs', label: 'Photosynthesis makes', emoji: '🍬' },
        { id: 'respiration', label: 'Respiration', emoji: '💨' },
        { id: 'nutrients', label: 'Nutrient cycle', emoji: '🔄' },
      ],
      items: [
        { label: 'Sunlight', emoji: '☀️', bin: 'inputs', why: 'The energy source that powers the whole recipe.' },
        { label: 'Carbon dioxide', emoji: '🌬️', bin: 'inputs', why: 'Leaves breathe it in through tiny stomata pores.' },
        { label: 'Glucose', emoji: '🍬', bin: 'outputs', why: 'Plant sugar — growth fuel made from thin air and light.' },
        { label: 'Oxygen', emoji: '🫁', bin: 'outputs', why: 'The spare part plants release — and animals breathe.' },
        { label: 'Mitochondria', emoji: '🔋', bin: 'respiration', why: 'Cells burn glucose with oxygen to release energy.' },
        { label: 'Night-time plants', emoji: '🌙', bin: 'respiration', why: 'Plants respire all night too — they only photosynthesize in light.' },
        { label: 'Decomposers', emoji: '🍄', bin: 'nutrients', why: 'Break dead matter into minerals roots can drink.' },
        { label: 'Compost', emoji: '🪱', bin: 'nutrients', why: 'Recycled nutrients — the cycle made visible in a bin.' },
      ],
    },
  },

  /* Earth's Systems — topics: early(5) land/water/air; mid(7) spheres/rocks/weathering; upper(9) interactions/carbon/plates */
  'Science|Earth\'s Systems|sorter': {
    early: {
      explorePrompt: 'Earth is made of land, water and air. Sort each thing.',
      bins: [
        { id: 'land', label: 'Land', emoji: '⛰️' },
        { id: 'water', label: 'Water', emoji: '🌊' },
        { id: 'air', label: 'Air', emoji: '🌬️' },
        { id: 'living', label: 'Living things', emoji: '🌳' },
      ],
      items: [
        { label: 'Mountain', emoji: '⛰️', bin: 'land', why: 'Rock pushed up over millions of years.' },
        { label: 'Sand dune', emoji: '🏜️', bin: 'land', why: 'Wind piles sand into rolling hills.' },
        { label: 'River', emoji: '🏞️', bin: 'water', why: 'Water running downhill to the sea.' },
        { label: 'Cloud', emoji: '☁️', bin: 'air', why: 'Water droplets floating high in the sky.' },
        { label: 'Wind', emoji: '🌬️', bin: 'air', why: 'Moving air you can feel but not see.' },
        { label: 'Rain', emoji: '🌧️', bin: 'water', why: 'Clouds drop their water back down.' },
        { label: 'Forest', emoji: '🌳', bin: 'living', why: 'Roots hold the land; leaves breathe the air.' },
        { label: 'Fish', emoji: '🐟', bin: 'living', why: 'Living things share all three: land, water, air.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each rock or change by how it was made.',
      bins: [
        { id: 'igneous', label: 'Cooled from melt', emoji: '🌋' },
        { id: 'sedimentary', label: 'Pressed in layers', emoji: '🪨' },
        { id: 'weathering', label: 'Worn down', emoji: '🌬️' },
        { id: 'erosion', label: 'Carried away', emoji: '🏞️' },
      ],
      items: [
        { label: 'Basalt', emoji: '🌋', bin: 'igneous', why: 'Melted rock cooled fast into dark, hard stone.' },
        { label: 'Granite', emoji: '🪨', bin: 'igneous', why: 'Cooled slowly underground — big sparkling grains.' },
        { label: 'Sandstone', emoji: '🏝️', bin: 'sedimentary', why: 'Sand pressed for ages into wavy-striped rock.' },
        { label: 'Limestone', emoji: '🐚', bin: 'sedimentary', why: 'Built from shells and sea-floor mud in layers.' },
        { label: 'Cracked boulders', emoji: '🧊', bin: 'weathering', why: 'Water freezes in cracks and wedges rock apart.' },
        { label: 'Smooth pebbles', emoji: '🥚', bin: 'weathering', why: 'Rivers tumble stones until edges wear smooth.' },
        { label: 'River delta', emoji: '🏞️', bin: 'erosion', why: 'Mud carried seaward settles in a fan at the mouth.' },
        { label: 'Canyon', emoji: '⛰️', bin: 'erosion', why: 'A river carved this gorge over millions of years.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each Earth-system story into the spheres it connects.',
      bins: [
        { id: 'geosphere', label: 'Rock & land', emoji: '⛰️' },
        { id: 'hydrosphere', label: 'Water', emoji: '🌊' },
        { id: 'atmosphere', label: 'Air & climate', emoji: '☁️' },
        { id: 'biosphere', label: 'Life', emoji: '🌿' },
      ],
      items: [
        { label: 'Volcanic eruption', emoji: '🌋', bin: 'geosphere', why: 'The mantle leaks rock and gas to the surface.' },
        { label: 'Mountain building', emoji: '🏔️', bin: 'geosphere', why: 'Plates collide and crunch the crust skyward.' },
        { label: 'Ocean currents', emoji: '🌊', bin: 'hydrosphere', why: 'Heat rides the seas — currents steer world climate.' },
        { label: 'Glaciers', emoji: '🧊', bin: 'hydrosphere', why: 'Frozen reservoirs that feed rivers all summer.' },
        { label: 'Greenhouse effect', emoji: '🫧', bin: 'atmosphere', why: 'Gases trap heat — without them Earth would freeze.' },
        { label: 'Monsoon winds', emoji: '🌦️', bin: 'atmosphere', why: 'Seasonal wind flips pull rain onto continents.' },
        { label: 'Plankton oxygen', emoji: '🦐', bin: 'biosphere', why: 'Ocean plankton make about half the air’s oxygen.' },
        { label: 'Plant weathering', emoji: '🌱', bin: 'biosphere', why: 'Roots wedge rock apart — life shapes the land too.' },
      ],
    },
  },

  /* Matter & Materials — topics: early(5) properties/sorting; mid(7) states/changes; upper(9) particles/reactions */
  'Science|Matter & Materials|sorter': {
    early: {
      explorePrompt: 'Sort each material by what it is like.',
      bins: [
        { id: 'hard', label: 'Hard', emoji: '🪨' },
        { id: 'soft', label: 'Soft', emoji: '🧸' },
        { id: 'stretchy', label: 'Stretchy', emoji: '🧃' },
        { id: 'liquid', label: 'Pours and flows', emoji: '💧' },
      ],
      items: [
        { label: 'Rock', emoji: '🪨', bin: 'hard', why: 'Squeezing it will not change its shape.' },
        { label: 'Metal spoon', emoji: '🥄', bin: 'hard', why: 'Solid metal keeps its shape — great for scooping.' },
        { label: 'Teddy fur', emoji: '🧸', bin: 'soft', why: 'Squishy and warm — cosy toy material.' },
        { label: 'Sponge', emoji: '🧽', bin: 'soft', why: 'Squashes down and pops back up.' },
        { label: 'Rubber band', emoji: '🧃', bin: 'stretchy', why: 'Stretches far, then snaps right back.' },
        { label: 'Balloon', emoji: '🎈', bin: 'stretchy', why: 'Blow and it grows — rubber stretches to fit.' },
        { label: 'Juice', emoji: '🧃', bin: 'liquid', why: 'Takes the shape of whatever cup holds it.' },
        { label: 'Honey', emoji: '🍯', bin: 'liquid', why: 'Pours slowly — a thick, sticky liquid.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each change by what kind of change it is.',
      bins: [
        { id: 'melting', label: 'Solid → liquid', emoji: '🫠' },
        { id: 'freezing', label: 'Liquid → solid', emoji: '🧊' },
        { id: 'evaporating', label: 'Liquid → gas', emoji: '♨️' },
        { id: 'condensing', label: 'Gas → liquid', emoji: '💧' },
      ],
      items: [
        { label: 'Ice cube in the sun', emoji: '🫠', bin: 'melting', why: 'Warmth loosens the particles — the solid slumps to liquid.' },
        { label: 'Chocolate in a hand', emoji: '🍫', bin: 'melting', why: 'Body heat is enough to melt cocoa butter.' },
        { label: 'Water in the freezer', emoji: '🧊', bin: 'freezing', why: 'Cold locks particles into a crystal pattern.' },
        { label: 'Wax hardening', emoji: '🕯️', bin: 'freezing', why: 'Cooling wax sets back into solid shape.' },
        { label: 'Puddle disappearing', emoji: '♨️', bin: 'evaporating', why: 'Particles escape into the air one by one.' },
        { label: 'Kettle steaming', emoji: '☕', bin: 'evaporating', why: 'Boiling water releases water vapor fast.' },
        { label: 'Mirror fog', emoji: '🪞', bin: 'condensing', why: 'Steam hits cold glass and turns to droplets.' },
        { label: 'Dew on grass', emoji: '🌾', bin: 'condensing', why: 'Night-chilled air lets go of its water.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each property or change into its particle story.',
      bins: [
        { id: 'solid', label: 'Solid particles', emoji: '🧊' },
        { id: 'liquid', label: 'Liquid particles', emoji: '💧' },
        { id: 'gas', label: 'Gas particles', emoji: '💨' },
        { id: 'chemical', label: 'New substance made', emoji: '🧪' },
      ],
      items: [
        { label: 'Keeps its shape', emoji: '🧊', bin: 'solid', why: 'Particles vibrate in place, locked in a pattern.' },
        { label: 'Fixed volume', emoji: '🥛', bin: 'liquid', why: 'Particles touch but slide — volume stays, shape flows.' },
        { label: 'Fills the room', emoji: '💨', bin: 'gas', why: 'Particles fly free and spread as far as they can.' },
        { label: 'Can be squeezed', emoji: '🎈', bin: 'gas', why: 'Mostly empty space — push and the gaps shrink.' },
        { label: 'Rusting nail', emoji: '🔧', bin: 'chemical', why: 'Iron + oxygen make a new flaky substance: rust.' },
        { label: 'Baking a cake', emoji: '🎂', bin: 'chemical', why: 'Heat makes new substances — you cannot un-bake it.' },
        { label: 'Melting ice', emoji: '💧', bin: 'liquid', why: 'Just a state change — still H₂O. Physical, not chemical.' },
        { label: 'Burning wood', emoji: '🔥', bin: 'chemical', why: 'Wood becomes ash, smoke and gas — new stuff entirely.' },
      ],
    },
  },

  /* =================== Batch 2 — History & Geography =================== */

  /* Ancient Egypt — early: Nile/daily life/tombs/writing; mid: hierarchy/scribes/builders;
     upper: legacy/trade/beliefs/power (topics per palette) */
  'History|Ancient Egypt|sorter': {
    early: {
      explorePrompt: 'Sort each Egyptian thing by where it belongs.',
      bins: [
        { id: 'river', label: 'On the Nile', emoji: '🛶' },
        { id: 'daily', label: 'Everyday things', emoji: '🏺' },
        { id: 'tomb', label: 'For the tombs', emoji: '⚰️' },
        { id: 'write', label: 'Writing & records', emoji: '📜' },
      ],
      items: [
        { label: 'Reed boat', emoji: '🛶', bin: 'river', why: 'Papyrus reeds tied into boats — the Nile was the road.' },
        { label: 'Fishing net', emoji: '🕸️', bin: 'river', why: 'The river gave fish to everyone all year.' },
        { label: 'Bread loaf', emoji: '🍞', bin: 'daily', why: 'Bread and beer were everyday Egyptian food.' },
        { label: 'Grinding stone', emoji: '🪨', bin: 'daily', why: 'Grain was ground into flour every single day.' },
        { label: 'Canopic jar', emoji: '🏺', bin: 'tomb', why: 'Held organs safely for the journey after death.' },
        { label: 'Scarab amulet', emoji: '🪲', bin: 'tomb', why: 'A lucky beetle charm placed with the mummy.' },
        { label: 'Scribe’s palette', emoji: '🖌️', bin: 'write', why: 'Pens and ink cakes — a scribe’s tool set.' },
        { label: 'Papyrus scroll', emoji: '📜', bin: 'write', why: 'Reed paper for records, stories and spells.' },
      ],
    },
    mid: {
      explorePrompt: 'Egypt was a pyramid of people. Sort each by its role.',
      bins: [
        { id: 'royal', label: 'Pharaoh & priests', emoji: '👑' },
        { id: 'scribe', label: 'Scribes & officials', emoji: '✍️' },
        { id: 'builder', label: 'Builders & craftworkers', emoji: '🔨' },
        { id: 'farmer', label: 'Farmers & villagers', emoji: '🌾' },
      ],
      items: [
        { label: 'Pharaoh', emoji: '👑', bin: 'royal', why: 'Ruled everything — and led the temples’ rituals.' },
        { label: 'Temple priest', emoji: '🕯️', bin: 'royal', why: 'Kept the god’s statue fed, washed and dressed.' },
        { label: 'Tomb scribe', emoji: '📏', bin: 'scribe', why: 'Counted grain, wrote letters — could read the gods’ words.' },
        { label: 'Tax collector', emoji: '🧾', bin: 'scribe', why: 'Officials tallied harvests owed to the palace.' },
        { label: 'Stone mason', emoji: '🔨', bin: 'builder', why: 'Cut and shaped the giant pyramid blocks.' },
        { label: 'Bead maker', emoji: '📿', bin: 'builder', why: 'Craftworkers made jewellery, tools and furniture.' },
        { label: 'Wheat farmer', emoji: '🌾', bin: 'farmer', why: 'Grew the grain that fed the whole kingdom.' },
        { label: 'Water lifter', emoji: '🪣', bin: 'farmer', why: 'Swung the shaduf to raise river water to the fields.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each clue by what it shows about ancient Egypt.',
      bins: [
        { id: 'legacy', label: 'Legacy alive today', emoji: '🏛️' },
        { id: 'economy', label: 'Trade & wealth', emoji: '⚖️' },
        { id: 'belief', label: 'Beliefs & rituals', emoji: '🪶' },
        { id: 'power', label: 'Power & rule', emoji: '👑' },
      ],
      items: [
        { label: '365-day calendar', emoji: '📅', bin: 'legacy', why: 'Egypt’s river-year calendar became our calendar’s root.' },
        { label: 'Obelisks worldwide', emoji: '🗼', bin: 'legacy', why: 'Egyptian monuments stand in cities across the world.' },
        { label: 'Grain exports', emoji: '🌾', bin: 'economy', why: 'Egypt shipped grain across the Mediterranean — wealth in wheat.' },
        { label: 'Lapis & gold routes', emoji: '🧭', bin: 'economy', why: 'Trade brought blue lapis from far mines for treasure work.' },
        { label: 'Weighing of the heart', emoji: '🪶', bin: 'belief', why: 'Hearts were judged against a feather of truth.' },
        { label: 'Book of the Dead', emoji: '📖', bin: 'belief', why: 'Spell collections to guide the dead safely through.' },
        { label: 'Pharaoh as living god', emoji: '☀️', bin: 'power', why: 'Egyptians saw the pharaoh as a god walking on Earth.' },
        { label: 'Cleopatra’s alliances', emoji: '🤝', bin: 'power', why: 'She allied with Rome’s civil wars to keep Egypt free — and lost.' },
      ],
    },
  },

  'History|Ancient Egypt|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Tap each step of the river year, then put it in order.',
      cards: [
        { label: 'The flood waters come', emoji: '🌊', why: 'Every year the Nile rose and watered the dry land.', clue: 'It starts with water.' },
        { label: 'Farmers sow the seeds', emoji: '🌾', why: 'Wet soil was perfect for planting wheat and barley.', clue: 'Seeds need wet soil.' },
        { label: 'Everyone helps harvest', emoji: '🧺', why: 'Golden fields were cut together — the big food moment.', clue: 'Plants grow up before they are cut.' },
        { label: 'Grain stored for the year', emoji: '🏺', why: 'Full granaries meant Egypt would not go hungry.', clue: 'Food is saved after it is gathered.' },
      ],
      celebrate: 'You ordered the river year — the beat Egypt lived by!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Put the mummification steps in the true order.',
      cards: [
        { label: 'Wash and purify the body', emoji: '💧', why: 'Priests washed the body in palm water — a sacred first step.', clue: 'Everything begins with washing.' },
        { label: 'Remove organs, keep the heart', emoji: '🫀', why: 'The heart stayed — it was needed for the weighing of the heart.', clue: 'Next, the inside is made safe.' },
        { label: 'Pack in natron salt for 40 days', emoji: '🧂', why: 'Natron dried the body completely so it would not rot.', clue: 'Drying takes the longest.' },
        { label: 'Wrap in linen strips', emoji: '🧵', why: 'Hundreds of metres of linen, with charms between layers.', clue: 'Wrapped like a parcel once dry.' },
        { label: 'Mask, coffin and tomb', emoji: '⚰️', why: 'A painted mask and coffin carried the mummy to its tomb.', clue: 'The journey after comes last.' },
      ],
      celebrate: 'You walked the embalmer’s path step by step!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order three thousand years of Egyptian story.',
      cards: [
        { label: 'The Great Pyramid rises', emoji: '🏗️', why: 'Old Kingdom pharaohs built the only surviving Wonder.', clue: 'Starts with the pyramids.' },
        { label: 'Tutankhamun rules and is buried', emoji: '⚰️', why: 'A minor king — until his untouched tomb made him immortal.', clue: 'The boy king came much later.' },
        { label: 'Cleopatra, the last pharaoh', emoji: '👑', why: 'She played Rome’s civil wars to keep Egypt free.', clue: 'Egypt’s end has a famous queen.' },
        { label: 'Rome absorbs Egypt', emoji: '🦅', why: 'After Actium, 30 BC: Egypt became Rome’s breadbasket.', clue: 'Conquest follows defeat.' },
        { label: 'Tombs unearthed, world tours', emoji: '🏛️', why: 'Archaeology and ethics debates still follow Tut’s gold.', clue: 'Modern times come last.' },
      ],
      celebrate: 'You spanned pyramids to podcasts — three millennia!',
    },
  },

  /* Ancient Greece & Rome — early: gods/soldiers/games/stories; mid: Athens/Sparta/Rome;
     upper: legacy domains and the fall */
  'History|Ancient Greece & Rome|sorter': {
    early: {
      explorePrompt: 'Sort each ancient thing into its world.',
      bins: [
        { id: 'gods', label: 'Gods & myths', emoji: '🏛️' },
        { id: 'soldiers', label: 'Soldiers & builders', emoji: '⚔️' },
        { id: 'games', label: 'Games & sport', emoji: '🏅' },
        { id: 'stories', label: 'Stories & legends', emoji: '📜' },
      ],
      items: [
        { label: 'Zeus’s thunderbolt', emoji: '⚡', bin: 'gods', why: 'King of the gods hurled bolts from Mount Olympus.' },
        { label: 'Athena’s owl', emoji: '🦉', bin: 'gods', why: 'Goddess of wisdom — Athens named for her owl.' },
        { label: 'Roman shield', emoji: '🛡️', bin: 'soldiers', why: 'Legionaries locked shields into a moving wall.' },
        { label: 'Aqueduct arches', emoji: '🌉', bin: 'soldiers', why: 'Roman builders piped fresh water into cities.' },
        { label: 'Olive wreath', emoji: '🌿', bin: 'games', why: 'Olympic winners wore wreaths, not medals.' },
        { label: 'Chariot race', emoji: '🛞', bin: 'games', why: 'Seven laps around the roaring circus track.' },
        { label: 'Romulus & Remus', emoji: '🐺', bin: 'stories', why: 'Legend says a wolf raised Rome’s twin founders.' },
        { label: 'The Minotaur maze', emoji: '🌀', bin: 'stories', why: 'Theseus followed thread through the labyrinth.' },
      ],
    },
    mid: {
      explorePrompt: 'Athens, Sparta or Rome? Sort each clue to its city.',
      bins: [
        { id: 'athens', label: 'Athens', emoji: '🏛️' },
        { id: 'sparta', label: 'Sparta', emoji: '🛡️' },
        { id: 'rome', label: 'Rome', emoji: '🦅' },
      ],
      items: [
        { label: 'Citizens vote on laws', emoji: '🗳️', bin: 'athens', why: 'Athenian democracy — free men voted directly.' },
        { label: 'The Parthenon', emoji: '🏛️', bin: 'athens', why: 'A marble temple to Athena on the Acropolis.' },
        { label: 'Open-air theatre', emoji: '🎭', bin: 'athens', why: 'Comedies and tragedies played to the whole city.' },
        { label: 'Boys taken for army school', emoji: '🛡️', bin: 'sparta', why: 'Spartan boys trained from seven — toughest in Greece.' },
        { label: 'Holding the pass at Thermopylae', emoji: '⚔️', bin: 'sparta', why: 'Three hundred Spartans made the legendary stand.' },
        { label: 'Gladiator arena', emoji: '🏟️', bin: 'rome', why: 'The Colosseum staged fights for fifty thousand fans.' },
        { label: 'Roads straight as arrows', emoji: '🛣️', bin: 'rome', why: 'Roman roads ran true across the empire — some last today.' },
        { label: 'City buried by ash', emoji: '🌋', bin: 'rome', why: 'Vesuvius froze Pompeii — a whole Roman town in time.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each inheritance by the part of life it still shapes.',
      bins: [
        { id: 'words', label: 'Words & laws', emoji: '⚖️' },
        { id: 'ideas', label: 'Ideas & medicine', emoji: '🤔' },
        { id: 'building', label: 'Buildings & engineering', emoji: '🏗️' },
        { id: 'fall', label: 'Why Rome fell', emoji: '🪓' },
      ],
      items: [
        { label: 'Latin in science words', emoji: '🔤', bin: 'words', why: 'Half of English science words grow from Latin roots.' },
        { label: 'Senates & vetoes', emoji: '🏛️', bin: 'words', why: 'Republic words like senate and veto still run politics.' },
        { label: '“Do no harm” doctors', emoji: '🩺', bin: 'ideas', why: 'Hippocrates set the doctor’s promise still used today.' },
        { label: 'Logos & arguments', emoji: '💡', bin: 'ideas', why: 'Greek philosophers invented the reasoned debate.' },
        { label: 'Arches, domes, concrete', emoji: '🧱', bin: 'building', why: 'Roman concrete domes still crown buildings after 2,000 years.' },
        { label: 'Bridges & sewers', emoji: '🌉', bin: 'building', why: 'Engineering that kept cities clean and connected.' },
        { label: 'Empire split in two', emoji: '✂️', bin: 'fall', why: 'East and West drifted apart — too big to govern whole.' },
        { label: 'Invasions & heavy taxes', emoji: '💸', bin: 'fall', why: 'Pressure on the borders and a strained economy broke the West.' },
      ],
    },
  },

  'History|Ancient Greece & Rome|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Order one day at the ancient Olympic games.',
      cards: [
        { label: 'March in and promise fair play', emoji: '🎺', why: 'Athletes paraded and swore to compete honestly.', clue: 'Games begin with a promise.' },
        { label: 'The sprint races', emoji: '🏃', why: 'The stadion sprint was the oldest event of all.', clue: 'Simplest race first.' },
        { label: 'Wrestling and javelin', emoji: '🤼', why: 'The pentathlon tested every kind of skill.', clue: 'Harder events follow.' },
        { label: 'Olive wreath for the winner', emoji: '🌿', why: 'Victors became hometown heroes overnight.', clue: 'Prizes come at the end.' },
      ],
      celebrate: 'You ran the ancient Olympics in order!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Build the story of how Rome grew.',
      cards: [
        { label: 'Legend: Romulus founds Rome', emoji: '🐺', why: 'The wolf-twin story marks the city’s legendary start.', clue: 'Every story needs a beginning.' },
        { label: 'Kings out, Republic in', emoji: '🗳️', why: 'Romans ejected their kings and elected leaders instead.', clue: 'Citizens take power next.' },
        { label: 'Legions conquer Italy', emoji: '🛡️', why: 'Disciplined legions won allies and land across the peninsula.', clue: 'A strong state grows strong armies.' },
        { label: 'Caesar, then emperors', emoji: '👑', why: 'The Republic strained into one-man rule — the empire age.', clue: 'Power concentrates late.' },
        { label: 'Empire circles the sea', emoji: '🗺️', why: '“Mare Nostrum” — the Mediterranean became Rome’s pond.', clue: 'Empire at its peak comes last.' },
      ],
      celebrate: 'You traced a village to a world empire!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order the fall of the West — and what survived.',
      cards: [
        { label: 'Republic becomes Empire', emoji: '👑', why: 'After Caesar, emperors held the real power.', clue: 'Starts with the change of rule.' },
        { label: 'Empire splits East and West', emoji: '✂️', why: 'Diocletian split a too-big empire for governing.', clue: 'A crack appears first.' },
        { label: 'Invasions press the borders', emoji: '⚔️', why: 'Goths, Vandals and Huns pushed through over decades.', clue: 'Pressure from outside builds.' },
        { label: 'The West falls, 476', emoji: '🪓', why: 'A Germanic general replaced the last western emperor.', clue: 'The blow lands.' },
        { label: 'Byzantium keeps the flame', emoji: '🕯️', why: 'The Eastern empire carried Roman law and Greek learning on.', clue: 'Not everything ended.' },
      ],
      celebrate: 'You ordered an empire’s twilight — and its afterglow!',
    },
  },

  /* Medieval Times — early: who owns what; mid: pyramid of power; upper: change-makers */
  'History|Medieval Times|sorter': {
    early: {
      explorePrompt: 'Who would use each thing? Sort by its owner.',
      bins: [
        { id: 'king', label: 'Kings & queens', emoji: '👑' },
        { id: 'knight', label: 'Knights', emoji: '⚔️' },
        { id: 'villager', label: 'Villagers', emoji: '🌾' },
        { id: 'viking', label: 'Vikings', emoji: '⛵' },
      ],
      items: [
        { label: 'Golden crown', emoji: '👑', bin: 'king', why: 'Only the monarch wore the crown on crowning day.' },
        { label: 'Royal seal', emoji: '🖋️', bin: 'king', why: 'The king’s stamp made his word law.' },
        { label: 'Suit of armour', emoji: '🛡️', bin: 'knight', why: 'Metal plates turned arrows aside in battle.' },
        { label: 'Lance and warhorse', emoji: '🐎', bin: 'knight', why: 'Charging with a lance was the knight’s big move.' },
        { label: 'Pitchfork', emoji: '🔱', bin: 'villager', why: 'Villagers farmed strips of land for the lord.' },
        { label: 'Bread oven', emoji: '🔥', bin: 'villager', why: 'Village ovens baked the week’s loaves together.' },
        { label: 'Longship oars', emoji: '⛵', bin: 'viking', why: 'Oars and sails carried raiders up rivers fast.' },
        { label: 'Carved dragon prow', emoji: '🐉', bin: 'viking', why: 'Dragon heads guarded Viking ships at sea.' },
      ],
    },
    mid: {
      explorePrompt: 'Place each person on the pyramid of power.',
      bins: [
        { id: 'top', label: 'Rules the land', emoji: '👑' },
        { id: 'noble', label: 'Lords, ladies & knights', emoji: '🏰' },
        { id: 'church', label: 'The Church', emoji: '⛪' },
        { id: 'common', label: 'Workers of the soil', emoji: '🌾' },
      ],
      items: [
        { label: 'The monarch', emoji: '👑', bin: 'top', why: 'Held all land — and granted chunks of it downward.' },
        { label: 'Barons and lords', emoji: '🏰', bin: 'noble', why: 'Ran estates and owed the king soldiers in return.' },
        { label: 'Knights', emoji: '⚔️', bin: 'noble', why: 'Fought for their lord — land was their payment.' },
        { label: 'Bishops', emoji: '⛪', bin: 'church', why: 'Held vast lands too — and crowned the king.' },
        { label: 'Monks and nuns', emoji: '📜', bin: 'church', why: 'Copied books, healed the sick, prayed for all.' },
        { label: 'Free farmers', emoji: '🌾', bin: 'common', why: 'Worked their own strips and paid rent to the lord.' },
        { label: 'Serfs', emoji: '🔨', bin: 'common', why: 'Tied to the land — they could not leave it.' },
        { label: 'Miller', emoji: '🌀', bin: 'common', why: 'Ground everyone’s grain — and took a cut.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each change by the part of medieval life it transformed.',
      bins: [
        { id: 'law', label: 'Law & limits on power', emoji: '⚖️' },
        { id: 'trade', label: 'Towns & trade', emoji: '🛒' },
        { id: 'ideas', label: 'New ideas', emoji: '🖨️' },
        { id: 'daily', label: 'Everyday life', emoji: '🕯️' },
      ],
      items: [
        { label: 'Magna Carta, 1215', emoji: '📜', bin: 'law', why: 'Even the king had to obey the law — a first.' },
        { label: 'First parliaments', emoji: '🏛️', bin: 'law', why: 'Barons and towns won a say in raising taxes.' },
        { label: 'Charter fairs', emoji: '🎪', bin: 'trade', why: 'Market charters made towns rich on trade days.' },
        { label: 'Merchant guilds', emoji: '🤝', bin: 'trade', why: 'Guilds set prices, trained workers, ran the towns.' },
        { label: 'Printing press', emoji: '🖨️', bin: 'ideas', why: 'Books stopped being copied by hand — ideas exploded.' },
        { label: 'Universities rise', emoji: '🎓', bin: 'ideas', why: 'Bologna, Oxford, Paris — learning moved into schools.' },
        { label: 'Trial by ordeal', emoji: '🔥', bin: 'daily', why: 'Medieval justice asked God for the verdict — risky logic!' },
        { label: 'Women’s guild work', emoji: '🧵', bin: 'daily', why: 'Women wove, brewed and ran workshops — records prove it.' },
      ],
    },
  },

  /* Maps & Spatial Skills — thin topics: concept-level sets */
  'Geography|Maps & Spatial Skills|sorter': {
    early: {
      explorePrompt: 'Our school on a plan! Sort each thing to where you find it.',
      bins: [
        { id: 'learn', label: 'Learning places', emoji: '📚' },
        { id: 'play', label: 'Playing places', emoji: '🛝' },
        { id: 'come', label: 'Ways in and out', emoji: '🚪' },
        { id: 'green', label: 'Green corners', emoji: '🌳' },
      ],
      items: [
        { label: 'Book corner', emoji: '📚', bin: 'learn', why: 'Quiet reading spots live in the classroom.' },
        { label: 'Sand table', emoji: '🪣', bin: 'learn', why: 'Making maps in sand is learning too!' },
        { label: 'Slide', emoji: '🛝', bin: 'play', why: 'Playground gear goes on the play plan.' },
        { label: 'Hopscotch', emoji: '🤾', bin: 'play', why: 'Games painted on the ground belong outside.' },
        { label: 'School gate', emoji: '🚪', bin: 'come', why: 'The gate is how everyone comes and goes.' },
        { label: 'Path to the door', emoji: '🛤️', bin: 'come', why: 'Paths show the way on a plan.' },
        { label: 'Old tree', emoji: '🌳', bin: 'green', why: 'Trees are landmarks — “meet at the big tree!”' },
        { label: 'Flower bed', emoji: '🌷', bin: 'green', why: 'Gardens change with the seasons on the plan.' },
      ],
    },
    mid: {
      explorePrompt: 'Every map part has a job. Sort each by what it does.',
      bins: [
        { id: 'symbols', label: 'Symbols & keys', emoji: '🔑' },
        { id: 'direction', label: 'Direction helpers', emoji: '🧭' },
        { id: 'scale', label: 'Size & distance', emoji: '📏' },
        { id: 'names', label: 'Names & borders', emoji: '🏷️' },
      ],
      items: [
        { label: 'Map key', emoji: '🔑', bin: 'symbols', why: 'The key unlocks what every symbol means.' },
        { label: 'Church square symbol', emoji: '⛪', bin: 'symbols', why: 'One tiny drawing stands for a real building.' },
        { label: 'Compass rose', emoji: '🧭', bin: 'direction', why: 'Shows north, south, east and west at a glance.' },
        { label: 'North arrow', emoji: '⬆️', bin: 'direction', why: 'Orients the map so you can match it to the world.' },
        { label: 'Scale bar', emoji: '📏', bin: 'scale', why: 'One centimetre of map equals real kilometres.' },
        { label: 'Zoomed-out atlas page', emoji: '🗺️', bin: 'scale', why: 'Small scale = big area, less detail. Opposite zoomed in.' },
        { label: 'Country labels', emoji: '🏷️', bin: 'names', why: 'Names tell you whose land you are reading.' },
        { label: 'Border line', emoji: '📐', bin: 'names', why: 'Lines mark where one country ends and another starts.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each tool by the kind of answer it gives you.',
      bins: [
        { id: 'point', label: 'An exact point', emoji: '📍' },
        { id: 'region', label: 'A bigger region', emoji: '🌐' },
        { id: 'route', label: 'A path to follow', emoji: '🧭' },
        { id: 'height', label: 'Height & shape of land', emoji: '⛰️' },
      ],
      items: [
        { label: 'Four-figure reference', emoji: '4️⃣', bin: 'point', why: 'Eastings then northings — a square on the grid.' },
        { label: 'Six-figure reference', emoji: '6️⃣', bin: 'point', why: 'Tenths inside the square — precision to 100 metres.' },
        { label: 'Lines of latitude', emoji: '🌐', bin: 'region', why: 'Parallel rings — the equator is the famous one.' },
        { label: 'Lines of longitude', emoji: '🧵', bin: 'region', why: 'Pole-to-pole threads setting every time zone.' },
        { label: 'Compass bearing', emoji: '🧭', bin: 'route', why: '“Walk 040°” — a direction measured from north.' },
        { label: 'Marked trail', emoji: '🥾', bin: 'route', why: 'Waymarked paths show the safe line through land.' },
        { label: 'Contour lines', emoji: '〰️', bin: 'height', why: 'Tight rings = steep hill; wide rings = gentle slope.' },
        { label: 'Shaded relief', emoji: '⛰️', bin: 'height', why: 'Hills pop out of the page with light and shadow.' },
      ],
    },
  },

  /* Places & Environments — early: features around us; mid: how land is used; upper: managing environments */
  'Geography|Places & Environments|sorter': {
    early: {
      explorePrompt: 'Sort each thing in our place by what made it.',
      bins: [
        { id: 'nature', label: 'Nature made it', emoji: '🌿' },
        { id: 'built', label: 'People built it', emoji: '🏗️' },
        { id: 'farm', label: 'From the farm', emoji: '🐄' },
        { id: 'special', label: 'Special to us', emoji: '💛' },
      ],
      items: [
        { label: 'Winding river', emoji: '🏞️', bin: 'nature', why: 'Water carves its own path — no hands needed.' },
        { label: 'Rocky hill', emoji: '⛰️', bin: 'nature', why: 'Hills were shaped by ice, water and time.' },
        { label: 'Stone bridge', emoji: '🌉', bin: 'built', why: 'People raised it to cross the river dry-shod.' },
        { label: 'Zebra crossing', emoji: '🚸', bin: 'built', why: 'Painted lines keep walkers safe on roads.' },
        { label: 'Sheep paddock', emoji: '🐑', bin: 'farm', why: 'Fenced fields keep animals where farmers care for them.' },
        { label: 'Barn', emoji: '🏚️', bin: 'farm', why: 'Barns store hay, machines and animals.' },
        { label: 'War memorial', emoji: '🕊️', bin: 'special', why: 'A place to remember people together.' },
        { label: 'Story tree', emoji: '🌳', bin: 'special', why: 'Some places matter because of what happens there.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each place by how the land is being used.',
      bins: [
        { id: 'country', label: 'First Nations Country', emoji: '🪃' },
        { id: 'farms', label: 'Food & fibre', emoji: '🌾' },
        { id: 'cities', label: 'Cities & towns', emoji: '🏙️' },
        { id: 'wild', label: 'Wild places', emoji: '🏞️' },
      ],
      items: [
        { label: 'Rock art sites', emoji: '🖼️', bin: 'country', why: 'Country holds stories painted and carved for millennia.' },
        { label: 'Cultural burning', emoji: '🔥', bin: 'country', why: 'Careful cool burns manage land the old, wise way.' },
        { label: 'Wheat belt', emoji: '🌾', bin: 'farms', why: 'Vast grain fields feed people far away.' },
        { label: 'Wool stations', emoji: '🐑', bin: 'farms', why: 'Fibre from sheep travels the world as clothing.' },
        { label: 'Harbour city', emoji: '🏙️', bin: 'cities', why: 'Cities grow where ships, jobs and rivers meet.' },
        { label: 'Suburban streets', emoji: '🏘️', bin: 'cities', why: 'Most Australians live in coastal suburbs like these.' },
        { label: 'National park', emoji: '🦘', bin: 'wild', why: 'Parks protect habitats from clearing and building.' },
        { label: 'Desert heart', emoji: '🏜️', bin: 'wild', why: 'The outback’s dry centre stays mostly untamed.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each management challenge into its group.',
      bins: [
        { id: 'hazard', label: 'Natural hazards', emoji: '🔥' },
        { id: 'care', label: 'Caring for Country', emoji: '🤲' },
        { id: 'food', label: 'Feeding people', emoji: '🚜' },
        { id: 'growth', label: 'Growing cities', emoji: '🏗️' },
      ],
      items: [
        { label: 'Bushfire plans', emoji: '🔥', bin: 'hazard', why: 'Warnings, refuge zones and burn-offs save whole towns.' },
        { label: 'Flood levees', emoji: '🌊', bin: 'hazard', why: 'Walls and wetlands both push back the flood risk.' },
        { label: 'Cultural burning', emoji: '🪃', bin: 'care', why: 'First Nations fire knowledge reduces fuel and renews Country.' },
        { label: 'Protected areas', emoji: '🛡️', bin: 'care', why: 'Reserves keep habitats and species for the future.' },
        { label: 'Irrigation channels', emoji: '💧', bin: 'food', why: 'Water moved to crops — and fought over downstream.' },
        { label: 'Freight rail', emoji: '🚂', bin: 'food', why: 'Moving harvests from paddock to port feeds cities.' },
        { label: 'New suburbs', emoji: '🏘️', bin: 'growth', why: 'Housing spreads onto farmland — a real trade-off.' },
        { label: 'Transit links', emoji: '🚉', bin: 'growth', why: 'Trains and roads decide how a city can grow.' },
      ],
    },
  },

  'History|Family & Community History|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Tap each moment of a family story, then order it.',
      cards: [
        { label: 'A baby is born', emoji: '👶', why: 'Every family story starts with someone new.', clue: 'Stories start at the beginning.' },
        { label: 'First steps and words', emoji: '🐾', why: 'Toddlers learn to walk and talk — ask your family about yours!', clue: 'Babies grow first.' },
        { label: 'First day of school', emoji: '🎒', why: 'School marks a big change every family remembers.', clue: 'Then comes growing up.' },
        { label: 'Birthdays together', emoji: '🎂', why: 'Families retell the story every year — that is history too.', clue: 'Celebrations keep happening.' },
      ],
      celebrate: 'You ordered a family story — that is what historians do!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order how a community changes over time.',
      cards: [
        { label: 'First families settle', emoji: '🏡', why: 'Homes and a name come first on any map.', clue: 'Settlement comes first.' },
        { label: 'School and hall built', emoji: '🏫', why: 'Shared buildings turn houses into a community.', clue: 'Communities build together.' },
        { label: 'Railway or highway arrives', emoji: '🚂', why: 'New links bring people, goods — and change.', clue: 'Connections follow.' },
        { label: 'Electricity and phones', emoji: '💡', why: 'Technology rewires daily life within a generation.', clue: 'Technology changes everything.' },
        { label: 'Commemoration day begins', emoji: '🎉', why: 'Communities mark their story with festivals and memorials.', clue: 'Remembering comes last.' },
      ],
      celebrate: 'You traced a town’s journey from settlement to celebration!',
    },
  },

  'History|Historical Thinking|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Order the steps of finding out about the past.',
      cards: [
        { label: 'Find something old', emoji: '🔍', why: 'A photo, a coin, a shoe — clues hide in attics.', clue: 'You start by finding.' },
        { label: 'Ask: who used this?', emoji: '🙋', why: 'Good history starts with a good question.', clue: 'Then you wonder.' },
        { label: 'Compare with pictures', emoji: '🖼️', why: 'Matching your clue against others checks your guess.', clue: 'Then you compare.' },
        { label: 'Tell the story', emoji: '🗣️', why: 'History becomes history when it is shared.', clue: 'Sharing comes last.' },
      ],
      celebrate: 'You did a historian’s job — question, compare, tell!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order how to check what a source is really saying.',
      cards: [
        { label: 'Look closely at the source', emoji: '👀', why: 'What is it — letter, photo, poster? Made of what?', clue: 'Look before you judge.' },
        { label: 'Ask who made it, and why', emoji: '❓', why: 'Every source has an author with a point of view.', clue: 'Next: the maker.' },
        { label: 'Compare with other sources', emoji: '🔗', why: 'Two independent sources agreeing is stronger evidence.', clue: 'Then cross-check.' },
        { label: 'Decide what it shows', emoji: '⚖️', why: 'Weigh it: reliable? complete? what is missing?', clue: 'Judging comes last.' },
      ],
      celebrate: 'You interrogated a source like a detective!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Build the historian’s full method, start to finish.',
      cards: [
        { label: 'Pose a historical question', emoji: '❓', why: 'Narrow and answerable beats broad and vague.', clue: 'Inquiry starts with a question.' },
        { label: 'Gather sources, note the dates', emoji: '🗂️', why: 'Primary and secondary sources, dated and logged.', clue: 'Then collect evidence.' },
        { label: 'Corroborate sources', emoji: '🔗', why: 'Agreement and disagreement between sources is data.', clue: 'Evidence must be tested.' },
        { label: 'Understand the context', emoji: '⏳', why: 'People in the past did not know what comes next.', clue: 'Step into their time.' },
        { label: 'Write the account, cite evidence', emoji: '✍️', why: 'Claims backed by cited sources are history; the rest is story.', clue: 'End with the account.' },
      ],
      celebrate: 'Question to citation — you built a real historical account!',
    },
  },

  /* =================== PSD sorters (slotted from batch 3 review) =================== */

  /* Emotional Literacy — early: naming feelings; mid: what feelings do;
     upper: mixed feelings, patterns, decisions */
  'Personal & Social Development|Emotional Literacy|sorter': {
    early: {
      explorePrompt: 'Sort each feeling into its family.',
      bins: [
        { id: 'happy', label: 'Happy family', emoji: '😄' },
        { id: 'sad', label: 'Sad family', emoji: '😢' },
        { id: 'angry', label: 'Angry family', emoji: '😠' },
        { id: 'scared', label: 'Scared family', emoji: '😨' },
      ],
      items: [
        { label: 'Proud', emoji: '🏆', bin: 'happy', why: 'Proud is the happy you feel when you did it yourself.' },
        { label: 'Excited', emoji: '🤩', bin: 'happy', why: 'Excited is happiness with springs in its feet.' },
        { label: 'Sad', emoji: '😢', bin: 'sad', why: 'Sad visits everyone — it never stays forever.' },
        { label: 'Disappointed', emoji: '😞', bin: 'sad', why: 'Hoping for one thing and getting another.' },
        { label: 'Angry', emoji: '😠', bin: 'angry', why: 'Anger says: something feels unfair.' },
        { label: 'Frustrated', emoji: '😤', bin: 'angry', why: 'Trying hard and it keeps not working.' },
        { label: 'Nervous', emoji: '😰', bin: 'scared', why: 'Butterflies before something new.' },
        { label: 'Frightened', emoji: '😨', bin: 'scared', why: 'Fear keeps you careful around real danger.' },
      ],
    },
    mid: {
      explorePrompt: 'Feelings do jobs. Sort each by what it does to you.',
      bins: [
        { id: 'energy', label: 'Fills you with energy', emoji: '⚡' },
        { id: 'drain', label: 'Drains your energy', emoji: '🪫' },
        { id: 'signal', label: 'A useful signal', emoji: '🚦' },
        { id: 'hidden', label: 'Often hidden away', emoji: '🎭' },
      ],
      items: [
        { label: 'Excitement', emoji: '🤩', bin: 'energy', why: 'Excitement buzzes — fuel for big days.' },
        { label: 'Anger', emoji: '😠', bin: 'energy', why: 'Anger surges — it wants action NOW.' },
        { label: 'Sadness', emoji: '😢', bin: 'drain', why: 'Sadness slows you down — rest is part of its job.' },
        { label: 'Loneliness', emoji: '🕊️', bin: 'drain', why: 'Loneliness weighs — it asks you to reach out.' },
        { label: 'Fear', emoji: '😨', bin: 'signal', why: 'Fear flags danger so you can check it out.' },
        { label: 'Worry', emoji: '😰', bin: 'signal', why: 'Worry points at something that matters to you.' },
        { label: 'Embarrassment', emoji: '🙈', bin: 'hidden', why: 'Blushing and hiding — often kept secret.' },
        { label: 'Jealousy', emoji: '😒', bin: 'hidden', why: 'Hard to admit — nearly everyone feels it sometimes.' },
      ],
    },
    upper: {
      explorePrompt: 'Real feelings get complicated. Sort each situation.',
      bins: [
        { id: 'mixed', label: 'Two feelings at once', emoji: '🎭' },
        { id: 'pattern', label: 'A pattern over time', emoji: '📈' },
        { id: 'choice', label: 'Feelings in a decision', emoji: '🧭' },
        { id: 'masked', label: 'One feeling covering another', emoji: '🎨' },
      ],
      items: [
        { label: 'Proud but sorry', emoji: '🏆', bin: 'mixed', why: 'Winning against a friend feels proud AND sorry — both true.' },
        { label: 'Excited-nervous first day', emoji: '🦋', bin: 'mixed', why: 'New starts mix thrills and jitters in one chest.' },
        { label: 'Grumpy every Sunday night', emoji: '📉', bin: 'pattern', why: 'The same feeling at the same time weekly — a pattern to spot.' },
        { label: 'Test-day jitters each term', emoji: '🗓️', bin: 'pattern', why: 'Predictable nerves can be planned for — that is the power.' },
        { label: 'Anger before choosing a team', emoji: '🧭', bin: 'choice', why: 'Naming the feeling first keeps the choice fair.' },
        { label: 'Fear weighing an option', emoji: '⚖️', bin: 'choice', why: 'Fear is data: what exactly is the risk you fear?' },
        { label: 'Laughing when actually sad', emoji: '😅', bin: 'masked', why: 'A joke can be a lid on a heavier feeling.' },
        { label: 'Saying “fine” when hurting', emoji: '🙂', bin: 'masked', why: '“Fine” sometimes hides “not fine” — with trusted people, say the truth.' },
      ],
    },
  },

  /* Friendship & Cooperation — early: kind/kindness; mid: friendship skills;
     upper: feedback, mediation, consent */
  'Personal & Social Development|Friendship & Cooperation|sorter': {
    early: {
      explorePrompt: 'Sort each action: does it help friendship or hurt it?',
      bins: [
        { id: 'kind', label: 'Kind actions', emoji: '💛' },
        { id: 'unfair', label: 'Unfair actions', emoji: '🚫' },
        { id: 'team', label: 'Working together', emoji: '🤝' },
        { id: 'mending', label: 'Making up', emoji: '🩹' },
      ],
      items: [
        { label: 'Sharing your toys', emoji: '🧸', bin: 'kind', why: 'Sharing says: you matter too.' },
        { label: 'A true compliment', emoji: '💬', bin: 'kind', why: 'Noticing good things in others builds friends.' },
        { label: 'Grabbing without asking', emoji: '✋', bin: 'unfair', why: 'Taking hurts — ask first, always.' },
        { label: 'Leaving someone out', emoji: '🚪', bin: 'unfair', why: 'Excluding is a small unkindness that feels big.' },
        { label: 'Building one tower together', emoji: '🏗️', bin: 'team', why: 'One plan, many hands — that is cooperation.' },
        { label: 'Taking turns in a game', emoji: '🔄', bin: 'team', why: 'Turns make games fair and fun for longer.' },
        { label: 'Saying sorry', emoji: '🩹', bin: 'mending', why: 'Sorry is glue for friendship cracks.' },
        { label: 'Inviting them again', emoji: '💌', bin: 'mending', why: 'A second invitation says: we are still friends.' },
      ],
    },
    mid: {
      explorePrompt: 'Sort each move by the friendship skill it builds.',
      bins: [
        { id: 'trust', label: 'Building trust', emoji: '🔐' },
        { id: 'cooperate', label: 'Cooperating', emoji: '🤝' },
        { id: 'conflict', label: 'Handling conflict', emoji: '🕊️' },
        { id: 'boundary', label: 'Respecting boundaries', emoji: '🚏' },
      ],
      items: [
        { label: 'Keeping small promises', emoji: '🤞', bin: 'trust', why: 'Tiny kept promises add up to big trust.' },
        { label: 'Telling the truth when it is hard', emoji: '💯', bin: 'trust', why: 'Friends can take honest words.' },
        { label: 'Taking a role in the group', emoji: '🧩', bin: 'cooperate', why: 'Every role matters — doing yours helps everyone.' },
        { label: 'Building on others’ ideas', emoji: '➕', bin: 'cooperate', why: '“Yes, and…” grows ideas instead of blocking them.' },
        { label: 'Cooling off before arguing', emoji: '🧊', bin: 'conflict', why: 'A pause turns a fight into a conversation.' },
        { label: 'Apologising and fixing it', emoji: '🩹', bin: 'conflict', why: 'Real sorry includes making it right.' },
        { label: 'Asking before borrowing', emoji: '🙋', bin: 'boundary', why: 'Permission respects what belongs to others.' },
        { label: 'Accepting a “no”', emoji: '🛑', bin: 'boundary', why: 'A no answered kindly keeps trust whole.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each tricky friendship situation into its skill.',
      bins: [
        { id: 'feedback', label: 'Giving & taking feedback', emoji: '🪞' },
        { id: 'mediation', label: 'Helping others resolve it', emoji: '🕊️' },
        { id: 'consent', label: 'Consent & clear limits', emoji: '🛑' },
        { id: 'change', label: 'Friendships changing', emoji: '🌱' },
      ],
      items: [
        { label: 'Kind, specific, helpful', emoji: '🪞', bin: 'feedback', why: 'Good feedback names the work, not the person.' },
        { label: 'Hearing critique without folding', emoji: '💪', bin: 'feedback', why: 'Take the useful part, leave the sting.' },
        { label: 'Both sides, then a break idea', emoji: '🤲', bin: 'mediation', why: 'Hear each side alone, then find the shared fix.' },
        { label: 'Not picking sides in a spat', emoji: '⚖️', bin: 'mediation', why: 'A fair helper stays neutral — the goal is peace, not victory.' },
        { label: 'Asking before sharing photos', emoji: '📸', bin: 'consent', why: 'Their face, their choice — always ask first.' },
        { label: 'Hearing “stop” the first time', emoji: '🛑', bin: 'consent', why: 'Stop means stop — the first time, every time.' },
        { label: 'A friend moves away', emoji: '✉️', bin: 'change', why: 'Distance changes a friendship — letters keep it warm.' },
        { label: 'Growing into new interests', emoji: '🌱', bin: 'change', why: 'Friends can change and still choose each other.' },
      ],
    },
  },

  /* Life Skills|Food & Cooking — hygiene/snacks → grips/recipes → planning a dish */
  'Life Skills|Food & Cooking|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Order the safe-and-clean way to make a snack.',
      cards: [
        { label: 'Wash hands and fruit', emoji: '🧼', why: 'Clean hands and rinsed fruit keep germs off your food.', clue: 'Clean start.' },
        { label: 'Gather bowl and tools', emoji: '🥣', why: 'Everything ready before you begin — cooks call it mise en place.', clue: 'Get set.' },
        { label: 'Peel and chop with help', emoji: '🔪', why: 'Sharp work is grown-up-help work.', clue: 'Then prepare.' },
        { label: 'Share and enjoy', emoji: '🍓', why: 'Food made together tastes better — and leftovers get covered.', clue: 'Enjoy last.' },
      ],
      celebrate: 'Safe, clean, shared — snack making done right!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order the recipe routine like a real cook.',
      cards: [
        { label: 'Read the recipe twice', emoji: '📖', why: 'The whole recipe first — no surprises mid-mix.', clue: 'Read before you touch.' },
        { label: 'Check the ingredients list', emoji: '🧾', why: 'Measure everything out before starting.', clue: 'Then gather.' },
        { label: 'Cut with bridge and claw', emoji: '✋', why: 'Bridge hold for rounds, claw grip for strips — fingers safe.', clue: 'Cut safely next.' },
        { label: 'Follow the steps in order', emoji: '🔢', why: 'Recipes are algorithms — order changes the outcome.', clue: 'Then follow exactly.' },
        { label: 'Serve and clean as you go', emoji: '🧽', why: 'Clean-as-you-go keeps the kitchen safe to the end.', clue: 'Tidy through the work.' },
      ],
      celebrate: 'Recipe read, grips safe, kitchen clean — chef move!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order planning a dish from idea to plate.',
      cards: [
        { label: 'Choose the dish, check diets', emoji: '📝', why: 'Ask who is eating: allergies, preferences, budget.', clue: 'People first.' },
        { label: 'List and shop for ingredients', emoji: '🛒', why: 'A list stops impulse buys and forgotten items.', clue: 'Then shop to the list.' },
        { label: 'Prep and time the stages', emoji: '⏲️', why: 'Work backwards from serving time — oven on, chill ahead.', clue: 'Timing is planning.' },
        { label: 'Cook, taste, adjust', emoji: '🥄', why: 'Season a little at a time — you can add, never un-add.', clue: 'Adjust while cooking.' },
        { label: 'Plate, serve, review', emoji: '🍽️', why: 'Look, serve, then ask: what would I change next time?', clue: 'Review improves the next cook.' },
      ],
      celebrate: 'You ran a dish end to end — plan, cook, review!',
    },
  },

  /* Computing|Digital Systems — early: parts & jobs; upper: inside + networks */
  'Computing|Digital Systems|sorter': {
    early: {
      explorePrompt: 'Sort each computer thing by what it does.',
      bins: [
        { id: 'input', label: 'You tell it things', emoji: '👆' },
        { id: 'output', label: 'It tells you things', emoji: '🖥️' },
        { id: 'brain', label: 'The thinking parts', emoji: '🧠' },
        { id: 'everyday', label: 'Computers everywhere', emoji: '🏠' },
      ],
      items: [
        { label: 'Keyboard', emoji: '⌨️', bin: 'input', why: 'Your fingers send letters in.' },
        { label: 'Microphone', emoji: '🎙️', bin: 'input', why: 'Your voice goes in as sound data.' },
        { label: 'Screen', emoji: '🖥️', bin: 'output', why: 'Pictures and words come out to your eyes.' },
        { label: 'Speaker', emoji: '🔊', bin: 'output', why: 'Sound comes out to your ears.' },
        { label: 'CPU chip', emoji: '🧠', bin: 'brain', why: 'The chip that does the actual thinking.' },
        { label: 'Memory', emoji: '🗂️', bin: 'brain', why: 'Holds what the computer is working on right now.' },
        { label: 'Washing machine', emoji: '🧺', bin: 'everyday', why: 'A small computer runs the wash cycle.' },
        { label: 'Game controller', emoji: '🎮', bin: 'everyday', why: 'Buttons and sticks — a computer you hold.' },
      ],
    },
    upper: {
      explorePrompt: 'Sort each part by where it sits in the network story.',
      bins: [
        { id: 'device', label: 'Devices you use', emoji: '💻' },
        { id: 'inside', label: 'Inside the machine', emoji: '🔌' },
        { id: 'network', label: 'Network plumbing', emoji: '🌐' },
        { id: 'data', label: 'Data on the move', emoji: '📦' },
      ],
      items: [
        { label: 'Laptop', emoji: '💻', bin: 'device', why: 'Input, output and computer in one folding shell.' },
        { label: 'Phone', emoji: '📱', bin: 'device', why: 'A pocket computer with radios built in.' },
        { label: 'Storage drive', emoji: '💽', bin: 'inside', why: 'Keeps files when the power is off.' },
        { label: 'Logic board', emoji: '🔌', bin: 'inside', why: 'Chips and traces — where instructions actually run.' },
        { label: 'Wi‑Fi router', emoji: '📡', bin: 'network', why: 'The doorway between your home and the internet.' },
        { label: 'Undersea cable', emoji: '🌊', bin: 'network', why: 'Fibre lines carry most internet traffic between continents.' },
        { label: 'Packets', emoji: '📦', bin: 'data', why: 'Data travels in little labelled packets, reassembled on arrival.' },
        { label: 'IP address', emoji: '📮', bin: 'data', why: 'Every device gets an address so replies find their way back.' },
      ],
    },
  },

  /* =================== Batch 3 — Decision quests =================== */

  /* Artificial Intelligence — early: AI around us; mid: how it learns, fakes; upper: fairness & rules */
  'Computing|Artificial Intelligence|decision': {
    early: {
      meters: [
        { id: 'smart', label: 'Smart choices', emoji: '🧠', start: 50 },
        { id: 'safe', label: 'Safe & kind', emoji: '🛡️', start: 55 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'At home, the voice assistant can answer anything you ask. 🗣️',
          choices: [
            { label: 'Ask it, then try to find out yourself too', meters: [['smart', 20], ['mood', 10]], reflect: 'Balanced! AI answers fast — but your own thinking grows when you try too.', profile: 'Balanced' },
            { label: 'Ask it for every single answer', meters: [['smart', -10], ['mood', 5]], reflect: 'The assistant gets stronger while your question muscles rest. Use it AND your brain.' },
            { label: 'Say silly words to confuse it', meters: [['safe', -10], ['mood', -5]], reflect: 'Silly fun once — but confusing it wastes what it can teach you.' },
          ],
        },
        {
          text: 'The video app keeps showing videos like the ones you watched. 📺',
          choices: [
            { label: 'Pick one, then search something brand new', meters: [['smart', 20]], reflect: 'You just escaped the bubble! Trying new things keeps your ideas wide.', profile: 'Inquirer' },
            { label: 'Watch only what it suggests', meters: [['smart', -10]], reflect: 'Same videos in, same ideas out — the bubble gets thicker.' },
            { label: 'Tap everything as fast as possible', meters: [['mood', -10]], reflect: 'Fast taps teach the app you like chaos — your feed gets messy too.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'smart', label: 'Smart choices', emoji: '🧠', start: 50 },
        { id: 'safe', label: 'Safe & kind', emoji: '🛡️', start: 55 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your AI drawing app keeps drawing six-legged cats. 🐈',
          choices: [
            { label: 'Show it better examples and retest', meters: [['smart', 25]], reflect: 'That is machine learning: examples in, better patterns out. You are the teacher!', profile: 'Thinker' },
            { label: 'Decide AI is useless and delete it', meters: [['smart', -10]], reflect: 'AI mistakes are clues about its training data, not proof it is useless.' },
            { label: 'Trust it — maybe cats have six legs now', meters: [['smart', -15], ['safe', -5]], reflect: 'Machines can be confidently wrong. Checking is always your job.' },
          ],
        },
        {
          text: 'A clip shows your favourite singer saying wild words. It might be AI-made. 🎤',
          choices: [
            { label: 'Check the source and look for AI clues', meters: [['smart', 25], ['safe', 10]], reflect: 'Deepfake detective! Odd mouth sync and weird hands are classic clues.', profile: 'Inquirer' },
            { label: 'Share it — too good to check', meters: [['safe', -20]], reflect: 'Sharing fakes spreads harm. Ten seconds of checking protects everyone.' },
            { label: 'Decide ALL videos are fake now', meters: [['smart', -10]], reflect: 'Over-doubting is its own trap. Check, then decide.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'smart', label: 'Smart choices', emoji: '🧠', start: 50 },
        { id: 'fair', label: 'Fairness', emoji: '⚖️', start: 55 },
        { id: 'mood', label: 'Trust', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'A club’s AI picks new members — but it learned from years of unfair picks. ⚖️',
          choices: [
            { label: 'Audit the old data, fix it, keep humans in the loop', meters: [['fair', 30], ['smart', 15]], reflect: 'Bias in, bias out — unless someone checks. You just designed fairer AI.', profile: 'Principled' },
            { label: 'Use it anyway — it is faster', meters: [['fair', -25]], reflect: 'Fast and unfair is just unfair, scaled up.' },
            { label: 'Ban AI from every decision forever', meters: [['fair', 5], ['smart', -10]], reflect: 'Throwing the tool away skips the real work: fixing the data.' },
          ],
        },
        {
          text: 'Your school is writing rules for using AI in homework. 📜',
          choices: [
            { label: 'Transparent rules: say when AI helped, check the work', meters: [['fair', 20], ['smart', 20]], reflect: 'Honest use + checking keeps learning real. That is a rule worth having.', profile: 'Principled' },
            { label: 'No rules — teachers cannot tell anyway', meters: [['fair', -15], ['smart', -10]], reflect: 'No rules means no trust — and the learning leaks away.' },
            { label: 'Ban AI completely for everyone', meters: [['fair', 5], ['smart', -5]], reflect: 'A blanket ban ignores the places AI genuinely helps — like practice feedback.' },
          ],
        },
      ],
    },
  },

  /* Privacy & Security — early: my data & logins; mid: passwords & tricks; upper: footprint & collection */
  'Computing|Privacy & Security|decision': {
    early: {
      meters: [
        { id: 'safe', label: 'Staying safe', emoji: '🛡️', start: 55 },
        { id: 'smart', label: 'Smart moves', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'A game pops up: “Type your name and address to win a prize!” 🎁',
          choices: [
            { label: 'Stop, don’t type, check with a grown-up', meters: [['safe', 30]], reflect: 'Real prizes never need your address in a pop-up. Stopping first wins.', profile: 'Principled' },
            { label: 'Type it in — free prize!', meters: [['safe', -25]], reflect: 'That is how data gets stolen. The “prize” was the bait.' },
            { label: 'Type a silly name and hope', meters: [['safe', 5]], reflect: 'Better than your real name — but the pop-up itself is the trap.' },
          ],
        },
        {
          text: 'You find a tablet still logged into someone else’s account. 🔓',
          choices: [
            { label: 'Log out and hand it back', meters: [['safe', 25], ['mood', 10]], reflect: 'Accounts are private diaries. Logging out protects the owner.', profile: 'Caring' },
            { label: 'Have a quick look around', meters: [['safe', -20]], reflect: 'Peeking at someone’s account is reading their diary.' },
            { label: 'Ignore it completely', meters: [['smart', -5]], reflect: 'Leaving it open still risks their data — logging out costs nothing.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'safe', label: 'Staying safe', emoji: '🛡️', start: 55 },
        { id: 'smart', label: 'Smart moves', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your best friend uses the password “dragon1” for everything. 🐉',
          choices: [
            { label: 'Long, unique passphrases per account', meters: [['safe', 30], ['smart', 15]], reflect: '“Purple-Panda-Reads-Books” beats “dragon1” everywhere — one leak ruins all.', profile: 'Thinker' },
            { label: 'Same password everywhere, easy to remember', meters: [['safe', -20]], reflect: 'One stolen password then opens every door.' },
            { label: 'Birthday — impossible to forget', meters: [['safe', -15]], reflect: 'Birthdays are the first thing guessers try.' },
          ],
        },
        {
          text: 'A pop-up flashes: “YOU WON! Enter your password to claim.” 🏆',
          choices: [
            { label: 'Close it — real sites never ask for passwords', meters: [['safe', 30]], reflect: 'That is phishing 101: urgency + password request = scam.', profile: 'Knowledgeable' },
            { label: 'Enter it — I want the prize', meters: [['safe', -30]], reflect: 'You just handed over the keys.' },
            { label: 'Send it to friends to claim too', meters: [['safe', -25]], reflect: 'Now the scam spreads through your trusted name.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'safe', label: 'Staying safe', emoji: '🛡️', start: 55 },
        { id: 'smart', label: 'Smart moves', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Trust', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'A fun quiz app asks for your contacts, camera AND messages. 📲',
          choices: [
            { label: 'Allow only what it needs to work', meters: [['safe', 30], ['smart', 15]], reflect: 'A quiz does not need your messages. Least access = least risk.', profile: 'Thinker' },
            { label: 'Accept everything instantly', meters: [['safe', -25]], reflect: 'Each permission is a door you left open.' },
            { label: 'Refuse all and complain it is broken', meters: [['smart', -5]], reflect: 'Some access is fair — the skill is telling need from greed.' },
          ],
        },
        {
          text: 'You are about to post a photo that could embarrass you at 25. 📷',
          choices: [
            { label: 'The grandma test: post only what you’d show her', meters: [['safe', 25], ['mood', 5]], reflect: 'Your digital footprint outlives the moment. Post for future-you.', profile: 'Reflective' },
            { label: 'Post now, delete later', meters: [['safe', -15]], reflect: 'Screenshots make “delete” imaginary.' },
            { label: 'Post it anonymously and be mean', meters: [['safe', -30]], reflect: 'Anonymous meanness is still your footprint — forensics exists.' },
          ],
        },
      ],
    },
  },

  /* Digital Tools & Collaboration — mid only (upper: right tool) */
  'Computing|Digital Tools & Collaboration|decision': {
    mid: {
      meters: [
        { id: 'together', label: 'Teamwork', emoji: '🤝', start: 55 },
        { id: 'smart', label: 'Organised', emoji: '🗂️', start: 50 },
        { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'A teammate deleted your paragraph in the shared doc! 😱',
          choices: [
            { label: 'Restore from version history, then talk kindly', meters: [['together', 25], ['smart', 15]], reflect: 'Version history is the undo for real life — and kind words keep the team whole.', profile: 'Communicator' },
            { label: 'Delete their paragraph back', meters: [['together', -25]], reflect: 'Revenge edits start an edit war nobody wins.' },
            { label: 'Quit the shared doc', meters: [['together', -15]], reflect: 'Leaving the doc leaves the team stuck.' },
          ],
        },
        {
          text: 'Your files are everywhere: “final2-TRUE-final”. 🗂️',
          choices: [
            { label: 'Folders with clear names and dates', meters: [['smart', 25]], reflect: 'Future-you will find it in five seconds. That is digital tidiness.', profile: 'Reflective' },
            { label: 'Everything loose on the desktop', meters: [['smart', -15]], reflect: 'Chaos now is a lost assignment later.' },
            { label: 'One giant document for everything', meters: [['smart', -10], ['mood', -5]], reflect: 'A 90-page scroll is not organisation — it is a maze.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'together', label: 'Teamwork', emoji: '🤝', start: 55 },
        { id: 'smart', label: 'Right tool', emoji: '🧰', start: 50 },
        { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your team must plan the fair stall, track sales, and present results. 🎪',
          choices: [
            { label: 'Doc for the plan, sheet for sales, slides to present', meters: [['smart', 30]], reflect: 'Matching tool to task is the skill — each one does its job best.', profile: 'Knowledgeable' },
            { label: 'Slides for absolutely everything', meters: [['smart', -15]], reflect: 'A 40-slide “budget” is numbers trapped in the wrong tool.' },
            { label: 'One long chat thread for all three', meters: [['smart', -20], ['together', -5]], reflect: 'Important facts sink in chat scroll — lost by tomorrow.' },
          ],
        },
      ],
    },
  },

  /* Learning to Learn — early: persist & plan; mid: mistakes & transfer; upper: strategy & reflection */
  'Learning to Learn|Learning to Learn|decision': {
    early: {
      meters: [
        { id: 'growth', label: 'Growth', emoji: '🌱', start: 50 },
        { id: 'skill', label: 'Learning skills', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Confidence', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'The 100-piece puzzle has beaten you three times. 🧩',
          choices: [
            { label: 'Sort the pieces, try a new plan, ask for a hint', meters: [['growth', 25], ['skill', 15]], reflect: 'New approach + a hint is not cheating — it is how learners work.', profile: 'Risk-taker' },
            { label: 'Tip the box out and walk away', meters: [['growth', -20]], reflect: 'Hard is the feeling of your brain growing. Walking away skips the grow.' },
            { label: 'Wait for someone to finish it for you', meters: [['skill', -15]], reflect: 'Finished puzzle, missed lesson.' },
          ],
        },
        {
          text: 'You get to build the biggest cardboard city ever. 🏗️',
          choices: [
            { label: 'Sketch a plan and list the steps first', meters: [['skill', 25]], reflect: 'Thinking before starting is the builder’s superpower.', profile: 'Thinker' },
            { label: 'Grab tape and hope', meters: [['skill', -10]], reflect: 'Hope builds wobbly towers.' },
            { label: 'Wait to copy someone else’s plan', meters: [['growth', -10]], reflect: 'Copying skips the planning practice — the real prize.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'growth', label: 'Growth', emoji: '🌱', start: 50 },
        { id: 'skill', label: 'Learning skills', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Confidence', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your fraction answer was wrong — again. ➗',
          choices: [
            { label: 'Find exactly WHY, then explain it to someone', meters: [['growth', 25], ['skill', 25]], reflect: 'Mistakes are data. Teaching it back proves you truly fixed it.', profile: 'Reflective' },
            { label: 'Erase it and never look again', meters: [['growth', -20]], reflect: 'Erased mistake, kept misconception.' },
            { label: 'Decide you are just “bad at maths”', meters: [['growth', -25]], reflect: '“Bad at” is a story — the evidence says “not yet, and here is why”.' },
          ],
        },
        {
          text: 'Today’s science topic feels a LOT like last term’s. 🤔',
          choices: [
            { label: 'Connect it: what do I already know that fits?', meters: [['skill', 25]], reflect: 'Hooking new knowledge onto old is how memory sticks.', profile: 'Inquirer' },
            { label: 'Treat it as completely brand new', meters: [['skill', -10]], reflect: 'Starting from zero wastes the head start you earned.' },
            { label: 'Assume you already know it all', meters: [['growth', -10]], reflect: 'Familiar ≠ mastered — check the new details.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'growth', label: 'Growth', emoji: '🌱', start: 50 },
        { id: 'skill', label: 'Learning skills', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Confidence', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Big test in one week. The book is 200 pages. 📚',
          choices: [
            { label: 'Find the gaps, set daily goals, quiz yourself', meters: [['skill', 30], ['growth', 15]], reflect: 'Gap-finding beats page-counting — study what you cannot yet do.', profile: 'Thinker' },
            { label: 'Reread all 200 pages twice', meters: [['skill', -10]], reflect: 'Rereading feels productive and mostly isn’t — testing is.' },
            { label: 'Hope the right things come up', meters: [['growth', -20]], reflect: 'Hope is not a strategy. A plan is.' },
          ],
        },
        {
          text: 'The project is finally handed in. 📦',
          choices: [
            { label: 'Reflect: what worked, what I’d change, what’s next', meters: [['skill', 25], ['growth', 20]], reflect: 'Reflection turns one project into lessons for every future one.', profile: 'Reflective' },
            { label: 'Never think about it again', meters: [['skill', -15]], reflect: 'The learning was in the doing — and in the looking back.' },
            { label: 'Only celebrate the mark', meters: [['mood', 10], ['growth', -5]], reflect: 'Celebrate! Then ask what the mark cannot tell you.' },
          ],
        },
      ],
    },
  },

  /* Entrepreneurship — early: stall basics; mid: costs & plans; upper: ethics & scale */
  'Life Skills|Entrepreneurship|decision': {
    early: {
      meters: [
        { id: 'coins', label: 'Money sense', emoji: '🪙', start: 50 },
        { id: 'customers', label: 'Happy customers', emoji: '🙂', start: 55 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Stall day! What should you make to sell? 🏪',
          choices: [
            { label: 'Ask what people would buy, then make that', meters: [['customers', 25], ['coins', 10]], reflect: 'Find the customer first — sellers serve what buyers want.', profile: 'Inquirer' },
            { label: 'Make only what YOU love, ignore everyone', meters: [['customers', -15]], reflect: 'A shop of one is a small shop. Listen to buyers.' },
            { label: 'Make nothing, sell your brother’s toys', meters: [['customers', -25]], reflect: 'Selling other people’s things is not your business — literally.' },
          ],
        },
        {
          text: 'A customer says your bookmark is too expensive. 🏷️',
          choices: [
            { label: 'Explain what it’s made of, offer a deal for two', meters: [['customers', 20], ['coins', 15]], reflect: 'Show the value, sweeten the deal — that is real selling.', profile: 'Communicator' },
            { label: 'Argue that they are wrong', meters: [['customers', -20]], reflect: 'Won the argument, lost the customer.' },
            { label: 'Give it away free', meters: [['coins', -20]], reflect: 'Generous once — but free prices close businesses.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'coins', label: 'Money sense', emoji: '🪙', start: 50 },
        { id: 'customers', label: 'Happy customers', emoji: '🙂', start: 55 },
        { id: 'mood', label: 'Grit', emoji: '💪', start: 60 },
      ],
      scenes: [
        {
          text: 'You sold out in one hour! Reinvest or pocket everything? 💰',
          choices: [
            { label: 'Buy more supplies, track what it cost you', meters: [['coins', 30]], reflect: 'Revenue minus costs = profit. Tracking both is how stalls become businesses.', profile: 'Thinker' },
            { label: 'Pocket it all, buy nothing', meters: [['coins', 5]], reflect: 'Sweet today, sold out tomorrow — no stock, no stall.' },
            { label: 'Spend it on lollies for the team', meters: [['mood', 10], ['coins', -20]], reflect: 'Team treat once — but the lollies ate your business capital.' },
          ],
        },
        {
          text: 'Rain flooded the market day. Your stall flopped. 🌧️',
          choices: [
            { label: 'Write down what you learned, plan an indoor market', meters: [['mood', 25], ['coins', 10]], reflect: 'Failure is tuition — you paid for a lesson, collect the lesson.', profile: 'Risk-taker' },
            { label: 'Blame the weather forever', meters: [['mood', -20]], reflect: 'Weather happens to every stall. The planners sell umbrellas.' },
            { label: 'Quit business entirely', meters: [['mood', -25]], reflect: 'One wet day is data, not destiny.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'coins', label: 'Money sense', emoji: '🪙', start: 50 },
        { id: 'ethics', label: 'Ethics', emoji: '⚖️', start: 55 },
        { id: 'mood', label: 'Trust', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'A supplier offers tees at half price — made in poor conditions. 👕',
          choices: [
            { label: 'Pay more for ethical supply, tell customers why', meters: [['ethics', 30], ['mood', 15]], reflect: 'Customers pay for values. Ethics is a feature, not a cost.', profile: 'Principled' },
            { label: 'Take the cheap tees, say nothing', meters: [['ethics', -30]], reflect: 'Your margin is someone else’s loss — that debt comes due.' },
            { label: 'Take them and claim they are ethical', meters: [['ethics', -40]], reflect: 'That is not marketing, that is lying — and lies have receipts.' },
          ],
        },
        {
          text: 'A café wants 200 of your bookmarks a week. You make 20. 📈',
          choices: [
            { label: 'Plan capacity: helpers, batch time, quality checks', meters: [['coins', 25], ['mood', 10]], reflect: 'Scaling means building the machine that makes the machine.', profile: 'Thinker' },
            { label: 'Say yes to 200 and hope', meters: [['coins', -15], ['mood', -10]], reflect: 'Over-promising burns the customer AND your name.' },
            { label: 'Refuse — too scary to grow', meters: [['coins', -10]], reflect: 'Growth has steps; refusal just skips the opportunity.' },
          ],
        },
      ],
    },
  },

  /* Money & Finance — early: coins & needs; mid: budget & scams; upper: borrowing & economy */
  'Life Skills|Money & Finance|decision': {
    early: {
      meters: [
        { id: 'coins', label: 'Money sense', emoji: '🪙', start: 50 },
        { id: 'safe', label: 'Safe choices', emoji: '🛡️', start: 55 },
        { id: 'mood', label: 'Happy wallet', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'You have 10 coins. Your pencil case broke AND there’s a toy you want. 🎒',
          choices: [
            { label: 'Fix the need first, save the rest toward the want', meters: [['coins', 30]], reflect: 'Needs before wants — and saving makes the want possible.', profile: 'Thinker' },
            { label: 'Buy the toy — the case can wait', meters: [['coins', -20]], reflect: 'Broken pencil case, broken lead, lost homework… needs nag.' },
            { label: 'Spend nothing ever, worry always', meters: [['mood', -10]], reflect: 'Money is for using wisely — not for hiding under the mattress.' },
          ],
        },
        {
          text: 'Your class is raising coins for the animal shelter. 🐾',
          choices: [
            { label: 'Set a goal, count weekly, tell everyone', meters: [['coins', 25], ['mood', 10]], reflect: 'A visible goal grows giving — counting is part of caring.', profile: 'Communicator' },
            { label: 'Just collect and hope', meters: [['coins', -5]], reflect: 'Hope coins add up slower than counted ones.' },
            { label: 'Borrow from the tin for snacks', meters: [['safe', -25]], reflect: 'That is not borrowing — that is the tin’s money.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'coins', label: 'Money sense', emoji: '🪙', start: 50 },
        { id: 'safe', label: 'Safe choices', emoji: '🛡️', start: 55 },
        { id: 'mood', label: 'Happy wallet', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'An ad shouts: “LIMITED TIME! EVERYONE is buying it!” ⏰',
          choices: [
            { label: 'Wait a day, compare, decide if YOU need it', meters: [['coins', 25], ['safe', 10]], reflect: 'Urgency is a sales trick. A night of sleep kills most “must-haves”.', profile: 'Thinker' },
            { label: 'Buy instantly — everyone has it!', meters: [['coins', -20]], reflect: '“Everyone” was the marketing. Your wallet was the target.' },
            { label: 'Decide all ads are lies', meters: [['coins', -10], ['mood', 5]], reflect: 'Ads persuade — some products still fit. Judge each one.' },
          ],
        },
        {
          text: 'A marketplace seller wants card details before you’ve seen the item. 💳',
          choices: [
            { label: 'Refuse — pay only after seeing it, with a grown-up', meters: [['safe', 30]], reflect: 'Card details before the item is the classic scam shape.', profile: 'Principled' },
            { label: 'Send the details — the deal is sweet', meters: [['safe', -30]], reflect: 'Sweet deals asking for details are bait, not bargains.' },
            { label: 'Share your friend’s card instead', meters: [['safe', -35]], reflect: 'Now it is your friend’s loss too. Never lend your identity.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'coins', label: 'Money sense', emoji: '🪙', start: 50 },
        { id: 'safe', label: 'Safe choices', emoji: '🛡️', start: 55 },
        { id: 'mood', label: 'Happy wallet', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'You want a $200 phone and have $50 saved. 📱',
          choices: [
            { label: 'Saving plan: weekly goal + extra chores, compare models', meters: [['coins', 30]], reflect: 'A plan turns a want into a date. Borrowing turns it into a trap.', profile: 'Thinker' },
            { label: 'Borrow from your brother — pay back “later”', meters: [['coins', -20]], reflect: '“Later” debts grow interest in arguments.' },
            { label: 'Blow the $50 on snacks to forget the phone', meters: [['coins', -25]], reflect: 'The phone is gone AND the $50 — a double loss.' },
          ],
        },
        {
          text: 'Your class event raised $500 to allocate. 🗳️',
          choices: [
            { label: 'Budget with categories and a written record', meters: [['coins', 30], ['safe', 10]], reflect: 'Budgets make $500 feel like $750 — nothing leaks.', profile: 'Knowledgeable' },
            { label: 'One big purchase that “everyone” wants', meters: [['coins', -15]], reflect: 'One voice, one spend — the rest of the class pays.' },
            { label: 'Keep no records, vibes-based spending', meters: [['coins', -25]], reflect: 'Vibes run out; receipts explain.' },
          ],
        },
      ],
    },
  },
  /* Empathy & Social Awareness — early: noticing others; mid: perspectives & fairness; upper: bias & inclusion */
  'Personal & Social Development|Empathy & Social Awareness|decision': {
    early: {
      meters: [
        { id: 'kind', label: 'Kindness', emoji: '💛', start: 55 },
        { id: 'aware', label: 'Noticing others', emoji: '👀', start: 50 },
        { id: 'mood', label: 'Friendship', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'A new student sits alone while the class is noisy around them. 🆕',
          choices: [
            { label: 'Invite them over and ask about themselves', meters: [['kind', 25], ['aware', 15]], reflect: 'One invitation can change a whole year for someone.', profile: 'Caring' },
            { label: 'Watch from a distance', meters: [['kind', -5]], reflect: 'Noticing is step one — but the invite is what helps.' },
            { label: 'Carry on — not your business', meters: [['kind', -20]], reflect: 'Kindness is exactly your business.' },
          ],
        },
        {
          text: 'Your joke made the whole table laugh — except one friend, who went quiet. 😶',
          choices: [
            { label: 'Notice their face, apologise quietly', meters: [['kind', 25], ['aware', 20]], reflect: 'Empathy is reading the one face that stopped smiling.', profile: 'Caring' },
            { label: 'Say “just a joke” and move on', meters: [['aware', -15]], reflect: 'The joke was fine — the hurt is still real.' },
            { label: 'Tell more jokes to fix it', meters: [['kind', -10]], reflect: 'More noise is not repair. Repair is repair.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'kind', label: 'Kindness', emoji: '💛', start: 55 },
        { id: 'aware', label: 'Noticing others', emoji: '👀', start: 50 },
        { id: 'mood', label: 'Friendship', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'In your project team, one kid ALWAYS gets stuck with the boring job. 🧹',
          choices: [
            { label: 'Rotate roles so everyone tries everything', meters: [['kind', 20], ['aware', 20]], reflect: 'Equity is not sameness — it is everyone getting a fair go over time.', profile: 'Principled' },
            { label: 'Keep the system — it works', meters: [['aware', -15]], reflect: '“Works” for whom? Ask the person always holding the broom.' },
            { label: 'Do the boring job yourself every time', meters: [['kind', 5], ['mood', -10]], reflect: 'Generous, but it dodges the fairness problem instead of fixing it.' },
          ],
        },
        {
          text: 'A new classmate eats different food and prays at a set time. 🌍',
          choices: [
            { label: 'Ask about it with real curiosity', meters: [['aware', 25]], reflect: 'Curiosity with respect turns strangers into teachers.', profile: 'Open-minded' },
            { label: 'Whisper to your neighbour about it', meters: [['kind', -20]], reflect: 'Whispers build walls. Questions build bridges.' },
            { label: 'Pretend you noticed nothing, ever', meters: [['aware', 0], ['mood', -5]], reflect: 'Polite ignoring keeps distance — kind questions close it.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'kind', label: 'Kindness', emoji: '💛', start: 55 },
        { id: 'aware', label: 'Noticing bias', emoji: '🪞', start: 50 },
        { id: 'mood', label: 'Trust', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'You catch yourself assuming the new kid can’t play sport because of how they look. 🤨',
          choices: [
            { label: 'Question the assumption — watch, then update', meters: [['aware', 30]], reflect: 'Bias is a shortcut your brain takes. Noticing it is how you take the long, true road.', profile: 'Reflective' },
            { label: 'Stick with the first impression', meters: [['aware', -20]], reflect: 'First impressions are drafts, not verdicts.' },
            { label: 'Avoid them so you can’t be wrong', meters: [['kind', -20]], reflect: 'Dodging people to dodge mistakes keeps both.' },
          ],
        },
        {
          text: 'Planning a class celebration — many cultures, one room. 🎉',
          choices: [
            { label: 'Ask families what matters, include several traditions', meters: [['aware', 25], ['kind', 20]], reflect: 'Inclusion is designed, not accidental. Ask, then build.', profile: 'Communicator' },
            { label: 'Plan what YOU know and like', meters: [['aware', -20]], reflect: 'One tradition on stage, everyone else in the audience.' },
            { label: 'Keep it “neutral” — nothing cultural at all', meters: [['aware', -10]], reflect: 'Erasing culture is not neutrality — it is its own message.' },
          ],
        },
      ],
    },
  },

  /* Responsible Decision-Making — early: safety basics; mid: pressure & online; upper: ethics & citizenship */
  'Personal & Social Development|Responsible Decision-Making|decision': {
    early: {
      meters: [
        { id: 'safe', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'fair', label: 'Fair & honest', emoji: '⚖️', start: 55 },
        { id: 'mood', label: 'Pride', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'You find a shiny watch on the playground. Nobody is around. ⌚',
          choices: [
            { label: 'Take it to a teacher — no-go-tell', meters: [['safe', 20], ['fair', 30]], reflect: 'Found is not kept. Handing it in is honesty with legs.', profile: 'Principled' },
            { label: 'Keep it — finders keepers', meters: [['fair', -30]], reflect: 'Someone is crying over that watch right now.' },
            { label: 'Leave it where it is', meters: [['safe', -5]], reflect: 'Leaving it means losing it — rain, feet, forgetfulness.' },
          ],
        },
        {
          text: 'Friends dare you to climb the park fence “or you’re scared”. 🧗',
          choices: [
            { label: '“No thanks” — and suggest a braver game inside', meters: [['safe', 30], ['mood', 10]], reflect: 'Real bravery picks the risk that is worth it — and leads.', profile: 'Risk-taker' },
            { label: 'Climb it — can’t be called scared', meters: [['safe', -30]], reflect: 'The dare was the trick. The fence was the danger.' },
            { label: 'Watch your friends climb instead', meters: [['safe', 5], ['fair', -10]], reflect: 'Not joining is safer — but upstanders speak up too.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'safe', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'fair', label: 'Fair & honest', emoji: '⚖️', start: 55 },
        { id: 'mood', label: 'Pride', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'The group chat is voting to post an embarrassing pic of a classmate. 📱',
          choices: [
            { label: 'Refuse, report it, check on the target', meters: [['safe', 25], ['fair', 30]], reflect: 'Stop–think–choose, then upstand: refuse, report, support.', profile: 'Principled' },
            { label: 'Laugh and stay quiet', meters: [['fair', -25]], reflect: 'Silence is a vote the bully can count.' },
            { label: 'Leave the group quietly', meters: [['fair', 5], ['safe', 5]], reflect: 'Better than laughing — but the target needed a voice.' },
          ],
        },
        {
          text: 'Older kids at the park offer you something to “try”. 🚭',
          choices: [
            { label: 'Stop, think, choose: decline and walk away, tell someone', meters: [['safe', 35]], reflect: 'Peer pressure has a script. Your script: no, go, tell.', profile: 'Principled' },
            { label: 'Try it once so they respect you', meters: [['safe', -35]], reflect: 'Respect from pressure is not respect — it is bait.' },
            { label: 'Become the lookout', meters: [['safe', -30]], reflect: 'Sharing the risk does not shrink the risk.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'safe', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'fair', label: 'Fair & honest', emoji: '⚖️', start: 55 },
        { id: 'mood', label: 'Pride', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'A viral post claims the council is selling the local park. 🌳',
          choices: [
            { label: 'Check the council site and the post’s source first', meters: [['fair', 25], ['safe', 15]], reflect: 'Reliable information is step one of citizenship — shares are votes.', profile: 'Inquirer' },
            { label: 'Reshare it with an angry caption', meters: [['fair', -25]], reflect: 'You just spread the rumour’s reach, not the truth’s.' },
            { label: 'Trust nothing online ever again', meters: [['fair', -15]], reflect: 'Cynicism is lazy checking. Verification is the skill.' },
          ],
        },
        {
          text: 'Student council must spend $300: sports gear, library books, or a mural. 🗳️',
          choices: [
            { label: 'Weigh who benefits, gather class input, vote openly', meters: [['fair', 30]], reflect: 'Democracy in miniature: evidence, voices, transparent votes.', profile: 'Principled' },
            { label: 'Vote with your friendship group', meters: [['fair', -20]], reflect: 'Bloc voting trades the common good for the crew.' },
            { label: 'Skip it — your vote is tiny', meters: [['fair', -15]], reflect: 'Tiny votes are how every big decision is made.' },
          ],
        },
      ],
    },
  },

  /* Self-Awareness — early: naming feelings; mid: patterns & impact; upper: identity & growth */
  'Personal & Social Development|Self-Awareness|decision': {
    early: {
      meters: [
        { id: 'know', label: 'Knowing myself', emoji: '🪞', start: 50 },
        { id: 'impact', label: 'Good impact', emoji: '🌟', start: 55 },
        { id: 'mood', label: 'Confidence', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Show-and-tell is next, and your stomach is doing flips. 🎤',
          choices: [
            { label: 'Name the feeling, share anyway — nerves are normal', meters: [['know', 25], ['mood', 15]], reflect: 'Naming a feeling shrinks it. Brave is scared-plus-doing.', profile: 'Risk-taker' },
            { label: 'Hide in the cloakroom until it passes', meters: [['know', -10], ['mood', -15]], reflect: 'Avoided today, dreaded tomorrow.' },
            { label: 'Push your best friend to go first', meters: [['impact', -20]], reflect: 'Using a friend as a shield is not courage.' },
          ],
        },
        {
          text: 'You lose a game and feel like throwing the controller. 🎮',
          choices: [
            { label: 'Feel the anger, put the controller down, breathe', meters: [['know', 25], ['impact', 15]], reflect: 'Feelings are allowed. Actions get chosen.', profile: 'Thinker' },
            { label: 'Throw it — you cannot help it', meters: [['impact', -30]], reflect: 'The feeling chose the action. You can take that job back.' },
            { label: 'Say nothing and bury it', meters: [['know', -15]], reflect: 'Buried feelings dig out sideways later.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'know', label: 'Knowing myself', emoji: '🪞', start: 50 },
        { id: 'impact', label: 'Good impact', emoji: '🌟', start: 55 },
        { id: 'mood', label: 'Confidence', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'You notice you snap at people every day right before dinner. 🍽️',
          choices: [
            { label: 'Spot the pattern — hungry AND tired. Plan a snack break', meters: [['know', 30]], reflect: 'Patterns turn “that’s just me” into “that’s fixable”.', profile: 'Reflective' },
            { label: 'Decide people should just avoid you then', meters: [['impact', -20]], reflect: 'Your pattern is yours to manage — that is the self part.' },
            { label: 'Never think about it', meters: [['know', -15]], reflect: 'Unnoticed patterns run you on autopilot.' },
          ],
        },
        {
          text: 'Your teasing was “just jokes” — but your friend stopped sitting with you. 💔',
          choices: [
            { label: 'See it from their side, apologise, change the habit', meters: [['know', 20], ['impact', 30]], reflect: 'Impact beats intent. How it landed is the truth that matters.', profile: 'Communicator' },
            { label: 'They are too sensitive', meters: [['impact', -30]], reflect: 'Sensitivity is not a flaw — it is feedback.' },
            { label: 'Stop joking with everyone completely', meters: [['mood', -15]], reflect: 'Overcorrecting punishes the wrong person: you.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'know', label: 'Knowing myself', emoji: '🪞', start: 50 },
        { id: 'impact', label: 'Good impact', emoji: '🌟', start: 55 },
        { id: 'mood', label: 'Confidence', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your first impression of the new kid turned out completely wrong. 🤝',
          choices: [
            { label: 'Update the picture — say so, give it another go', meters: [['know', 30]], reflect: 'Smart people rewrite first drafts. That is growth in real time.', profile: 'Open-minded' },
            { label: 'Pretend you were right all along', meters: [['know', -20]], reflect: 'Defending a wrong first take costs a real friendship.' },
            { label: 'Avoid them — awkward', meters: [['mood', -15]], reflect: 'Awkwardness fades; missed connections linger.' },
          ],
        },
        {
          text: 'Everyone’s posts look perfect and yours feel small. 📱',
          choices: [
            { label: 'Compare to past-YOU, not to highlight reels', meters: [['know', 30], ['mood', 15]], reflect: 'Your timeline is your race. Posts are trailers, not films.', profile: 'Reflective' },
            { label: 'Measure yourself in likes', meters: [['know', -25]], reflect: 'Likes measure reach, never worth.' },
            { label: 'Copy whoever seems happiest', meters: [['know', -20]], reflect: 'Borrowed goals fit like borrowed shoes.' },
          ],
        },
      ],
    },
  },

  /* Self-Regulation & Resilience — early: calm tools; mid: plans & bounce-backs; upper: goals & focus */
  'Personal & Social Development|Self-Regulation & Resilience|decision': {
    early: {
      meters: [
        { id: 'calm', label: 'Staying calm', emoji: '🧘', start: 50 },
        { id: 'growth', label: 'Bouncing back', emoji: '🌱', start: 55 },
        { id: 'mood', label: 'Pride', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your block tower crashes down seconds before “done”. 🏗️',
          choices: [
            { label: 'Big breath, name the feeling, rebuild differently', meters: [['calm', 25], ['growth', 20]], reflect: 'The tower taught you the weak spot — rebuild smarter.', profile: 'Risk-taker' },
            { label: 'Kick the blocks across the room', meters: [['calm', -30]], reflect: 'The blocks did nothing wrong. Neither did you — breathe first.' },
            { label: 'Never build again', meters: [['growth', -25]], reflect: 'One crash ended every future tower. Rough deal.' },
          ],
        },
        {
          text: 'It’s your turn LAST at the SWING. The wait feels endless. 🛝',
          choices: [
            { label: 'Use the wait: count breaths, plan your turn', meters: [['calm', 25]], reflect: 'Waiting for better is a superpower with a name: patience.', profile: 'Thinker' },
            { label: 'Shove in — you have waited enough', meters: [['calm', -25]], reflect: 'Shoving trades five minutes of wait for five minutes of trouble.' },
            { label: 'Whine until someone gives up the swing', meters: [['growth', -15]], reflect: 'Whining works on adults once — then it stops working forever.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'calm', label: 'Staying calm', emoji: '🧘', start: 50 },
        { id: 'growth', label: 'Bouncing back', emoji: '🌱', start: 55 },
        { id: 'mood', label: 'Pride', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'A huge assignment lands: poster, speech, model — due Friday. 😰',
          choices: [
            { label: 'Break it into steps, one per afternoon', meters: [['calm', 25], ['growth', 20]], reflect: 'A mountain becomes stairs the moment you name the steps.', profile: 'Thinker' },
            { label: 'Avoid thinking about it until Thursday', meters: [['calm', -20]], reflect: 'Avoidance is a loan with Friday interest.' },
            { label: 'Do it all Thursday night, badly', meters: [['mood', -20]], reflect: 'All-nighters trade quality for panic.' },
          ],
        },
        {
          text: 'You lost the grand final by one goal. The team is silent. ⚽',
          choices: [
            { label: 'Feel it, then plan what to practise this week', meters: [['growth', 30]], reflect: 'Losses are coaches. This one just ran a free session.', profile: 'Risk-taker' },
            { label: 'Quit the team — embarrassing', meters: [['growth', -30]], reflect: 'Quitting mid-sentence ends the story badly.' },
            { label: 'Blame the referee loudly', meters: [['calm', -20]], reflect: 'The ref reffed; the loss teaches. Only one of them helps you.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'calm', label: 'Staying calm', emoji: '🧘', start: 50 },
        { id: 'growth', label: 'Bouncing back', emoji: '🌱', start: 55 },
        { id: 'mood', label: 'Pride', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your goal is “get good at drawing”. It is going nowhere. 🎨',
          choices: [
            { label: 'Make it specific: 15 minutes daily, one skill a week', meters: [['growth', 30]], reflect: 'Vague goals vaporise; specific goals schedule themselves.', profile: 'Thinker' },
            { label: 'Keep hoping motivation strikes', meters: [['growth', -20]], reflect: 'Motivation visits; systems stay.' },
            { label: 'Copy a YouTuber’s exact goal', meters: [['growth', -10]], reflect: 'Their goal fits their life — build yours to fit yours.' },
          ],
        },
        {
          text: 'Homework time keeps dying to your phone. 📱',
          choices: [
            { label: 'Design attention: timer, airplane mode, phone in another room', meters: [['calm', 25], ['growth', 20]], reflect: 'Willpower loses to design. Beat the phone with setup, not struggle.', profile: 'Thinker' },
            { label: 'Just try harder to resist it', meters: [['calm', -15]], reflect: 'Fighting a supercomputer for attention with willpower alone is unfair — to you.' },
            { label: 'Skip homework, phone wins', meters: [['mood', -25]], reflect: 'The phone scrolled; your marks paid.' },
          ],
        },
      ],
    },
  },

  /* Scientific Inquiry — early: fair tests; mid: variables & data; upper: control, revision, ethics */
  'Science|Scientific Inquiry|decision': {
    early: {
      meters: [
        { id: 'fair', label: 'Fair testing', emoji: '⚖️', start: 50 },
        { id: 'evidence', label: 'Evidence', emoji: '🔍', start: 50 },
        { id: 'mood', label: 'Curiosity', emoji: '🤔', start: 60 },
      ],
      scenes: [
        {
          text: 'Plant lab: Sam waters plant A with juice, plant B with water. 🪴',
          choices: [
            { label: 'Same light, same water — change only ONE thing', meters: [['fair', 30]], reflect: 'One change at a time is the whole secret of a fair test.', profile: 'Thinker' },
            { label: 'Juice is tastier — plants will love it', meters: [['fair', -25]], reflect: 'Tasty to you is not science to a plant — and nothing else was controlled.' },
            { label: 'Give every plant different everything', meters: [['fair', -20], ['evidence', -10]], reflect: 'Then you will never know WHAT caused WHAT.' },
          ],
        },
        {
          text: 'Ramp lab: your car rolled 40 cm, your friend’s rolled 32 cm. 🚗',
          choices: [
            { label: 'Same track, three rolls each, then compare', meters: [['evidence', 30]], reflect: 'Repeats beat luck — that is what “reliable” means.', profile: 'Inquirer' },
            { label: 'Declare your car the fastest forever', meters: [['evidence', -20]], reflect: 'One race on one track is a story, not a result.' },
            { label: 'Swap cars and tracks mid-test', meters: [['fair', -15]], reflect: 'Change two things and the answer hides.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'fair', label: 'Fair testing', emoji: '⚖️', start: 50 },
        { id: 'evidence', label: 'Evidence', emoji: '🔍', start: 50 },
        { id: 'mood', label: 'Curiosity', emoji: '🤔', start: 60 },
      ],
      scenes: [
        {
          text: 'Toast seems to ALWAYS land butter-side down. Is it real? 🍞',
          choices: [
            { label: 'Drop many slices, count both sides, graph it', meters: [['evidence', 30], ['fair', 15]], reflect: 'Counting turns a feeling into data. How many is “always”?', profile: 'Inquirer' },
            { label: 'One drop decides it', meters: [['evidence', -25]], reflect: 'One coin flip does not make a casino — one drop makes no pattern.' },
            { label: 'Decide the toast is haunted', meters: [['evidence', -20], ['mood', 5]], reflect: 'Haunted toast explains everything and tests nothing.' },
          ],
        },
        {
          text: 'Two paper-plane designs. Which is better? ✈️',
          choices: [
            { label: 'List what “better” means first, score both planes', meters: [['fair', 30]], reflect: 'Judging designs needs criteria — or “better” just means “prettier”.', profile: 'Thinker' },
            { label: 'Pick the cooler-looking one', meters: [['fair', -20]], reflect: 'Style points are not flight points.' },
            { label: 'Throw each once, winner takes all', meters: [['evidence', -20]], reflect: 'One wind gust can decide one throw. Throws differ.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'fair', label: 'Fair testing', emoji: '⚖️', start: 50 },
        { id: 'evidence', label: 'Evidence', emoji: '🔍', start: 50 },
        { id: 'mood', label: 'Integrity', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'You want to survey plants on the local First Nations reserve land. 🌿',
          choices: [
            { label: 'Ask permission and follow guidance on Country first', meters: [['mood', 30], ['fair', 15]], reflect: 'Science on Country starts with Country’s people. Ask first, always.', profile: 'Principled' },
            { label: 'Just go — science is open to all', meters: [['mood', -30]], reflect: 'Open science still runs on respect and permission.' },
            { label: 'Find another site to avoid the awkward ask', meters: [['mood', -5], ['evidence', -10]], reflect: 'Dodging the ask changes the data — the best site may be the one you skipped.' },
          ],
        },
        {
          text: 'Your experiment results do NOT match your hypothesis. 😬',
          choices: [
            { label: 'Check for errors, then revise the idea — that IS science', meters: [['evidence', 30], ['mood', 20]], reflect: 'Science can be revised — that is its power, not its failure.', profile: 'Reflective' },
            { label: 'Adjust the numbers to fit the guess', meters: [['mood', -40]], reflect: 'That is not science any more — that is fiction with a lab coat.' },
            { label: 'Hide the experiment, start a new one', meters: [['evidence', -20]], reflect: 'Negative results are results. Hiding them slows everyone.' },
          ],
        },
      ],
    },
  },

  /* Energy — early: sun & shade; mid: circuits & safety; upper: conversion & resistance */
  'Science|Energy|decision': {
    early: {
      meters: [
        { id: 'safe', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'energy', label: 'Smart energy use', emoji: '⚡', start: 50 },
        { id: 'mood', label: 'Comfort', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Sports day is scorching and there is no shade at the oval. ☀️',
          choices: [
            { label: 'Build a shade tent, hats on, water breaks', meters: [['safe', 30]], reflect: 'The sun warms everything it touches — shade blocks the touch.', profile: 'Thinker' },
            { label: 'Tough it out in the sun', meters: [['safe', -30]], reflect: 'Sunburn is energy damage — skin remembers.' },
            { label: 'Only ice cream for cooling', meters: [['safe', -10], ['mood', 5]], reflect: 'Tasty, but it cools the tongue, not the body.' },
          ],
        },
        {
          text: 'Bright sunshine and every classroom light is ON. 💡',
          choices: [
            { label: 'Switch off lights, open the blinds', meters: [['energy', 30]], reflect: 'Free solar power was already flooding in — use it.', profile: 'Principled' },
            { label: 'Lights on AND blinds shut', meters: [['energy', -25]], reflect: 'Paying for light twice: once to the grid, once to the sun.' },
            { label: 'Not your classroom, not your problem', meters: [['energy', -15]], reflect: 'Energy waste is everyone’s bill — and everyone’s planet.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'safe', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'energy', label: 'Smart energy use', emoji: '⚡', start: 50 },
        { id: 'mood', label: 'Comfort', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'The phone charger’s cable is frayed and the wires peek out. ⚡',
          choices: [
            { label: 'Unplug it now and tell a grown-up', meters: [['safe', 35]], reflect: 'Broken insulation means electricity takes shortcuts — through you, maybe.', profile: 'Principled' },
            { label: 'Tape over the crack and keep using it', meters: [['safe', -30]], reflect: 'Tape hides the problem; the wires stay live.' },
            { label: 'It still charges — ignore it', meters: [['safe', -25]], reflect: '“Still works” is not the same as “safe to touch”.' },
          ],
        },
        {
          text: 'Winter evening: heater, lights, TV and oven all running. 🏠',
          choices: [
            { label: 'Use one room, close doors, switch off what you don’t need', meters: [['energy', 30]], reflect: 'Energy you do not use is the cheapest energy on Earth.', profile: 'Thinker' },
            { label: 'Everything on — cozy is cozy', meters: [['energy', -25]], reflect: 'Cozy bill, too. Zoning the warmth costs less.' },
            { label: 'Leave the heater on all night “for the cat”', meters: [['safe', -20], ['energy', -15]], reflect: 'Cats have fur — and heaters left running have risks.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'safe', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'energy', label: 'Smart energy use', emoji: '⚡', start: 50 },
        { id: 'mood', label: 'Engineering', emoji: '🔧', start: 60 },
      ],
      scenes: [
        {
          text: 'You are building a solar-powered fan for the greenhouse. 🔆',
          choices: [
            { label: 'Match the panel voltage to the motor, test in stages', meters: [['energy', 30], ['mood', 15]], reflect: 'Energy conversion needs matching: source, load, and the losses between.', profile: 'Thinker' },
            { label: 'Stack every battery you can find on it', meters: [['safe', -20], ['energy', -15]], reflect: 'More power is not more design — motors burn when overfed.' },
            { label: 'Wire it randomly until something spins', meters: [['safe', -25]], reflect: 'Trial and error without safety is a fire drill.' },
          ],
        },
        {
          text: 'One bulb with a resistor glows dim; the same bulb alone glows bright. 💡',
          choices: [
            { label: 'Investigate resistance — where is the energy going?', meters: [['energy', 25], ['mood', 20]], reflect: 'The resistor eats energy as heat. That is not a bug — it is a feature with uses.', profile: 'Inquirer' },
            { label: 'Decide the dim bulb is broken', meters: [['energy', -20]], reflect: 'Broken? It is behaving exactly as the circuit says.' },
            { label: 'Never use resistors again', meters: [['energy', -15]], reflect: 'Resistors protect circuits — banning them breaks more than it fixes.' },
          ],
        },
      ],
    },
  },

  /* Waves, Light & Sound — early: senses & safety; mid: shadows, codes, ears; upper: seeing & waves */
  'Science|Waves, Light & Sound|decision': {
    early: {
      meters: [
        { id: 'safe', label: 'Protecting your senses', emoji: '🛡️', start: 55 },
        { id: 'smart', label: 'Smart choices', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Concert scene: the front-row speaker is BLASTING. Your ears ring. 🔊',
          choices: [
            { label: 'Step back, cover your ears, tell a grown-up', meters: [['safe', 30]], reflect: 'Ears that ring are ears complaining. Distance is real protection.', profile: 'Thinker' },
            { label: 'Stay right there — it sounds epic', meters: [['safe', -30]], reflect: 'Hearing damage is silent, permanent, and sneaks up later.' },
            { label: 'Plug your ears with pencil tips', meters: [['safe', -25]], reflect: 'Wrong tool, wrong hole — never put things in ears.' },
          ],
        },
        {
          text: 'Sun scene: bright beach day and you forgot your hat. 🏖️',
          choices: [
            { label: 'Shade, borrowed hat, sunscreen — all three', meters: [['safe', 30]], reflect: 'UV is invisible light — it burns on cloudy days too.', profile: 'Principled' },
            { label: 'No hat, no worries', meters: [['safe', -25]], reflect: 'Skin remembers every sunburn. It adds up.' },
            { label: 'Just swim — water blocks sun', meters: [['safe', -20]], reflect: 'Water REFLECTS sun — swimmers burn faster.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'safe', label: 'Protecting your senses', emoji: '🛡️', start: 55 },
        { id: 'smart', label: 'Smart choices', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Shadow-puppet show time: your puppets look TINY on the wall. 🎭',
          choices: [
            { label: 'Move the light closer to make shadows grow', meters: [['smart', 25]], reflect: 'Closer light, bigger shadow — that is the rule the show runs on.', profile: 'Thinker' },
            { label: 'Only wiggle the puppets harder', meters: [['smart', -15]], reflect: 'The size problem is a light-distance problem.' },
            { label: 'Demand a bigger wall', meters: [['mood', -10]], reflect: 'The wall is fine — the physics needs tuning.' },
          ],
        },
        {
          text: 'You and a friend want to send secret messages across the dark yard with torches. 🔦',
          choices: [
            { label: 'Agree on a code pattern first, then flash it', meters: [['smart', 30]], reflect: 'Communication needs shared patterns — that is what a code IS.', profile: 'Communicator' },
            { label: 'Flash randomly — they will guess', meters: [['smart', -20]], reflect: 'Random light is noise, not message.' },
            { label: 'Yell the message instead', meters: [['mood', -15], ['smart', -5]], reflect: 'Not secret, not light-based — the torches would be jealous.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'safe', label: 'Protecting your senses', emoji: '🛡️', start: 55 },
        { id: 'smart', label: 'Smart choices', emoji: '🧠', start: 50 },
        { id: 'mood', label: 'Investigation', emoji: '🔬', start: 60 },
      ],
      scenes: [
        {
          text: 'A coin in a cup of water seems to SHIFT when you look from the side. 🥛',
          choices: [
            { label: 'Trace the light path — why does it bend?', meters: [['mood', 25], ['smart', 20]], reflect: 'Light bends entering water — refraction moves the coin’s image.', profile: 'Inquirer' },
            { label: 'Decide the water bends the coin', meters: [['smart', -15]], reflect: 'The coin moved zero millimetres. The LIGHT did the moving.' },
            { label: 'Ignore it — cups do that', meters: [['mood', -15]], reflect: '“Cups do that” hides one of nature’s best tricks.' },
          ],
        },
        {
          text: 'Design ear protection for the school woodwork room. 👷',
          choices: [
            { label: 'Absorbing layers + seal, then TEST with a meter', meters: [['smart', 30], ['safe', 20]], reflect: 'Design needs both a mechanism (absorb/block) and evidence (measure).', profile: 'Thinker' },
            { label: 'Cotton balls — soft is safe', meters: [['safe', -15]], reflect: 'Soft but leaky. The seal matters as much as the stuff.' },
            { label: 'Nothing — everyone uses machines fine', meters: [['safe', -30]], reflect: 'Hearing loss does not announce itself — it just leaves.' },
          ],
        },
      ],
    },
  },

  /* Volcanoes & Earthquakes — early: immediate safety; mid: preparedness; upper: monitoring & resilience */
  'Science|Volcanoes & Earthquakes|decision': {
    early: {
      meters: [
        { id: 'safety', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'energy', label: 'Trust', emoji: '🤝', start: 55 },
        { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Rumble scene: the ground starts shaking while you are indoors. 🫨',
          choices: [
            { label: 'Drop, cover under a strong table, hold on', meters: [['safety', 30], ['mood', 10]], reflect: 'Drop–Cover–Hold protects you from falling things until it stops.', profile: 'Thinker' },
            { label: 'Sprint outside mid-shake', meters: [['safety', -20]], reflect: 'Falling walls and glass make doorways and stairs the danger.' },
            { label: 'Filming it by the big window', meters: [['safety', -30]], reflect: 'Windows are the first thing that shatters.' },
          ],
        },
        {
          text: 'Hike scene: a posted volcano warning sign, smoke far away. ⚠️',
          choices: [
            { label: 'Turn back with your group and tell a ranger', meters: [['safety', 25], ['energy', 10]], reflect: 'The sign is the mountain talking. Turning back together is brave AND wise.', profile: 'Principled' },
            { label: 'Sneak closer for a better photo', meters: [['safety', -30]], reflect: 'Gas and eruptions give no second chances. No photo is worth it.' },
            { label: 'Ignore it — signs are usually old', meters: [['safety', -20]], reflect: 'Assuming signs are stale is gambling with a volcano.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'safety', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'energy', label: 'Preparedness', emoji: '🎒', start: 50 },
        { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Your family is making a quake plan for home. 🏠',
          choices: [
            { label: 'Kit, water, meeting spot, practice drill together', meters: [['energy', 30]], reflect: 'Plans made calm make calm — practise before you need it.', profile: 'Thinker' },
            { label: 'Just your phone as the whole plan', meters: [['energy', -25]], reflect: 'Networks jam in emergencies. Water does not need signal.' },
            { label: 'No plan — quakes are rare', meters: [['safety', -20]], reflect: 'Rare is not never — rare is exactly why we plan calmly.' },
          ],
        },
        {
          text: 'The shaking just STOPPED. What now? 🫨',
          choices: [
            { label: 'Check people, expect aftershocks, keep near exits', meters: [['safety', 30]], reflect: 'Aftershocks are the earthquake’s encore — stay ready and unhurt.', profile: 'Thinker' },
            { label: 'Run back inside for your charger', meters: [['safety', -25]], reflect: 'Stuff can be replaced. You cannot.' },
            { label: 'Phone everyone immediately from inside', meters: [['safety', -10]], reflect: 'Check yourself and others first — then messages, outside.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'safety', label: 'Safety', emoji: '🛡️', start: 55 },
        { id: 'energy', label: 'Preparedness', emoji: '🎒', start: 50 },
        { id: 'mood', label: 'Community', emoji: '🏘️', start: 60 },
      ],
      scenes: [
        {
          text: 'Your town sits near a fault line. The council asks for ideas. 🏛️',
          choices: [
            { label: 'Drills, building codes, early-warning sirens — all three', meters: [['safety', 30], ['mood', 15]], reflect: 'Resilience is layered: buildings, people and warnings each catch what the others miss.', profile: 'Thinker' },
            { label: 'Just stronger buildings', meters: [['safety', 10], ['energy', -10]], reflect: 'Buildings protect bodies — plans protect whole communities.' },
            { label: 'Nothing — the fault is “probably quiet”', meters: [['safety', -30]], reflect: 'Quiet faults are charging. “Probably” is not a plan.' },
          ],
        },
        {
          text: 'Monitoring shows small quakes getting MORE frequent this month. 📈',
          choices: [
            { label: 'Treat the swarm as a warning — review plans and routes', meters: [['safety', 30]], reflect: 'Swarms can precede bigger events. Preparing costs little; regret does not.', profile: 'Inquirer' },
            { label: 'Post “THE BIG ONE IS TOMORROW” online', meters: [['mood', -30]], reflect: 'Seismologists cannot predict exact days — spreading panic helps nobody.' },
            { label: 'Small quakes mean pressure released, relax', meters: [['safety', -20]], reflect: 'Sometimes true, sometimes the opposite — that is why you watch, not assume.' },
          ],
        },
      ],
    },
  },
  /* Emotional Literacy — early: naming & body signals; mid: vocabulary & masking; upper: patterns & decisions */
  'Personal & Social Development|Emotional Literacy|decision': {
    early: {
      meters: [
        { id: 'words', label: 'Feeling words', emoji: '💬', start: 50 },
        { id: 'body', label: 'Body awareness', emoji: '🫀', start: 50 },
        { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Something made you SUPER angry today — but you are not sure what. 🌋',
          choices: [
            { label: 'Think back: what happened right before?', meters: [['words', 25]], reflect: 'Finding the trigger names the feeling — and named feelings shrink.', profile: 'Thinker' },
            { label: 'Just stay angry all day', meters: [['mood', -20]], reflect: 'Anger without a name runs the whole day.' },
            { label: 'Punch the pillow as hard as you can', meters: [['body', -10]], reflect: 'Big release once in a while — but finding the WHY is the fix.' },
          ],
        },
        {
          text: 'Before the school play, your tummy flips and your hands are cold. 🎭',
          choices: [
            { label: 'That is nervousness — a body signal, not a stop sign', meters: [['body', 25], ['mood', 10]], reflect: 'Your body speaks feelings first. Learning its language helps.', profile: 'Reflective' },
            { label: 'Panic — something must be wrong with me', meters: [['body', -15]], reflect: 'Butterflies are normal fuel, not a fire alarm.' },
            { label: 'Ignore it and freeze on stage', meters: [['mood', -20]], reflect: 'Unheard signals get louder. Listen early.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'words', label: 'Feeling words', emoji: '💬', start: 50 },
        { id: 'body', label: 'Body awareness', emoji: '🫀', start: 50 },
        { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: '“I’m fine” — but your friend’s voice says otherwise. What do you ask? 🎭',
          choices: [
            { label: '“You sound flat — is it more disappointed or worried?”', meters: [['words', 30]], reflect: 'Precise feeling-words help people open the right door.', profile: 'Communicator' },
            { label: '“Fine” means fine. Move on.', meters: [['words', -20]], reflect: 'Masked feelings stay masked when nobody asks twice.' },
            { label: 'Tell everyone they seem upset', meters: [['mood', -10]], reflect: 'Naming feelings FOR someone in public can embarrass.' },
          ],
        },
        {
          text: 'You feel a little annoyed — but it is growing toward furious. 📶',
          choices: [
            { label: 'Notice the dial climbing early and cool it at “annoyed”', meters: [['body', 30]], reflect: 'Mild is manageable. Catching feelings early is the regulation skill.', profile: 'Thinker' },
            { label: 'Wait until it explodes, then deal with it', meters: [['mood', -25]], reflect: 'Explosions are harder to clean than sparks.' },
            { label: 'Push it down and smile', meters: [['body', -15]], reflect: 'Pressed-down feelings press back out sideways.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'words', label: 'Feeling words', emoji: '💬', start: 50 },
        { id: 'body', label: 'Body awareness', emoji: '🫀', start: 50 },
        { id: 'mood', label: 'Calm', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'You keep feeling flat every Sunday evening. Same time, every week. 📅',
          choices: [
            { label: 'Map the pattern: what starts Sunday nights?', meters: [['words', 30]], reflect: 'Emotional patterns are clues — and clues can be planned around.', profile: 'Reflective' },
            { label: 'Decide you are just a sad person', meters: [['mood', -25]], reflect: 'A pattern is a situation repeating — not your identity.' },
            { label: 'Cancel Sunday nights entirely', meters: [['mood', -10]], reflect: 'Avoiding the trigger avoids the lesson too.' },
          ],
        },
        {
          text: 'Big decision: two clubs, both great, and your chest feels torn. ⚖️',
          choices: [
            { label: 'Name each feeling, hear what each one protects', meters: [['words', 25], ['body', 20]], reflect: 'Mixed feelings carry two messages — hear both before choosing.', profile: 'Thinker' },
            { label: 'Flip a coin, feelings are noise', meters: [['body', -20]], reflect: 'Feelings are data. Deleting data makes worse decisions.' },
            { label: 'Pick whichever feels less scary', meters: [['mood', -15]], reflect: 'Least scary is often least growth. Fear flags the frontier.' },
          ],
        },
      ],
    },
  },

  /* Friendship & Cooperation — early: group basics; mid: communication & change; upper: feedback, mediation, consent */
  'Personal & Social Development|Friendship & Cooperation|decision': {
    early: {
      meters: [
        { id: 'team', label: 'Teamwork', emoji: '🤝', start: 55 },
        { id: 'kind', label: 'Kindness', emoji: '💛', start: 55 },
        { id: 'mood', label: 'Fun', emoji: '😊', start: 60 },
      ],
      scenes: [
        {
          text: 'Group build time! Everyone wants to be the builder. 🏗️',
          choices: [
            { label: 'Assign roles: designer, builder, finder, checker', meters: [['team', 30]], reflect: 'Roles make groups work — everyone matters, everyone builds.', profile: 'Thinker' },
            { label: 'Loudest kid builds, rest watch', meters: [['team', -25]], reflect: 'One builder, four spectators — that is a show, not a team.' },
            { label: 'All build at once on the same bit', meters: [['mood', -15]], reflect: 'Six hands, one tower — it falls faster than it rises.' },
          ],
        },
        {
          text: 'Your build keeps falling and you are stuck. Ask for help? 🆘',
          choices: [
            { label: 'Ask clearly: “Can you hold this while I fix the base?”', meters: [['team', 25], ['kind', 10]], reflect: 'Asking for help with a clear request is a strength, not a weakness.', profile: 'Communicator' },
            { label: 'Never ask — they will think you are bad at it', meters: [['team', -20]], reflect: 'Unasked questions build wobbly towers AND lonely days.' },
            { label: 'Grab someone’s arm and pull them over', meters: [['kind', -20]], reflect: 'Help works better when it is invited, not grabbed.' },
          ],
        },
      ],
    },
    mid: {
      meters: [
        { id: 'team', label: 'Teamwork', emoji: '🤝', start: 55 },
        { id: 'kind', label: 'Kindness', emoji: '💛', start: 55 },
        { id: 'mood', label: 'Trust', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'Your friend group is drifting — different interests now. 🍂',
          choices: [
            { label: 'Name it gently, plan things you BOTH still enjoy', meters: [['mood', 25]], reflect: 'Friendships change shape. Naming it keeps the change kind.', profile: 'Communicator' },
            { label: 'Act like nothing is happening', meters: [['mood', -15]], reflect: 'Pretending turns slow drift into sudden silence.' },
            { label: 'Force the old hangouts to continue', meters: [['mood', -20]], reflect: 'Scheduled fun dies loudly. Let interests breathe.' },
          ],
        },
        {
          text: 'You want to borrow a friend’s expensive sketch pens. 🖊️',
          choices: [
            { label: 'Ask first, agree when and how, care for them', meters: [['team', 25]], reflect: 'Permission plus care is the whole recipe for lending without losing friends.', profile: 'Principled' },
            { label: 'Just take them — friends share', meters: [['kind', -20]], reflect: 'Sharing is a gift, not a right. Taking makes it theft.' },
            { label: 'Borrow secretly, return them clean', meters: [['mood', -15]], reflect: 'Secret borrowing breaks trust even when the pens come back.' },
          ],
        },
      ],
    },
    upper: {
      meters: [
        { id: 'team', label: 'Teamwork', emoji: '🤝', start: 55 },
        { id: 'kind', label: 'Kindness', emoji: '💛', start: 55 },
        { id: 'mood', label: 'Trust', emoji: '🤝', start: 60 },
      ],
      scenes: [
        {
          text: 'Two teammates are at each other’s throats about the design. ⚔️',
          choices: [
            { label: 'Hear each side separately, find the shared goal', meters: [['team', 30]], reflect: 'Mediation is not judging — it is finding the goal both sides share.', profile: 'Peacemaker' },
            { label: 'Pick the side that argues better', meters: [['team', -20]], reflect: 'Louder is not righter. The goal matters more than the style.' },
            { label: 'Tell the teacher immediately', meters: [['team', 5], ['mood', -10]], reflect: 'Adults help for real harms — but kids can try the simple talks first.' },
          ],
        },
        {
          text: 'You want to post a group photo — one friend looks embarrassed in it. 📸',
          choices: [
            { label: 'Ask each person before posting — no means no', meters: [['mood', 30]], reflect: 'Consent is checking, hearing the answer, and keeping it.', profile: 'Principled' },
            { label: 'Post it — looking silly is funny', meters: [['mood', -30]], reflect: 'Their face, their call. Humour at someone’s cost is a bill.' },
            { label: 'Post it but crop them out silently', meters: [['mood', -15]], reflect: 'Silent cropping skips the ask — asking IS the respect.' },
          ],
        },
      ],
    },
  },
  /* =================== Batch 4 — Sequences, 3D stops, memory, arcade =================== */

  /* Algorithms & Programming — early: step-by-step; mid: decisions & loops; upper: variables */
  'Computing|Algorithms & Programming|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'A robot does EXACTLY what you say. Order the program.',
      cards: [
        { label: 'Say the goal: make a jam sandwich', emoji: '🥯', why: 'Algorithms start with a clear goal.', clue: 'Programs begin with the goal.' },
        { label: 'Write each step in order', emoji: '📝', why: 'Step 1, step 2, step 3 — order matters!', clue: 'Then the steps.' },
        { label: 'Follow the steps EXACTLY', emoji: '🤖', why: 'Robots never guess — they do what is written.', clue: 'Then run it.' },
        { label: 'Oops! Find the broken step', emoji: '🐛', why: 'Debugging = finding the exact step that went wrong.', clue: 'Then debug.' },
        { label: 'Fix it and try again', emoji: '✅', why: 'Fixed algorithms run the same way every time.', clue: 'Fixes come last.' },
      ],
      celebrate: 'You programmed a sandwich — and debugged it like a real coder!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order the parts of a real program from start to finish.',
      cards: [
        { label: 'Get the input: speed and place', emoji: '⌨️', why: 'Programs that choose start by asking for information.', clue: 'Input comes first.' },
        { label: 'Check conditions with IF / ELSE', emoji: '🔀', why: 'IF rainy THEN coat ELSE shorts — decisions steer the path.', clue: 'Decisions use the input.' },
        { label: 'Repeat the sweep with a LOOP', emoji: '🔁', why: 'Loops repeat steps without rewriting them.', clue: 'Loops repeat the work.' },
        { label: 'Sweep AND whistle at the same time', emoji: '🎭', why: 'Concurrent events run side by side instead of taking turns.', clue: 'Parallel work runs last — it needs the other parts running.' },
      ],
      celebrate: 'Input, decisions, loops, concurrency — you ordered real code!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order how a variable stores and changes a value.',
      cards: [
        { label: 'Create a box named SCORE', emoji: '📦', why: 'A variable is a labelled box that holds a value.', clue: 'The box must exist first.' },
        { label: 'Store 0 in SCORE at the start', emoji: '💾', why: 'Initialising gives the box a starting value.', clue: 'Then give it a first value.' },
        { label: 'Update SCORE each round: SCORE + 1', emoji: '⬆️', why: 'Variables change while the program runs — that is their power.', clue: 'Values change as the game runs.' },
        { label: 'Read SCORE to announce the winner', emoji: '🏆', why: 'The final value answers the question the box was created for.', clue: 'Reading comes at the end.' },
      ],
      celebrate: 'Create, store, update, read — you ran a variable’s whole life!',
    },
  },

  /* Designing Digital Solutions — mid: criteria & storyboard; upper: UI & community impact */
  'Computing|Designing Digital Solutions|sequence': {
    mid: {
      mode: 'linear',
      explorePrompt: 'Order the design steps for a school-lunch app.',
      cards: [
        { label: 'Ask: who needs this, and why?', emoji: '🙋', why: 'User stories start with real people: “As a hungry kid, I want…”.', clue: 'People first.' },
        { label: 'Write the user stories', emoji: '📖', why: '“As a… I want… so that…” turns wishes into requirements.', clue: 'Then the stories.' },
        { label: 'Storyboard the screens', emoji: '🎬', why: 'Sketch each screen and what leads where — the app’s map.', clue: 'Then draw the flow.' },
        { label: 'Check it against the criteria', emoji: '✅', why: '“Does it pass the test?” — criteria written at the start judge the end.', clue: 'Testing comes last.' },
      ],
      celebrate: 'Stories to storyboard to test — you designed like a real developer!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order a digital solution from problem to impact.',
      cards: [
        { label: 'Research the community problem', emoji: '🏘️', why: 'Interviews and data show what actually needs solving.', clue: 'Understand before building.' },
        { label: 'Design the interface: clear, simple, tested', emoji: '👆', why: 'A UI someone cannot use is a solution nobody gets.', clue: 'Then design for humans.' },
        { label: 'Build and test with real users', emoji: '🧪', why: 'Real users break assumptions politely — before launch.', clue: 'Then test with them.' },
        { label: 'Measure the impact: did it help?', emoji: '📊', why: '“Does your app help the town?” is answered with evidence, not hopes.', clue: 'Impact is measured last.' },
      ],
      celebrate: 'Problem to measured impact — that is responsible design!',
    },
  },

  /* Design & Technology — early: make it safely; mid: design factors; upper: tools & plans */
  'Science|Design & Technology|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Order making something that solves a problem.',
      cards: [
        { label: 'Find the problem or wish', emoji: '🔍', why: 'Design starts with “someone needs…”.', clue: 'Every design starts with a need.' },
        { label: 'Draw what it could look like', emoji: '✏️', why: 'Sketches are cheap — failures on paper cost nothing.', clue: 'Then draw it.' },
        { label: 'Cut, join and shape safely', emoji: '✂️', why: 'Tools work when fingers stay out of the way.', clue: 'Then make it.' },
        { label: 'Try it and make it better', emoji: '🔧', why: 'First versions are drafts — testing improves them.', clue: 'Improve comes last.' },
      ],
      celebrate: 'Need, sketch, make, improve — the design loop!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order how real designs take shape.',
      cards: [
        { label: 'Ask who will use it and where', emoji: '👥', why: 'User, place and purpose shape every choice that follows.', clue: 'People first.' },
        { label: 'List what it must do', emoji: '📋', why: 'Requirements are the design’s “musts” and “nice-to-haves”.', clue: 'Then the musts.' },
        { label: 'Sketch options, pick materials', emoji: '🖍️', why: 'Material choices trade cost, strength and looks.', clue: 'Then sketch and choose.' },
        { label: 'Test against each factor', emoji: '🧪', why: 'Every factor on the list gets a verdict from the test.', clue: 'Testing judges last.' },
      ],
      celebrate: 'User, needs, materials, tests — designs shaped by factors!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order a real workshop build, safely.',
      cards: [
        { label: 'Write the project plan with steps', emoji: '📝', why: 'Plans list every cut and joint before the saw starts.', clue: 'Plans come first.' },
        { label: 'Choose the right tool for each job', emoji: '🪚', why: 'Saws cut, drills bore, adhesives bond — tools suit their job.', clue: 'Then pick tools.' },
        { label: 'Cut, drill and join with safety gear', emoji: '🥽', why: 'Goggles on, hair tied, helper near — then the saw moves.', clue: 'Then build safely.' },
        { label: 'Finish, check against the plan', emoji: '✅', why: 'The plan is the judge: every step checked off or fixed.', clue: 'Checking closes the build.' },
      ],
      celebrate: 'Plan, tools, safe build, check — workshop ready!',
    },
  },

  /* Dinosaurs & Paleontology — early: fossils; mid: a life; upper: extinction & discovery */
  'Science|Dinosaurs & Paleontology|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'How does a dinosaur become a fossil? Order it.',
      cards: [
        { label: 'A dinosaur dies near a river', emoji: '🦴', why: 'Fossilisation starts with the unlucky-but-perfect spot.', clue: 'It begins with the dinosaur.' },
        { label: 'Mud covers the bones', emoji: '🟤', why: 'Quick burial hides bones from weather and scavengers.', clue: 'Then it is buried.' },
        { label: 'Minerals seep in, bone turns to stone', emoji: '💎', why: 'Slow mineral swaps turn bone to rock — a fossil!', clue: 'Stone-forming takes ages.' },
        { label: 'A palaeontologist uncovers it', emoji: '🔍', why: 'Millions of years later, careful brushes reveal the past.', clue: 'Discovery comes last.' },
      ],
      celebrate: 'You ordered a 100-million-year story!',
    },
    mid: {
      mode: 'cycle',
      explorePrompt: 'Order a dinosaur’s life, from egg to parent.',
      cards: [
        { label: 'Hatch from a leathery egg', emoji: '🥚', why: 'Even T. rex started the size of a house cat.', clue: 'All dinosaurs begin as eggs.' },
        { label: 'Grow fast — eat everything', emoji: '🌿', why: 'Some dinos gained kilos every day to reach giant size.', clue: 'Growth comes after hatching.' },
        { label: 'Survive predators and rivals', emoji: '🦖', why: 'Horns, speed and herds kept juveniles alive.', clue: 'Survival comes next.' },
        { label: 'Nest and lay eggs of your own', emoji: '🪹', why: 'Nesting colonies show dinosaurs cared for nests — the cycle restarts.', clue: 'The cycle ends where it began.' },
      ],
      celebrate: 'Egg to adult to egg — the dinosaur cycle!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order the end of the dinosaurs — and the beginning of the story we tell.',
      cards: [
        { label: 'An asteroid strikes Earth', emoji: '💥', why: 'A 10-kilometre rock hit 66 million years ago.', clue: 'It starts with the impact.' },
        { label: 'Dust blocks sunlight worldwide', emoji: '🌑', why: 'Skies darkened; photosynthesis crashed.', clue: 'Then darkness.' },
        { label: 'Food chains collapse', emoji: '🥀', why: 'Plants first, then herbivores, then the giants that ate them.', clue: 'Hunger spreads up the chain.' },
        { label: 'Small survivors inherit Earth', emoji: '🐦', why: 'Feathered dinosaurs survived — today we call them birds.', clue: 'Survivors come after collapse.' },
        { label: 'Fossils tell scientists the story', emoji: '🏛️', why: 'Every dig site adds a sentence to the extinction chapter.', clue: 'The retelling comes last.' },
      ],
      celebrate: 'Impact to birds to museums — the whole arc!',
    },
  },

  /* Speaking & Listening — early: conversations; mid: presentations; upper: discussion skills */
  'English|Speaking & Listening|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Order the steps of a kind conversation.',
      cards: [
        { label: 'Greet and look at your partner', emoji: '👋', why: 'A hello and eye contact say “I am ready to listen.”', clue: 'Conversations open warmly.' },
        { label: 'Listen without interrupting', emoji: '👂', why: 'Quiet lips and busy ears let the idea land.', clue: 'Then listen.' },
        { label: 'Ask a question about their idea', emoji: '❓', why: 'Questions show you really heard them.', clue: 'Questions follow listening.' },
        { label: 'Build on it: “Yes, and…”', emoji: '➕', why: 'Adding your idea to theirs makes a bigger idea.', clue: 'Growing the idea comes after.' },
      ],
      celebrate: 'That is a conversation worth copying!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order how to give a clear, short talk.',
      cards: [
        { label: 'Plan the words: precise, not fancy', emoji: '📝', why: 'Choosing exact words BEFORE speaking saves the wobble.', clue: 'Preparation first.' },
        { label: 'Open with what the listeners get', emoji: '🎣', why: 'Engaging listeners means starting with what matters to THEM.', clue: 'Then hook them.' },
        { label: 'Explain with one clear example', emoji: '💡', why: 'Examples carry meaning better than adjectives.', clue: 'Examples explain.' },
        { label: 'Read faces, invite questions', emoji: '👀', why: 'Valuing viewpoints means noticing confusion and welcoming questions.', clue: 'Listening closes the talk.' },
      ],
      celebrate: 'Plan, hook, example, listen — a talk worth hearing!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order a real discussion, from hearing to deciding.',
      cards: [
        { label: 'Hear the whole point before judging', emoji: '👂', why: 'Evaluating an argument starts with hearing ALL of it.', clue: 'Understand first.' },
        { label: 'Paraphrase it back: “So your point is…”', emoji: '🪞', why: 'Paraphrasing proves understanding — and catches misreadings early.', clue: 'Then mirror it.' },
        { label: 'Add evidence or a different view', emoji: '➕', why: 'Building on others turns opinions into arguments.', clue: 'Then build.' },
        { label: 'Draw the group’s conclusion together', emoji: '🧭', why: 'Conclusions from discussion belong to everyone who built them.', clue: 'Deciding comes last.' },
      ],
      celebrate: 'Hear, mirror, build, conclude — discussion mastered!',
    },
  },

  /* Writing Composition — early: say-write-check; mid: paragraphs & audience; upper: evidence & craft */
  'English|Writing Composition|sequence': {
    early: {
      mode: 'linear',
      explorePrompt: 'Order the writing steps that make writing easy.',
      cards: [
        { label: 'Say your sentence out loud', emoji: '🗣️', why: 'Saying it first means you already know what to write.', clue: 'Say it before writing it.' },
        { label: 'Plan the beginning and the end', emoji: '📝', why: 'A start and a finish hold a simple story together.', clue: 'Then plan the shape.' },
        { label: 'Write it down', emoji: '✏️', why: 'Now your hand just copies what your voice made.', clue: 'Then write.' },
        { label: 'Check it, then share it', emoji: '🌟', why: 'Reading it back catches the missing bits — then publish!', clue: 'Checking comes last.' },
      ],
      celebrate: 'Say, plan, write, check — writing made simple!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order how a strong piece comes together.',
      cards: [
        { label: 'Match form and tone to your reader', emoji: '👥', why: 'A letter to Grandma ≠ a poster for Year 3 — audience decides.', clue: 'Reader first.' },
        { label: 'Group ideas into paragraphs', emoji: '🧱', why: 'One idea per paragraph — the reader gets breathing room.', clue: 'Then structure.' },
        { label: 'Vary sentences, pick vivid words', emoji: '💎', why: 'Rehearsing sentences out loud finds the rhythm that works.', clue: 'Then craft the words.' },
        { label: 'Revise: read aloud, fix, polish', emoji: '✨', why: 'Revision is where good writing actually happens.', clue: 'Revising comes last — twice.' },
      ],
      celebrate: 'Audience, paragraphs, vivid words, revision — craft complete!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order a research-backed piece from question to final cut.',
      cards: [
        { label: 'Research and take notes', emoji: '🔍', why: 'Notes with sources become evidence; facts without sources stay rumours.', clue: 'Evidence first.' },
        { label: 'Plan the arc or argument', emoji: '🗺️', why: 'Narratives need a shape; arguments need a route.', clue: 'Then the plan.' },
        { label: 'Draft with evidence and figurative flair', emoji: '🖋️', why: 'Quoted evidence AND a well-aimed metaphor — different tools, same goal.', clue: 'Then draft.' },
        { label: 'Edit hard: cut what does not serve', emoji: '✂️', why: 'A précis mindset: every line earns its place or loses it.', clue: 'Cutting comes last.' },
      ],
      celebrate: 'Notes, arc, draft, cut — writing with evidence and style!',
    },
  },

  /* Organisms & Life Processes — early: plant growth; mid: pollination; upper: digestion */
  'Science|Organisms & Life Processes|sequence': {
    early: {
      mode: 'cycle',
      explorePrompt: 'Order how a plant grows, round and round.',
      cards: [
        { label: 'A seed settles in the soil', emoji: '🌰', why: 'Inside the seed: a tiny plant and its packed lunch.', clue: 'All plants start as seeds.' },
        { label: 'Roots down, shoot up', emoji: '🌱', why: 'Roots drink; the shoot races to the light.', clue: 'Growth starts underground.' },
        { label: 'Leaves catch the sunlight', emoji: '🍃', why: 'Leaves are the plant’s food-makers.', clue: 'Leaves come after the shoot.' },
        { label: 'Flowers make new seeds', emoji: '🌸', why: 'New seeds fall, and the cycle starts again.', clue: 'Seeds restart the cycle.' },
      ],
      celebrate: 'Seed to flower to seed — the plant cycle complete!',
    },
    mid: {
      mode: 'linear',
      explorePrompt: 'Order the journey of pollination, step by step.',
      cards: [
        { label: 'A bee lands for nectar', emoji: '🐝', why: 'The flower pays nectar for the delivery service.', clue: 'It starts with a visitor.' },
        { label: 'Pollen sticks to its fuzzy legs', emoji: '🟡', why: 'Pollen is the flower’s parcel, addressed to another flower.', clue: 'The parcel is picked up.' },
        { label: 'Pollen lands on another flower’s stigma', emoji: '🌸', why: 'Delivery! The stigma catches the right pollen.', clue: 'The parcel is delivered.' },
        { label: 'Seeds form and disperse', emoji: '🫘', why: 'Wind, water and animals carry the next generation away.', clue: 'Seeds spread last.' },
      ],
      celebrate: 'Nectar, pollen, stigma, seed — pollination delivered!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Follow your lunch through the digestive system.',
      cards: [
        { label: 'Teeth and saliva break it down', emoji: '🦷', why: 'Mechanical grinding plus chemical saliva start the work.', clue: 'It starts in the mouth.' },
        { label: 'Down the oesophagus to the stomach', emoji: '🫙', why: 'Muscles squeeze the food down — you do not push it.', clue: 'Then the ride down.' },
        { label: 'Nutrients absorbed in the intestine', emoji: '🌀', why: 'The long, folded intestine passes nutrients into the blood.', clue: 'Absorption is the payoff.' },
        { label: 'Water recovered, waste out', emoji: '🚽', why: 'The body is thrifty — even water gets recycled before waste leaves.', clue: 'Waste leaves last.' },
      ],
      celebrate: 'Mouth to blood to out — digestion traced end to end!',
    },
  },

  /* Weather & Climate — early: seasons; mid: water cycle; upper: atmosphere circulation */
  'Science|Weather & Climate|sequence': {
    early: {
      mode: 'cycle',
      explorePrompt: 'Order the four seasons as they come.',
      cards: [
        { label: 'Spring: blossoms and rain', emoji: '🌸', why: 'Warm rains wake the seeds and the bees.', clue: 'Many calendars start with spring.' },
        { label: 'Summer: long, bright days', emoji: '☀️', why: 'The sun stays up late — growth mode.', clue: 'Summer follows spring.' },
        { label: 'Autumn: leaves fall, winds cool', emoji: '🍂', why: 'Trees pack up for the cold — days shorten.', clue: 'Cooling comes after summer.' },
        { label: 'Winter: cold, short days', emoji: '❄️', why: 'Resting season — then spring returns.', clue: 'Winter loops back to spring.' },
      ],
      celebrate: 'Spring, summer, autumn, winter — the year in order!',
    },
    mid: {
      mode: 'cycle',
      explorePrompt: 'Order the water cycle — no beginning, no end.',
      cards: [
        { label: 'The sun lifts water as vapor', emoji: '♨️', why: 'Evaporation: liquid to invisible gas, powered by sunlight.', clue: 'The sun powers the cycle.' },
        { label: 'Vapor cools into clouds', emoji: '☁️', why: 'High and cold, vapor condenses into droplets.', clue: 'Up high it cools.' },
        { label: 'Drops fall as rain or snow', emoji: '🌧️', why: 'Heavy droplets fall — precipitation lands.', clue: 'What goes up comes down.' },
        { label: 'Water flows back to the sea', emoji: '🌊', why: 'Rivers and runoff return it — ready to evaporate again.', clue: 'The sea restarts the cycle.' },
      ],
      celebrate: 'Evaporation to cloud to rain to river — the endless loop!',
    },
    upper: {
      mode: 'linear',
      explorePrompt: 'Order how sunlight builds Earth’s climate zones.',
      cards: [
        { label: 'The equator gets the most direct sun', emoji: '☀️', why: 'Sunlight hits straight-on there — energy per square metre is highest.', clue: 'Start with the strongest sun.' },
        { label: 'Warm air rises at the equator', emoji: '🎈', why: 'Rising warm air leaves low pressure and hauling rain.', clue: 'Hot air climbs.' },
        { label: 'Currents and winds spread the heat', emoji: '🌬️', why: 'Ocean currents and winds move heat toward the poles.', clue: 'Heat travels.' },
        { label: 'Zones form: tropical, temperate, polar', emoji: '🗺️', why: 'The uneven heat map draws the climate zones we live in.', clue: 'Zones are the result.' },
      ],
      celebrate: 'Sun to wind to currents to zones — the climate machine explained!',
    },
  },

  /* 3D band stops — shared worlds, band-tiered questions */
  'Science|Space Exploration|solar3d': {
    early: {
      cases: [
        { prompt: 'Case 1: Tap the planet we ALL live on, then commit.', answer: 'Earth', why: 'Earth — the blue one with oceans, air and life.', nudge: 'Read each fact as you tap. We live on the blue one!' },
        { prompt: 'Case 2: Find the BIGGEST planet and commit.', answer: 'Jupiter', why: 'Jupiter is the giant of the solar system.', nudge: 'Size matters here — which ball is biggest?' },
        { prompt: 'Case 3: Which planet wears bright rings?', answer: 'Saturn', why: 'Saturn’s rings are made of ice and rock.', nudge: 'Look for the one with a ring around it.' },
      ],
    },
    mid: {
      cases: [
        { prompt: 'Case 1: Which planet orbits CLOSEST to the Sun?', answer: 'Mercury', why: 'Mercury hugs the Sun — its year is only 88 days!', nudge: 'Who is first in line around the Sun?' },
        { prompt: 'Case 2: Find the RED planet.', answer: 'Mars', why: 'Rusty iron dust paints Mars red.', nudge: 'One planet looks like rust all over.' },
        { prompt: 'Case 3: Which planet spins tilted on its SIDE?', answer: 'Uranus', why: 'Uranus rolls around the Sun like a barrel — knocked over long ago.', nudge: 'One planet lies almost flat as it orbits.' },
      ],
    },
    upper: {
      cases: [
        { prompt: 'Case 1: Which is the FIFTH planet from the Sun?', answer: 'Jupiter', why: 'Four rocky planets, then Jupiter — the giant gatekeeper.', nudge: 'Count the orbits outward from the Sun.' },
        { prompt: 'Case 2: Which planet is CLOSEST in size to Earth?', answer: 'Venus', why: 'Venus is Earth’s near-twin in size — though not in weather!', nudge: 'Compare the spheres’ sizes as you tap.' },
        { prompt: 'Case 3: Which planet has the SHORTEST year?', answer: 'Mercury', why: 'Closest to the Sun means fastest orbit — 88 Earth days.', nudge: 'Short year = short lap = closest track.' },
      ],
    },
  },

  'Science|Space Systems & Earth\'s History|spatial3d': {
    early: {
      cases: [
        { city: 'Cairo', lat: 30, lon: 30, prompt: 'Spin the Earth so Cairo is in NIGHT, then predict and commit.', why: 'You turned Cairo away from the Sun —', nudge: 'Night is the side facing away from the Sun.' },
        { city: 'Mexico City', lat: 19, lon: -99, prompt: 'Now put Mexico City in DAYLIGHT. Predict first!', why: 'Facing the Sun means morning light —', nudge: 'Day is the side the Sun shines on.' },
        { city: 'Sydney', lat: -34, lon: 151, prompt: 'Send Sydney into night without moving Cairo. Ready?', why: 'Earth’s spin gives every place its turn —', nudge: 'Spin the globe, not the Sun.' },
      ],
    },
    mid: {
      cases: [
        { city: 'London', lat: 51, lon: 0, prompt: 'Rotate Earth so London is in DAYLIGHT, then commit.', why: 'London faces the Sun — Greenwich watches noon —', nudge: 'Zero longitude is London’s meridian!' },
        { city: 'Tokyo', lat: 35, lon: 139, prompt: 'Now it is midnight in Tokyo. Make it so.', why: 'Tokyo far from the Sun means deep night —', nudge: 'Tokyo sits far around the globe from London.' },
        { city: 'Delhi', lat: 28, lon: 77, prompt: 'Spin Delhi from morning into night — watch the shadow.', why: 'Every 24 hours the spin carries each city around —', nudge: 'One full spin = one full day.' },
      ],
    },
    upper: {
      cases: [
        { city: 'Reykjavik', lat: 64, lon: -22, prompt: 'Bring high-latitude Reykjavik into daylight, then commit.', why: 'Near the pole, daylight lingers long in summer —', nudge: 'High latitudes tilt toward the Sun in summer.' },
        { city: 'Cape Town', lat: -33, lon: 18, prompt: 'Make it night in Cape Town — southern hemisphere!', why: 'When the north is dark, the south faces the Sun —', nudge: 'Southern cities are BELOW the equator line.' },
        { city: 'Ushuaia', lat: -54, lon: -68, prompt: 'Spin the Earth so Ushuaia gets its turn of night.', why: 'The far south rides the widest circle — its nights differ —', nudge: 'Almost the bottom of the globe.' },
      ],
    },
  },

  'Science|Volcanoes & Earthquakes|volcano3d': {
    early: {
      cases: [
        { prompt: 'Case 1: Raise the pressure slowly. Predict — will it erupt? Commit your answer.', predict: 'erupt', why: 'Pressure wins —', nudge: 'Watch the smoke and the glow: what is the mountain telling you?' },
        { prompt: 'Case 2: Now keep the mountain CALM. What pressure lets it rest?', predict: 'calm', why: 'Low pressure —', nudge: 'Big numbers shake the ground. What keeps it quiet?' },
        { prompt: 'Case 3: Find the exact pressure where eruption begins.', predict: 'erupt', why: 'At pressure 4 —', nudge: 'Try each level and watch for the first lava bombs.' },
      ],
    },
    mid: {
      cases: [
        { prompt: 'Case 1: DOUBLE the pressure from 2 to 4. Predict: erupt or calm?', predict: 'erupt', why: 'Pressure doubles, so the blast —', nudge: 'More pressure means more energy waiting.' },
        { prompt: 'Case 2: Find the HIGHEST pressure the volcano can hold back.', predict: 'calm', why: 'The rock lid holds until 4 —', nudge: 'Push up one step at a time until the glow appears, then ease back.' },
        { prompt: 'Case 3: Pressure at 4 again. Predict the eruption — bigger or same as pressure 2?', predict: 'erupt', why: 'Same lid, more gas — the blast scales —', nudge: 'Compare the plume height with the pressure-2 eruption.' },
      ],
    },
    upper: {
      cases: [
        { prompt: 'Case 1: Pressure climbs past 4 into the red. Predict.', predict: 'erupt', why: 'Beyond the lid’s strength, the magma wins —', nudge: 'The lid has a strength limit — find the threshold.' },
        { prompt: 'Case 2: Keep it calm at pressure 3 — then explain WHY 3 is safe and 5 is not.', predict: 'calm', why: '3 sits under the lid’s limit —', nudge: 'The margin between hold and blow-out is the story.' },
        { prompt: 'Case 3: A swarm of small quakes + rising pressure. Predict the next move of the mountain.', predict: 'erupt', why: 'Quakes are magma on the move —', nudge: 'Monitoring reads warnings: swarm + pressure = readiness.' },
      ],
    },
  },

  /* Memory band sets — reader strategies & word meanings */
  'English|English Thinking|memory': {
    early: {
      explorePrompt: 'Flip two cards. Match each reader move to what it looks like!',
      celebrate: 'You know the secret moves good readers use!',
      pairs: [
        { a: { label: 'Predict', emoji: '🔮' }, b: { label: 'Guess what happens next', emoji: '➡️' }, why: 'Predict: guess ahead — then read on to check.' },
        { a: { label: 'Question', emoji: '❓' }, b: { label: 'Ask who? why? how?', emoji: '🗣️' }, why: 'Question: ask the text questions as you go.' },
        { a: { label: 'Picture', emoji: '🖼️' }, b: { label: 'Make a movie in your mind', emoji: '🎬' }, why: 'Picture: build the scene from the words.' },
        { a: { label: 'Connect', emoji: '🔗' }, b: { label: 'Link it to YOUR life', emoji: '🧒' }, why: 'Connect: “That happened to me too!”' },
        { a: { label: 'Infer', emoji: '🕵️' }, b: { label: 'Read the hidden clue', emoji: '🔍' }, why: 'Infer: the text hints — you conclude.' },
        { a: { label: 'Check', emoji: '✅' }, b: { label: 'Did I get it? Reread!', emoji: '🔁' }, why: 'Check: notice confusion and reread it.' },
      ],
    },
    mid: {
      explorePrompt: 'Flip two cards. Match each strategy to how it works.',
      celebrate: 'Strategies on call — that is how readers think!',
      pairs: [
        { a: { label: 'Summarise', emoji: '📉' }, b: { label: 'Shrink it to the big bits', emoji: '🧳' }, why: 'Summarise: keep the spine, lose the details.' },
        { a: { label: 'Infer', emoji: '🕵️' }, b: { label: 'Clue + knowledge = conclusion', emoji: '🧩' }, why: 'Inference joins text clues with what you already know.' },
        { a: { label: 'Visualise', emoji: '🖼️' }, b: { label: 'Senses on: see, hear, smell the scene', emoji: '🎬' }, why: 'Visualising with ALL senses locks the scene in.' },
        { a: { label: 'Question the author', emoji: '🗣️' }, b: { label: 'Why THIS word? Why now?', emoji: '🤨' }, why: 'Authors choose everything — ask about the choices.' },
        { a: { label: 'Monitor', emoji: '🚨' }, b: { label: 'Notice confusion early', emoji: '⚠️' }, why: 'Monitoring catches the drift before you are lost.' },
        { a: { label: 'Repair', emoji: '🔧' }, b: { label: 'Reread, read on, say it aloud', emoji: '🔁' }, why: 'Repair strategies fix the wobble monitoring finds.' },
      ],
    },
    upper: {
      explorePrompt: 'Flip two cards. Match each advanced move to its method.',
      celebrate: 'Senior-reader strategies unlocked!',
      pairs: [
        { a: { label: 'Synthesise', emoji: '🧬' }, b: { label: 'Join texts into one big idea', emoji: '🌐' }, why: 'Synthesis merges sources — the idea is bigger than any one text.' },
        { a: { label: 'Corroborate', emoji: '🔗' }, b: { label: 'Check one source against another', emoji: '⚖️' }, why: 'Corroboration tests claims — agreement and disagreement are both data.' },
        { a: { label: 'Evaluate craft', emoji: '🖌️' }, b: { label: 'Why did the author CHOOSE that?', emoji: '🤔' }, why: 'Evaluating craft asks about effect, not just events.' },
        { a: { label: 'Track argument', emoji: '🧵' }, b: { label: 'Claim → reasons → evidence', emoji: '📏' }, why: 'Arguments have a skeleton — follow it to judge strength.' },
        { a: { label: 'Adjust fluency', emoji: '🎚️' }, b: { label: 'Slow for hard parts, speed for easy', emoji: '🚗' }, why: 'Flexible pace is a choice good readers make per paragraph.' },
      ],
    },
  },

  'English|Vocabulary|memory': {
    early: {
      explorePrompt: 'Flip two cards. Match each word to what it means!',
      celebrate: 'Every word found its meaning — your word collection is growing!',
      pairs: [
        { a: { label: 'happy', emoji: '😊' }, b: { label: 'very glad', emoji: '🙌' }, why: 'Happy and glad — the same feeling family (synonyms).' },
        { a: { label: 'huge', emoji: '🦕' }, b: { label: 'very big', emoji: '🗻' }, why: 'Huge means very big!' },
        { a: { label: 'tiny', emoji: '🐜' }, b: { label: 'very small', emoji: '🤏' }, why: 'Tiny means very small — the opposite of huge!' },
        { a: { label: 'brave', emoji: '🦁' }, b: { label: 'not scared', emoji: '💪' }, why: 'Brave means facing things without fear.' },
        { a: { label: 'sleepy', emoji: '😴' }, b: { label: 'wanting to sleep', emoji: '🛏️' }, why: 'Sleepy — your body is asking for bed.' },
        { a: { label: 'tidy', emoji: '🧹' }, b: { label: 'neat and clean', emoji: '✨' }, why: 'Tidy is the opposite of messy.' },
      ],
    },
    mid: {
      explorePrompt: 'Flip two cards. Match each word to its meaning.',
      celebrate: 'Sharper words, sharper thinking!',
      pairs: [
        { a: { label: 'ancient', emoji: '🏺' }, b: { label: 'very, very old', emoji: '⏳' }, why: 'Ancient — older than anyone can remember.' },
        { a: { label: 'fragile', emoji: '🥚' }, b: { label: 'breaks easily', emoji: '💥' }, why: 'Fragile things need gentle hands.' },
        { a: { label: 'nervous', emoji: '😰' }, b: { label: 'a bit scared', emoji: '🦋' }, why: 'Nervous is scared-but-managing — butterflies.' },
        { a: { label: 'gather', emoji: '🧺' }, b: { label: 'collect together', emoji: '🤲' }, why: 'Gather means bring things into one place.' },
        { a: { label: 'vanish', emoji: '🎩' }, b: { label: 'disappear suddenly', emoji: '✨' }, why: 'Vanish — there one second, gone the next.' },
        { a: { label: 'feast', emoji: '🍽️' }, b: { label: 'a big special meal', emoji: '🥳' }, why: 'A feast is a meal with extras and celebration.' },
      ],
    },
    upper: {
      explorePrompt: 'Flip two cards. Match each word to its precise meaning.',
      celebrate: 'Precision vocabulary — your writing just levelled up!',
      pairs: [
        { a: { label: 'reluctant', emoji: '🙅' }, b: { label: 'not wanting to', emoji: '🐢' }, why: 'Reluctant — dragged feet, even if you do it.' },
        { a: { label: 'essential', emoji: '🔑' }, b: { label: 'absolutely needed', emoji: '🧯' }, why: 'Essential means you cannot do without it.' },
        { a: { label: 'vivid', emoji: '🌈' }, b: { label: 'bright and lively', emoji: '💎' }, why: 'Vivid descriptions paint pictures in the mind.' },
        { a: { label: 'devour', emoji: '🎯' }, b: { label: 'eat up fast (or read!)', emoji: '📖' }, why: 'You can devour a cake — or a book series.' },
        { a: { label: 'hesitate', emoji: '⏸️' }, b: { label: 'pause before doing', emoji: '🤔' }, why: 'Hesitation is the pause between wanting and doing.' },
        { a: { label: 'abundant', emoji: '🫐' }, b: { label: 'more than enough', emoji: '∞' }, why: 'Abundant — so much there is plenty to spare.' },
      ],
    },
  },

  /* Phonics arcade — early: sound awareness; mid: patterns & syllables */
  'English|Phonics & Word Reading|arcade': {
    early: {
      items: [
        { prompt: 'Which word starts with the “sh” sound?', choices: [{ text: 'ship', emoji: '🚢', correct: true }, { text: 'cat', emoji: '🐱' }, { text: 'sun', emoji: '☀️' }], why: 'Sh-ip! “Sh” makes one sound: shhh.' },
        { prompt: 'Which word ends with the “ck” sound?', choices: [{ text: 'duck', emoji: '🦆', correct: true }, { text: 'dog', emoji: '🐶' }, { text: 'moon', emoji: '🌙' }], why: 'Du-ck! Two letters, one /k/ sound at the end.' },
        { prompt: 'Which word has the long “ee” sound?', choices: [{ text: 'tree', emoji: '🌳', correct: true }, { text: 'bell', emoji: '🔔' }, { text: 'stop', emoji: '✋' }], why: 'Tr-ee — “ee” says its name: eee!' },
        { prompt: 'Which word starts with “ch”?', choices: [{ text: 'chair', emoji: '🪑', correct: true }, { text: 'ship', emoji: '🚢' }, { text: 'ball', emoji: '⚽' }], why: 'Ch-air! “Ch” makes the choo-choo sound.' },
        { prompt: 'Which word rhymes with “cake”?', choices: [{ text: 'lake', emoji: '🏞️', correct: true }, { text: 'sock', emoji: '🧦' }, { text: 'cup', emoji: '🥤' }], why: 'Cake–lake! Same ending sound makes a rhyme.' },
        { prompt: 'Which word starts with the “th” sound?', choices: [{ text: 'thumb', emoji: '👍', correct: true }, { text: 'sun', emoji: '☀️' }, { text: 'hat', emoji: '🎩' }], why: 'Th-umb! Stick your tongue out slightly: thhh.' },
        { prompt: 'Blend it: c-a-t. What word?', choices: [{ text: 'cat', emoji: '🐱', correct: true }, { text: 'cot', emoji: '🛏️' }, { text: 'cap', emoji: '🧢' }], why: 'C…a…t — cat! Blending sounds makes words.' },
        { prompt: 'Which word has TWO syllables?', choices: [{ text: 'rabbit', emoji: '🐰', correct: true }, { text: 'fish', emoji: '🐟' }, { text: 'dog', emoji: '🐶' }], why: 'Rab-bit — clap it out: two claps, two syllables!' },
      ],
    },
    mid: {
      items: [
        { prompt: 'Which word has a SILENT “k”?', choices: [{ text: 'knife', emoji: '🔪', correct: true }, { text: 'kite', emoji: '🪁' }, { text: 'keep', emoji: '🔑' }], why: 'K-nife — the “k” hides while the “n” speaks.' },
        { prompt: 'Which word has a SOFT “c” (an “s” sound)?', choices: [{ text: 'city', emoji: '🏙️', correct: true }, { text: 'cat', emoji: '🐱' }, { text: 'cot', emoji: '🛏️' }], why: 'Ci-ty — “c” before i, e or y often says “s”.' },
        { prompt: 'Which word is a COMPOUND word?', choices: [{ text: 'sunflower', emoji: '🌻', correct: true }, { text: 'flower', emoji: '🌷' }, { text: 'sunny', emoji: '☀️' }], why: 'Sun + flower = sunflower — two words snapped together.' },
        { prompt: 'Which word has the “ai” sound like “rain”? …spelled differently?', choices: [{ text: 'play', emoji: '🛝', correct: true }, { text: 'pink', emoji: '🌸' }, { text: 'plan', emoji: '📋' }], why: 'Pl-ay — “ay” makes the same long “a” as “ai”!' },
        { prompt: 'Which word rhymes with “light”?', choices: [{ text: 'night', emoji: '🌙', correct: true }, { text: 'lift', emoji: '🏋️' }, { text: 'list', emoji: '📋' }], why: 'Light–night — “igh” and “ight” share the sound AND the spelling family.' },
        { prompt: 'Which word has THREE syllables?', choices: [{ text: 'family', emoji: '👨‍👩‍👧', correct: true }, { text: 'garden', emoji: '🌻' }, { text: 'dog', emoji: '🐶' }], why: 'Fam-i-ly — three claps, three beats.' },
        { prompt: 'Which word starts with “thr”?', choices: [{ text: 'three', emoji: '3️⃣', correct: true }, { text: 'tree', emoji: '🌳' }, { text: 'thread', emoji: '🧵' }], why: 'Thr-ee — “thr” starts three, thread and throw.' },
        { prompt: 'Which word ends with the “zh” sound like “vision”?', choices: [{ text: 'treasure', emoji: '💎', correct: true }, { text: 'trust', emoji: '🤝' }, { text: 'toast', emoji: '🍞' }], why: 'Trea-sure — “sion/sure” can say “zhun”.' },
      ],
    },
  },

  /* Computing|Data Representation — early: symbol basics; upper: binary & data words */
  'Computing|Data Representation|memory': {
    early: {
      explorePrompt: 'Flip two cards. Match each computer word to what it means!',
      celebrate: 'Computer words unlocked!',
      pairs: [
        { a: { label: '0 or 1', emoji: '🔘' }, b: { label: 'off or on', emoji: '💡' }, why: 'Computers think in switches: 0 = off, 1 = on.' },
        { a: { label: 'pixel', emoji: '🖼️' }, b: { label: 'one tiny dot of a picture', emoji: '🔸' }, why: 'Zoom into any screen — pictures are grids of dots.' },
        { a: { label: 'icon', emoji: '🧿' }, b: { label: 'a small picture button', emoji: '👆' }, why: 'Icons stand for apps and actions.' },
        { a: { label: 'file', emoji: '📄' }, b: { label: 'a saved thing with a name', emoji: '🏷️' }, why: 'Photos, stories, songs — all saved as files.' },
        { a: { label: 'camera', emoji: '📷' }, b: { label: 'an input device', emoji: '⬅️' }, why: 'Cameras send pictures INTO the computer.' },
        { a: { label: 'printer', emoji: '🖨️' }, b: { label: 'an output device', emoji: '➡️' }, why: 'Printers send computer work OUT onto paper.' },
      ],
    },
    upper: {
      explorePrompt: 'Flip two cards. Match each data word to its meaning.',
      celebrate: 'Binary and beyond — data words mastered!',
      pairs: [
        { a: { label: 'binary', emoji: '01' }, b: { label: 'a code using only 0 and 1', emoji: '🔘' }, why: 'Everything a computer stores ends up as binary.' },
        { a: { label: 'bit', emoji: '▪️' }, b: { label: 'one 0 or one 1', emoji: '1️⃣' }, why: 'Bit = binary digit — the smallest piece of data.' },
        { a: { label: 'byte', emoji: '📦' }, b: { label: '8 bits together', emoji: '8️⃣' }, why: 'One byte holds one letter, roughly speaking.' },
        { a: { label: 'compress', emoji: '🗜️' }, b: { label: 'shrink a file', emoji: '📉' }, why: 'Compression packs the same data into fewer bits.' },
        { a: { label: 'pixel grid', emoji: '🗺️' }, b: { label: 'how screens draw pictures', emoji: '🖼️' }, why: 'Screens light up thousands of pixels in patterns.' },
        { a: { label: 'scan', emoji: '📡' }, b: { label: 'checking data bit by bit', emoji: '🔍' }, why: 'Scanning reads or checks stored data in order.' },
      ],
    },
  },
};