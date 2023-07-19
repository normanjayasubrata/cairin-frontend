<template>
  <NavBar></NavBar>
  <div class="list-container">
    <div class="list-content">
      <div class="list-size">
        <label for="pageSize">Items per Page:</label>
        <select id="pageSize" v-model="pageSize" @change="fetchUsers">
          <option v-for="option in pageOptions" :value="option" :key="option">{{ option }}</option>
        </select>
      </div>
      <table>
        <thead>
        <tr>
          <th @click="sortByColumn('username')" :class="{ 'sort-asc': sortBy === 'username' && sortDirection === 'asc', 'sort-desc': sortBy === 'username' && sortDirection === 'desc' }">Username</th>
          <th @click="sortByColumn('name')" :class="{ 'sort-asc': sortBy === 'name' && sortDirection === 'asc', 'sort-desc': sortBy === 'name' && sortDirection === 'desc' }">Name</th>
          <th @click="sortByColumn('email')" :class="{ 'sort-asc': sortBy === 'email' && sortDirection === 'asc', 'sort-desc': sortBy === 'email' && sortDirection === 'desc' }">Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
        </tr>
        </tbody>
      </table>
      <div class="list-pagination">
        <button :disabled="currentPage === 0" @click="changePage(currentPage - 1)">Previous</button>
        <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages - 1" @click="changePage(currentPage + 1)">Next</button>
      </div>
    </div>
  </div>
</template>



<script>
import NavBar from "@/components/NavBar.vue";
import axios from "axios";

export default {
  name: "UserList",
  components: { NavBar },
  data() {
    return {
      users: [],
      currentPage: 0,
      pageSize: 10,
      totalPages: 0,
      sortBy: 'username',
      sortDirection: 'asc', // Track the sorting direction
      pageOptions: [1, 5, 10, 15],
    };
  },


  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const url = `http://localhost:8080/api/users?page=${this.currentPage}&size=${this.pageSize}`;
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
          .get(url, config)
          .then(response => {
            let sortedUsers = response.data.content;

            // Perform sorting on the client-side table
            sortedUsers.sort((a, b) => {
              const aValue = a[this.sortBy];
              const bValue = b[this.sortBy];

              if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
              if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
              return 0;
            });

            this.users = sortedUsers;
            this.totalPages = response.data.totalPages;
          })
          .catch(error => {
            console.error(error);
          });
    },
    sortByColumn(column) {
      if (column === this.sortBy) {
        // If the column is already sorted, toggle the sorting direction
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // Sort the column in ascending order by default
        this.sortBy = column;
        this.sortDirection = 'asc';
      }
      this.fetchUsers();
    },

    changePage(page) {
      this.currentPage = page;
      this.fetchUsers();
    },
  },
};
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
}
.list-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 80%;
}
.list-size {
  margin-bottom: 20px;
  border-radius: 5px;
  border: solid black 2px;
  padding: 5px;
}
.list-pagination {
  margin-top: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
  cursor: pointer;
}

th.sort-asc::after {
  content: ' ▲';
}

th.sort-desc::after {
  content: ' ▼';
}

td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
select {
  cursor: pointer;
}
button {
  margin: 0 5px;
}
</style>
