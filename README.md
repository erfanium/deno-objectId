# deno-objectId

Native bson objectId implementation in Deno, With ZERO dependencies

```ts
import { objectId, getDate } from "https://deno.land/x/objectid@0.1.0/mod.ts";
import { decodeString, encodeToString } from "https://deno.land/std@0.95.0/encoding/hex.ts";

// Create ObjectId
const id: Uint8Array = objectId();

// Convert ObjectID to HexString
const hex: string = encodeToString(id); // "60950fa4beaf70cffc9ac75d"

// Convert HexString to ObjectID
const id: Uint8Array = decodeString(hex);

// Get objectId creation date
const date: Date = getDate(id);
```
