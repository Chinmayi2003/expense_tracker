<template>
  <aside class="sidebar">
    <div class="app-icon">
      <template>
        <img
          :src="require('@/assets/app_icon.svg')"
          alt="Dashboard Icon"
          style="color: aliceblue; height: 50px; width: 50px; fill: #c1bfd9"
          class="icon"
        />
      </template>
      <h2 class="logo">John</h2>
    </div>
    <ul>
      <div class="dashboard-icon">
        <template>
          <img
            :src="require('@/assets/dashboard_icon.svg')"
            alt="Dashboard Icon"
            style="color: aliceblue; height: 20px; width: 20px; fill: #c1bfd9"
            class="icon"
          />
        </template>
        <li class="dashboard-name">Dashboard</li>
      </div>

      <div class="dashboard-icon">
        <template>
          <img
            :src="require('@/assets/analytics_icon.svg')"
            alt="Dashboard Icon"
            style="color: aliceblue; height: 20px; width: 20px; fill: #c1bfd9"
            class="icon"
          />
        </template>
        <li class="dashboard-name">Analytics</li>
      </div>

      <div class="dashboard-icon">
        <template>
          <img
            :src="require('@/assets/settings_icon.svg')"
            alt="Dashboard Icon"
            style="color: aliceblue; height: 20px; width: 20px; fill: #c1bfd9"
            class="icon"
          />
        </template>
        <li class="dashboard-name">Settings</li>
      </div>

      <div class="dashboard-icon">
        <template>
          <img
            :src="require('@/assets/logout_icon.svg')"
            alt="Dashboard Icon"
            style="color: aliceblue; height: 20px; width: 20px; fill: #c1bfd9"
            class="icon"
          />
        </template>
        <li class="dashboard-name" style="margin-top: 13px">Log out</li>
      </div>
    </ul>
    <img
      :src="require('@/assets/LOGO.svg')"
      alt="Dashboard Icon"
      style="
        color: aliceblue;
        height: 70px;
        width: 70px;
        margin-top: 160px;
        margin-left: -5px;
        fill: #c1bfd9;
      "
      class="icon"
    />
  </aside>
</template>

<style scoped>
.sidebar {
  width: 145px;
  background: #0d0d0d;
  padding: 20px;
  overflow-y: hidden;
  position: fixed;
}

.app-icon {
  display: flex;
}

.icon {
  padding-top: 13px;
}

.dashboard-icon {
  display: flex;
  padding-top: 0px;
}

.dashboard-name {
  padding-left: 20px;
  margin-top: 10px;
}

.logo {
  margin-bottom: 25px;
  font-size: 20px;
  padding-left: 5px;
  padding-top: 25px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 15px 0;
}
</style>
