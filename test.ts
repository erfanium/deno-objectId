import { assertEquals } from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { decodeString } from "https://deno.land/std@0.95.0/encoding/hex.ts";
import { getDate, objectId } from "./mod.ts";

Deno.test("Generate objectId", () => {
  const id = objectId();
  assertEquals(id.length, 12);
});

Deno.test("getDate", () => {
  const id = decodeString("60950fa4beaf70cffc9ac75d");
  const date = getDate(id);
  assertEquals(date.getTime(), 1620381604000);
});

Deno.test("Integration", () => {
  const id = objectId();
  const date = getDate(id);
  assertEquals(date.getTime() / 1000, ~~(Date.now() / 1000));
});
