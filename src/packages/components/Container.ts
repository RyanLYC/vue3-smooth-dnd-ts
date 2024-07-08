import { smoothDnD, dropHandlers } from 'smooth-dnd'
import { defineComponent, h, type PropType } from 'vue'

import { getTagProps, validateTagProp } from '../utils'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
smoothDnD.wrapChild = false

const eventEmitterMap = {
  'drag-start': 'onDragStart',
  'drag-end': 'onDragEnd',
  drop: 'onDrop',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drop-ready': 'onDropReady',
}

type EventTypes = keyof typeof eventEmitterMap

export default defineComponent({
  name: 'Container',
  mounted() {
    // emit events
    const options = { ...this.$props }
    const keys = Object.keys(eventEmitterMap)
    for (const key of keys) {
      options[eventEmitterMap[key]] = (props) => {
        this.$emit(key as EventTypes, props)
      }
    }
    // @ts-ignore
    this.containerElement = this.$refs.container || this.$el
    // @ts-ignore
    this.container = smoothDnD(this.containerElement, options)
  },
  unmounted() {
    // @ts-ignore
    if (this.container) {
      try {
        // @ts-ignore
        this.container.dispose()
      } catch {
        // ignore
      }
    }
  },
  emits: ['drop', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drop-ready'],
  props: {
    /** Orientation of the container. Can be horizontal or vertical. */
    orientation: { type: String as PropType<'horizontal' | 'vertical'>, default: 'vertical' },
    /** Property to describe weather the dragging item will be moved or copied to target container. Can be move or copy or drop-zone or contain. */
    behaviour: { type: String as PropType<'move' | 'copy' | 'drop-zone' | 'contain'> },
    /** Draggables can be moved between the containers having the same group names. If not set container will not accept drags from outside. This behaviour can be overriden by shouldAcceptDrop function. See below. */
    groupName: String,
    /** Locks the movement axis of the dragging. Possible values are x, y or undefined. */
    lockAxis: { type: String as PropType<'x' | 'y'> },
    /** Css selector to test for enabling dragging. If not given item can be grabbed from anywhere in its boundaries. */
    dragHandleSelector: String,
    /** Css selector to prevent dragging. Can be useful when you have form elements or selectable text somewhere inside your draggable item. It has a precedence over dragHandleSelector. */
    nonDragAreaSelector: String,
    /** Time in milisecond. Delay to start dragging after item is pressed. Moving cursor before the delay more than 5px will cancel dragging. */
    dragBeginDelay: Number,
    /** First scrollable parent will scroll automatically if dragging item is close to boundaries. */
    autoScrollEnabled: { type: Boolean, default: true },
    /** Animation duration in milisecond. To be consistent this animation duration will be applied to both drop and reorder animations. */
    animationDuration: { type: Number, default: 250 },
    /** Class to be added to the ghost item being dragged. The class will be added after it's added to the DOM so any transition in the class will be applied as intended. */
    dragClass: String,
    /** Class to be added to the ghost item just before the drop animation begins. */
    dropClass: String,
    /** When set true onDrop will be called with a removedIndex if you drop element out of any relevant container */
    removeOnDropOut: { type: Boolean, default: false },
    /** Options for drop placeholder. className, animationDuration, showOnTop */
    dropPlaceholder: [Object, Boolean],
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    getGhostParent: Function,

    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  render() {
    const tagProps = getTagProps(this)
    return h(tagProps.value, { ref: 'container', ...tagProps.props }, this.$slots?.default!())
  },
})
