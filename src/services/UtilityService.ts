export const searchSubstr = (str: string, searchString: string): boolean => str.toLowerCase().includes(searchString.toLowerCase());

/**
 * Decode HTML entities from an encoded string
 * https://stackoverflow.com/a/7394787/1293256
 * @param  {String} htmlString The encoded HTML string
 * @return {String}            A decoded HTML string
 */
export const decodeHTML = (htmlString: string): string => {
  const txt = document.createElement('textarea');
  txt.innerHTML = htmlString;
  return txt.value;
};
