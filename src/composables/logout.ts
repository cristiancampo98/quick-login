import { useUserStore } from "../stores/users";
export function useLogout() {
  const userStore = useUserStore();
  return userStore.logout();
}
