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
        :items="students"
        :search="search"
      >
        <template
          v-slot:top
        >
          <v-toolbar flat color="white">
            <v-card-title>
              Danh sách sinh viên
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
                          v-model="editedItem.code"
                          label="Mã sinh viên"
                        />
                      </v-col>
                      <v-col md="6">
                        <v-text-field
                          v-model="editedItem.fullName"
                          label="Họ và tên"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                          v-bind:disabled="!!editedItem._id"
                        />
                      </v-col>
                      <v-col md="6">
                        <v-text-field
                          v-model="editedItem.dateOfBirth"
                          label="Ngày sinh"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="6">
                        <v-text-field
                          v-model="editedItem.phoneNumber"
                          label="Số điện thoại"
                        />
                      </v-col>
                      <v-col md="6">
                        <v-select
                          :items="sectors"
                          item-text="name"
                          item-value="_id"
                          label="Ngành học"
                          v-model="editedItem.sector"
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
          text: 'Mã sinh viên',
          value: 'code',
          filterable: true,
        },
        {
          text: 'Họ và tên',
          value: 'fullName',
          filterable: true,
        },
        {
          text: 'Email',
          value: 'email',
          filterable: false,
        },
        {
          text: 'Số điện thoại',
          value: 'phoneNumber',
          filterable: false,
        },
        {
          text: 'Ngành',
          value: 'sector.name',
          filterable: false,
        },
        {
          align: 'end',
          value: 'action',
        },
      ],
      editedItem: {},
    };
  },
  created() {
    this.$store.dispatch('loadStudents');
    this.$store.dispatch('loadSectors');
  },
  computed: {
    ...mapGetters(['students', 'sectors']),
    formTitle() {
      return this.editedItem._id ? 'Sửa thông tin sinh viên' : 'Thêm thông tin sinh viên';
    },
  },
  methods: {
    editItem(item) {
      this.editedItem = {
        _id: item._id,
        code: item.code,
        email: item.email,
        fullName: item.fullName,
        dateOfBirth: item.dateOfBirth,
        phoneNumber: item.phoneNumber,
        sector: item.sector._id,
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('deleteStudent', item);
    },
    close() {
      setTimeout(() => {
        this.editedItem = {
        };
      }, 300);
      this.dialog = false;
    },
    save() {
      console.log(this.editedItem);
      if (this.editedItem._id) {
        this.$store.dispatch('updateStudent', this.editedItem);
      } else {
        this.$store.dispatch('createStudent', this.editedItem);
      }
      this.editedItem = {
      };
      this.dialog = false;
    },
  },
};
</script>
