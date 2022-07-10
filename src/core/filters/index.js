import { arrayToStringWithComma } from './array-filters'

export default {
    register(Vue) {
        arrayToStringWithComma(Vue);
    }
}