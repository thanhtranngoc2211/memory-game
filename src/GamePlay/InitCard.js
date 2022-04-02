import React from "react";

const InitCard = (props) => {
const IncomingFeature = () => {
  console.log('1. Xử lý tăng diện tích & số lượng các ô chơi');
  console.log('2. Đối với các kích cỡ lẻ (5x5, 7x7,...) tạo ô PowerUp cho phép soi toàn màn hình trong vòng 2s');
  console.log('3. Xây dựng tính năng Hall of Fame');
  console.log('4. Cho phép gen data nhiều ô giống nhau (thuật toán hiện tại đã xử lý được vụ này, chỉ cần tính toán scale up data lên là chạy được).');
  console.log('5. Cho phép lựa chọn theme, thay đổi data, hình ảnh các ô trong trò chơi.');
  console.log('6. Tinh chỉnh tối ưu hơn các DOM ở App để trông đỡ rối mắt; đưa các useEffect vào trong component phù hợp.');  
  console.log('7. Tối ưu lại data (thuộc tính index trong data chỉ dùng để debug, khi chơi thực sự k cần đến)');  
  console.log('8. Feature do bạn define 🥳🥳');  
}

  const dataRaw = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭"];
    //   const dataRaw = ["🥔", "🍒", "🥑", "🌽", "🥕", "🍇", "🍉", "🍌", "🥭", "🍍"];

  const roundLarge = 4; // Độ rộng màn chơi: 4x4
  const roundArrayLength = roundLarge * roundLarge; //Diện tích màn chơi = số ô cần vẽ
//   const roundDataLength = roundArrayLength / 2; // Số ô emoji cần sinh ra
//   const roundRemainder = roundArrayLength % 2; // Phần dư, sẽ sử dụng khi roundLarge lẻ

  const initEmojis = (Length) => {
    let emojis = Array(0);
    for (let i = 0; i < Length; i++) {
        emojis.length = emojis.length + 1;
        emojis[i] = {
        value: i % (dataRaw.length - 1),
        index: i,
        matched: false,
      };
    }
    console.log('emoji', emojis);
    return emojis;
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const reIndex = (arr) => {
    let length = arr.length;
    for (let i = 0; i < length; i++) {
      arr[i] = {...arr[i], index : i};
    }
    return arr;
  };

  let InitData = initEmojis(roundArrayLength);
  let shuffledData = shuffle(InitData);
  let reIndexData = reIndex(shuffledData);

  // IncomingFeature();
  return reIndexData;
};
export default InitCard;
