export const capitalize = (word) => {
  if (!word || typeof word !== "string") {
    return "";
  }
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
