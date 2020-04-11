export const searchSubstr = (str: string, searchString: string): boolean => str.toLowerCase().includes(searchString.toLowerCase());

// To use when you want to avoid having a file cached
export const getCacheBusterUrl = (url: string): string => {
  return url + '?cache-buster=' + Date.now();
}