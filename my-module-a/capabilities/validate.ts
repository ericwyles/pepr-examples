import { Capability, a } from "pepr";

const name = "module-a-validate";

export const ModuleAValidate = new Capability({
  name: name,
  description: name,
  namespaces: [name],
});
const { When } = ModuleAValidate;

When(a.ConfigMap)
  .IsCreated()
  .Validate(request => {
    if (request.HasAnnotation("evil-a")) {
      return request.Deny(
        "Module A says: No evil-a CM annotations allowed.",
        400,
      );
    }

    return request.Approve();
  });
