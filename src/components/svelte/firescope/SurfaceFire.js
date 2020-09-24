import * as Dag from '@cbevins/behaveplus-radical'

// Single-fuel surface fire ellipse
export const Config = [
  ['configure.fire.effectiveWindSpeedLimit', ['applied', 'ignored'][0]],
  ['configure.fire.firelineIntensity', ['firelineIntensity', 'flameLength'][1]],
  ['configure.fire.lengthToWidthRatio', ['lengthToWidthRatio', 'effectiveWindSpeed'][0]],
  ['configure.fire.weightingMethod', ['arithmetic', 'expected', 'harmonic'][0]],
  ['configure.fire.vector', ['fromHead', 'fromUpslope', 'fromNorth'][0]],
  ['configure.fuel.chaparralTotalLoad', ['input', 'estimated'][0]],
  ['configure.fuel.curedHerbFraction', ['input', 'estimated'][1]],
  ['configure.fuel.moisture', ['individual', 'liveCategory', 'category', 'catalog'][0]],
  ['configure.fuel.primary', ['catalog', 'behave', 'chaparral', 'palmettoGallberry', 'westernAspen'][0]],
  ['configure.fuel.secondary', ['none', 'catalog', 'behave', 'chaparral', 'palmettoGallberry', 'westernAspen'][0]],
  ['configure.fuel.windSpeedAdjustmentFactor', ['input', 'estimated'][0]],
  ['configure.slope.steepness', ['ratio', 'degrees', 'map'][0]],
  ['configure.wind.direction', ['sourceFromNorth', 'headingFromUpslope', 'upslope'][0]],
  ['configure.wind.speed', ['at10m', 'at20ft', 'atMidflame'][2]]
]

/**
 * n: Dag Node key
 * k: this.input[k]
 * v: initial value in display units
 * f: conversion factor from screen display units into base units
 * min, max, step: input slider and output graph scale parms
 */
export const Input = [
  {n:'surface.primary.fuel.model.catalogKey', k: 'fuelModelCatalogKey',
    v: '124', f: null, min: null, max: null, step: null},
  {n:'site.moisture.dead.tl1h', k: 'fuelMoistureDead1',
    v: 5, f: 0.01,
    min: 1, max: 40, step: 1},
  {n:'site.moisture.dead.tl10h', k: 'fuelMoistureDead10',
    v: 7, f: 0.01,
    min: 1, max: 40, step: 1},
  {n:'site.moisture.dead.tl100h', k: 'fuelMoistureDead100',
    v: 9, f: 0.01,
    min: 1, max: 40, step: 1},
  {n:'site.moisture.live.herb', k: 'fuelMoistureLiveHerb',
    v: 50, f: 0.01, // input % to ratio
    min: 30, max: 400, step: 10},
  {n:'site.moisture.live.stem', k: 'fuelMoistureLiveStem',
    v: 150, f: 0.01,
    min: 30, max: 400, step: 10},
  {n:'site.slope.steepness.ratio', k: 'slopeSteepnessRatio',
    v: 120, f: 0.01,
    min: 0, max: 200, step: 5}, // 0-200%, and 5% is 3 deg
  {n:'site.slope.direction.aspect', k: 'slopeDirectionAspect',
    v: 225, f: null,
    min:0, max: 360, step: 5},
  {n:'site.wind.direction.source.fromNorth', k: 'windDirectionSourceFromNorth',
    v: 270, f: null,
    min:0, max: 360, step: 5},
  {n:'site.wind.speed.atMidflame', k: 'windSpeedAtMidflame',
    v: 10, f: 88, // input mph to fpm
    min: 0, max: 40, step: 1},
  {n:'site.temperature.air', k: 'airTemperature',
    v: 95, f: null,
    min: 30, max: 120, step: 5},
  {n:'site.fire.time.sinceIgnition', k: 'timeSinceIgnition',
    v: 1, f: 60, // input hour to min
    min: 0, max: 24, step: 0.25},
]

// Output units-of-measure
const area = {b: 'ft2', e: 'ac', f: 'ac', m: 'ha'}
const compass = {b: 'deg', e: 'deg', f: 'deg', m: 'deg'}
const dist = {b: 'ft', e: 'ft', f: 'ft', m: 'm'}
const distCh = {b: 'ft', e: 'ft', f: 'ch', m: 'm'}
const fraction = {b: 'ratio', e: 'percent', f: 'percent', m: 'percent'}
const flame = {b: 'ft', e: 'ft', f: 'ft', m: 'm'}
const fli = {b: 'btu/ft/s', e: 'btu/ft/s', f: 'btu/ft/s', m: 'J/m/s'}
const hpua = {b: 'btu/ft2', e: 'btu/ft2', f: 'btu/ft2', m: 'J/m2'}
const none = {b: '', e: '', f: '', m: ''}
const ros = {b: 'ft/min', e: 'ft/min',  f: 'ch/h', m: 'm/min'}
const rxi = {b: 'btu/ft2/min', e: 'btu/ft2/min', f: 'btu/ft2/min', m: 'J/m2/min'}
const scorch = {b: 'ft', e: 'ft', f: 'ft', m: 'm'}

/**
 * n: Dag Node key
 * k: this.output[k]
 */
export const Output = [
  {n: 'surface.weighted.fire.firelineIntensity', k: 'firelineIntensity', u: fli},
  {n: 'surface.weighted.fire.flameLength', k: 'flameLength', u: flame},
  {n: 'surface.weighted.fire.heading.fromNorth', k: 'fireHeadingFromNorth', u: compass},
  {n: 'surface.weighted.fire.heading.fromUpslope', k: 'fireHeadingFromUpslope', u: compass},
  {n: 'surface.weighted.fire.heatPerUnitArea', k: 'heatPerUnitArea', u: hpua},
  {n: 'surface.weighted.fire.lengthToWidthRatio', k: 'lengthToWidthRatio', u: none},
  {n: 'surface.weighted.fire.reactionIntensity', k: 'reactionIntensity', u: rxi},
  {n: 'surface.weighted.fire.scorchHeight', k: 'scorchHeight', u: scorch},
  {n: 'surface.weighted.fire.spreadRate', k: 'spreadRate', u: ros},
  {n: 'surface.primary.fuel.model.behave.parms.cured.herb.fraction', k: 'curedHerbFraction', u: fraction},
  {n: 'surface.fire.ellipse.back.flameLength', k: 'backingFlameLength', u: flame},
  {n: 'surface.fire.ellipse.back.scorchHeight', k: 'backingScorchHeight', u: scorch},
  {n: 'surface.fire.ellipse.back.spreadDistance', k: 'backingSpreadDistance', u: distCh},
  {n: 'surface.fire.ellipse.back.spreadRate', k: 'backingSpreadRate', u: ros},
  {n: 'surface.fire.ellipse.flank.flameLength', k: 'flankingFlameLength', u: flame},
  {n: 'surface.fire.ellipse.flank.scorchHeight', k: 'flankingScorchHeight', u: scorch},
  {n: 'surface.fire.ellipse.flank.spreadDistance', k: 'flankingSpreadDistance', u: distCh},
  {n: 'surface.fire.ellipse.flank.spreadRate', k: 'flankingSpreadRate', u: ros},
  {n: 'surface.fire.ellipse.head.flameLength', k: 'headingFlameLength', u: flame},
  {n: 'surface.fire.ellipse.head.scorchHeight', k: 'headingScorchHeight', u: scorch},
  {n: 'surface.fire.ellipse.head.spreadDistance', k: 'headingSpreadDistance', u: distCh},
  {n: 'surface.fire.ellipse.head.spreadRate', k: 'headingSpreadRate', u: ros},
  {n: 'surface.fire.ellipse.size.area', k: 'fireArea', u: area},
  {n: 'surface.fire.ellipse.size.perimeter', k: 'firePerimeter', u: distCh},
  {n: 'surface.fire.ellipse.size.width', k: 'fireWidth', u: distCh},
  {n: 'surface.fire.ellipse.size.length', k: 'fireLength', u: distCh}
]

export class SurfaceFire {
  constructor () {
    this.dag = new Dag.Bpx()

    // The following inputs are required for the selected Nodes
    this.input = {
      dag: this.dag, // included for easy access by components from the _input prop
      uom: 'e', // display units-of-measure set: 'b', 'e', 'f', 'm'
      behavior: 'spreadRate', // variable shown on fire ellipse
    }
    Input.forEach(inp => {this.input[inp.k] = inp.v})

    this.range = {
      x: {
        key: 'windSpeedAtMidflame',
        node: null,
        spec: null, // Input element
        values: {b: [], e: [], f: [], m: []}
      },
      y: {
        key: 'headingSpreadRate',
        node: null,
        spec: null, // Output element
        values: {b: [], e: [], f: [], m: []}
      }
    }

    this.dag.setConfigs(Config)
    this.runSingle()
  }

  runSingle (input=null) {
    if (input) {
      this.input = input
    }
    // The following selected Nodes will be used by the _output store
    this.dag.setSelected(Output.map(out => [out.n, true]))
    // Convert this.input object's input display values to base values,
    // build the Dag input array, and submit for a run
    const inputData = Input.map(inp =>
      [inp.n, [(inp.f === null) ? this.input[inp.k] : this.input[inp.k] * inp.f]])
    this.dag.runInputs(inputData)

    // Retrieve selected Nodes into this.output object
    this.output = {dag: this.dag, range: {}}
    Output.forEach(out => {
      const node = this.dag.get(out.n)
      const b = node.value
      const e = (out.u === none ) ? b : node.variant.baseAsUom(b, out.u.e)
      const f = (out.u === none ) ? b : node.variant.baseAsUom(b, out.u.f)
      const m = (out.u === none ) ? b : node.variant.baseAsUom(b, out.u.m)
      const v = {b: b, e: e, f: f, m: m}
      const u = out.u
      this.output[out.k] = {v: v, u: u}
    })
    this.runRange()
    this.output.range = this.range
    // Return this.output so run() can be used inside the Svelte derived store
    return this.output
  }

  findSpec(specArray, key) {
    for(let i=0; i<specArray.length; i++) {
      if (specArray[i].k === key) {
        return specArray[i]
      }
    }
    return null
  }

  // Run range variable
  runRange() {
    const x = this.range.x
    const y = this.range.y
    x.spec = this.findSpec(Input, x.key)
    x.node = this.dag.get(x.spec.n)
    x.values = {b: [], e: [], f: [], m: []}
    y.spec = this.findSpec(Output, y.key)
    y.node = this.dag.get(y.spec.n)
    y.values = {b: [], e: [], f: [], m: []}

    // Generate the x base input values
    for(let xv=x.spec.min; xv<=x.spec.max+1e-6; xv+=x.spec.step) {
      x.values.b.push(xv * x.spec.f)
      // \TODO - store e[], m[], f[] values
    }
    // Run the inputs
    this.dag.setSelected([[y.node, true]])
    this.dag.runInputs([[x.node, x.values.b]])
    // Store the outputs
    y.values.b = [...this.dag.dna.results.map.get(y.node)]
    const u = y.spec.u
    const v = y.node.variant
    y.values.b.forEach(bv => {
      y.values.e.push((u === none ) ? bv : v.baseAsUom(bv, u.e))
      y.values.f.push((u === none ) ? bv : v.baseAsUom(bv, u.f))
      y.values.m.push((u === none ) ? bv : v.baseAsUom(bv, u.m))
    })
  }
}
