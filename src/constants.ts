import { Trade, Theme } from './types';

export const TRADES_WITH_ICONS: { id: Trade; icon: string }[] = [
  { id: 'Automotive Mechanics', icon: '🚗' },
  { id: 'Welding', icon: '👨‍🏭' },
  { id: 'Masonry', icon: '🧱' },
  { id: 'Tailoring', icon: '🧵' },
  { id: 'Electrical Installation', icon: '⚡' },
  { id: 'Solar Energy', icon: '☀️' },
  { id: 'Telecommunication', icon: '📡' },
  { id: 'ICT - Software Development', icon: '💻' },
  { id: 'ICT - Computer Systems', icon: '🖥️' },
  { id: 'Culinary Arts', icon: '🍳' },
  { id: 'Hospitality', icon: '🏨' },
  { id: 'Tourism', icon: '🌍' },
  { id: 'Agriculture & Crop Production', icon: '🌱' },
  { id: 'Animal Health', icon: '🐄' },
  { id: 'Food Processing', icon: '🥫' },
  { id: 'Wood Technology', icon: '🪚' },
  { id: 'Leather Technology', icon: '👞' },
  { id: 'Water and Irrigation', icon: '💧' },
  { id: 'Mobile Phone Repair', icon: '📱' },
  { id: 'Computer Application', icon: '📄' },
  { id: 'Entrepreneurship', icon: '💼' },
  { id: 'Plumbing', icon: '🪠' },
  { id: 'Carpentry', icon: '🔨' },
  { id: 'Hairdressing', icon: '✂️' },
  { id: 'Graphic Design', icon: '🎨' }
];

export const DEVELOPER_INFO = {
  name: "BIZIMANA FILS",
  role: "Founder, Lead Developer & UI/UX Designer",
  dob: "13/12/2007",
  gender: "Male",
  nationality: "Rwanda",
  maritalStatus: "Single",
  phone: "0783444370 / 0795914094",
  email: "1to3to7@gmail.com",
  address: "Muhanga District, Rwanda",
  idNumber: "1200780105863055",
  education: "Secondary School, TVET (ECOLE TECHNIQUE DO KABGAYI)",
  field: "Automobile Technology",
  skills: ["Basic Computer Skills", "Programming Beginner", "Problem Solving", "electric vehicle technician", "diagnosis vehicle", "service", "professional learn ai"],
  languages: ["Kinyarwanda", "English"],
  hobbies: ["Coding", "Technology", "Learning New Skills", "web desin", "automobile technology service"]
};

export const THEMES: { id: Theme; name: string; colors: string }[] = [
  { id: 'auto', name: 'Auto', colors: 'bg-slate-500 text-white' },
  { id: 'earth', name: 'Earth', colors: 'bg-[#9a3412] text-white' },
  { id: 'royal', name: 'Royal', colors: 'bg-[#581c87] text-white' },
  { id: 'sunset', name: 'Sunset', colors: 'bg-[#ea580c] text-white' },
  { id: 'agaseke', name: 'Agaseke', colors: 'bg-[#1c1917] text-white' },
  { id: 'kivu', name: 'Kivu', colors: 'bg-[#0369a1] text-white' },
  { id: 'umushanana', name: 'Umushanana', colors: 'bg-[#be123c] text-white' }
];

export const BADGES = [
  { id: 'beginner', name: 'Beginner', icon: '🌱', minHours: 0 },
  { id: 'apprentice', name: 'Apprentice', icon: '🛠️', minHours: 20 },
  { id: 'skilled', name: 'Skilled', icon: '✨', minHours: 50 },
  { id: 'expert', name: 'Expert', icon: '🏆', minHours: 100 },
  { id: 'master', name: 'Master', icon: '👑', minHours: 200 }
];

export const TRADE_KNOWLEDGE: Record<Trade, { tasks: string[]; tools: string[]; steps: string[] }> = {
  'Welding': {
    tasks: [
      'Identifying welding tools and PPE', 'Setting up a safe welding workstation', 'Reading welding symbols and drawings',
      'Measuring and marking metal pieces', 'Cutting mild-steel plates', 'Cleaning metal surfaces',
      'Preparing electrode holders and cables', 'Adjusting arc-welding machine', 'Straight-line bead welding',
      'Welding butt joints (flat)', 'Welding T-joints (flat)', 'Welding lap joints (flat)',
      'Performing fillet welds', 'Welding joints (horizontal)', 'Welding joints (vertical uphill)',
      'Checking weld bead for defects', 'Grinding and finishing weld seams', 'Measuring weld thickness',
      'Repairing faulty welds', 'Oxy-acetylene flame cutting', 'Soft soldering thin sheets',
      'Reading safety signs', 'Storing rods and cylinders safely', 'Recording weld parameters',
      'Explaining SMAW, MIG, TIG', 'Selecting correct electrodes', 'Writing welding reports',
      'Demonstrating proper posture', 'Joint fabrication project', 'Cleaning and oiling tools',
      'Preparing gate frame', 'Assembling metal chair frame', 'Welding tank base',
      'Following welding checklist', 'Presenting finished project', 'Maintaining sample portfolio',
      'Using welding hood correctly', 'Reporting faulty equipment', 'Emergency shutdown practice',
      'Explaining health hazards'
    ],
    tools: ['Welding Machine', 'Helmet', 'Angle Grinder', 'Chipping Hammer'],
    steps: ['Clean metal', 'Set current', 'Tack weld', 'Complete bead', 'Clean slag']
  },
  'Masonry': {
    tasks: [
      'Identifying masonry tools', 'Setting up safe working area', 'Measuring wall lines and corners',
      'Preparing mortar mix', 'Handling cement and sand', 'Cutting bricks and blocks',
      'Laying stretcher and header courses', 'Building straight vertical wall', 'Constructing English bond corner',
      'Constructing window/door opening', 'Building simple pillar', 'Checking wall alignment',
      'Checking wall thickness', 'Pointing mortar joints', 'Cleaning wall surface',
      'Building partition wall', 'Building compound fence wall', 'Preparing foundation concrete',
      'Pouring foundation concrete', 'Curing concrete', 'Reading construction drawings',
      'Measuring openings accurately', 'Using line level correctly', 'Storing tools orderly',
      'Recording progress in logbook', 'Explaining masonry bonds', 'Repairing mortar joints',
      'Demonstrating trowel technique', 'Building wall section in team', 'Presenting wall section',
      'Calculating brick quantities', 'Estimating mortar volume', 'Scaffolding safety',
      'Using protective gear', 'Reporting damaged blocks', 'Building decorative feature',
      'Mixing mortar for repointing', 'Cleaning masonry tools', 'Explaining foundations/DPC',
      'Preparing masonry portfolio'
    ],
    tools: ['Trowel', 'Spirit Level', 'Masonry Hammer', 'Line Pin'],
    steps: ['Prepare foundation', 'Mix mortar', 'Lay first course', 'Check level', 'Fill joints']
  },
  'Tailoring': {
    tasks: [
      'Identifying sewing tools', 'Preparing sewing machine', 'Winding and threading machine',
      'Selecting appropriate fabric', 'Interpreting garment sketches', 'Taking body measurements',
      'Transferring measurements to paper', 'Drafting bodice pattern', 'Drafting skirt pattern',
      'Cutting patterns with notches', 'Cutting fabric pieces', 'Laying and pinning fabric',
      'Stitching straight seams', 'Stitching curved seams', 'Sewing and pressing darts',
      'Attaching collars and cuffs', 'Sewing basic hems', 'Sewing simple dress',
      'Sewing trousers or shorts', 'Sewing shirt or blouse', 'Inserting zippers and buttons',
      'Pressing garments', 'Checking for flaws', 'Fitting and adjusting',
      'Altering ready-made garments', 'Recording in sketchbook', 'Preparing fashion portfolio',
      'Presenting completed garment', 'Following sewing checklist', 'Cleaning and oiling machine',
      'Storing threads and needles', 'Explaining stitch types', 'Using tailor\'s chalk',
      'Safe handling of needles', 'Reporting faulty machines', 'Creating illustrated designs',
      'Transferring designs for embroidery', 'Sewing decorative stitches', 'Organizing fashion show',
      'Preparing CV for tailoring jobs'
    ],
    tools: ['Sewing Machine', 'Fabric Scissors', 'Measuring Tape', 'Pins'],
    steps: ['Take measurements', 'Draft pattern', 'Cut fabric', 'Sew seams', 'Final fitting']
  },
  'Tourism': {
    tasks: [
      'Greeting guests properly', 'Checking guests in', 'Recording guest details',
      'Explaining hotel services', 'Handling check-out/payment', 'Accompanying guests to rooms',
      'Answering site questions', 'Creating work schedules', 'Handling telephone calls',
      'Booking tables online', 'Preparing breakfast buffet', 'Setting tables correctly',
      'Clearing and washing dishes', 'Cleaning hotel rooms', 'Changing bed linen',
      'Reporting damaged items', 'Following hygiene procedures', 'Cooking Rwandan meals',
      'Presenting food neatly', 'Explaining food safety', 'Storing kitchen tools',
      'Measuring ingredients', 'Preparing drink menus', 'Serving guests politely',
      'Handling guest complaints', 'Team restaurant service', 'Maintaining appearance',
      'Recording stock levels', 'Explaining Rwandan culture', 'Using English/French phrases',
      'Preparing tour guide speech', 'Reception role-play', 'Organizing small events',
      'Following emergency procedures', 'Reporting safety issues', 'Creating feedback forms',
      'Explaining punctuality', 'Preparing hospitality CV', 'Recording in logbook',
      'Presenting tourist destination'
    ],
    tools: ['Map', 'Binoculars', 'First Aid Kit', 'Radio'],
    steps: ['Research site', 'Brief group', 'Lead tour', 'Answer questions', 'Ensure safety']
  },
  'Hospitality': {
    tasks: [
      'Greeting guests', 'Table setting', 'Room service delivery', 'Beverage preparation',
      'Handling guest luggage', 'Concierge assistance', 'Laundry management', 'Public area cleaning',
      'Event setup', 'Buffet service', 'Wine service', 'Order taking',
      'Billing and invoicing', 'Guest feedback collection', 'Kitchen assistance', 'Barista skills',
      'Floral arrangement', 'Inventory counting', 'Menu explanation', 'VIP guest handling',
      'Safety briefing', 'First aid assistance', 'Lost and found handling', 'Reservation management',
      'Shift handover', 'Uniform maintenance', 'Waste management', 'Energy saving practices',
      'Cultural sensitivity training', 'Conflict resolution', 'Upselling techniques', 'Local area knowledge',
      'Digital system usage', 'Telephone etiquette', 'Email correspondence', 'Team coordination',
      'Quality control checks', 'Standard operating procedures', 'Emergency response', 'Professional networking'
    ],
    tools: ['Tray', 'Cutlery', 'Cleaning Supplies', 'Shaker'],
    steps: ['Greet guest', 'Take order', 'Serve food', 'Clear table', 'Process payment']
  },
  'Automotive Mechanics': {
    tasks: [
      'Identifying automotive tools', 'Setting up safe workshop', 'Interpreting car diagrams',
      'Measuring engine parameters', 'Removing wheel nuts', 'Changing flat tyres',
      'Checking engine oil', 'Topping up fluids', 'Inspecting brake pads',
      'Brake adjustment', 'Testing car battery', 'Jump-starting safely',
      'Replacing spark plugs', 'Cleaning filters', 'Tensioning drive belts',
      'Replacing bulbs', 'Inspecting suspension', 'Measuring tyre tread',
      'Wheel alignment', 'Engine diagnostics', 'Recording in service logbook',
      'Explaining engine components', 'Using torque wrench', 'Storing lubricants safely',
      'Cleaning engine compartment', 'Following service manuals', 'Reporting major faults',
      'Working under a car safely', 'Using jack stands', 'Preparing service checklist',
      'Using pressure gauge', 'Preventive maintenance', 'Full car service team',
      'Presenting serviced car', 'Creating service portfolio', 'Labeling car systems',
      'Explaining workshop safety', 'Wearing proper PPE', 'Maintaining tools',
      'Writing service reports', 'Testing fuel injectors', 'Checking exhaust system',
      'Bleeding brake lines', 'Replacing alternator', 'Testing radiator pressure',
      'Internship: Customer vehicle intake and diagnostic reporting',
      'Internship: Shadowing senior mechanic on complex engine overhauls',
      'Internship: Managing workshop inventory and tool maintenance logs',
      'Internship: Performing multi-point safety inspections for fleet clients'
    ],
    tools: ['Wrench Set', 'Jack', 'Oil Filter Wrench', 'OBD-II Scanner', 'Torque Wrench', 'Multimeter'],
    steps: ['Lift vehicle', 'Remove wheels', 'Unbolt caliper', 'Replace pads', 'Reassemble', 'Test brakes']
  },
  'Electrical Installation': {
    tasks: [
      'Identifying electrical tools', 'Setting up safe workshop', 'Interpreting electrical diagrams',
      'Measuring cable routes', 'Cutting/bending PVC conduit', 'Fixing conduit to walls',
      'Pulling wires through conduits', 'Connecting plugs and sockets', 'Installing light switches',
      'Wiring ceiling light circuit', 'Wiring two-way switch circuit', 'Installing ring main circuit',
      'Mounting consumer units', 'Testing insulation resistance', 'Testing circuit continuity',
      'Checking earthing', 'Correcting short circuits', 'Replacing bulbs',
      'Installing cooker outlets', 'Reading safety signs', 'Recording test results',
      'Explaining live/neutral/earth', 'Using multimeter', 'Storing spare parts safely',
      'Emergency shock procedures', 'House wiring layouts', 'Installation checklist',
      'Wiring room in team', 'Presenting tested circuit', 'Creating wiring portfolio',
      'Using PPE correctly', 'Reporting damaged cables', 'Maintaining electrical tools',
      'Calculating load requirements', 'Fire safety rules', 'Preparing electrical CV',
      'Recording daily tasks', 'Explaining circuit breakers', 'Labeling completed circuits',
      'Preparing wiring diagrams', 'Installing solar PV system', 'Wiring industrial motors',
      'Testing RCD protection', 'Installing security lighting', 'Programming smart switches',
      'Internship: Assisting in large-scale commercial building wiring',
      'Internship: Troubleshooting industrial control panels under supervision',
      'Internship: Conducting site energy audits for residential clients',
      'Internship: Installing and commissioning backup generator systems'
    ],
    tools: ['Multimeter', 'Screwdriver', 'Wire Stripper', 'Pliers', 'Voltage Tester', 'Conduit Bender'],
    steps: ['Plan layout', 'Install conduits', 'Pull wires', 'Connect fixtures', 'Test circuit', 'Verify earthing']
  },
  'Solar Energy': {
    tasks: [
      'Identifying solar components', 'Measuring solar radiation', 'Site survey for installation', 'Mounting solar panels',
      'Wiring solar arrays', 'Installing charge controllers', 'Connecting battery banks', 'Installing inverters',
      'System grounding', 'Testing panel output', 'Battery maintenance', 'Troubleshooting system faults',
      'Cleaning solar panels', 'Monitoring system performance', 'Calculating load requirements', 'Sizing solar systems',
      'Installing solar water heaters', 'Wiring DC appliances', 'Safety procedures for heights', 'Using a solar pathfinder',
      'Reading technical manuals', 'Recording energy production', 'Explaining PV effect', 'Soldering solar cells',
      'Installing solar street lights', 'Maintaining backup generators', 'Conducting energy audits', 'Explaining net metering',
      'Customer education on usage', 'Preparing installation reports', 'Using specialized solar tools', 'Handling batteries safely',
      'Installing mounting structures', 'Cabling and trunking', 'Labeling system components', 'Commissioning solar systems',
      'Recycling old batteries', 'Explaining environmental benefits', 'Preparing project quotes', 'Maintaining personal logbook'
    ],
    tools: ['Multimeter', 'Solar Path Finder', 'Crimping Tool', 'Drill'],
    steps: ['Site assessment', 'Mount panels', 'Wire components', 'Install battery/inverter', 'Test system']
  },
  'Telecommunication': {
    tasks: [
      'Identifying telecom tools', 'Cable stripping and termination', 'Fiber optic splicing', 'Installing antenna systems',
      'Configuring network switches', 'Setting up VoIP systems', 'Testing signal strength', 'Installing satellite dishes',
      'Crimping RJ45 connectors', 'Troubleshooting line faults', 'Maintaining telecom towers', 'Configuring wireless routers',
      'Reading circuit diagrams', 'Installing PBX systems', 'Testing data throughput', 'Grounding telecom equipment',
      'Using spectrum analyzers', 'Installing wall jacks', 'Labeling cable runs', 'Documenting network topology',
      'Replacing faulty modules', 'Configuring firewalls', 'Setting up VPNs', 'Monitoring network traffic',
      'Installing microwave links', 'Testing fiber loss', 'Maintaining battery backups', 'Explaining OSI model',
      'Using cable testers', 'Installing rack systems', 'Managing cable trays', 'Conducting site surveys',
      'Explaining 5G technology', 'Configuring IP addresses', 'Setting up domain controllers', 'Performing firmware updates',
      'Ensuring data security', 'Reporting network outages', 'Preparing technical reports', 'Maintaining safety standards'
    ],
    tools: ['Splicing Machine', 'OTDR', 'Crimping Tool', 'Spectrum Analyzer'],
    steps: ['Analyze requirements', 'Lay cables', 'Terminate connections', 'Configure devices', 'Test signal']
  },
  'ICT - Software Development': {
    tasks: [
      'Setting up dev environment', 'Writing HTML/CSS', 'Implementing JavaScript logic', 'Creating React components',
      'Designing SQL databases', 'Building REST APIs', 'Using Git for version control', 'Debugging code errors',
      'Writing unit tests', 'Implementing user auth', 'Connecting frontend to backend', 'Deploying to cloud',
      'Optimizing app performance', 'Creating responsive designs', 'Using Tailwind CSS', 'Handling API responses',
      'Managing state with hooks', 'Writing technical documentation', 'Conducting code reviews', 'Pair programming',
      'Implementing search features', 'Building CRUD applications', 'Using Docker containers', 'Setting up CI/CD',
      'Analyzing user requirements', 'Creating wireframes', 'Implementing dark mode', 'Handling file uploads',
      'Using TypeScript for safety', 'Integrating third-party APIs', 'Building mobile-responsive UIs', 'Refactoring legacy code',
      'Participating in standups', 'Estimating task complexity', 'Writing clean code', 'Securing API endpoints',
      'Managing project boards', 'Learning new frameworks', 'Presenting demos', 'Maintaining personal portfolio',
      'Developing AI-powered features', 'Implementing OAuth flows', 'Building real-time chat', 'Optimizing database queries',
      'Conducting security audits',
      'Internship: Participating in agile sprint planning and daily standups',
      'Internship: Contributing to production-level codebases via Pull Requests',
      'Internship: Writing comprehensive API documentation for client teams',
      'Internship: Implementing automated testing suites for legacy modules'
    ],
    tools: ['Laptop', 'VS Code', 'Git', 'Browser', 'Terminal', 'Postman', 'Docker'],
    steps: ['Analyze requirements', 'Design logic', 'Write code', 'Test features', 'Refactor', 'Deploy']
  },
  'ICT - Computer Systems': {
    tasks: [
      'Identifying hardware parts', 'Assembling a PC', 'Installing Operating Systems', 'Configuring BIOS/UEFI',
      'Troubleshooting hardware', 'Replacing RAM modules', 'Installing hard drives/SSDs', 'Setting up printers',
      'Cleaning internal components', 'Applying thermal paste', 'Testing power supplies', 'Updating drivers',
      'Configuring local networks', 'Setting up Wi-Fi', 'Removing malware/viruses', 'Backing up data',
      'Installing software suites', 'Managing user accounts', 'Optimizing system startup', 'Monitoring CPU temps',
      'Installing expansion cards', 'Repairing laptop screens', 'Replacing keyboards', 'Fixing power jacks',
      'Configuring dual monitors', 'Setting up remote desktop', 'Managing disk partitions', 'Recovering lost files',
      'Explaining hardware specs', 'Providing tech support', 'Documenting repairs', 'Managing inventory',
      'Ensuring ESD safety', 'Recycling e-waste', 'Upgrading firmware', 'Setting up servers',
      'Configuring firewalls', 'Testing network cables', 'Using diagnostic software', 'Maintaining system logs'
    ],
    tools: ['Screwdriver Set', 'Anti-static Wrist Strap', 'Multimeter', 'USB Boot Drive'],
    steps: ['Diagnose issue', 'Open casing', 'Replace/Repair part', 'Test functionality', 'Close casing']
  },
  'Agriculture & Crop Production': {
    tasks: [
      'Identifying crop varieties', 'Testing soil pH', 'Preparing land for planting', 'Applying organic manure',
      'Sowing seeds correctly', 'Transplanting seedlings', 'Implementing irrigation', 'Identifying pests/diseases',
      'Applying pesticides safely', 'Weeding crop fields', 'Pruning fruit trees', 'Applying fertilizers',
      'Harvesting crops', 'Post-harvest handling', 'Storing grains safely', 'Operating farm machinery',
      'Maintaining garden tools', 'Creating compost pits', 'Practicing crop rotation', 'Mulching soil',
      'Greenhouse management', 'Vertical farming setup', 'Recording farm expenses', 'Marketing farm produce',
      'Explaining photosynthesis', 'Identifying nutrient deficiencies', 'Using grafting techniques', 'Managing nursery beds',
      'Implementing soil erosion control', 'Reading weather patterns', 'Planning planting seasons', 'Conducting seed trials',
      'Using PPE in farming', 'Reporting crop failures', 'Maintaining farm records', 'Explaining organic farming',
      'Managing water resources', 'Participating in field days', 'Preparing farm budgets', 'Maintaining personal logbook'
    ],
    tools: ['Hoe', 'Spade', 'Pruning Shears', 'Sprayer'],
    steps: ['Clear land', 'Prepare soil', 'Plant seeds', 'Water and weed', 'Harvest']
  },
  'Animal Health': {
    tasks: [
      'Identifying animal breeds', 'Checking vital signs', 'Administering vaccinations', 'Treating minor wounds',
      'Identifying common parasites', 'Applying dewormers', 'Managing animal nutrition', 'Cleaning animal pens',
      'Assisting in births', 'Performing artificial insemination', 'Milking cows hygienically', 'Trimming hooves',
      'Dehorning calves', 'Castrating livestock', 'Collecting blood samples', 'Using veterinary tools',
      'Recording health history', 'Reporting disease outbreaks', 'Quarantining sick animals', 'Explaining zoonotic diseases',
      'Managing poultry health', 'Handling animals safely', 'Using microscopes for diagnosis', 'Preparing medicated feed',
      'Monitoring animal behavior', 'Conducting post-mortems', 'Advising on biosecurity', 'Maintaining cold chain',
      'Disinfecting equipment', 'Managing waste disposal', 'Explaining animal welfare', 'Participating in vet clinics',
      'Identifying poisonous plants', 'Managing pasture land', 'Preparing health reports', 'Using PPE in vet work',
      'Storing medicines safely', 'Conducting farm visits', 'Maintaining personal logbook', 'Preparing for vet exams'
    ],
    tools: ['Stethoscope', 'Thermometer', 'Syringe', 'Hoof Trimmer'],
    steps: ['Observe animal', 'Check vitals', 'Diagnose condition', 'Administer treatment', 'Monitor recovery']
  },
  'Food Processing': {
    tasks: [
      'Identifying raw materials', 'Cleaning processing area', 'Operating blenders/mixers', 'Pasteurizing milk',
      'Making fruit juices', 'Baking bread and cakes', 'Drying fruits/vegetables', 'Canning food products',
      'Packaging and labeling', 'Testing food acidity', 'Monitoring fermentation', 'Making yogurt/cheese',
      'Smoking meat/fish', 'Milling grains', 'Extracting edible oils', 'Quality control checks',
      'Following HACCP rules', 'Storing finished goods', 'Managing food waste', 'Cleaning machinery',
      'Recording production data', 'Explaining food chemistry', 'Using thermometers', 'Calibrating scales',
      'Testing shelf life', 'Developing new recipes', 'Marketing food products', 'Handling chemicals safely',
      'Wearing hygiene gear', 'Reporting equipment faults', 'Managing inventory', 'Explaining nutrition labels',
      'Conducting sensory tests', 'Implementing safety rules', 'Maintaining production logs', 'Preparing for audits',
      'Managing water usage', 'Reducing energy waste', 'Participating in trade fairs', 'Maintaining personal logbook'
    ],
    tools: ['Blender', 'Oven', 'Sealing Machine', 'Thermometer'],
    steps: ['Select raw materials', 'Process food', 'Quality check', 'Package', 'Store']
  },
  'Wood Technology': {
    tasks: [
      'Identifying wood types', 'Reading blueprints', 'Measuring and marking wood', 'Using hand saws',
      'Operating power planers', 'Sanding wood surfaces', 'Applying wood glue', 'Using clamps correctly',
      'Cutting joints (mortise/tenon)', 'Assembling furniture', 'Applying wood finish/varnish', 'Installing hardware',
      'Using wood lathes', 'Operating table saws', 'Drilling pilot holes', 'Repairing broken furniture',
      'Constructing cabinets', 'Building roof trusses', 'Installing door frames', 'Making decorative carvings',
      'Maintaining sharp tools', 'Storing timber properly', 'Calculating material costs', 'Designing simple items',
      'Ensuring workshop safety', 'Using dust extractors', 'Wearing safety goggles', 'Reporting machine faults',
      'Working on team projects', 'Presenting finished items', 'Creating wood samples', 'Explaining wood seasoning',
      'Using wood fillers', 'Installing moldings', 'Building simple chairs', 'Making wooden toys',
      'Refinishing old wood', 'Managing wood waste', 'Preparing project reports', 'Maintaining personal logbook'
    ],
    tools: ['Hammer', 'Hand Saw', 'Chisel', 'Level'],
    steps: ['Measure twice', 'Cut once', 'Assemble parts', 'Sand surfaces', 'Apply finish']
  },
  'Leather Technology': {
    tasks: [
      'Identifying leather types', 'Sorting raw hides', 'Curing and soaking hides', 'Liming and unhairing',
      'Tanning processes', 'Dyeing leather', 'Fatliquoring and stuffing', 'Drying and staking',
      'Buffing and finishing', 'Measuring leather area', 'Cutting leather patterns', 'Skiving leather edges',
      'Hand stitching leather', 'Using leather sewing machines', 'Applying edge finishes', 'Installing rivets/snaps',
      'Making leather belts', 'Constructing simple bags', 'Repairing leather goods', 'Designing footwear',
      'Lasting and soling shoes', 'Polishing finished goods', 'Storing leather safely', 'Using specialized knives',
      'Maintaining leather tools', 'Calculating material usage', 'Quality control of leather', 'Explaining tanning chemistry',
      'Managing tannery waste', 'Ensuring worker safety', 'Using PPE in tanning', 'Reporting process errors',
      'Creating leather samples', 'Marketing leather products', 'Preparing production reports', 'Maintaining personal logbook',
      'Identifying leather defects', 'Using embossing tools', 'Making leather wallets', 'Participating in craft fairs'
    ],
    tools: ['Leather Knife', 'Awl', 'Stitching Pony', 'Mallet'],
    steps: ['Select leather', 'Cut patterns', 'Skive edges', 'Assemble and sew', 'Apply finish']
  },
  'Water and Irrigation': {
    tasks: [
      'Identifying irrigation tools', 'Measuring water flow', 'Surveying land for irrigation', 'Installing water pumps',
      'Laying irrigation pipes', 'Setting up drip systems', 'Installing sprinklers', 'Building water tanks',
      'Testing water quality', 'Maintaining pump engines', 'Repairing pipe leaks', 'Designing simple systems',
      'Calculating water needs', 'Managing drainage', 'Installing valves and meters', 'Monitoring soil moisture',
      'Cleaning water filters', 'Explaining water cycle', 'Using GPS for mapping', 'Recording water usage',
      'Installing solar pumps', 'Managing wastewater', 'Conducting site inspections', 'Reporting system failures',
      'Maintaining canal systems', 'Explaining irrigation types', 'Using specialized software', 'Handling chemicals safely',
      'Ensuring site safety', 'Working in team projects', 'Presenting system designs', 'Creating project reports',
      'Maintaining tool inventory', 'Explaining water conservation', 'Installing rain sensors', 'Managing dam safety',
      'Participating in field work', 'Preparing cost estimates', 'Maintaining personal logbook', 'Preparing for exams'
    ],
    tools: ['Pipe Wrench', 'Pressure Gauge', 'Level', 'Shovel'],
    steps: ['Site survey', 'Plan layout', 'Install pipes/pumps', 'Connect emitters', 'Test system']
  },
  'Mobile Phone Repair': {
    tasks: [
      'Identifying phone components', 'Disassembling mobile phones', 'Replacing broken screens', 'Changing batteries',
      'Repairing charging ports', 'Fixing speaker issues', 'Cleaning water damage', 'Replacing camera modules',
      'Soldering small components', 'Using multimeters for testing', 'Flashing firmware/software', 'Unlocking network locks',
      'Backing up user data', 'Troubleshooting boot loops', 'Replacing power buttons', 'Fixing Wi-Fi/signal issues',
      'Using ultrasonic cleaners', 'Applying screen protectors', 'Explaining hardware specs', 'Providing customer quotes',
      'Managing spare parts', 'Documenting repairs', 'Ensuring ESD safety', 'Recycling old phones',
      'Updating mobile apps', 'Removing malware', 'Recovering lost data', 'Fixing microphone faults',
      'Replacing vibration motors', 'Testing logic boards', 'Using heat guns safely', 'Applying adhesive tapes',
      'Cleaning internal ports', 'Explaining battery health', 'Advising on phone care', 'Reporting complex faults',
      'Managing repair logs', 'Participating in tech forums', 'Preparing repair reports', 'Maintaining personal logbook'
    ],
    tools: ['Precision Screwdriver', 'Heat Gun', 'Multimeter', 'Opening Tools'],
    steps: ['Diagnose fault', 'Disassemble phone', 'Replace component', 'Test function', 'Reassemble']
  },
  'Computer Application': {
    tasks: [
      'Typing practice', 'Creating Word documents', 'Formatting text and styles', 'Inserting tables and images',
      'Creating Excel spreadsheets', 'Using basic formulas', 'Creating charts and graphs', 'Designing PowerPoint slides',
      'Using email professionally', 'Browsing the internet safely', 'Managing files and folders', 'Using cloud storage',
      'Converting file formats', 'Printing and scanning', 'Using keyboard shortcuts', 'Setting up user accounts',
      'Basic troubleshooting', 'Using online collaboration tools', 'Creating simple databases', 'Designing basic flyers',
      'Understanding OS basics', 'Managing passwords', 'Using antivirus software', 'Updating software',
      'Customizing desktop settings', 'Using specialized software', 'Creating digital signatures', 'Filling online forms',
      'Explaining hardware vs software', 'Providing basic tech help', 'Recording tasks in logbook', 'Preparing digital CV',
      'Using social media for work', 'Understanding data privacy', 'Managing digital waste', 'Participating in webinars',
      'Learning touch typing', 'Using search engines', 'Creating simple budgets', 'Maintaining personal portfolio'
    ],
    tools: ['Computer', 'Keyboard', 'Mouse', 'Software'],
    steps: ['Open application', 'Input data', 'Format content', 'Save file', 'Export/Print']
  },
  'Entrepreneurship': {
    tasks: [
      'Identifying business ideas', 'Conducting market research', 'Writing a business plan', 'Calculating startup costs',
      'Designing a marketing strategy', 'Setting product prices', 'Managing small budgets', 'Recording sales and expenses',
      'Creating a brand name/logo', 'Pitching a business idea', 'Understanding customer needs', 'Handling customer feedback',
      'Networking with partners', 'Registering a small business', 'Understanding local taxes', 'Managing time effectively',
      'Setting business goals', 'Analyzing competitors', 'Using social media for business', 'Managing inventory',
      'Explaining profit and loss', 'Preparing financial reports', 'Conducting SWOT analysis', 'Implementing safety rules',
      'Managing a small team', 'Negotiating with suppliers', 'Creating business cards', 'Organizing a launch event',
      'Explaining business ethics', 'Providing excellent service', 'Recording daily business tasks', 'Preparing a loan application',
      'Understanding legal rules', 'Managing business risks', 'Innovating new products', 'Participating in trade fairs',
      'Learning from failures', 'Seeking business mentors', 'Maintaining personal logbook', 'Preparing for business exams'
    ],
    tools: ['Notebook', 'Calculator', 'Computer', 'Smartphone'],
    steps: ['Identify opportunity', 'Plan business', 'Secure resources', 'Launch and operate', 'Evaluate and grow']
  },
  'Culinary Arts': {
    tasks: [
      'Mise en Place', 'Sautéing Vegetables', 'Baking Bread', 'Plating',
      'Knife Skills Practice', 'Stock Preparation', 'Sauce Mother Making', 'Grilling Meat',
      'Pastry Dough Kneading', 'Vegetable Carving', 'Food Safety Audit', 'Menu Planning',
      'Deep Frying Technique', 'Poaching Eggs', 'Roasting Poultry', 'Dessert Garnishing',
      'Kitchen Station Cleaning', 'Inventory Management', 'Soup Pureeing', 'Salad Dressing Emulsion'
    ],
    tools: ['Chef Knife', 'Sauté Pan', 'Whisk', 'Mixing Bowl'],
    steps: ['Prep ingredients', 'Heat pan', 'Add oil', 'Cook until tender', 'Season']
  },
  'Carpentry': {
    tasks: [
      'Frame Construction', 'Sanding', 'Joint Cutting', 'Finishing',
      'Measuring and Marking', 'Wood Planing', 'Drilling Pilot Holes', 'Glue-up and Clamping',
      'Cabinet Installation', 'Door Hanging', 'Roof Truss Assembly', 'Floor Joist Laying',
      'Staircase Building', 'Molding Installation', 'Furniture Repair', 'Deck Construction',
      'Lathe Turning', 'Veneer Application', 'Hardware Mounting', 'Blueprint Reading'
    ],
    tools: ['Hammer', 'Hand Saw', 'Chisel', 'Level'],
    steps: ['Measure twice', 'Cut once', 'Assemble parts', 'Sand surfaces', 'Apply finish']
  },
  'Plumbing': {
    tasks: [
      'Pipe Fitting', 'Leak Repair', 'Fixture Installation', 'Drain Cleaning',
      'Water Heater Service', 'Valve Replacement', 'Toilet Repair', 'Sink Installation',
      'PEX Pipe Crimping', 'Copper Pipe Soldering', 'Pressure Testing', 'Septic Tank Inspection',
      'Shower Head Replacement', 'Faucet Repair', 'Sump Pump Testing', 'Gas Line Inspection',
      'Backflow Prevention', 'Pipe Insulation', 'Vent Pipe Installation', 'Clog Removal'
    ],
    tools: ['Pipe Wrench', 'Plunger', 'Teflon Tape', 'Hacksaw'],
    steps: ['Shut off water', 'Remove old part', 'Clean threads', 'Apply tape', 'Install new part']
  },
  'Hairdressing': {
    tasks: ['Hair Cutting', 'Styling', 'Coloring', 'Scalp Treatment'],
    tools: ['Scissors', 'Comb', 'Hair Dryer', 'Clippers'],
    steps: ['Consult client', 'Wash hair', 'Cut/Style', 'Apply products', 'Final check']
  },
  'Graphic Design': {
    tasks: ['Logo Design', 'Poster Creation', 'Photo Editing', 'Branding'],
    tools: ['Computer', 'Graphics Tablet', 'Software', 'Sketchbook'],
    steps: ['Sketch ideas', 'Create digital draft', 'Refine design', 'Export files', 'Present to client']
  }
};
