export function slugHash(text: string): string {
  if (!text) return ''
  let hash = 5381
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0
    hash = (Math.imul(hash, 33) ^ code) | 0
  }
  return 'h' + (hash >>> 0).toString(16)
}
