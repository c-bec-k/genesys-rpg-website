const loc = {
  sil: {
    x: 80,
    y:63
  },
  speed: {
    x: 226,
    y: 63
  },
  handling: {x: 376, y: 63},
  def: {
    x: 560,
    y: 80
  },
  armour: {
    x: 782,
    y: 80
  },
  htt: {
    x: 560,
    y: 176
  },
  sst: {
    x: 782,
    y: 176
  }
}

export const drawImage = (ctx, data) => {
  ctx.font = "bold 58px 'Bebas Neue'";
  ctx.textAlign = "center";
  ctx.drawImage(data.bg,0,0);
  data.handling = Intl.NumberFormat(undefined, {
    signDisplay: "always"
  }).format(data.handling)
  Object.keys(loc).forEach((key) => {
    ctx.fillText(data[key], loc[key].x,loc[key].y)
  });
}