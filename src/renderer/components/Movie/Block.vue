<template>
    <div class="movie" :style="{backgroundImage: 'url(\''+movie.image+'\')'}" v-on:click="$emit('open')">
        <div class="controls not-selectable">
            <div class="float-left" v-on:click.stop="fav">
                <i class="material-icons fav" v-if="!movie.favourite">favorite_border</i>
                <i class="material-icons fav" v-else="">favorite</i>
            </div>
            <div class="float-right" v-on:click.stop="del" v-if="!isPreview">
                <i class="material-icons rem">close</i>
            </div>
            <div class="float-right" v-if="!isPreview">
                <router-link :to="{path: '/edit/'+index}">
                    <i class="material-icons edit">mode_edit</i>
                </router-link>
            </div>
        </div>
        <div class="name">
            <span class="name">
                {{movie.name}}
            </span>
            <span class="title">
                {{movie.title}}
            </span>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        name: 'block',
        components: {},
        props: ['movie', 'index', 'isPreview'],
        methods: {
            fav: function () {
                console.log(this.movie.image);
                this.$store.commit('toggleFavourite', this.index);
            },
            del: function () {
                this.$store.commit('deleteMovie', this.index);
            },
            ...mapMutations([
                'deleteMovie',
                'toggleFavourite',
            ])
        }
    }
</script>

<style lang="scss">
    .movie {
        width: 200px;
        height: 300px;
        float: left;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
        .controls {
            z-index: 10000;
            width: 100%;
            height: 24px;
            padding: 5px;
            transition: all 0.15s ease-out;
            div {
                height: 24px;
                width: 24px;
                cursor: pointer;
                .fav {
                    color: $brand-danger;
                }
                .rem {
                    color: $brand-warning;
                }
                .edit {
                    font-size: 20px;
                    color: $brand-info;
                }
                i {
                    font-size: 24px;
                }
            }
        }
        div.name {
            position: absolute;
            z-index: 1000;
            width: 100%;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.3);
            color: white;
            padding: 5px;
            text-align: center;
            font-size: 0.8em;
            line-height: 1.4em;
            min-height: 46px;
            vertical-align: middle;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            span.name{
                font-size: 1.1em;
                /*font-weight: 700;*/
            }
            span.title{
            }
        }
    }
</style>