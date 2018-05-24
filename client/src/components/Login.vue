<template>
<div>
  <form onSubmit={e=> this.submit(e)}>
    <label>email</label><input type="text" v-model="email" onChange={e=> this.change(e)} />
    <label>password</label><input type="password" v-model="password" onChange={e=> this.change(e)} />
    <button type="submit">Submit</button>
  </form>
  {error v-if
  <p>Invalid credentials</p>}
</div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    change: function(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    submit: function(e) {
      e.preventDefault();
      axios.post('/auth/getToken', {
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        localStorage.setItem('example-jwt-jwt', res.data);
        this.props.history.push('/protected')
      }).catch(() => this.setState({

        error: true
      }));
    }
  }
}
</script>
