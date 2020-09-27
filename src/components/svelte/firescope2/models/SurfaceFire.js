import * as Dag from '@cbevins/behaveplus-radical'
import * as Uom from '@cbevins/behaveplus-uom'
import {Input, Output} from './Variables.js'

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

export class SurfaceFire {
  constructor () {
    this.dag = new Dag.Bpx()

    this.input = {...Input}
    this.input.dag = this.dag // included for easy access by components from the _input prop
    this.input.uom = 'e' // display units-of-measure set: 'b', 'e', 'f', 'm'
    this.input.behavior = 'spreadRate', // variable shown on fire ellipse
    Object.keys(Input).forEach(key => {
      const item = this.input[key]
      item.node = this.dag.get(item.nodeKey)
      this.setValuesFromInput(item)
    })

    // Set up output nodes and the array for Dag.setSelected()
    this.selected = []
    this.output = {dag: this.dag, range: {}, ...Output}
    Object.keys(Output).forEach(key => {
      const item = this.output[key]
      item.node = this.dag.get(item.nodeKey)
      this.selected.push([item.node, true])
    })

    this.dag.setConfigs(Config)
    this.runSingle()
  }

  runSingle (input=null) {
    if (input) {
      this.input = input
    }
    this.dag.setSelected(this.selected)

    // Convert all this.input entry values to base values,
    // build the Dag input array, and submit for a run
    const inputData = []
    Object.keys(Input).forEach(key => {
      const item = this.input[key]
      this.setValuesFromInput(item)
      inputData.push([item.node, [item.value.b]])
    })
    this.dag.runInputs(inputData)

    // Retrieve selected Nodes into this.output object
    Object.keys(Output).forEach(key => {
      this.setValuesFromBase(this.output[key])
    })
    // Return this.output so run() can be used inside the Svelte derived store
    return this.output
  }

  setValuesFromBase(item) {
    item.value.b = item.node.value
    const b = item.value.b
    if (item.display !== null) {
      const u = item.display.units
      item.value.e = Uom.convert(b, u.b, u.e)
      item.value.f = Uom.convert(b, u.b, u.f)
      item.value.m = Uom.convert(b, u.b, u.m)
    } else {
      item.value.e = b
      item.value.f = b
      item.value.m = b
    }
  }

  setValuesFromInput(item) {
    const i = item.value.i
    if (item.display !== null) {
      const u = item.display.units
      item.value.b = Uom.convert(i, u.i, u.b)
      const b = item.value.b
      item.value.e = Uom.convert(b, u.b, u.e)
      item.value.f = Uom.convert(b, u.b, u.f)
      item.value.m = Uom.convert(b, u.b, u.m)
    } else {
      item.value.b = item.value.i
      item.value.e = item.value.i
      item.value.f = item.value.i
      item.value.m = item.value.i
    }
  }
}