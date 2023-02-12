<template>
  <div class="tw-min-h-full">
    <Disclosure as="nav" class="tw-bg-gray-800" v-slot="{ open }">
      <div class="tw-mx-auto tw-max-w-7xl px-4 sm:tw-px-6 lg:tw-px-8">
        <div class="tw-flex tw-h-16 tw-items-center tw-justify-between">
          <div class="tw-flex tw-items-center">
            <div class="tw-flex-shrink-0">
              <img
                class="tw-h-8 tw-w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <AppNavigationComponent />
          </div>
          <div class="tw-hidden md:tw-block">
            <div class="tw-ml-4 tw-flex tw-items-center md:tw-ml-6">
              <button
                type="button"
                class="tw-rounded-full tw-bg-gray-800 tw-p-1 tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800"
              >
                <span class="tw-sr-only">View notifications</span>
                <BellIcon class="tw-h-6 tw-w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <DesktopDropdown />
            </div>
          </div>
          <div class="tw-flex md:tw-hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-bg-gray-800 tw-p-2 tw-text-gray-400 hover:tw-bg-gray-700 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-white focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800"
            >
              <span class="tw-sr-only">Open main menu</span>
              <Bars3Icon
                v-if="!open"
                class="tw-block tw-h-6 tw-w-6"
                aria-hidden="true"
              />
              <XMarkIcon
                v-else
                class="tw-block tw-h-6 tw-w-6"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

    <ResponsiveDropdown />
    </Disclosure>

    <header class="tw-bg-white tw-shadow">
      <div
        class="tw-mx-auto tw-max-w-7xl tw-py-6 tw-px-4 sm:tw-px-6 lg:tw-px-8"
      >
        <h1 class="tw-text-3xl tw-font-bold tw-tracking-tight tw-text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>
    <main>
      <div class="tw-mx-auto tw-max-w-7xl tw-py-6 sm:tw-px-6 lg:tw-px-8">
        <!-- Replace with your content -->
        <div class="tw-px-4 tw-py-6 sm:tw-px-0">
          <RouterView />
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton } from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import DesktopDropdown from "./profile/DesktopDropdown.vue";
import ResponsiveDropdown from "./profile/ResponsiveDropdown.vue";
import AppNavigationComponent from "./app/NavigationComponent.vue";
</script>
