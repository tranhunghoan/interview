function miniMaxSum(arr) {
    // Khởi tạo min và max ban đầu là phần tử đầu tiên của mảng
    let min = arr[0];
    let max = arr[0];
    let totalSum = 0; // Khởi tạo biến tổng

    // Duyệt qua mảng và tính tổng, cập nhật min và max
    for (let n of arr) {
        totalSum += n;
        if (n < min) min = n;
        if (n > max) max = n;
    }

    // In ra kết quả (tổng trừ đi giá trị max và min)
    console.log((totalSum - max) + " " + (totalSum - min));
}