/**
 * ERC-8021: Asset Attribution Standard implementation utilities.
 */

// Placeholder mapping to user's builder code
export const BUILDER_CODE = 'bc_aisit0mq';
export const APP_ID = '68f40250b6320e0dd0819adf';

export type AttributionData = {
  appId: string;
  builderCode: string;
  actionType: 'SAY_GM' | 'RECORD_TAPESTRY' | 'SUBMIT_SCORE';
  payload?: any;
};

/**
 * Encodes attribution data to be sent with a transaction
 * (In a real scenario, this might be encoded into calldata along with the actual function call,
 * or handled via a specific proxy contract that logs 8021 metadata).
 */
export function buildAttributionPayload(actionType: AttributionData['actionType'], payload?: any) {
  const data: AttributionData = {
    appId: APP_ID,
    builderCode: BUILDER_CODE,
    actionType,
    payload
  };
  
  // Convert payload to hex or appropriate calldata format based on specific 8021 contract implementation.
  // We'll return the JSON stringified version as placeholder calldata bytes for now.
  const jsonStr = JSON.stringify(data);
  return `0x${Buffer.from(jsonStr).toString('hex')}` as `0x${string}`;
}
