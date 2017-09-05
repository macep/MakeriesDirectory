<template>
  <div class="row xxlg-padding">
    <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <h3>Register New User</h3>
      <p>Create a brand new user and add them to this site.</p>
      <hr>
      <form class="row form-horizontal small-gutter">
        <div class="form-group required">
          <label for="input-username" class="col-sm-4 control-label">Username</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="input-username" placeholder="Username">
          </div>
        </div>
        <div class="form-group required">
          <label for="input-email" class="col-sm-4 control-label">Email</label>
          <div class="col-sm-8">
            <input type="email" class="form-control" id="input-email" placeholder="Email">
          </div>
        </div>
        <div class="form-group">
          <label for="input-first-name" class="col-sm-4 control-label">Full Name</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-first-name" placeholder="First Name">
          </div>
          <div class="col-sm-4">
            <input type="text" class="form-control" id="input-last-name" placeholder="Last Name">
          </div>
        </div>
        <div class="form-group">
          <label for="input-website" class="col-sm-4 control-label">Website</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="input-website" placeholder="Website">
          </div>
        </div>
        <div class="form-group required">
          <label for="input-password" class="col-sm-4 control-label">Password</label>
          <div class="col-sm-8">
            <input type="password" class="form-control" id="input-password" placeholder="Password">
          </div>
        </div>
        <div class="form-group">
          <label for="user-role" class="col-sm-4 control-label">User Role</label>
          <div class="col-sm-4">
            <select id="user-role" class="form-control">
              <option>Subscriber</option>
              <option>Contributor</option>
              <option>Author</option>
              <option>Editor</option>
              <option disabled>Administrator</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-4 col-sm-8">
            <div class="checkbox">
              <button type="submit" class="btn btn-warning lg-margin-right">Register</button>
              <label><input type="checkbox"> Remember my password</label>
            </div>
          </div>
        </div>
      </form>
      <hr>
    </div>
  </div>
</template>

<script>

</script>
