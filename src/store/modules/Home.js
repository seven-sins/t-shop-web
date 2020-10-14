
const Home = {
    state: {
        nav: "/"
    },
    getters: {
        getNav: state => state.nav
    },
    mutations: {
        setNav(state, nav){
            state.nav = nav;
        }
    }
}

export default Home;
