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

/**
 * n: Dag Node key
 * k: this.output[k]
 */
export const Output = [
  {n: 'surface.weighted.fire.firelineIntensity', k: 'firelineIntensity'},
  {n: 'surface.weighted.fire.flameLength', k: 'flameLength'},
  {n: 'surface.weighted.fire.heading.fromNorth', k: 'fireHeadingFromNorth'},
  {n: 'surface.weighted.fire.heading.fromUpslope', k: 'fireHeadingFromUpslope'},
  {n: 'surface.weighted.fire.heatPerUnitArea', k: 'heatPerUnitArea'},
  {n: 'surface.weighted.fire.lengthToWidthRatio', k: 'lengthToWidthRatio'},
  {n: 'surface.weighted.fire.reactionIntensity', k: 'reactionIntensity'},
  {n: 'surface.weighted.fire.scorchHeight', k: 'scorchHeight'},
  {n: 'surface.weighted.fire.spreadRate', k: 'spreadRate'},
  {n: 'surface.primary.fuel.model.behave.parms.cured.herb.fraction', k: 'curedHerbFraction'},
  {n: 'surface.fire.ellipse.back.flameLength', k: 'backingFlameLength'},
  {n: 'surface.fire.ellipse.back.scorchHeight', k: 'backingScorchHeight'},
  {n: 'surface.fire.ellipse.back.spreadRate', k: 'backingSpreadRate'},
  {n: 'surface.fire.ellipse.flank.flameLength', k: 'flankingFlameLength'},
  {n: 'surface.fire.ellipse.flank.scorchHeight', k: 'flankingScorchHeight'},
  {n: 'surface.fire.ellipse.flank.spreadRate', k: 'flankingSpreadRate'},
  {n: 'surface.fire.ellipse.head.flameLength', k: 'headingFlameLength'},
  {n: 'surface.fire.ellipse.head.scorchHeight', k: 'headingScorchHeight'},
  {n: 'surface.fire.ellipse.head.spreadRate', k: 'headingSpreadRate'}
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
      this.output[out.k] = this.dag.get(out.n).value
    })
    // Return this.output so run() can be used inside the Svelte derived store
    return this.output
  }
}
