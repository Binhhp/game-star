// Math science
const utils = {
    // Tong cua day
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),
  
    // tạo một mảng số giữa tối thiểu và tối đa (bao gồm các cạnh)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  
    // chọn một số ngẫu nhiên giữa tối thiểu và tối đa (bao gồm các cạnh)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),
  
    // Cho một mảng số và giá trị tối đa...
    // Chọn một tổng ngẫu nhiên (<max) từ tập hợp tất cả các tổng có sẵn trong arr
    randomSumIn: (arr, max) => {
      const sets = [[]];
      const sums = [];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = sets.length; j < len; j++) {
          const candidateSet = sets[j].concat(arr[i]);
          const candidateSum = utils.sum(candidateSet);
          if (candidateSum <= max) {
            sets.push(candidateSet);
            sums.push(candidateSum);
          }
        }
      }
      return sums[utils.random(0, sums.length - 1)];
    },
  };

  export default utils;