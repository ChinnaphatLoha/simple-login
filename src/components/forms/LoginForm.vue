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
    await login(username.value, password.value)
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
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      @submit.prevent="handleSubmit"
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
    >
      <div
        v-if="errorMessage"
        class="text-red-600 text-sm mb-4 transition-opacity duration-500 ease-in-out"
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
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Enter your password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>
    </form>
  </div>
</template>
