Vue.component('nav-bar', {
  props: ['title', 'currentPage'],
  template:
  `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <img src="/icon.png" width="30" height="30" class="d-inline-block align-top" alt="">
    {{title}}
  </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/places.html">Places</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/addPlace.html">Add a Place</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/admin.html">Remove</a>
        </li>
      </ul>
    </div>
  </nav>
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
    <tr is="admin-place-list-item" v-for="(place,index) in places" v-bind:place="place" v-bind:index="index" v-on:get-place="$emit('get-place', $event)"></tr>
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
    <td><button class='btn btn-danger' v-bind:value='place.id' v-on:click="$emit('delete-place', $event.target.value)">Delete Place</button></td>
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
        <button class='btn btn-primary mt-3' :disabled='!allowUpdate' :class='allowUpdate === true ? "btn-primary" : "btn-light"' v-bind:value='place.id' @click='$emit("update-place", $event.target.value)'>Save Changes</button>
      </div>
    </div>
    
    <div class='row-auto'>
      
    </div>
  </div>
  `,
});
