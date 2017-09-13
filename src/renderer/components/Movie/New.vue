<template class="h-100">
    <div class="h-100">
        <toolbar></toolbar>
        <div class="container h-100 toolbar-offset">
            <div class="row">
                <div class="col-sm-12 text-center">
                    <div class="info-form">
                        <form class="justify-content-center" v-on:submit="submit">
                            <div class="form-group">
                                <label for="name" class="not-selectable">{{$t('new.name')}}</label>
                                <input type="text" class="form-control" placeholder="Avengers" id="name" ref="name" required>
                            </div>
                            <div class="form-group">
                                <label for="title" class="not-selectable">{{$t('new.title')}}</label>
                                <input type="text" class="form-control" placeholder="Age of Ultron" id="title" ref="title">
                            </div>
                            <div class="form-group">
                                <label for="order" class="not-selectable">{{$t('new.order')}}</label>
                                <input type="number" class="form-control" placeholder="2" id="order" ref="order">
                            </div>
                            <div class="form-group">
                                <label for="movie" class="btn btn-outline-primary w-100 not-selectable">{{$t('new.movie')}}</label>
                                <input type="file" id="movie" ref="file" required class="hidden-xs-up">
                            </div>
                            <div class="form-group">
                                <label for="image" class="btn btn-outline-primary w-100 not-selectable">{{$t('new.image')}}</label>
                                <input type="file" id="image" ref="image" accept="image/*" class="hidden-xs-up">
                            </div>
                            <button type="submit" class="btn btn-outline-primary w-100"><i class="material-icons">add_to_queue</i></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from '../General/Toolbar';
    import {mapMutations} from 'vuex';
//    import {ext} from '../../store/modules/file';


    export default {
        name: 'new-movie',
        components: {Toolbar},
        methods: {
            ...mapMutations([
                'addMovie'
            ]),
            submit(e) {
                e.preventDefault();
                let movie = {};
                movie.name = this.$refs.name.value;
                movie.title = this.$refs.title.value;
                movie.order = this.$refs.order.value;
                movie.file = this.$refs.file.files[0].path;
                if(this.$refs.image.files[0]) {
                    movie.image = this.$refs.image.files[0].path;
                }
                this.$store.commit('addMovie', movie);
                this.$router.push('home');
            }
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
    button {
        cursor: pointer;
    }
    label {
        color: white;
    }
</style>