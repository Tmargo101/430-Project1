Vue.component('nav-bar', {
  props: ['title', 'currentPage'],
  template:
  `
  <div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#">
      <img src="/icon.png" width="30" height="30" class="d-inline-block align-top" alt="">
      {{title}}
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/places.html">Places</b-nav-item>
        <b-nav-item href="/addPlace.html">Add a Place</b-nav-item>
        <b-nav-item href="/removePlace.html">Remove Places</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
  `,
});

Vue.component('place-list', {
  props: ['places'],
  template: `
  <div>
  <table class="table table-striped">
    <thead>
      <th>Place Name</th>
      <th>Address</th>
      <th>Reccomended by</th>
      <th>Notes</th>
      <th></th>
    </thead>
    <tr is="place-list-item" v-for="(place,index) in places" v-bind:place="place" v-bind:index="index" v-on:get-place="$emit('get-place', $event)"></tr>
  </table>
  </div>
  `,
});

Vue.component('place-list-item', {
  props: ['place'],
  template: `
  <tr>
    <td>{{place.name}}</td>
    <td>{{place.address}}</td>
    <td>{{place.reccomendedBy}}</td>
    <td>{{place.notes}}</td>
    <td><button class='btn btn-secondary' v-bind:value='place.id' v-on:click="$emit('get-place', $event.target.value)">More Info</button></td>
  </tr>
  `,
});

Vue.component('admin-place-list', {
  props: ['places'],
  template: `
  <div>
  <table class="table table-striped">
    <thead>
      <th>Place Name</th>
      <th>Address</th>
      <th>Reccomended by</th>
      <th>Notes</th>
      <th></th>
    </thead>
    <tr is="admin-place-list-item" v-for="(place,index) in places" v-bind:place="place" v-bind:index="index" v-on:remove-place="$emit('remove-place', $event)"></tr>
  </table>
  </div>
  `,
});

Vue.component('admin-place-list-item', {
  props: ['place'],
  template: `
  <tr>
    <td>{{place.name}}</td>
    <td>{{place.address}}</td>
    <td>{{place.reccomendedBy}}</td>
    <td>{{place.notes}}</td>
    <td><button class='btn btn-danger' v-bind:value='place.id' v-on:click="$emit('remove-place', $event.target.value)">Remove Place</button></td>
  </tr>
  `,
});


Vue.component('place-info', {
  props: ['place'],
  data: function () {
    return {
      allowUpdate: false,
    }
  },
  template: `
  <div class='container-fluid p-3 border rounded' style='border: 5px black;'>
    <div class='row justify-content-start'>
      <div class='col-auto'>
        <h1 class='display-4'>{{place.name}}</h1>
      </div>
    </div>
    <div class='row justify-content-between pt-3 pl-5'>
      <div class='col-auto'>
        <h3>Address:</h3>
      </div>
      <div class='col-auto'>
        <h3>{{place.address}}</h3>
      </div>
      <hr>
    </div>
    <div class='row justify-content-between pt-3 pl-5'>
      <div class='col-auto'>
        <h4>Reccomended by:</h4>
      </div>
      <div class='col-auto'>
        <h4>{{place.reccomendedBy}}</h4>
      </div>
      <hr>
    </div>
    <div class='row justify-content-center pt-5'>
      <div class='col-11'>
        <h4>Notes:</h4>
        <textarea rows='6' class='form-control' v-model='place.notes' v-on:input='allowUpdate = true;'></textarea>
        <button class='btn btn-primary mt-3' :disabled='!allowUpdate' :class='allowUpdate === true ? "btn-primary" : "btn-light"' v-bind:value='place.id' @click='$emit("update-place", $event.target.value); allowUpdate = false;'>Save Changes</button>
      </div>
    </div>
    
    <div class='row-auto'>
      
    </div>
  </div>
  `,
});
