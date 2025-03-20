import { PeprModule } from "pepr";
import cfg from "./package.json";

import { ModuleBValidate } from "./capabilities/validate";

new PeprModule(cfg, [
  ModuleBValidate,
]);
