<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :line-numbers="true"
      compactMode
      v-on:row-click="onRowClick"
      :search-options="{
        enabled: true,
      }"
      :pagination-options="{
        enabled: true,
        perPage: 5,
        perPageDropdown: [5, 10, 15, 20],
        dropdownAllowAll: false,
        setCurrentPage: 1,
        nextLabel: 'İleri',
        prevLabel: 'Geri',
        rowsPerPageLabel: 'Sayfada Gösterilicek Toplam Satır',
        ofLabel: 'of',
        pageLabel: 'page',
        /* infoFn: (params) => `my own page ${params.firstRecordOnPage}`,*/
      }"
      :select-options="{
        enabled: true,
        //selectOnCheckboxOnly: false, // only select when checkbox is clicked instead of the row
        //selectionInfoClass: 'custom-class',
        selectionText: 'Satır Secili',
        clearSelectionText: 'Seçimleri Kaldır',
        disableSelectInfo: false, // disable the select info panel on top
        selectAllByGroup: true,
        //position: 'top',
      }"
      :isLoading="isLoading"
    >
      <template #emptystate>
        <slot>
          <span class="d-flex justify-content-center alert alert-warning" role="alert">
            Veri Bulunamadı!</span
          >
        </slot>
      </template>
    </vue-good-table>
    <button @click="getData">Get Data</button>
  </div>
</template>

<script>
import "vue-good-table-next/dist/vue-good-table-next.css";
import { VueGoodTable } from "vue-good-table-next";
import { ref, reactive, onMounted } from "vue";
import axios from "axios";

export default {
  components: {
    VueGoodTable,
  },
  setup() {
    const perRows = ref(5);
    const isLoading = ref(false);
    const rows = reactive([]);
    const columns = reactive([
      {
        label: "Name",
        field: "name",
      },
      {
        label: "Age",
        field: "age",
        type: "number",
      },
      {
        label: "Created On",
        field: "createdAt",
        type: "date",
        dateInputFormat: "yyyy-MM-dd",
        dateOutputFormat: "MMM do yy",
      },
      {
        label: "Percent",
        field: "score",
        type: "percentage",
      },
    ]);
    const onRowClick = (params) => {
      console.log(params.row);
    };
    const getData = () => {
      rows.splice(0);
      isLoading.value = true;
      axios.get("/rows").then((response) => {
        for (var i = 0; i < response.data.length - 1; i++) {
          rows.push(response.data[i]);
        }
      });
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };
    onMounted(() => {
      getData();
    });
    return {
      columns,
      rows,
      onRowClick,
      getData,
      isLoading,
      perRows,
    };
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
