const { input, testInput } = require("./input");

const parseMonkeys = (array) => {
  let monkeys = Array.from({ length: array.length }, (e) => ({
    items: [],
    operation: { operator: "", value: "" },
    modulo: 1,
    true: 0,
    false: 0,
    itemsInspected: 0,
  }));

  for (let i = 0; i < array.length; i++) {
    const data = array[i].split("\n");
    monkeys[i].items = data[1]
      .split("items: ")[1]
      .split(",")
      .map((number) => parseInt(number));
    monkeys[i].operation.operator = data[2].split("new = old ")[1].split(" ")[0];
    monkeys[i].operation.value = data[2].split("new = old ")[1].split(" ")[1];
    monkeys[i].modulo = parseInt(data[3].split("by ")[1]);
    monkeys[i].true = parseInt(data[4].split("monkey ")[1]);
    monkeys[i].false = parseInt(data[5].split("monkey ")[1]);
  }
  return monkeys;
};

const modifyItemValue = (monkey, item, monkeys) => {
  let value = monkey.operation.value === "old" ? item : +monkey.operation.value;
  if (monkey.operation.operator === "*") item *= value;
  else item += value;
  item = item % (monkeys.map((monkey) => monkey.modulo).reduce((a, b) => a * b));
  return item;
};

const playTurn = (monkeys, currentMonkey) => {
  currentMonkey.itemsInspected += currentMonkey.items.length;
  for (let i = 0; i < currentMonkey.items.length; i++) {
    currentMonkey.items[i] = modifyItemValue(currentMonkey, currentMonkey.items[i], monkeys);
    if (currentMonkey.items[i] % currentMonkey.modulo === 0)
      monkeys[currentMonkey.true].items.push(currentMonkey.items[i]);
    else
      monkeys[currentMonkey.false].items.push(currentMonkey.items[i]);
  }
  currentMonkey.items = [];
};

const circulateObjects = (input) => {
  const rawArray = input.split("\n\n");
  let monkeys = parseMonkeys(rawArray);

  for (let round = 0; round < 10000; round++) {
    for (let turn = 0; turn < monkeys.length; turn++) {
      playTurn(monkeys, monkeys[turn]);
    }
  }

  console.log(monkeys.map((monkey) => monkey.itemsInspected));
  return monkeys.map((monkey) => monkey.itemsInspected).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);
};

console.log("test input:", circulateObjects(testInput));
console.log("actual input:", circulateObjects(input));
