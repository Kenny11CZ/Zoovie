import {save, load, copy, imagePath, getRandomInt, ext, imagePathFinal} from './file';
let path = require('path');


export const state = {
    // console.log(window.localStorage.getItem(STORAGE_KEY)),
    // movies: || '[{"name": "test", "image:": "", "file": "c://", "favourite": false}]')
    movies: load() || [],
    sorted: ''
};

let fixPath = function(path) {
    if(!path) {
        return path;
    }
    return path.replace(/[\\]/g, '/');
};

export const mutations = {
    addMovie(state, movie) {
        movie.favourite = false;
        if (!movie.image) {
            movie.image = 'static/default.jpg';
        } else {
            // let name = movie.name + '-' + getRandomInt(0, 999999) + ext(movie.image);
            // let image = imagePath(name);
            // copy(movie.image, image);
            // image = imagePathFinal(image);
            // movie.image = image;
            movie.image = fixPath(movie.image);
        }
        movie.path = fixPath(movie.path);
        movie.date = Date.now();
        state.movies.push(movie);
        save(JSON.stringify(state.movies));
    },
    // updateMovie(state, data) {
    //     let index = data.index;
    //     let movie = data.movie;
    //     let attrs = ['name', 'file', 'image', 'favourite', 'date', 'order', 'title'];
    //     for (let i = 0; i < attrs.length; ++i) {
    //         let attr = attrs[i];
    //         if (movie[attr]) {
    //             state.movies[index][attr] = movie[attr];
    //         }
    //     }
    //     save(JSON.stringify(state.movies));
    // },
    updateMovie: function (state, data) {
        for(let key in data) {
            if(key != 'index') {
                let value = data[key];
                if(key == 'image' || key == 'path') {
                    value = fixPath(value);
                }
                state.movies[data.index][key] = value;
            }
        }
        save(JSON.stringify(state.movies));
    },

    deleteMovie(state, index){
        state.movies.splice(index, 1);
        save(JSON.stringify(state.movies));
    },

    toggleFavourite(state, index){
        state.movies[index].favourite = !state.movies[index].favourite;
        save(JSON.stringify(state.movies));
    },

    sort(state, by){
        let name = function (a, b) {
            let cmp = a.name.localeCompare(b.name);
            if (cmp == 0) {
                return parseInt(a.order) > parseInt(b.order);
            }
            return cmp;
        };
        let date = function (a, b) {
            if (a == b) {
                return name(a, b);
            }
            return new Date(a.date) < new Date(b.date);
        };
        state.sorted = by;
        by = by.toLowerCase();
        if (by == 'name') {
            state.movies.sort(name);
        } else {
            state.movies.sort(date);
        }
        // for(let i = 0; i < state.movies.length; ++i) {
        //     console.log(i + ": " + state.movies[i].name + " (" + state.movies[i].order + ")");
        // }
        save(JSON.stringify(state.movies));
    }

    // editTodo (state, {todo, value}) {
    //     todo.text = value
    // },

    // toggleAll (state, {done}) {
    //     state.todos.forEach((todo) => {
    //         todo.done = done
    //     })
    // },

    // clearCompleted (state) {
    //     state.todos = state.todos.filter(todo => !todo.done)
    // }
}

export default {
    state,
    mutations,
}
