export const truncate = (str: string, maxlength: number) => {
  if (str.length > maxlength) {
    return str.slice(0, maxlength - 3) + "...";
  } else {
    return str;
  }
};
