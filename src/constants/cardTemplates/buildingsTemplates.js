import { buildingCards } from "assets/img/genera/v3/cardImages/index.js";

console.log("Building Templates: ", buildingCards);
const toolStoreTemplate = {
  id: 101,
  name: "ToolStore",
  type: "building",

  image: buildingCards.toolStore,
  baseMaintenance: {
    energy: 500,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 0,
    diesel: 0,
  },
  baseStats: {
    gold: 0,
    diesel: 0,
    concrete: 0,
    metals: 0,
    crystals: 0,
    // diesel: 0,
  },
  baseOutput: {
    boost: 0.05,
  },
  desc: "Enchances Gathering",
};

const amusementParkTemplate = {
  id: 102,
  name: "AmusementPark",
  type: "building",
  image: buildingCards.amusementPark,
  baseMaintenance: {
    energy: 400,
  },
  baseRequirements: {
    gold: 500,
    concrete: 650,
    metals: 780,
    crystals: 260,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    boost: 1.5,
  },
  desc: "Enchances Happiness",
};

const hopsitalTemplate = {
  id: 103,
  name: "Hospital",
  type: "building",
  image: buildingCards.hospital,
  baseMaintenance: {
    energy: 600,
  },
  baseRequirements: {
    gold: 1500,
    concrete: 1650,
    metals: 1780,
    crystals: 1260,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    boost: 0.15,
  },
  desc: "Enchances Growth",
};

const radioStationTemplate = {
  id: 104,
  name: "RadioStation",
  type: "building",
  image: buildingCards.radioStation,
  baseMaintenance: {
    energy: 300,
  },
  baseRequirements: {
    gold: 750,
    concrete: 300,
    metals: 540,
    crystals: 380,
    population: 0,
    diesel: 0,
  },
  baseOutput: {
    boost: 0.23,
  },
  desc: "Enchances Special Effects",
};

const templateIdToTemplateDataBuilding = {
  101: toolStoreTemplate,
  102: amusementParkTemplate,
  103: hopsitalTemplate,
  104: radioStationTemplate,
  13: toolStoreTemplate,
};

export const buildingSpots = [0, 2, 4, 5, 6, 7, 9, 12];
export const buildingTemplateIds = [101, 102, 103, 104];
export const buildingNames = [
  "AmusementPark",
  "ToolStore",
  "Hospital",
  "RadioStation",
];

const nameToTemplateDataBuilding = {
  AmusementPark: amusementParkTemplate,
  Hospital: hopsitalTemplate,
  RadioStation: radioStationTemplate,
  ToolStore: toolStoreTemplate,
};

export { nameToTemplateDataBuilding, templateIdToTemplateDataBuilding };
