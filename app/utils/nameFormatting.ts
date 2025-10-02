// Given two strings (first and last name), return the initials.
export function getInitials(firstName?: string | null, lastName?: string | null): string {
  const first = firstName?.trim()?.[0]?.toUpperCase() ?? ""
  const last = lastName?.trim()?.[0]?.toUpperCase() ?? ""

  return `${first}${last}`
}

// Return initials with a full-stop after (abbreviation)
export function getAbbreviatedName(firstName?: string | null, lastName?: string | null): string {
  const first = getInitials(firstName)
  const last = getInitials(lastName)
  return [first && first + ".", last && last + "."].filter(Boolean).join(" ")
}
