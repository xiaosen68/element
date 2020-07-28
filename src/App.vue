<template>
  <div id="app">
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data() {
		return {
			// loginIf:true
		}
  },
  created() {
		// this.loginIf=false
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-y: visible;
  overflow-x: visible;
  height: 100%;
}
html,body{
	height: 100%;
}
*{
	margin: 0;
	padding: 0;
}

</style>
