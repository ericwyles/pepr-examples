import { Capability, a } from "pepr";

const name = "module-b-validate";

export const ModuleBValidate = new Capability({
  name: name,
  description: name,
  namespaces: [name],
});
const { When } = ModuleBValidate;

When(a.ConfigMap)
  .IsCreated()
  .Validate(request => {
    if (request.HasAnnotation("evil-b")) {
      return request.Deny("Module B says: No evil-b CM annotations allowed.", 400);
    }

    return request.Approve();
  });
