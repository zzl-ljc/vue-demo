<template>
    <div id="main_wrap">
        <div class="main_content">
            <div class="content">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    #main_wrap{
        height: 100vh;
    }
    .main_content{
        width: 100%;
        height: 100%;
        padding-top: 75px + 30;
        padding-left: 250px + 30;
        padding-right: 30px;
        box-sizing: border-box;
    }
    .content{
        width: 100%;
        height: 100%;
        padding-left: 30px;
        padding-right: 30px;
        padding-top: 30px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .open{
        .main_content{
            padding-left: 250px + 30px;
        }
    }
    .close{
        .main_content{
            padding-left: 64px + 30px;
        }
    }
</style>