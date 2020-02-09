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

export function getMapPixel(ctx, x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  // console.log([pixel.data[0], pixel.data[1], pixel.data[2]]);
  return [pixel.data[0], pixel.data[1], pixel.data[2]];
}

export function sumMapPixel(ctx, x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  return (pixel.data[0] + pixel.data[1] + pixel.data[2]);
}

export function scanMapTile(ctx, x, y) {
  const tile = ctx.getImageData(x+23, y+23, 2, 2);
  // if (sumArr(tile.data) === 1020) return true;
  // return false;
  return sumArr(tile.data)
}

export function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


export function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
