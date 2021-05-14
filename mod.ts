import { decodeString as stdDecodeString } from "https://deno.land/std@0.95.0/encoding/hex.ts";

function randomBytes(size: number) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}

export class InvalidObjectId extends Error {
  constructor() {
    super();
    this.name = "InvalidObjectId";
    this.message = "Invalid ObjectId length";
  }
}

const PROCESS_UNIQUE = randomBytes(5);
let index = ~~(Math.random() * 0xffffff);

export function objectId(date = Date.now()): Uint8Array {
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

export function isValid(oid: Uint8Array): boolean {
  return oid.length === 12;
}

export function decodeString(hex: string): Uint8Array {
  const oid = stdDecodeString(hex);
  if (!isValid(oid)) throw new InvalidObjectId();
  return oid;
}

export function getDate(oid: Uint8Array): Date {
  const date = new Date();
  const time = new DataView(oid.buffer, 0, 4).getUint32(0);

  date.setTime(~~(time) * 1000);
  return date;
}
