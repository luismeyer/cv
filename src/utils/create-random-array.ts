function randomNumChar() {
  return Math.floor(Math.random() * 2).toString();
}

export function createRandomArray(length: number) {
  let result: string[] = [];

  for (let i = 0; i < length; i++) {
    result = [...result, randomNumChar()];
  }

  return result;
}
