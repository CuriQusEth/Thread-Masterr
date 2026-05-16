/**
 * ERC-8004: Trustless Agents Integration.
 * 
 * Defines how specific game actions can authorize autonomous on-chain agents
 * to handle offline progression or specialized tasks on behalf of the user.
 */

export const ERC8004_AGENT_REGISTRY = '0x0000000000000000000000000000000000008004';

export enum AgentCapability {
  MAINTAIN_HARMONY = 1,
  EVOLVE_TAPESTRY = 2
}

/**
 * Request authorization for an agent to perform background tapestry evolution.
 */
export function getAgentAuthorizationPayload(capability: AgentCapability, expiryOrNonce: number) {
  // Mock standard payload for ERC-8004 delegation
  return {
    to: ERC8004_AGENT_REGISTRY,
    data: `0x8004${capability.toString(16).padStart(4, '0')}${expiryOrNonce.toString(16).padStart(8, '0')}`
  };
}
