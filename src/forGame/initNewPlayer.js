function toMySQL_Datetime(timestamp) {
  const date = new Date(timestamp);

  const pad = (num) => (num < 10 ? "0" + num : num);

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1); // Months are zero-based
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mi = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

const startingPop = 30;
const startingResources = {
  gold: 100_000,
  concrete: 50_000,
  metals: 30_000,
  crystals: 25_000,
  diesel: 50_000,
};

export function initNewPlayer(playerId) {
  const randomIslandId = Math.ceil(Math.random() * 6);

  return {
    id: playerId,
    island_id: randomIslandId,
    townhall_lvl: 1,
    factory_lvl: 1,
    factory_barrels: 0,
    workers_concrete: 0,
    workers_metals: 0,
    workers_crystals: 0,
    workers_diesel: 0,
    workers_hospital: 0,
    concrete_quarry_lvl: 1,
    crystals_quarry_lvl: 1,
    metals_quarry_lvl: 1,
    diesel_quarry_lvl: 1,
    concrete: startingResources.concrete,
    crystals: startingResources.crystals,
    gold: startingResources.gold,
    metals: startingResources.metals,
    population: startingPop,
    diesel: startingResources.diesel,
    rank: 0,
    timestamp: toMySQL_Datetime(Date.now()),
  };
}
