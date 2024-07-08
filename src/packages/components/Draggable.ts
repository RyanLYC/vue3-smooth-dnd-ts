import { constants } from 'smooth-dnd'
import { defineComponent, h } from 'vue'

import { getTagProps, validateTagProp } from '../utils'

export default defineComponent({
  name: 'Draggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  render() {
    const tagProps = getTagProps(this, constants.wrapperClass)
    return h(tagProps.value, { ...tagProps.props }, this.$slots?.default!())
  },
})
