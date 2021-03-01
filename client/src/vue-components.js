Vue.component('nav-bar', {
  props: ['appTitle', 'currentPage'],
  template:
  `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{appTitle}}</a>
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
          <a class="nav-link" href="/addPlace.html">Add a place</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/admin.html">Admin</a>
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
    <tr is="place-list-item" v-for="(place,index) in places" v-bind:place="place" v-bind:index="index"></tr>
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
    <td><button>More Info</button></td>
  </tr>
  `,
});

Vue.component('place-info', {
  props: ['place'],
  template: `
  <tr>
    <td>{{place.name}}</td>
    <td>{{place.address}}</td>
    <td>{{place.reccomendedBy}}</td>
    <td>{{place.notes}}</td>
    <td><button>More Info</button></td>
  </tr>
  `,
});

