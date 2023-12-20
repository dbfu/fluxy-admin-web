export const EXPAND_ICON = (x: number, y: number, r: number) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2 - r, y],
    ['L', x + r - 2, y],
    ['M', x, y + 1 * r - 2],
    ['L', x, y - r + 2],
    ['Z'],
  ];
};

export const COLLAPSE_ICON = function COLLAPSE_ICON(x: number, y: number, r: number) {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x + 2 - r, y],
    ['L', x + r - 2, y],
  ];
};
