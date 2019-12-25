<template>
  <v-container fluid>
    <v-card flat>
      <v-card-title>
        <v-spacer/>
        <v-text-field
          dense
          v-model="search"
          append-icon="mdi-search"
          label="Tìm kiếm"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="thesis"
        :search="search"
      >
        <template
          v-slot:top
        >
          <v-toolbar flat color="white">
            <v-card-title>
              Danh sách đồ án
            </v-card-title>
            <v-spacer/>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      menu: false,
      search: '',
      headers: [
        {
          text: 'Tên đồ án',
          value: 'name',
          filterable: true,
        },
        {
          text: 'Giảng viên',
          value: 'teacher.fullName',
        },
        {
          text: 'Sinh viên',
          value: 'student.fullName',
        },
      ],
      editedItem: {},
    };
  },
  mounted() {
    this.$store.dispatch('loadThesis');
  },
  computed: {
    ...mapGetters(['thesis']),
    formTitle() {
      return this.editedItem._id ? 'Sửa thông tin đồ án' : 'Thêm thông tin đồ án';
    },
  },
  methods: {
    editItem(item) {
      this.editedItem = {
        _id: item._id,
        name: item.name,
        description: item.description,
        student: item.student._id,
        teacher: item.teacher._id,
        subject: item.subject._id,
        deadline: item.deadline,
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('deleteThesis', item);
    },
    close() {
      setTimeout(() => {
        this.editedItem = {};
      }, 300);
      this.dialog = false;
    },
    save() {
      if (this.editedItem._id) {
        this.$store.dispatch('updateThesis', this.editedItem);
      } else {
        this.$store.dispatch('createThesis', this.editedItem);
      }
      this.editedItem = {};
      this.dialog = false;
    },
  },
};
</script>
