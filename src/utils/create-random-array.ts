function randomNumChar() {
  return Math.floor(Math.random() * 2).toString();
}

export const createRandomArray = (length: number) => {
  let result: string[] = [];

  for (var i = 0; i < length; i++) {
    result = [...result, randomNumChar()];
  }

  return result;
};
