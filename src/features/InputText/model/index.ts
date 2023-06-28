/* For store */
export { InputTextReducer } from './slice'

/* Actions */
export {
  updateLastLetterForward,
  updateLastLetterBackward,
  updateTextInput,
  addLetterCounter,
  clearLetterCounter,
  addTypos,
  initTypo,
  setEndStroke,
  queryWords,
  updateSpeed, updateAccuracy, clearSpeed, clearAccuracy
  } from "./slice"

/* Types */
export type {TextInputConfig} from './types'

/* Hooks */
export {usePressedKey} from './hooks'