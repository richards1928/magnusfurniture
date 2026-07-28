import categories from "./categories.json";
import metadata from "./metadata.json";

import mdTables from "./products/mdTables.json";
import managerTables from "./products/managerTables.json";
import workstations from "./products/workstations.json";
import conferenceTables from "./products/conferenceTables.json";
import receptionTables from "./products/receptionTables.json";
import storage from "./products/storage.json";
import discussionTables from "./products/discussionTables.json";
import executiveChairs from "./products/executiveChairs.json";
import visitorChairs from "./products/visitorChairs.json";
import cafeteriaFurniture from "./products/cafeteriaFurniture.json";
import highCounterTables from "./products/highCounterTables.json";

export const catalog = {
  metadata,
  categories,
  products: {
    mdTables,
    managerTables,
    workstations,
    conferenceTables,
    receptionTables,
    storage,
    discussionTables,
    executiveChairs,
    visitorChairs,
    cafeteriaFurniture,
    highCounterTables,
  },
};

export default catalog;