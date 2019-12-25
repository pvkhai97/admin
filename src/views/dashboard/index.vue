<template>
  <v-container
    fluid
  >
    <p class="title">Dashboard</p>
    <v-row>
      <v-col md="4">
        <v-card
          dark
          color="info"
          height="120"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-view-dashboard
            </v-icon>
            <span class="title">Khoa/viện</span>
          </v-card-title>
          <v-card-text class="headline">
            {{departments.length}}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card
          dark
          color="info"
          height="120"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-view-dashboard
            </v-icon>
            <span class="title">Giảng viên</span>
          </v-card-title>
          <v-card-text class="headline">
            {{teachers.length}}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card
          dark
          color="info"
          height="120"
        >
          <v-card-title>
            <v-icon
              large
              left
            >
              mdi-view-dashboard
            </v-icon>
            <span class="title">Sinh viên</span>
          </v-card-title>
          <v-card-text class="headline">
            {{students.length}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch('loadDepartments');
    this.$store.dispatch('loadTeachers');
    this.$store.dispatch('loadStudents');
  },
  computed: {
    ...mapGetters(['departments', 'teachers', 'students']),
  },
};
</script>
