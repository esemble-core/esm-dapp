export const EN = "en";
export const FUNDING_KEY = "FUNDING";
export const LIFECYCLE_KEY = "LIFECYCLE";


export function appendedLookup (locale: string, key: string, appendVal: string): string {
  return lookup(locale, (key + '_' + appendVal));
}

export function lookup (locale: string, key: string): string {
  switch (key) {
    case "FUNDING_1":
      return '< 10k'
    case "FUNDING_2":
      return '> 10k < 100k'
    case "FUNDING_3":    
      return ' > 100k < 500k'
    case "FUNDING_4":
      return '> 500k < 2M'
    case "FUNDING_5":
      return '> 2M < 5M'
    case "LIFECYCLE_1":
      return 'Not Accepted'
    case "LIFECYCLE_2":
      return 'Proposed'
    case "LIFECYCLE_3":
      return 'Approved'
    case "LIFECYCLE_4":
      return 'Complete'
    case "LIFECYCLE_5":
      return 'Archived'
    default:
      return "ERROR - FAILED LOOKUP";
  }
}
