export function shuffleArray<T>(items: T[], seed?: number): T[] {
  // Fisher-Yates shuffle; optional deterministic seed via mulberry32
  const array = items.slice();
  let random = Math.random;
  if (typeof seed === 'number') {
    random = mulberry32(seed);
  }
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
