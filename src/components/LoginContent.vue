<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useUserStore } from "../stores/users";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const userStore = useUserStore();
const router = useRouter();

const notify = (message: string) => {
  toast(message, {
    autoClose: 2500,
  });
};

const form = reactive({
  email: "admin@admin.com",
  password: "admin",
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, form);

const onSubmit = async ($e: any) => {
  $e.preventDefault();
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;
  const result = await userStore.login(form);
  if (!result) {
    form.password = "";
    notify("Las credenciales no coinciden.");
  }
  router.push({ name: "home" });
};
</script>
<template>
  <main
    class="tw-grid tw-place-items-center tw-bg-responsive md:tw-bg-desktop tw-bg-cover tw-bg-center tw-bg-no-repeat tw-h-screen"
  >
    <section
      class="tw-bg-white tw-shadow-md tw-w-4/5 md:tw-w-3/5 lg:tw-w-2/5 xl:tw-w-3/12 tw-rounded-md tw-p-5"
    >
      <h1 class="tw-text-2xl tw-font-semibold">Bienvenido</h1>
      <p>Por favor ingresa tus datos de usuario para iniciar sesión</p>
      <form class="tw-mt-4" @submit="onSubmit">
        <div
          class="tw-mb-2"
          :class="{ 'tw-text-red-500': v$.email.$errors.length }"
        >
          <label class="tw-font-semibold">Correo</label>
          <input
            class="tw-form-input tw-bg-gray-100 tw-rounded-md tw-border-gray-200 tw-w-full tw-block"
            v-model="form.email"
            placeholder="Ej: user@mail.com"
          />
          <div v-for="error of v$.email.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div
          class="tw-mb-2"
          :class="{ 'tw-text-red-500': v$.password.$errors.length }"
        >
          <label class="tw-font-semibold">Contraseña</label>
          <input
            type="password"
            class="tw-form-input tw-bg-gray-100 tw-rounded-md tw-border-gray-200 tw-w-full tw-block"
            v-model="form.password"
            placeholder="**********"
          />
          <div v-for="error of v$.password.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="tw-flex tw-justify-center">
          <button
            :disabled="v$.$error"
            type="submit"
            class="tw-font-semibold tw-rounded-md tw-py-2 tw-w-2/5"
            :class="
              v$.$error
                ? 'tw-bg-gray-200 tw-text-gray-500'
                : 'tw-bg-green-500 tw-text-white'
            "
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
