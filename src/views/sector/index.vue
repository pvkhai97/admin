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
        :items="sectors"
        :search="search"
      >
        <template
          v-slot:top
        >
          <v-toolbar flat color="white">
            <v-card-title>
              Danh sách ngành đào tạo
            </v-card-title>
            <v-spacer/>
            <v-dialog
              persistent
              v-model="dialog"
              max-width="400px"
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
                      <v-col>
                        <v-text-field
                          v-model="editedItem.name"
                          label="Tên ngành đào tạo"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          :items="departments"
                          item-text="name"
                          item-value="_id"
                          v-model="editedItem.department"
                          label="Khoa/viện"
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
          text: 'Tên ngành đào tạo',
          value: 'name',
          filterable: true,
          width: '40%',
        },
        {
          text: 'Khoa/viện',
          value: 'department.name',
          width: '40%',
        },
        {
          value: 'action',
          sortable: false,
          align: 'end',
        },
      ],
      editedItem: {},
    };
  },
  mounted() {
    this.$store.dispatch('loadSectors');
    this.$store.dispatch('loadDepartments');
  },
  computed: {
    ...mapGetters(['sectors', 'departments']),
    formTitle() {
      return this.editedItem._id ? 'Sửa thông tin ngành đào tạo' : 'Thêm thông tin ngành đào tạo';
    },
  },
  methods: {
    editItem(item) {
      this.editedItem = {
        _id: item._id,
        name: item.name,
        department: item.department._id,
      };
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('deleteSector', item);
    },
    close() {
      setTimeout(() => {
        this.editedItem = {};
      }, 300);
      this.dialog = false;
    },
    save() {
      if (this.editedItem._id) {
        this.$store.dispatch('updateSector', this.editedItem);
      } else {
        this.$store.dispatch('createSector', this.editedItem);
      }
      this.editedItem = {};
      this.dialog = false;
    },
  },
};
</script>
