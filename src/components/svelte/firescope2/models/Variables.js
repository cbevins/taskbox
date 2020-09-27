import { prop_dev } from "svelte/internal"

// Output units-of-measure
const area = {
  units: {b: 'ft2', e: 'ac', f: 'ac', m: 'ha'},
  decimals: {b: 0, e: 2, f: 2, m: 2}
}
const dist = {
  units: {b: 'ft', e: 'ft', f: 'ft', m: 'm'},
  decimals: {b: 0, e: 0, f: 0, m: 0}
}
const distCh = {
  units: {b: 'ft', e: 'ft', f: 'ch', m: 'm'},
  decimals: {b: 0, e: 2, f: 2, m: 0}
}
const fraction = {
  units: {b: 'ratio', e: 'percent', f: 'percent', m: 'percent'},
  decimals: {b: 2, e: 0, f: 0, m: 0}
}
const flame = {
  units: {b: 'ft', e: 'ft', f: 'ft', m: 'm'},
  decimals: {b: 2, e: 2, f: 2, m: 2}
}
const fli = {
  units: {b: 'btu/ft/s', e: 'btu/ft/s', f: 'btu/ft/s', m: 'J/m/s'},
  decimals: {b: 0, e: 0, f: 0, m: 0}
}
const hpua = {
  units: {b: 'btu/ft2', e: 'btu/ft2', f: 'btu/ft2', m: 'J/m2'},
  decimals: {b: 0, e: 0, f: 0, m: 0}
}
const ros = {
  units: {b: 'ft/min', e: 'ft/min',  f: 'ch/h', m: 'm/min'},
  decimals: {b: 2, e: 2, f: 2, m: 2}
}
const rxi = {
  units: {b: 'btu/ft2/min', e: 'btu/ft2/min', f: 'btu/ft2/min', m: 'J/m2/min'},
  decimals: {b: 0, e: 0, f: 0, m: 0}
}
const scorch = {
  units: {b: 'ft', e: 'ft', f: 'ft', m: 'm'},
  decimals: {b: 2, e: 2, f: 2, m: 2}
}

// These have additional 'i' for 'input' units-of-measure
const compass = {
  units: {b: 'deg', e: 'deg', f: 'deg', m: 'deg', i: 'deg'},
  decimals: {b: 0, e: 0, f: 0, m: 0, i: 0}
}
const moisture = {
  units: {b: 'ratio', e: '%', f: '%', m: '%', i: 'ratio'},
  decimals: {b: 2, e: 0, f: 0, m: 0, i: 0}
}
const slope = {
  units: {b: 'ratio', e: '%', f: '%', m: '%', i: 'ratio'},
  decimals: {b: 2, e: 0, f: 0, m: 0, i: 2}
}
const temp = {
  units: {b: 'F', e: 'F', f: 'F', m: 'C', i: 'F'},
  decimals: {b: 0, e: 0, f: 0, m: 0, i: 0}
}
const time = {
  units: {b: 'min', e: 'h', f: 'h', m: 'h', i: 'min'},
  decimals: {b: 0, e: 2, f: 2, m: 2, i: 0}
}
const wind = {
  units: {b: 'ft/min', e: 'mi/h', f: 'mi/h', m: 'km/h', i: 'ft/min'},
  decimals: {b: 0, e: 0, f: 0, m: 0, i: 0}
}

// The following inputs are required for the selected Nodes
export const Input = {
  airTemperature: {
    nodeKey: 'site.temperature.air',
    display: temp,
    range: {min: 30, max: 120, step: 5},
    value: {i: 75}
  },
  fuelModelCatalogKey: {
    nodeKey: 'surface.primary.fuel.model.catalogKey',
    display: null,
    range: null,
    value: {i: '124'},
  },
  fuelMoistureDead1: {
    nodeKey: 'site.moisture.dead.tl1h',
    display: moisture,
    range: {min: .01, max: .4, step: .01},
    value: {i: 0.05},
  },
  fuelMoistureDead10: {
    nodeKey: 'site.moisture.dead.tl10h',
    display: moisture,
    range: {min: .01, max: .4, step: .01},
    value: {i: 0.07},
  },
  fuelMoistureDead100: {
    nodeKey: 'site.moisture.dead.tl100h',
    display: moisture,
    range: {min: .01, max: .4, step: .01},
    value: {i: 0.09}
  },
  fuelMoistureLiveHerb: {
    nodeKey: 'site.moisture.live.herb',
    display: moisture,
    range: {min: 0.3, max: 4, step: 0.1},
    value: {i: 0.5}
  },
  fuelMoistureLiveStem: {
    nodeKey: 'site.moisture.live.stem',
    display: moisture,
    range: {min: 0.3, max: 4, step: 0.1},
    value: {i: 0.5}
  },
  slopeDirectionAspect: {
    nodeKey: 'site.slope.direction.aspect',
    display: compass,
    range: {min:0, max: 360, step: 5},
    value: {i: 225}
  },
  slopeSteepnessRatio: {
    nodeKey: 'site.slope.steepness.ratio',
    display: slope,
    range: {min: 0, max: 5, step: .05}, // 0-200%, and 5% is 3 deg
    value: {i: 1}
  },
  timeSinceIgnition: {
    nodeKey: 'site.fire.time.sinceIgnition',
    display: time,
    range: {min: 0, max: 24*60, step: 15},
    value: {i: 60}
  },
  windDirectionSourceFromNorth: {
    nodeKey: 'site.wind.direction.source.fromNorth',
    display: compass,
    range: {min:0, max: 360, step: 5},
    value: {i: 270}
  },
  windSpeedAtMidflame: {
    nodeKey: 'site.wind.speed.atMidflame',
    display: wind,
    range: {min: 0, max: 40*88, step: 88},
    value: {i: 880}
  },
}

export const Output = {
  firelineIntensity: {
    nodeKey: 'surface.weighted.fire.firelineIntensity',
    display: fli,
    value: {b: 0},
  },
  flameLength: {
    nodeKey:  'surface.weighted.fire.flameLength',
    display: flame,
    value: {b: 0},
  },
  fireHeadingFromNorth: {
    nodeKey:  'surface.weighted.fire.heading.fromNorth',
    display: compass,
    value: {b: 0},
  },
  fireHeadingFromUpslope: {
    nodeKey:  'surface.weighted.fire.heading.fromUpslope',
    display: compass,
    value: {b: 0},
  },
  heatPerUnitArea: {
    nodeKey:  'surface.weighted.fire.heatPerUnitArea',
    display: hpua,
    value: {b: 0},
  },
  lengthToWidthRatio: {
    nodeKey:  'surface.weighted.fire.lengthToWidthRatio',
    display: null,
    value: {b: 1},
  },
  reactionIntensity: {
    nodeKey:  'surface.weighted.fire.reactionIntensity',
    display: rxi,
    value: {b: 0},
  },
  scorchHeight: {
    nodeKey:  'surface.weighted.fire.scorchHeight',
    display: scorch,
    value: {b: 0},
  },
  spreadRate: {
    nodeKey:  'surface.weighted.fire.spreadRate',
    display: ros,
    value: {b: 0},
  },
  curedHerbFraction: {
    nodeKey:  'surface.primary.fuel.model.behave.parms.cured.herb.fraction',
    display: fraction,
    value: {b: 0},
  },
  backingFlameLength: {
    nodeKey:  'surface.fire.ellipse.back.flameLength',
    display: flame,
    value: {b: 0},
  },
  backingScorchHeight: {
    nodeKey:  'surface.fire.ellipse.back.scorchHeight',
    display: scorch,
    value: {b: 0},
  },
  backingSpreadDistance: {
    nodeKey:  'surface.fire.ellipse.back.spreadDistance',
    display: distCh,
    value: {b: 0},
  },
  backingSpreadRate: {
    nodeKey:  'surface.fire.ellipse.back.spreadRate',
    display: ros,
    value: {b: 0},
  },
  flankingFlameLength: {
    nodeKey:  'surface.fire.ellipse.flank.flameLength',
    display: flame,
    value: {b: 0},
  },
  flankingScorchHeight: {
    nodeKey:  'surface.fire.ellipse.flank.scorchHeight',
    display: scorch,
    value: {b: 0},
  },
  flankingSpreadDistance: {
    nodeKey:  'surface.fire.ellipse.flank.spreadDistance',
    display: distCh,
    value: {b: 0},
  },
  flankingSpreadRate: {
    nodeKey:  'surface.fire.ellipse.flank.spreadRate',
    display: ros,
    value: {b: 0},
  },
  headingFlameLength: {
    nodeKey:  'surface.fire.ellipse.head.flameLength',
    display: flame,
    value: {b: 0},
  },
  headingScorchHeight: {
    nodeKey:  'surface.fire.ellipse.head.scorchHeight',
    display: scorch,
    value: {b: 0},
  },
  headingSpreadDistance: {
    nodeKey:  'surface.fire.ellipse.head.spreadDistance',
    display: distCh,
    value: {b: 0},
  },
  headingSpreadRate: {
    nodeKey:  'surface.fire.ellipse.head.spreadRate',
    display: ros,
    value: {b: 0},
  },
  fireArea: {
    nodeKey:  'surface.fire.ellipse.size.area',
    display: area,
    value: {b: 0},
  },
  firePerimeter: {
    nodeKey:  'surface.fire.ellipse.size.perimeter',
    display: distCh,
    value: {b: 0},
  },
  fireWidth: {
    nodeKey:  'surface.fire.ellipse.size.width',
    display: distCh,
    value: {b: 0},
  },
  fireLength: {
    nodeKey:  'surface.fire.ellipse.size.length',
    display: distCh,
    value: {b: 0},
  }
}
// uom is 'b', 'e', 'f', or 'm'
export function displayString(item, uom) {
  if (item.display !== null) {
    const v = item.value[uom].toFixed(item.display.decimals[uom])
    return v + ' ' + item.display.units[uom]
  }
  return item.value.b
}

// uom is 'b', 'e', 'f', or 'm'
export function displayUnits(item, uom) {
  return (item.display === null) ? '' : item.display.units[uom]
}

// uom is 'b', 'e', 'f', or 'm'
export function displayValue(item, uom) {
  return (item.display !== null)
    ? item.value[uom].toFixed(item.display.decimals[uom])
    : item.value.b
}
