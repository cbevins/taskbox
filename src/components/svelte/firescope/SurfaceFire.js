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
 * f: conversion factor from display units into base units
 */
export const Input = [
  {n:'surface.primary.fuel.model.catalogKey', k: 'fuelModelCatalogKey', v: '124', f: null},
  {n:'site.moisture.dead.tl1h', k: 'fuelMoistureDead1', v: 5, f: 0.01},
  {n:'site.moisture.dead.tl10h', k: 'fuelMoistureDead10', v: 7, f: 0.01},
  {n:'site.moisture.dead.tl100h', k: 'fuelMoistureDead100', v: 9, f: 0.01},
  {n:'site.moisture.live.herb', k: 'fuelMoistureLiveHerb', v: 50, f: 0.01}, // input % to ratio
  {n:'site.moisture.live.stem', k: 'fuelMoistureLiveStem', v: 150, f: 0.01},
  {n:'site.slope.steepness.ratio', k: 'slopeSteepnessRatio', v: 120, f: 0.01},
  {n:'site.slope.direction.aspect', k: 'slopeDirectionAspect', v: 225, f: null},
  {n:'site.wind.direction.source.fromNorth', k: 'windDirectionSourceFromNorth', v: 270, f: null},
  {n:'site.wind.speed.atMidflame', k: 'windSpeedAtMidflame', v: 10, f: 88}, // input mph to fpm
  {n:'site.temperature.air', k: 'airTemperature', v: 95, f: null},
  {n:'site.fire.time.sinceIgnition', k: 'timeSinceIgnition', v: 1, f: 60} // input hour to min
]

// Output units-of-measure
const compass = {b: 'deg', e: 'deg', f: 'deg', m: 'deg'}
const dist = {b: 'ft', e: 'ft', f: 'ft', m: 'm'}
const distCh = {b: 'ft', e: 'ft', f: 'ch', m: 'm'}
const fraction = {b: 'ratio', e: 'percent', f: 'percent', m: 'percent'}
const flame = {b: 'ft', e: 'ft', f: 'ft', m: 'm'}
const fli = {b: 'btu/ft/s', e: 'btu/ft/s', f: 'btu/ft/s', m: 'J/m/s'}
const hpua = {b: 'btu/ft2', e: 'btu/ft2', f: 'btu/ft2', m: 'J/m2'}
const none = {b: null, e: null, f: null, m: null}
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
  {n: 'surface.fire.ellipse.back.spreadRate', k: 'backingSpreadRate', u: ros},
  {n: 'surface.fire.ellipse.flank.flameLength', k: 'flankingFlameLength', u: flame},
  {n: 'surface.fire.ellipse.flank.scorchHeight', k: 'flankingScorchHeight', u: scorch},
  {n: 'surface.fire.ellipse.flank.spreadRate', k: 'flankingSpreadRate', u: ros},
  {n: 'surface.fire.ellipse.head.flameLength', k: 'headingFlameLength', u: flame},
  {n: 'surface.fire.ellipse.head.scorchHeight', k: 'headingScorchHeight', u: scorch},
  {n: 'surface.fire.ellipse.head.spreadRate', k: 'headingSpreadRate', u: ros}
]

export class SurfaceFire {
  constructor () {
    this.dag = new Dag.Bpx()
    this.dag.setConfigs(Config)

    // The following selected Nodes will be used by the _output store
    this.dag.setSelected(Output.map(out => [out.n, true]))

    // The following inputs are required for the selected Nodes
    this.input = {dag: this.dag} // included for easy access by components from the _input prop
    Input.forEach(inp => {this.input[inp.k] = inp.v})
    this.run()
  }

  run (input=null) {
    if (input) this.input = input
    // Convert this.input object's display values to base values,
    // build the Dag input array, and submit for a run
    const inputData = Input.map(inp =>
      [inp.n, [(inp.f === null) ? this.input[inp.k] : this.input[inp.k] * inp.f]])
    this.dag.runInputs(inputData)

    // Retrieve selected Nodes into this.output object
    this.output = {dag: this.dag}
    Output.forEach(out => {
      const node = this.dag.get(out.n)
      const b = node.value
      const e = (out.u === none ) ? b : node.variant.baseAsUom(b, out.u.e)
      const f = (out.u === none ) ? b : node.variant.baseAsUom(b, out.u.f)
      const m = (out.u === none ) ? b : node.variant.baseAsUom(b, out.u.m)
      const v = {b: b, e: e, f: f, m: m}
      const u = out.u
      this.output[out.k] = e
    })
    // Return this.output so run() can be used inside the Svelte derived store
    return this.output
  }
}
