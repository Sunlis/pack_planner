export const formatNumber = (num: number): string => {
  // https://stackoverflow.com/a/2901298/1156923
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};