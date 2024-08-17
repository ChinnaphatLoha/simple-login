<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { UnauthorizedError } from '@/errors'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const { login } = useUserStore()

const router = useRouter()

const handleSubmit = async () => {
  errorMessage.value = ''
  try {
    await login({ username: username.value, password: password.value })
    router.push({ name: 'welcome' })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      errorMessage.value = 'Invalid username or password'
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.'
    }
  }
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 p-6"
  >
    <form
      @submit.prevent="handleSubmit"
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6 transition-transform transform hover:scale-105"
    >
      <h2 class="text-2xl font-bold text-gray-800 text-center">Login to Your Account</h2>

      <div
        v-if="errorMessage"
        class="text-red-600 text-sm mb-4 text-center transition-opacity duration-500 ease-in-out"
      >
        {{ errorMessage }}
      </div>

      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
        <input
          v-model="username"
          id="username"
          type="text"
          placeholder="Enter your username"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          class="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        Login
      </button>

      <p class="text-sm text-gray-500 text-center mt-4">
        Don't have an account?
        <a
          href="#"
          class="text-indigo-600 hover:text-indigo-500 font-medium transition-colors duration-200"
          >Sign up</a
        >
      </p>
    </form>
  </div>
</template>
