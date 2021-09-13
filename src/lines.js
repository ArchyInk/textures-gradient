/*
 * @Author: Archy
 * @Date: 2021-09-09 14:09:00
 * @LastEditors: Archy
 * @LastEditTime: 2021-09-13 17:30:06
 * @FilePath: \archy_ink\textures-gradient\src\lines.js
 * @description: 在textures源码的基础上添加了line类型的渐变
 */
import rand from './random.js'

export default function lines() {
  let size = 20
  let stroke = '#343434'
  let strokeWidth = 2
  let background = ''
  let id = rand()
  let orientation = ['diagonal']
  let shapeRendering = 'auto'
  let linearGradient = []

  const path = (orientation) => {
    const s = size
    switch (orientation) {
      case '0/8':
      case 'vertical':
        return `M ${s / 2}, 0 l 0, ${s}`
      case '1/8':
        return `M ${-s / 4},${s} l ${s / 2},${-s} M ${s / 4},${s} l ${
          s / 2
        },${-s} M ${(s * 3) / 4},${s} l ${s / 2},${-s}`
      case '2/8':
      case 'diagonal':
        return `M 0,${s} l ${s},${-s} M ${-s / 4},${s / 4} l ${s / 2},${
          -s / 2
        } M ${(3 / 4) * s},${(5 / 4) * s} l ${s / 2},${-s / 2}`
      case '3/8':
        return `M 0,${(3 / 4) * s} l ${s},${-s / 2} M 0,${s / 4} l ${s},${
          -s / 2
        } M 0,${(s * 5) / 4} l ${s},${-s / 2}`
      case '4/8':
      case 'horizontal':
        return `M 0,${s / 2} l ${s},0`
      case '5/8':
        return `M 0,${-s / 4} l ${s},${s / 2}M 0,${s / 4} l ${s},${s / 2} M 0,${
          (s * 3) / 4
        } l ${s},${s / 2}`
      case '6/8':
        return `M 0,0 l ${s},${s} M ${-s / 4},${(3 / 4) * s} l ${s / 2},${
          s / 2
        } M ${(s * 3) / 4},${-s / 4} l ${s / 2},${s / 2}`
      case '7/8':
        return `M ${-s / 4},0 l ${s / 2},${s} M ${s / 4},0 l ${s / 2},${s} M ${
          (s * 3) / 4
        },0 l ${s / 2},${s}`
      default:
        return `M ${s / 2}, 0 l 0, ${s}`
    }
  }

  const $ = (selection) => {
    let group = null
    selection.select('defs[type=texture]').remove()
    const box = selection.node().getBBox()
    if (Array.isArray(linearGradient) && linearGradient.length > 0) {
      const defs = selection.append('defs').attr('type', 'texture')
      group = defs
        .append('pattern')
        .attr('id', id)
        .attr('patternUnits', 'objectBoundingBox')
        .attr('width', 1)
        .attr('height', 1)
        .attr('x', box.x)
      for (let i in linearGradient) {
        const rate = (linearGradient[i].stop - linearGradient[i].start) / 100
        const colorNum = Math.floor(
          linearGradient[i].stop - linearGradient[i].start
        )
        const colors = []
        const x = d3
          .scaleLinear()
          .domain([0, colorNum])
          .range([linearGradient[i].startColor, linearGradient[i].stopColor])
        for (let i = 0; i < colorNum; i++) {
          colors.push(x(i))
        }
        const chunk = defs
          .append('pattern')
          .attr('id', 'chunk_' + i)
          .attr('patternUnits', 'objectBoundingBox')
          .attr('width', 1)
          .attr('height', 1)

        for (let j in colors) {
          const pattern = defs
            .append('pattern')
            .attr('id', 'colormap_' + i + '_' + j)
            .attr('patternUnits', 'userSpaceOnUse')
            .attr('width', size)
            .attr('height', size)
          for (const o of orientation) {
            pattern
              .append('path')
              .attr('d', path(o))
              .attr('stroke-width', strokeWidth)
              .attr('shape-rendering', shapeRendering)
              .attr('stroke', colors[j])
              .attr('stroke-linecap', 'square')
          }
          const rect = chunk.append('rect')
          rect
            .attr('width', box.width / 100)
            .attr('height', box.height)
            .attr('x', (box.width * j) / 100)
            .style('fill', `url(#colormap_${i}_${j})`)
        }
        const rect = group.append('rect')
        rect
          .attr('width', box.width * rate)
          .attr('height', box.height)
          .attr(
            'x',
            i > 0 ? (box.width * linearGradient[i - 1].stop) / 100 : '0'
          )
          .style('fill', `url(#chunk_${i})`)
      }
    } else {
      group = selection
        .append('defs')
        .attr('type', 'texture')
        .append('pattern')
        .attr('id', id)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', size)
        .attr('height', size)

      if (background) {
        group
          .append('rect')
          .attr('width', size)
          .attr('height', size)
          .attr('fill', background)
      }

      for (const o of orientation) {
        group
          .append('path')
          .attr('d', path(o))
          .attr('stroke-width', strokeWidth)
          .attr('shape-rendering', shapeRendering)
          .attr('stroke', stroke)
          .attr('stroke-linecap', 'square')
      }
    }
  }

  $.heavier = function (_) {
    strokeWidth *= arguments.length === 0 ? 2 : 2 * _

    return $
  }

  $.lighter = function (_) {
    strokeWidth /= arguments.length === 0 ? 2 : 2 * _

    return $
  }

  $.thinner = function (_) {
    size *= arguments.length === 0 ? 2 : 2 * _

    return $
  }

  $.thicker = function (_) {
    size /= arguments.length === 0 ? 2 : 2 * _

    return $
  }

  $.background = function (_) {
    background = _
    return $
  }

  $.size = function (_) {
    size = _
    return $
  }

  $.orientation = function (...args) {
    if (arguments.length === 0) {
      return $
    }

    orientation = args
    return $
  }

  $.shapeRendering = function (_) {
    shapeRendering = _
    return $
  }

  $.stroke = function (_) {
    stroke = _
    return $
  }

  $.strokeWidth = function (_) {
    strokeWidth = _
    return $
  }

  $.linearGradient = function (_) {
    linearGradient = _
    return $
  }

  $.id = function (_) {
    if (arguments.length === 0) {
      return id
    }

    id = _
    return $
  }

  $.url = function () {
    return `url(#${id})`
  }

  return $
}
