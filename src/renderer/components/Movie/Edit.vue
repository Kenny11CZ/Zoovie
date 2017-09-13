<template>
    <div class="h-100">
        <toolbar></toolbar>
        <div class="container h-100 toolbar-offset">
            <div class="row">
                <div class="col-sm-6 block">
                    <block v-bind:isPreview="true"
                           v-bind:index="index()"
                           v-bind:movie="movie">
                    </block>
                </div>
                <div class="col-sm-6 text-center">
                    <div class="info-form">
                        <form class="justify-content-center">
                            <div class="form-group">
                                <label for="name" class="not-selectable">{{$t('edit.name')}}</label>
                                <input type="text" class="form-control" :value="movie.name" id="name" ref="name" v-on:keyup.stop="updateField('name', $event.target.value)"
                                       required>
                            </div>
                            <div class="form-group">
                                <label for="title" class="not-selectable">{{$t('edit.title')}}</label>
                                <input type="text" class="form-control" :value="movie.title" id="title" v-on:keyup.stop="updateField('title', $event.target.value)"
                                       ref="title">
                            </div>
                            <div class="form-group">
                                <label for="order" class="not-selectable">{{$t('edit.order')}}</label>
                                <input type="number" class="form-control" :value="movie.order" id="order" ref="order" @change.stop="updateField('order', $event.target.value)">
                            </div>
                            <div class="form-group">
                                <label for="movie" class="btn btn-outline-primary w-100 not-selectable">{{$t('edit.movie')}}</label>
                                <input type="file" id="movie" ref="file" class="hidden-xs-up" @change.stop="updateField('file', $event.target.value)">
                            </div>
                            <div class="form-group">
                                <label for="image" class="btn btn-outline-primary w-100 not-selectable">{{$t('edit.image')}}</label>
                                <input type="file" id="image" ref="image" accept="image/*" class="hidden-xs-up" @change.stop="updateField('image', $event.target.files[0].path)">
                            </div>
                            <router-link to="/home" class="btn btn-outline-primary w-100">
                                <i class="material-icons">done</i>
                            </router-link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Toolbar from '../General/Toolbar';
    import Block from './Block.vue'

    //fixme: change submit button
    //fixme: require movie


    export default {
        name: 'edit',

        components: {Toolbar, Block},
//        props: ['index'],
        methods: {
            index() {
                return this.$route.params.id;
            },
            updateField(field, value) {
                this.$store.commit('updateMovie', {
                    index: this.$route.params.id,
                    [field]: value
                });
            }
        },
        computed: {
            movie() {
                return this.$store.state[0].movies[this.$route.params.id];
            }
//            movie: {
//                get () {
//                    return this.$store.state[0].movies[this.$route.params.id];
//                },
//                set (movie) {
//                    console.log("mutation");
//                    this.$store.commit('updateMovie', {index: this.$route.params.id, movie: movie});
//                }
//            }
        }
    }
</script>

<style lang="scss" scoped="true">
    .container {
        display: flex;
        & > div {
            margin: auto;
        }
    }



    .block > div, .block {
        display: flex;
        margin: auto;
    }

    button {
        cursor: pointer;
    }

    label {
        color: white;
    }
</style>