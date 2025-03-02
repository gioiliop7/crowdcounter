export function getRandomColor(index: number) {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#5733FF",
      "#F4D03F",
      "#1ABC9C",
      "#9B59B6",
    ];
    return colors[index % colors.length];
  }