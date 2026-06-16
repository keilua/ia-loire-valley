export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  const normalized = digits.startsWith('33') && digits.length === 11
    ? '0' + digits.slice(2)
    : digits
  return normalized.match(/.{1,2}/g)?.join(' ') ?? raw
}
