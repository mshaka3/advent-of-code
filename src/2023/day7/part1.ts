import { join } from "path";
import { processFile } from "../../helpers/processFile";

export async function part1() {
  const filePath = join(__dirname, "input.txt");
  const { fileAsArray } = await processFile(filePath);
  const handRanks = {};

  const cardsRanks: { [key in string]: number } = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    "9": 8,
    "8": 7,
    "7": 6,
    "6": 5,
    "5": 4,
    "4": 3,
    "3": 2,
    "2": 1,
  };

  var hands = [];
  for (const line of fileAsArray) {
    const [hand, bid] = line.split(" ");
    hands.push({ hand, bid: Number(bid) });
  }

  hands.sort((a, b) => {
    const hand1 = getHandScore(a.hand);
    const hand2 = getHandScore(b.hand);

    if (hand1 != hand2) {
      return hand1 - hand2;
    } else {
      for (var i = 0; i < a.hand.length; i++) {
        if (cardsRanks[a.hand[i]] != cardsRanks[b.hand[i]]) {
          return cardsRanks[a.hand[i]] - cardsRanks[b.hand[i]];
        }
      }
      return -1;
    }
  });

  const result = hands.reduce(
    (acc, val, index) => (acc += val.bid * (index + 1)),
    0,
  );
  console.log(result);

  function getHandScore(str: string): number {
    const cardCounts: { [key in string]: number } = {};
    for (var i = 0; i < str.length; i++) {
      if (!(str[i] in cardCounts)) {
        cardCounts[str[i]] = 0;
      }
      cardCounts[str[i]]++;
    }
    const values = Object.values(cardCounts);
    if (values.length == 1) {
      return 7;
    } else if (values.includes(4)) {
      return 6;
    } else if (values.length == 2) {
      return 5;
    } else if (values.includes(3)) {
      return 4;
    } else if (values.length == 3) {
      return 3;
    } else if (values.length == 4) {
      return 2;
    } else {
      return 1;
    }
  }
}

part1();
