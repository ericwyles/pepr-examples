/**
 * Copyright 2024 Defense Unicorns
 * SPDX-License-Identifier: AGPL-3.0-or-later OR LicenseRef-Defense-Unicorns-Commercial
 */

import { describe, expect, it } from "@jest/globals";
import { K8s, kind } from "pepr";

const failIfReached = () => expect(true).toBe(false);

describe("validation policies", () => {
  it("should not allow evil-a annotations", async () => {
    const expected = (e: Error) =>
      expect(e).toMatchObject({
        ok: false,
        data: {
          message: expect.stringContaining("No evil-a CM annotations allowed"),
        },
      });

    return Promise.all([
      // test that annotation is rejected
      K8s(kind.ConfigMap)
        .Apply({
          metadata: {
            name: "example-evil-cm-fail",
            namespace: "module-a-validate",
            annotations: {
              "evil-a": "true",
            },
          },
        })
        .then(failIfReached)
        .catch(expected),
    ]);
  });
  it("should allow other annotations", async () => {
    const expected = (e: Error) =>
      expect(e).toMatchObject({
        ok: true,
      });

    return Promise.all([
      // test that annotation is rejected
      K8s(kind.ConfigMap)
        .Apply({
          metadata: {
            name: "example-evil-cm-fail",
            namespace: "module-a-validate",
            annotations: {
              "good": "true",
            },
          },
        })
        .catch(expected),
    ]);
  });
});
