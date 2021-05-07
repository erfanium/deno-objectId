import {
  decodeString,
  encodeToString,
} from "https://deno.land/std@0.95.0/encoding/hex.ts";

function randomBytes(size: number) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}

const PROCESS_UNIQUE = randomBytes(5);
let index = ~~(Math.random() * 0xffffff);

export function oid(date = Date.now()): Uint8Array {
  index = (index + 1) % 0xffffff;
  const objectId = new Uint8Array(12);
  const time = ~~(date / 1000);

  // 4-byte timestamp
  new DataView(objectId.buffer, 0, 4).setUint32(0, time);

  // 5-byte process unique
  objectId[4] = PROCESS_UNIQUE[0];
  objectId[5] = PROCESS_UNIQUE[1];
  objectId[6] = PROCESS_UNIQUE[2];
  objectId[7] = PROCESS_UNIQUE[3];
  objectId[8] = PROCESS_UNIQUE[4];

  // 3-byte counter
  objectId[11] = index & 0xff;
  objectId[10] = (index >> 8) & 0xff;
  objectId[9] = (index >> 16) & 0xff;

  return objectId;
}

export function oidHex(date?: number): string {
  return encodeToString(oid(date));
}

export function getDate(oid: Uint8Array | string) {
  if (typeof oid === "string") oid = decodeString(oid);
  const date = new Date();
  const time = new DataView(oid.buffer, 0, 4).getUint32(0);

  date.setTime(Math.floor(time) * 1000);
  return date;
}
