import { Trade, Theme } from './types';

export const TRADES_WITH_ICONS: { id: Trade; icon: string }[] = [
  { id: 'Automobile', icon: '🚗' },
  { id: 'Culinary Arts', icon: '🍳' },
  { id: 'Carpentry', icon: '🪚' },
  { id: 'Tailoring', icon: '🧵' },
  { id: 'Masonry', icon: '🧱' },
  { id: 'Plumbing', icon: '🪠' },
  { id: 'Electricity', icon: '⚡' },
  { id: 'Welding', icon: '👨‍🏭' },
  { id: 'Hospitality', icon: '🏨' },
  { id: 'Tourism', icon: '🌍' },
  { id: 'ICT - Software Development', icon: '💻' },
  { id: 'ICT - Networking', icon: '🌐' },
  { id: 'Hairdressing', icon: '✂️' },
  { id: 'Graphic Design', icon: '🎨' },
  { id: 'Food Processing', icon: '🥫' }
];

export const DEVELOPER_INFO = {
  name: "Bizimana Member Billionailler",
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
  skills: ["Basic Computer Skills", "Programming Beginner", "Problem Solving"],
  languages: ["Kinyarwanda", "English"],
  hobbies: ["Coding", "Technology", "Learning New Skills"]
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
  'Automobile': {
    tasks: [
      'Brake Pad Replacement', 'Oil Change', 'Tire Rotation', 'Engine Diagnostics', 
      'Spark Plug Replacement', 'Battery Testing', 'Coolant Flush', 'Transmission Service',
      'Suspension Inspection', 'Wheel Alignment', 'Air Filter Change', 'Fuel Filter Replacement',
      'Timing Belt Inspection', 'Alternator Testing', 'Starter Motor Repair', 'Exhaust System Patching',
      'Clutch Adjustment', 'Brake Bleeding', 'Headlight Restoration', 'AC System Recharge'
    ],
    tools: ['Wrench Set', 'Jack', 'Oil Filter Wrench', 'OBD-II Scanner'],
    steps: ['Lift vehicle', 'Remove wheels', 'Unbolt caliper', 'Replace pads', 'Reassemble']
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
  'Tailoring': {
    tasks: [
      'Pattern Drafting', 'Fabric Cutting', 'Stitching', 'Fitting',
      'Buttonhole Making', 'Zipper Installation', 'Hemming Trousers', 'Sleeve Attachment',
      'Collar Construction', 'Lining Insertion', 'Darning and Mending', 'Embroidery Work',
      'Ironing and Pressing', 'Fabric Selection', 'Thread Matching', 'Overlocking Edges',
      'Pleat Folding', 'Waistband Attachment', 'Pocket Construction', 'Cuff Finishing'
    ],
    tools: ['Sewing Machine', 'Fabric Scissors', 'Measuring Tape', 'Pins'],
    steps: ['Take measurements', 'Draft pattern', 'Cut fabric', 'Sew seams', 'Final fitting']
  },
  'Masonry': {
    tasks: [
      'Brick Laying', 'Mortar Mixing', 'Wall Leveling', 'Pointing',
      'Foundation Pouring', 'Stone Carving', 'Plastering Walls', 'Tile Setting',
      'Concrete Block Laying', 'Scaffolding Setup', 'Grout Application', 'Surface Cleaning',
      'Arch Construction', 'Chimney Building', 'Waterproofing', 'Joint Raking',
      'Paver Installation', 'Retaining Wall Building', 'Curbstone Setting', 'Site Clearing'
    ],
    tools: ['Trowel', 'Spirit Level', 'Masonry Hammer', 'Line Pin'],
    steps: ['Prepare foundation', 'Mix mortar', 'Lay first course', 'Check level', 'Fill joints']
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
  'Electricity': {
    tasks: ['House Wiring', 'Circuit Breaker Installation', 'Fault Finding', 'Light Fitting'],
    tools: ['Multimeter', 'Screwdriver', 'Wire Stripper', 'Pliers'],
    steps: ['Plan layout', 'Install conduits', 'Pull wires', 'Connect fixtures', 'Test circuit']
  },
  'Welding': {
    tasks: ['Arc Welding', 'Metal Cutting', 'Joint Preparation', 'Grinding'],
    tools: ['Welding Machine', 'Helmet', 'Angle Grinder', 'Chipping Hammer'],
    steps: ['Clean metal', 'Set current', 'Tack weld', 'Complete bead', 'Clean slag']
  },
  'Hospitality': {
    tasks: ['Table Setting', 'Customer Service', 'Room Cleaning', 'Drink Preparation'],
    tools: ['Tray', 'Cutlery', 'Cleaning Supplies', 'Shaker'],
    steps: ['Greet guest', 'Take order', 'Serve food', 'Clear table', 'Process payment']
  },
  'Tourism': {
    tasks: ['Tour Guiding', 'Itinerary Planning', 'Booking Management', 'Site Briefing'],
    tools: ['Map', 'Binoculars', 'First Aid Kit', 'Radio'],
    steps: ['Research site', 'Brief group', 'Lead tour', 'Answer questions', 'Ensure safety']
  },
  'ICT - Software Development': {
    tasks: ['Coding', 'Debugging', 'Database Design', 'UI Implementation'],
    tools: ['Laptop', 'VS Code', 'Git', 'Browser'],
    steps: ['Analyze requirements', 'Design logic', 'Write code', 'Test features', 'Deploy']
  },
  'ICT - Networking': {
    tasks: ['Cable Crimping', 'Router Configuration', 'Network Troubleshooting', 'Server Setup'],
    tools: ['Crimping Tool', 'Cable Tester', 'Router', 'Switch'],
    steps: ['Plan network', 'Lay cables', 'Configure devices', 'Test connectivity', 'Secure network']
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
  },
  'Food Processing': {
    tasks: ['Juice Making', 'Bakery Production', 'Food Preservation', 'Packaging'],
    tools: ['Blender', 'Oven', 'Sealing Machine', 'Thermometer'],
    steps: ['Select raw materials', 'Process food', 'Quality check', 'Package', 'Store']
  }
};
