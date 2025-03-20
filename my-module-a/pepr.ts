import { PeprModule } from "pepr";
import cfg from "./package.json";

import { ModuleAValidate } from "./capabilities/validate";

new PeprModule(cfg, [
  ModuleAValidate,
]);
