import {
  assert,
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.95.0/testing/asserts.ts";
import { decodeString, getDate, InvalidObjectId, objectId } from "./mod.ts";

Deno.test("Generate objectId", () => {
  const id = objectId();
  assertEquals(id.length, 12);
});

Deno.test("decodeString", () => {
  const id = decodeString("60950fa4beaf70cffc9ac75d");
  assert(id instanceof Uint8Array);
  assertEquals(id.length, 12);
});

Deno.test("decodeString error", () => {
  assertThrows(() => decodeString("60950fa4beaf70cffc9ac7"), InvalidObjectId);
});

Deno.test("getDate", () => {
  const id = new Uint8Array([
    0x60,
    0x95,
    0x0f,
    0xa4,
    0xbe,
    0xaf,
    0x70,
    0xcf,
    0xfc,
    0x9a,
    0xc7,
    0x5d,
  ]);
  const date = getDate(id);
  assertEquals(date.getTime(), 1620381604000);
});

Deno.test("Integration", () => {
  const id = objectId();
  const date = getDate(id);
  assertEquals(date.getTime() / 1000, ~~(Date.now() / 1000));
});
