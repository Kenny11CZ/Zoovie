<template class="h-100">
    <div class="h-100">
        <toolbar isHidden="true">̿̿ ̿̿ ̿̿ ̿'̿'\̵͇̿̿\з= ( ▀ ͜͞ʖ▀) =ε/̵͇̿̿/’̿’̿ ̿ ̿̿ ̿̿ ̿̿</toolbar>
        <div class="container h-100 toolbar-offset">
            <div class="row">
                <h1>Zoovie</h1>
                <h3>Built with <i class="material-icons heart">favorite</i> by <a href="">Dan Balarin</a></h3>
                <img :src="badge" alt="badge"/>
                <router-link to="/home" class="btn btn-outline-primary"><i class="material-icons">forward</i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import Toolbar from '../General/Toolbar';


    export default {
        name: 'landing',
        components: {Toolbar},
        computed: {
            badge() {
                let num = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                return "static/badges/"+num+".svg";
            }
        }
    }
</script>
<style lang="scss" scoped="true">
    h1, h3 {
        color: #DDDDDD;
        -webkit-user-select: none;
        cursor: default;
    }

    .btn {
        padding: 5px 0;
        margin-top: 10px;
    }

    .container {
        display: flex;
        flex-direction: column;
        text-align: center;
        & > div {
            display: flex;
            flex-direction: column;
            text-align: center;
            margin: auto;
        }
    }

    button {
        cursor: pointer;
    }

    .heart {
        color: red;
        font-size: 30px;
    }
</style>