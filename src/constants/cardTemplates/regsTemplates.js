import { regCards } from "assets/img/genera/v3/cardImages";

const desc = "Produces Energy";

const simpleWindTurbineTemplate = {
  id: 201,
  name: "SimpleWindTurbine",
  type: "reg",
  image: regCards.simpleWindTurbine,
  baseMaintenance: {
    gold: 30,
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
    energy: 400,
  },
  desc,
};

const superWindTurbineTemplate = {
  id: 202,
  name: "SuperWindTurbine",
  type: "reg",
  image: regCards.superWindTurbine,
  baseMaintenance: {
    gold: 60,
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
    energy: 600,
  },
  desc,
};

const simpleSolarPaneTemplate = {
  id: 203,
  name: "SimpleSolarPanel",
  type: "reg",
  image: regCards.simpleSolarPanel,
  baseMaintenance: {
    gold: 20,
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
    energy: 500,
  },
  desc,
};

const superSolarPanelTemplate = {
  id: 204,
  name: "SuperSolarPanel",
  type: "reg",
  image: regCards.superSolarPanel,
  baseMaintenance: {
    gold: 50,
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
    energy: 700,
  },
  desc,
};

export const regSpots = [0, 1, 3, 8, 10, 11, 13];
export const regTemplateIds = [201, 202, 203, 204];
export const regNames = [
  "SuperWindTurbine",
  "SimpleWindTurbine",
  "SimpleSolarPanel",
  "SuperSolarPanel",
];

const templateIdToTemplateDataREG = {
  201: simpleWindTurbineTemplate,
  202: superWindTurbineTemplate,
  203: simpleSolarPaneTemplate,
  204: superSolarPanelTemplate,
  1: simpleWindTurbineTemplate,
};

const nameToTemplateDataREG = {
  SimpleWindTurbine: simpleWindTurbineTemplate,
  SuperWindTurbine: superWindTurbineTemplate,
  SimpleSolarPanel: simpleSolarPaneTemplate,
  SuperSolarPanel: superSolarPanelTemplate,
};

export { nameToTemplateDataREG, templateIdToTemplateDataREG };
