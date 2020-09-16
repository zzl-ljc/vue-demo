<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
    </div>
</template>
<script>
import LayoutHeader from './components/Header';
import LayoutMain from './components/Main';
import LayoutNav from './components/Nav';
import { computed } from '@vue/composition-api';
export default {
    name: "layout",
    components: { LayoutHeader,LayoutMain,LayoutNav },
    setup(props, context) {
        const menuStatus = computed(() => context.root.$store.state.app.isCollapse)
        return {
            menuStatus
        }
    }
}
</script>
<style lang="scss" scoped>
    #layout{
        background-color: #f7f7f7;
    }
</style>