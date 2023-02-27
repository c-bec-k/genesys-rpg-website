const loc = {
  sil: {
    x: 80,
    y: 61
  },
  speed: {
    x: 226,
    y: 61
  },
  handling: {
    x: 376,
     y: 61
    },
  def: {
    x: 560,
    y: 78
  },
  armour: {
    x: 782,
    y: 78
  },
  htt: {
    x: 560,
    y: 174
  },
  sst: {
    x: 782,
    y: 174
  }
}

export const drawImage = (ctx, data) => {
  ctx.font = "50px 'Bebas Neue'";
  ctx.textAlign = "center";
  ctx.drawImage(data.bg,0,0);
  data.handling = Intl.NumberFormat(undefined, {
    signDisplay: "always"
  }).format(data.handling)
  Object.keys(loc).forEach((key) => {
    ctx.fillText(data[key], loc[key].x,loc[key].y)
  });
}