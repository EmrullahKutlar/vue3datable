<template>
  <vue-good-table
    mode="remote"
    v-on:page-change="onPageChange"
    v-on:sort-change="onSortChange"
    v-on:column-filter="onColumnFilter"
    v-on:per-page-change="onPerPageChange"
    :totalRows="totalRecords"
    :isLoading="isLoading"
    :pagination-options="{
      enabled: true,
    }"
    :rows="rows"
    :columns="columns"
    :search-options="{
        enabled: true,
      }"
  />
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
    //const perRows = ref(5);
    const isLoading = ref(false);
    var rows = reactive([]);
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
    /* const onRowClick = (params) => {
      console.log(params.row);
    };
    const getData = () => {
      rows.splice(0);
      isLoading.value = true;
      axios.get("/rows").then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          rows.push(response.data[i]);
        }
      });
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    };
    onMounted(() => {
      getData();
    });*/

    const totalRecords = ref(0);

    const serverParams = reactive({
      columnFilters: {},
      sort: {
        field: "",
        type: "",
      },
      page: 1,
      perPage: 10,
    });
    const updateParams = (newProps) => {
        console.log(newProps);
      serverParams = Object.assign({ ...serverParams, newProps });
    };
    const onPageChange = (params) => {
      updateParams({ page: params.currentPage });
      loadItems();
    };
    const onPerPageChange=(params)=> {
      updateParams({perPage: params.currentPerPage});
      loadItems();
    };
    const onSortChange=(params)=> {
      updateParams({
        sort: [{
          type: params.sortType,
          field: columns[params.columnIndex].field,
        }],
      });
      loadItems();
    };

    const onColumnFilter = (params) => {
      updateParams(params);
      loadItems();
    };

    // load items is what brings back the rows from server
    const loadItems =()=> {
      axios.get("/rows").then(response => {
          totalRecords.value=response.data.length
          for (var i = 0; i < response.data.length; i++) {
          rows.push(response.data[i]);
        }
      });
    }
    onMounted(() => {
      loadItems();
    });

    return {
      columns,
      rows,
      // onRowClick,
      //getData,
      isLoading,
      // perRows,
      onPageChange,
      onPerPageChange,
      onSortChange,
      onColumnFilter,
      totalRecords
    };
  },
};
</script>

<style></style>
