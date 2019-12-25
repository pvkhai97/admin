<template>
  <v-navigation-drawer clipped app>
    <v-list dense nav>
      <v-list-item
        to="/"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/department"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Quản lý khoa viện</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/sector"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Quản lý ngành đào tạo</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/teacher"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Quản lý ngành giảng viên</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/student"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Quản lý sinh viên</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/subject"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Quản lý môn học</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/thesis"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Quản lý đồ án</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        to="/admin"
        active-class="success white--text"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Quản lý quản trị viên</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
