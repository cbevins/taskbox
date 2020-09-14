/**
 * The FireScope BehavePlus data store
 */
import { derived, writable } from 'svelte/store'
import { SurfaceFire } from './SurfaceFire.js'

export const model = new SurfaceFire()
export const _input = writable(model.input)
export const _output = derived(_input, $_input => {
  let output = model.run($_input)
  return {...output}
})
