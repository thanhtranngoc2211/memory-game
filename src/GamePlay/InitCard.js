import React from "react";

const InitCard = (props) => {
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

  return reIndexData;
};
export default InitCard;
