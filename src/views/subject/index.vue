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
        :items="subjects"
        :search="search"
      >
        <template
          v-slot:top
        >
          <v-toolbar flat color="white">
            <v-card-title>
              Danh sách môn học
            </v-card-title>
            <v-spacer/>
            <v-dialog
              persistent
              v-model="dialog"
              max-width="500px"
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
                          label="Tên môn học"
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
                    @click="save"
                  >
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
          text: 'Tên môn học',
          value: 'name',
          filterable: true,
          width: '70%',
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
  created() {
    this.$store.dispatch('loadSubjects');
  },
  computed: {
    ...mapGetters(['subjects']),
    formTitle() {
      return this.editedItem._id ? 'Sửa thông tin môn học' : 'Thêm thông tin môn học';
    },
  },
  methods: {
    editItem(item) {
      this.editedItem = { ...item };
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('deleteSubject', item);
    },
    close() {
      setTimeout(() => {
        this.editedItem = {};
      }, 300);
      this.dialog = false;
    },
    save() {
      if (this.editedItem._id) {
        this.$store.dispatch('updateSubject', this.editedItem);
      } else {
        this.$store.dispatch('createSubject', this.editedItem);
      }
      this.editedItem = {};
      this.dialog = false;
    },
  },
};
</script>
