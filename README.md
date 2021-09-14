<!--
 * @Author: Archy
 * @Date: 2021-09-10 14:56:38
 * @LastEditors: Archy
 * @LastEditTime: 2021-09-14 10:17:16
 * @FilePath: \archy_ink\textures-gradient\README.md
 * @description: 
-->
# textures-gradient
在d3.js插件d3.textures基础上加上渐变效果，兼容texture原来的api，目前只有line的渐变，且方向只能垂直，其他图形方向后面有兴趣再写

[d3.textures](https://riccardoscalco.it/textures/)

使用方式
`npm install textures-gradient`
[demo](http://archy.ink/html/textures-gradient)
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
		{ start: 0, stop: 25, startColor: "green", stopColor: "blue" },
		{ start: 25, stop: 50, startColor: "yellow", stopColor: "white" },
		{ start: 50, stop: 75, startColor: "orange", stopColor: "red" },
		{ start: 75, stop: 100, startColor: "#132413", stopColor: "#c1c1c1" },
    ]);

const rect = svg.append("rect").attr("width", 500).attr("height", 500);
svg.call(tg);//调用之前svg必须有高宽
rect.style("fill", t.url());

```
![example](https://github.com/ArchyInk/textures-gradient/blob/main/example.png)

