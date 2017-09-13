<template>
    <nav class="navbar navbar-toggleable-xl navbar-inverse bg-primary">
        <div class="navbar-collapse collapse dual-collapse">
            <ul class="navbar-nav mr-auto" v-if="!isHidden">
                <li class="nav-item" v-if="isHome">
                    <router-link to="/new" class="nav-link">
                        <i class="material-icons">add</i>
                    </router-link>
                </li>
                <li class="nav-item" v-if="isHome">
                    <a href="" class="nav-link" @click.prevent="$emit('toggleFav')">
                        <i class="material-icons fav" v-if="shown == 'all'">favorite_border</i>
                        <i class="material-icons fav" v-else="">favorite</i>
                    </a>
                </li>
                <li class="nav-item" v-if="isHome">
                    <a href="" class="nav-link" @click.prevent="$emit('toggleSort')">
                        {{ $t('toolbar.' + sortedText) }}
                        <!--<i class="material-icons">border_color</i>-->

                    </a>
                </li>
                <li class="nav-item" v-if="isHome">
                    <a href="" class="nav-link" @click.prevent="toggleLang">
                        {{ $i18n.locale }}
                    </a>
                </li>
                <li class="nav-item" v-else>
                    <router-link to="/home" class="nav-link">
                        <i class="material-icons">keyboard_backspace</i>
                    </router-link>
                </li>
            </ul>
        </div>
        <span class="navbar-brand d-flex mx-auto" href="#"><slot>{{name}} {{version}}</slot></span>
        <div class="navbar-collapse collapse dual-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item" @click.prevent="minimize">
                    <a class="nav-link" href="#">
                        <i class="material-icons">arrow_drop_down</i>
                    </a>
                </li>
                <li class="nav-item" @click.prevent="maximize">
                    <a class="nav-link" href="#">
                        <i class="material-icons">fullscreen</i>
                    </a>
                </li>
                <li class="nav-item" @click.prevent="close">
                    <a class="nav-link" href="#">
                        <i class="material-icons">close</i>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
</template>


<script>
    const ipcRenderer = require('electron').ipcRenderer;
    import Vue from 'vue';

    export default {
        name: 'toolbar',
        components: {},
        props: ['isHome', 'isHidden', 'shown', 'sorted'],
        computed: {
            version() {
                return require('electron').remote.app.getVersion();
            },
            name() {
                return require('electron').remote.app.getName();
            },
            sortedText() {
                return this.sorted.toLowerCase().replace(' ', '_');
            }
        },
        methods: {
            close (e) {
                ipcRenderer.send('zoovie:window:close', true)
            },
            maximize (e) {
                ipcRenderer.send('zoovie:window:maximize', true)
            },
            minimize (e) {
                ipcRenderer.send('zoovie:window:minimize', true)
            },
            toggleLang (e) {
                this.$i18n.locale = ipcRenderer.sendSync('zoovie:lang:rotate', true)
            }
        },
    }
</script>

<style lang="scss" scoped="true">

    .navbar {
        -webkit-app-region: drag;
        -webkit-user-select: none;
        padding: 0;
        height: $toolbar-height;
        width: 100%;
        position: fixed;
        z-index: 10000;
        -webkit-box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);

        li {
            -webkit-app-region: no-drag;
            /*width: 38px;*/
            height: 38px;
        }
    }

</style>
