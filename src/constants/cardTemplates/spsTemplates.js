import { spCards } from "assets/img/genera/v3/cardImages";

const goldSPTemplate = {
  id: 301,
  name: "WallStreet",
  type: "sp",
  image: spCards.stocksChart,
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 25_000,
    concrete: 12_500,
    metals: 8_000,
    crystals: 6_500,
    population: 0,
    diesel: 10_000,
  },
  desc: "Enchances Gold Income",
};

const growthSPTemplate = {
  id: 302,
  name: "LoveApp",
  type: "sp",
  image: spCards.heartPhone,
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 25_000,
    concrete: 12_500,
    metals: 8_000,
    crystals: 6_500,
    population: 0,
    diesel: 10_000,
  },
  desc: "Enchances Population Growth",
};

const resourcesSPTemplate = {
  id: 303,
  name: "SuperStrong",
  type: "sp",
  image: spCards.energyDrink,
  baseOutput: { boost: 0.25 },
  baseRequirements: {
    gold: 25_000,
    concrete: 12_500,
    metals: 8_000,
    crystals: 6_500,
    population: 0,
    diesel: 10_000,
  },
  desc: "Enchances Resource Gathering",
};

const templateIdToTemplateDataSP = {
  301: goldSPTemplate,
  302: growthSPTemplate,
  303: resourcesSPTemplate,
  7: resourcesSPTemplate,
};

export const spTemplateIds = [301, 302, 303];
export const spNames = ["WallStreet", "LoveApp", "SuperStrong"];

const nameToTemplateDataSP = {
  WallStreet: goldSPTemplate,
  LoveApp: growthSPTemplate,
  SuperStrong: resourcesSPTemplate,
};

export { nameToTemplateDataSP, templateIdToTemplateDataSP };
