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
        :items="teachers"
        :search="search"
      >
        <template
          v-slot:top
        >
          <v-toolbar flat color="white">
            <v-card-title>
              Danh sách giảng viên
            </v-card-title>
            <v-spacer/>
            <v-dialog
              persistent
              v-model="dialog"
              max-width="800px"
            >
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Thêm mới</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{formTitle}}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col md="6">
                        <v-text-field
                          v-model="editedItem.fullName"
                          label="Họ và tên"
                        />
                      </v-col>
                      <v-col md="6">
                        <v-text-field
                          v-bind:disabled="!!editedItem._id"
                          v-model="editedItem.email"
                          label="Email"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="7">
                        <v-select
                          :items="departments"
                          item-text="name"
                          item-value="_id"
                          v-model="editedItem.department"
                          label="Khoa/viện"
                        />
                      </v-col>
                      <v-col md="5">
                        <v-text-field
                          v-model="editedItem.phoneNumber"
                          label="Số điện thoại"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn
                    color="primary"
                    text
                    @click="close">
                    Hủy
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="save">
                    Lưu
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon
            color="accent"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            color="error"
            small
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-trash-can-outline
          </v-icon>
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
      search: '',
      headers: [
        {
          text: 'Tên giảng viên',
          value: 'fullName',
          filterable: true,
          width: '15%',
        },
        {
          text: 'Khoa/viện',
          value: 'department.name',
          filterable: true,
          width: '20%',
        },
        {
          text: 'Email',
          value: 'email',
          filterable: false,
          width: '15%',
        },
        {
          text: 'Số điện thoại',
          value: 'phoneNumber',
          filterable: false,
          width: '15%',
        },
        {
          value: 'action',
          align: 'end',
          width: '10%',
        },
      ],
      editedItem: {},
    };
  },
  mounted() {
    this.$store.dispatch('loadTeachers');
    this.$store.dispatch('loadDepartments');
  },
  computed: {
    ...mapGetters(['teachers', 'departments']),
    formTitle() {
      return this.editedItem.id ? 'Sửa thông tin giảng viên' : 'Thêm thông tin giảng viên';
    },
  },
  methods: {
    editItem(item) {
      this.editedItem = {
        _id: item._id,
        email: item.email,
        fullName: item.fullName,
        department: item.department._id,
        phoneNumber: item.phoneNumber,
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('deleteTeacher', item);
    },
    close() {
      if (this.editedItem._id) {
        setTimeout(() => {
          this.editedItem = {};
        }, 300);
      }
      this.dialog = false;
    },
    save() {
      if (this.editedItem._id) {
        this.$store.dispatch('updateTeacher', this.editedItem);
      } else {
        this.$store.dispatch('createTeacher', this.editedItem);
        this.editedItem = {};
      }
      this.dialog = false;
    },
  },
};
</script>
