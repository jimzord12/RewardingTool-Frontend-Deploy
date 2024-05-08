import {
  templateIdToTemplateDataBuilding,
  templateIdToTemplateDataREG,
  templateIdToTemplateDataSP,
} from "constants/cardTemplates";

export const removeSPCards = (arrayOfCards) => {
  const SPCardFreeArray = arrayOfCards.filter((card) => card.level !== 0);
  console.log("From removeSPCards: SPCardFreeArray: ", SPCardFreeArray);
  return SPCardFreeArray;
};

export const keepOnlySPCards = (arrayOfCards) => {
  const SPCardArray = arrayOfCards.filter((card) => card.level === 0);
  console.log("From keepOnlySPCards: SPCardArray: ", SPCardArray);
  return SPCardArray;
};

export const removeLegendaryCards = (arrayOfCards) => {
  const nonLegendaryCards = arrayOfCards.filter((card) => card.rarity !== 5);
  console.log(
    "From removeLegendaryCards: nonLegendaryCards: ",
    nonLegendaryCards
  );
  return nonLegendaryCards;
};

export const removeNonDisabledSPCards = (arrayOfCards) => {
  const nonDisabledSPCards = arrayOfCards.filter((card) =>
    Boolean(card.disabled)
  );
  console.log(
    "From removeNonDisabledSPCards: nonDisabledSPCards: ",
    nonDisabledSPCards
  );
  return nonDisabledSPCards;
};

export const fromTemplateToCard = (cardTemplate) => {
  switch (cardTemplate.templateId) {
    case 101:
    case 102:
    case 103:
    case 104:
      console.log(
        "1 - Building Templates: ",
        templateIdToTemplateDataBuilding[cardTemplate.templateId]
      );
      return {
        ...templateIdToTemplateDataBuilding[cardTemplate.templateId],
        ...cardTemplate,
      };
    case 201:
    case 202:
    case 203:
    case 204:
      console.log(
        "1 - REG Templates: ",
        templateIdToTemplateDataREG[cardTemplate.templateId]
      );

      return {
        ...templateIdToTemplateDataREG[cardTemplate.templateId],
        ...cardTemplate,
      };

    case 301:
    case 302:
    case 303:
      return {
        ...templateIdToTemplateDataSP[cardTemplate.templateId],
        ...cardTemplate,
      };

    default:
      break;
  }
};

export const rarityConverter = (rarityNumber) => {
  if (rarityNumber === undefined) return "Unknown";
  if (rarityNumber === 0) return "default";
  if (rarityNumber === 1) return "Common";
  if (rarityNumber === 2) return "Special";
  if (rarityNumber === 3) return "Rare";
  if (rarityNumber === 4) return "Mythic";
  if (rarityNumber === 5) return "Legendary";
  console.error("😱 Something Wrong at: Card.jsx, in: rarityCoverter()");
};
