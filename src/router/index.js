import { createRouter, createWebHistory } from 'vue-router';
import AppHome from '../components/Home.vue';
import UserList from '../components/UserList.vue';
import AddUserForm from '../components/AddUserForm.vue';
import AppDashBoard from '../components/Dashboard.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: AppHome,
    },
    {
        path: '/list-user',
        name: 'UserList',
        component: UserList,
        meta: {
            requiresAuth: true, // Add a meta field for authentication check
        },
    },
    {
        path: '/add-user',
        name: 'AddUser',
        component: AddUserForm,
    },
    {
        path: '/dashboard',
        name: 'AppDashBoard',
        component: AppDashBoard,
        meta: {
            requiresAuth: true, // Add a meta field for authentication check
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Add a navigation guard to check authentication
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        // Check if the token exists in localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Continue to the requested route
            next();
        } else {
            // Redirect to the login page or any other appropriate action
            next({ name: 'Home' });
        }
    } else {
        // For routes that do not require authentication, proceed normally
        next();
    }
});

export default router;
