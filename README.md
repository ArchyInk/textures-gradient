# textures-gradient
在d3.js插件d3.textures基础上加上渐变效果，兼容texture原来的api，目前只有line的渐变，且方向只能垂直，其他方向后面有兴趣再写

[d3.textures](https://riccardoscalco.it/textures/)

使用方式

```javascript
import texturesGradient from 'textures-gradient'
const svg = d3
    .select("#example")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

const tg = texturesGradient
    .lines()
    .thicker()
    .size(4)
    .strokeWidth(1)
    .linearGradient([
        { start: 0, stop: 50, startColor: "green", stopColor: "blue" },
        { start: 50, stop: 100, startColor: "orange", stopColor: "yellow" },
    ]);

const rect = svg.append("rect").attr("width", 500).attr("height", 500);
svg.call(tg);//调用之前svg必须有高宽
rect.style("fill", t.url());

```

![](https://github.com/ArchyInk/textures-gradient/blob/main/example.png)

