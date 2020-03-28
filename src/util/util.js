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
  return [pixel.data[0], pixel.data[1], pixel.data[2]];
}

export function sumMapPixel(ctx, x, y) {
  const pixel = ctx.getImageData(x, y, 1, 1);
  return (pixel.data[0] + pixel.data[1] + pixel.data[2]);
}

export function scanMapTile(ctx, x, y) {
  const tile = ctx.getImageData(x+23, y+23, 2, 2);
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

export function checkCollision(hitbox1, hitbox2) {
  if (
    hitbox1.x < hitbox2.x + hitbox2.width &&
    hitbox1.x + hitbox1.width > hitbox2.x &&
    hitbox1.y < hitbox2.y + hitbox2.height &&
    hitbox1.y + hitbox1.height > hitbox2.y
  ) {
    return true;
  }
  return false;
}

export function knockbackcheck(pixel1, pixel2) {
  let pixel1value = util.sumArr(pixel1)
  let pixel2value = util.sumArr(pixel2)
  if (pixel1value === constants.WALL || pixel1value === constants.WATER) return true;
  if (pixel2value === constants.WALL || pixel2value === constants.WATER) return true;
  return false;
}

export function removeElement(arr, el) {
  let idx = arr.indexOf(el)
  if (idx > -1) arr.splice(idx, 1)
}

export function splitNum(num) {
  let str = num.toString();
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(parseInt(str[i]));
  }
  return arr;
}