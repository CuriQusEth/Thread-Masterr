import { Attribution } from "ox/erc8021";

export const BUILDER_CODE = "bc_aisit0mq";
export const DATA_SUFFIX = Attribution.toDataSuffix({ codes: [BUILDER_CODE] });
export const DATA_SUFFIX_HEX = DATA_SUFFIX.slice(2);

export function buildAttributionPayload(
  actionType: string,
  baseCalldata: string = "0x"
): `0x${string}` {
  const clean = baseCalldata.startsWith("0x") ? baseCalldata.slice(2) : baseCalldata;
  return `0x${clean}${DATA_SUFFIX_HEX}`;
}

