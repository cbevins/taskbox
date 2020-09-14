import * as Dag from '@cbevins/behaveplus-radical'

export class SurfaceFire {
  constructor () {
    this.dag = new Dag.Bpx()
    // Single-fuel surface fire ellipse
    this.dag.setConfigs([
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
    ])

    // The following selected Nodes will be used by the _output store
    this.dag.setSelected([
      ['surface.weighted.fire.firelineIntensity', true],
      ['surface.weighted.fire.flameLength', true],
      ['surface.weighted.fire.heading.fromNorth', true],
      ['surface.weighted.fire.heading.fromUpslope', true],
      ['surface.weighted.fire.heatPerUnitArea', true],
      ['surface.weighted.fire.lengthToWidthRatio', true],
      ['surface.weighted.fire.reactionIntensity', true],
      ['surface.weighted.fire.scorchHeight', true],
      ['surface.weighted.fire.spreadRate', true],
      ['surface.primary.fuel.model.behave.parms.cured.herb.fraction', true],
      ['surface.fire.ellipse.back.flameLength', true],
      ['surface.fire.ellipse.back.spreadRate', true],
      ['surface.fire.ellipse.flank.flameLength', true],
      ['surface.fire.ellipse.flank.spreadRate', true],
      ['surface.fire.ellipse.head.flameLength', true],
      ['surface.fire.ellipse.head.spreadRate', true],
    ])

    // The following inputs are required for the selected Nodes
    this.input = {
      dag: this.dag, // included for easy access by components from the _input prop
      airTemperature: 95, // F
      fuelModelCatalogKey: '124',
      fuelMoistureDead1: 5, // %
      fuelMoistureDead10: 7, // %
      fuelMoistureDead100: 9, // %
      fuelMoistureLiveHerb: 50, // %
      fuelMoistureLiveStem: 150, // %
      slopeDirectionAspect: 225, // SW aspect, NE upslope
      slopeSteepnessRatio: 120, // %
      timeSinceIgnition: 60, // min
      windDirectionSourceFromNorth: 270, // from the west
      windSpeedAtMidflame: 10, // mph
    }
    this.run()
  }

  run (input=null) {
    if (input) this.input = input
    this.dag.runInputs([
      ['surface.primary.fuel.model.catalogKey', [this.input.fuelModelCatalogKey]],
      ['site.moisture.live.herb', [0.01 * this.input.fuelMoistureLiveHerb]],
      ['site.moisture.dead.tl10h', [0.01 * this.input.fuelMoistureDead10]],
      ['site.moisture.dead.tl100h', [0.01 * this.input.fuelMoistureDead100]],
      ['site.moisture.live.stem', [0.01 * this.input.fuelMoistureLiveStem]],
      ['site.slope.steepness.ratio', [0.01 * this.input.slopeSteepnessRatio]],
      ['site.moisture.dead.tl1h', [0.01 * this.input.fuelMoistureDead1]],
      ['site.slope.direction.aspect', [this.input.slopeDirectionAspect]],
      ['site.wind.direction.source.fromNorth', [this.input.windDirectionSourceFromNorth]],
      ['site.wind.speed.atMidflame', [88 * this.input.windSpeedAtMidflame]],
      ['site.temperature.air', [this.input.airTemperature]],
      ['site.fire.time.sinceIgnition', [this.input.timeSinceIgnition]]
    ])

    this.output = {
      dag: this.dag,
      curedHerbFraction: this.dag.get('surface.primary.fuel.model.behave.parms.cured.herb.fraction').value,
      firelineIntensity: this.dag.get('surface.weighted.fire.firelineIntensity').value,
      flameLength: this.dag.get('surface.weighted.fire.flameLength').value,
      fireHeadingFromNorth: this.dag.get('surface.weighted.fire.heading.fromNorth').value,
      fireHeadingFromUpslope: this.dag.get('surface.weighted.fire.heading.fromUpslope').value,
      heatPerUnitArea: this.dag.get('surface.weighted.fire.heatPerUnitArea').value,
      lengthToWidthRatio: this.dag.get('surface.weighted.fire.lengthToWidthRatio').value,
      reactionIntensity: this.dag.get('surface.weighted.fire.reactionIntensity').value,
      scorchHeight: this.dag.get('surface.weighted.fire.scorchHeight').value,
      spreadRate: this.dag.get('surface.weighted.fire.spreadRate').value,
      head: {
        flameLength: this.dag.get('surface.fire.ellipse.head.flameLength').value,
        spreadRate: this.dag.get('surface.fire.ellipse.head.spreadRate').value,
      },
      flank: {
        flameLength: this.dag.get('surface.fire.ellipse.flank.flameLength').value,
        spreadRate: this.dag.get('surface.fire.ellipse.flank.spreadRate').value,
      },
      back: {
        flameLength: this.dag.get('surface.fire.ellipse.back.flameLength').value,
        spreadRate: this.dag.get('surface.fire.ellipse.back.spreadRate').value,
      },
    }
    // Return this.output so run() can be used inside the Svelte derived store
    return this.output
  }
}
