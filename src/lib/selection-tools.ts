export function integratedScore(skd: number, skb: number) {
  return (skd / 550) * 40 + skb * 0.6;
}

export function requiredSKB(skd: number, rivalSKD: number, rivalSKB: number) {
  return (integratedScore(rivalSKD, rivalSKB) - (skd / 550) * 40) / 0.6;
}

export function skbCapacity(openings: number) {
  return Number.isSafeInteger(openings) && openings > 0 ? openings * 3 : null;
}
