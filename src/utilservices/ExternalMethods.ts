type Positions = {
  x: number,
  y: number
}
export function generateRandomPositions(min: number, max: number): Positions {
    let x: number = Math.floor(Math.random() * (max - min) + min)
    let y: number = Math.floor(Math.random() * (max - min) + min)

    while(x === y) {
      generateRandomPositions(min, max)
    }

    return { x: x, y: y } 
  }