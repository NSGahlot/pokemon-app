const generateRandom = (colors = ["#C1E0C8", "#EDC2C4", "#DDCBD0"]) =>
  colors[Math.floor(Math.random() * colors.length)]

export default generateRandom
