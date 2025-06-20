<template>
	<div class="analytics" style="display: flex">
		<MySidebar />
		<router-view></router-view>
  </div>
</template>

<script>
import MySidebar from '@/components/Sidebar.vue'

export default {
	components: {
		MySidebar
	}
}

</script>

<style scoped>
  .analytics {
    display: flex;
    font-family: "Roboto", sans-serif;
    background: #141414;
    color: white;
    height: 100vh;
    overflow-y: hidden;
  }
</style>