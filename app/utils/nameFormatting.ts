// Given two strings (first and last name), return the initials.
export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.trim()[0].toUpperCase() ?? ""
  const last = lastName?.trim()[0].toUpperCase() ?? ""

  return `${first}${last}`
}

// Return first name and abbreviated last name.
export function getAbbreviatedName(firstName?: string, lastName?: string): string {
  const first = firstName
  const last = getInitials(lastName)
  return `${first} ${last}.`
}
