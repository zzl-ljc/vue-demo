<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { ref, computed } from '@vue/composition-api';
export default {
    name: "svgIcon",
    props: {
        iconClass: {
            type: String,
            default: "",
        },
        className: {
            type: String,
            default: ""
        }
    },
    setup(props) {
        const iconName = computed(()=>`#icon-${props.className}`);
        const svgClass = computed(() => {
            if(props.className) {
                return `svg-icon ${props.className}`;
            } else {
                return `svg-icon`;
            }
        });
        return {
            iconName,
            svgClass
        }
    }
};
</script>
<style lang="scss" scoped>
    .svg-icon{
        fill: currentColor;
        width: 1em;
        height: 1em;
    }
</style>