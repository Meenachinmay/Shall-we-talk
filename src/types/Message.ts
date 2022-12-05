export type Message = {
  id: number,
  from: { id: number, name: string },
  to: { id: number },
  text: string,
  seen: boolean
}
