// Testing convenience only — the spec does not include a create-equipment
// endpoint, so this script is the only way to get sample data into MongoDB
// to exercise GET /api/equipment, GET /api/equipment/:id, and POST /api/bookings.
// Not part of the application's runtime API.

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Equipment = require("../models/Equipment");

const sampleEquipment = [
  {
    name: "Caterpillar 320 Excavator",
    category: "Excavators",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
    dailyRate: 4500,
    availability: true,
    description:
      "Heavy-duty hydraulic excavator suited for large-scale earthmoving, trenching, and demolition work.",
    safetyInstructions:
      "Wear a hard hat, safety boots, and high-visibility vest at all times. Ensure the swing radius is clear before operating. Never exceed rated load capacity.",
    operationalInstructions:
      "Perform a pre-operation inspection of hydraulics and tracks. Start engine and allow a 5-minute warm-up before full load operation. Engage travel lock when not moving.",
    specifications: [
      { label: "Operating Weight", value: "20,300 kg" },
      { label: "Engine Power", value: "122 kW" },
      { label: "Max Dig Depth", value: "6.5 m" },
      { label: "Bucket Capacity", value: "0.91 m³" },
    ],
  },
  {
    name: "Bobcat S650 Skid Steer Loader",
    category: "Loaders",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e",
    dailyRate: 2200,
    availability: true,
    description:
      "Compact skid steer loader ideal for site cleanup, material handling, and landscaping on tight job sites.",
    safetyInstructions:
      "Keep bystanders clear of the operating radius. Lower the bucket to the ground before exiting the cab. Always fasten the seatbelt and lower the safety bar.",
    operationalInstructions:
      "Check hydraulic fluid and tire pressure before use. Use smooth joystick inputs for lifting and tilting. Do not operate on slopes exceeding manufacturer rating.",
    specifications: [
      { label: "Operating Weight", value: "3,375 kg" },
      { label: "Rated Operating Capacity", value: "1,090 kg" },
      { label: "Engine Power", value: "55 kW" },
    ],
  },
  {
    name: "Genie GS-1930 Scissor Lift",
    category: "Aerial Lifts",
    image: "https://images.unsplash.com/photo-1541976590-713941681591",
    dailyRate: 1200,
    availability: true,
    description:
      "Electric scissor lift for indoor and outdoor maintenance, installation, and construction work at height.",
    safetyInstructions:
      "Wear a harness where required by site policy. Ensure ground is level and stable before elevating. Do not exceed platform load capacity.",
    operationalInstructions:
      "Inspect guardrails and outriggers before raising platform. Use controls smoothly; avoid sudden stops at full extension. Lower fully before transporting.",
    specifications: [
      { label: "Platform Height", value: "5.87 m" },
      { label: "Load Capacity", value: "227 kg" },
      { label: "Power Source", value: "Electric" },
    ],
  },
  {
    name: "Wacker Neuson Plate Compactor",
    category: "Compaction Equipment",
    image: "https://images.unsplash.com/photo-1590496793907-1bb1ba3b3e4d",
    dailyRate: 350,
    availability: false,
    description:
      "Reversible plate compactor for soil, gravel, and asphalt compaction on roadwork and foundation jobs.",
    safetyInstructions:
      "Wear ear protection and steel-toed boots. Keep hands and feet clear of the plate during operation. Do not use on unstable ground near excavation edges.",
    operationalInstructions:
      "Check engine oil before starting. Allow the compactor to reach full speed before making contact with the surface. Clean the base plate after each use.",
    specifications: [
      { label: "Centrifugal Force", value: "20 kN" },
      { label: "Plate Size", value: "500 x 685 mm" },
      { label: "Weight", value: "95 kg" },
    ],
  },
];

const run = async () => {
  await connectDB();
  await Equipment.deleteMany({});
  await Equipment.insertMany(sampleEquipment);
  console.log(`Seeded ${sampleEquipment.length} equipment records.`);
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
