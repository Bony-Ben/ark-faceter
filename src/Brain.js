class Brain {
  constructor(size, min1, min2, max) {
    this.size = size;
    this.min1 = min1;
    this.min2 = min2;
    this.max = max;

    this.dp = this.createMultiDimensionalArray([
      size + 1,
      size + 1,
      size + 1,
      size + 1,
      size + 1,
      size + 1,
      76,
    ]);
  }

  createMultiDimensionalArray(dimensions) {
    if (dimensions.length === 1) {
      return new Array(dimensions[0]);
    }
    const arr = new Array(dimensions[0]);
    const temp = [...dimensions];
    temp.shift();
    for (let i = 0; i < arr.length; i++) {
      arr[i] = this.createMultiDimensionalArray(temp);
    }
    return arr;
  }

  calc(s1, s2, s3, f1, f2, f3, chance) {
    if (
      s3 > this.max ||
      (s1 < this.min1 && s1 + f1 === this.size) ||
      (s2 < this.min2 && s2 + f2 === this.size)
    ) {
      return { a: 0, b: 0, c: 0, max: 0 };
    } else if (
      s1 >= this.min1 &&
      s2 >= this.min2 &&
      this.size - f3 <= this.max
    ) {
      return { a: 1, b: 1, c: 1, max: 1 };
    }
    if (chance < 0.25) {
      chance = 0.25;
    } else if (chance > 0.75) {
      chance = 0.75;
    }
    if (
      this.dp[s1][s2][s3][f1][f2][f3][Math.round(chance * 100)] !== undefined
    ) {
      return this.dp[s1][s2][s3][f1][f2][f3][Math.round(chance * 100)];
    }
    let a = 0,
      b = 0,
      c = 0;
    if (s1 + f1 < this.size) {
      a =
        chance * this.calc(s1 + 1, s2, s3, f1, f2, f3, chance - 0.1).max +
        (1 - chance) * this.calc(s1, s2, s3, f1 + 1, f2, f3, chance + 0.1).max;
    }
    if (s2 + f2 < this.size) {
      b =
        chance * this.calc(s1, s2 + 1, s3, f1, f2, f3, chance - 0.1).max +
        (1 - chance) * this.calc(s1, s2, s3, f1, f2 + 1, f3, chance + 0.1).max;
    }
    if (s3 + f3 < this.size) {
      c =
        chance * this.calc(s1, s2, s3 + 1, f1, f2, f3, chance - 0.1).max +
        (1 - chance) * this.calc(s1, s2, s3, f1, f2, f3 + 1, chance + 0.1).max;
    }

    const ans = {
      a,
      b,
      c,
      max: Math.max(a, b, c),
    };

    this.dp[s1][s2][s3][f1][f2][f3][Math.round(chance * 100)] = ans;
    return ans;
  }
}

export default Brain;
