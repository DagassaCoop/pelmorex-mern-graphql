const colors = [
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
  ],
  range = [1, 9],
  prefix = "bg";

export function getRandomColor() {
  const number = random(range[0], range[1]) * 100;
  const indexColor = random(0, colors.length - 1);
  return `${prefix}-${colors[indexColor]}-${number}`;

  function random(min = 1, max = 9) {
    return Math.floor(Math.random() * max) + min;
  }
}