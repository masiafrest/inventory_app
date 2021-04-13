export function roundNum(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function calcSubTotal(items: Lineas[]) {
  const sub = items
    .map(({ precio, qty }) => precio.precio * qty)
    .reduce((sum, i) => sum + i, 0);
  return sub;
}
