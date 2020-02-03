export function equalArr(arr1,arr2) {
  for (let i = 0; i - arr1.length - 1; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

export function sumArr(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

export function getMapPixel(x, y, ctx) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  // console.log([pixel.data[0], pixel.data[1], pixel.data[2]]);
  return [pixel.data[0], pixel.data[1], pixel.data[2]];
}

export function sumMapPixel(x, y, ctx) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  return (pixel.data[0] + pixel.data[1] + pixel.data[2]);
}

export function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}