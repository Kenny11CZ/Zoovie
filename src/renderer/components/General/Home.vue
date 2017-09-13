<template>
    <div class="h-100">
        <toolbar isHome="true"
                 v-on:toggleFav="toggleFav"
                 v-bind:shown="visibility"
                 v-on:toggleSort="toggleSort"
                 v-bind:sorted="sorted">
        </toolbar>

        <div class="toolbar-offset h-100">
            <div class="scrollbar-fix h-100">
                <block v-for="(movie, index) in filteredMovies"
                       v-bind:movie="movie"
                       v-bind:index="index"
                       v-on:open="run(movie.file)"></block>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .scrollbar-fix {
        height: 100%;
        overflow-y: auto;
    }
</style>

<script>
    import Block from '../Movie/Block';
    import Toolbar from './Toolbar';
    import {mapMutations} from 'vuex';
    import {shell} from 'electron';

    const filters = {
        all: movies => movies,
        favourite: movies => movies.filter(movie => movie.favourite)
    }

    const sortable = ['Date', 'Name'];

    export default {
        name: 'home',
        components: {Block, Toolbar},
        data() {
            return {
                visibility: 'all'
            }
        },
        computed: {
            movies () {
                return this.$store.state[0].movies;
            },
            allFavourite () {
                return this.movies.every(movie => movie.favourite)
            },
            filteredMovies () {
                return filters[this.visibility](this.movies);
            },
            sorted() {
                return this.$store.state[0].sorted || 'Not sorted';
            }
        },
        methods: {
            run: function (file) {
                shell.openItem(file)
            },
            toggleFav() {
                this.visibility = this.visibility == 'all' ? 'favourite' : 'all';
            },
            toggleSort() {
                let index = sortable.indexOf(this.sorted) + 1;
                let by = index < sortable.length ? sortable[index] : sortable[0];
                this.$store.commit('sort', by);
            },
            ...mapMutations([
                'sort'
            ])
        }
    }
</script>