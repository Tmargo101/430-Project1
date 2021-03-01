const app = new Vue({
  el: '#app',
  data: {
    username: '',
    appTitle: "Places to Eat",
    pageTitle: "Sign in",
    api: {
      getAllPlaces: "http://localhost:3000/get-all-places",
      getPlace: "http://localhost:3000/get-place"
    },
    places: {},
  },
  methods:{
  getAllPlaces(){
    fetch(this.api.getAllPlaces)
      .then(response => {
      if(!response.ok){
        throw Error(`ERROR: ${response.statusText}`);
      }
      return response.json();
      })
      .then(json => {	
        console.log(json);
        this.places = json;
      });
    } // end getAllPlaces
  }, // end methods
  created() {
    this.getAllPlaces();
  }
});
