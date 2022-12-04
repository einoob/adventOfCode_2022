const { input, testInput } = require("./input");

const getBadgePrioritySum = (input) => {
  const rucksacks = input.split("\n");

  let badgePriorityValues = [];
  for (let i = 0; i < rucksacks.length - 2; i += 3) {
    let badgeGroup = [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]];
    badgeGroup.sort((a, b) => a.length - b.length);
    for (let j = 0; j < badgeGroup[0].length; j++) {
      const character = badgeGroup[0][j];
      if (badgeGroup[1].includes(character) && badgeGroup[2].includes(character)) {
        if (character === character.toLowerCase()) {
          badgePriorityValues.push(character.charCodeAt(0) - 96);
        } else {
          badgePriorityValues.push(character.charCodeAt(0) - 38);
        }
        break;
      }
    }
  }
  return badgePriorityValues.reduce((a, b) => a + b, 0);
};

const getItemPrioritySum = (input) => {
  const rucksacks = input.split("\n");

  let itemPriorityValues = [];

  rucksacks.forEach((rucksack) => {
    const pockets = [
      rucksack.substring(0, rucksack.length / 2),
      rucksack.substring(rucksack.length / 2),
    ];

    for (let i = 0; i < pockets[0].length; i++) {
      const character = pockets[0][i];
      if (pockets[1].includes(character)) {
        if (character === character.toLowerCase()) {
          itemPriorityValues.push(character.charCodeAt(0) - 96);
        } else {
          itemPriorityValues.push(character.charCodeAt(0) - 38);
        }
        break;
      }
    }
  });

  return itemPriorityValues.reduce((a, b) => a + b, 0);
};

console.log("test input:\na:", getItemPrioritySum(testInput), "b:", getBadgePrioritySum(testInput));
console.log("\nactual input:\na:", getItemPrioritySum(input), "b:", getBadgePrioritySum(input));
