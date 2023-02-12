import { defineStore } from "pinia";

interface State {
  userList: UserInfo[];
  user: UserInfo | null;
  navigation: Navigation[];
  userNavigation: UserNavigation[];
}

export const useUserStore = defineStore("user", {
  state: (): State => {
    return {
      userList: [
        {
          name: "Ragnar Done",
          email: "admin@admin.com",
          password: "admin",
          role: "admin",
          isAuth: false,
        },
        {
          name: "Jane Doe",
          email: "coord@coord.com",
          password: "coord",
          role: "coord",
          isAuth: false,
        },
      ],
      user: null,
      navigation: [
        { name: "Dashboard", href: "/", current: true, role: "coord" },
        {
          name: "Categorías",
          href: "/categories",
          current: false,
          role: "admin",
        },
      ],
      userNavigation: [{ name: "Perfil", href: "#" }],
    };
  },
  getters: {
    someoneIsAuth: (state) => {
      const result = state.userList.find((user) => user.isAuth);
      if (typeof result !== "undefined") {
        return result;
      }
      return {} as UserInfo;
    },
    getNavigationByRol: (state) => (role: string) => {
      if (role === "admin") {
        return state.navigation;
      }
      return state.navigation.filter((item) => item.role === role);
    },
    getUserNavigation: (state) => {
      return state.userNavigation;
    },
  },
  actions: {
    login(user: UserForm): Boolean {
      const userExist = this.userList.find(
        (userLocal) => userLocal.email === user.email
      );
      if (typeof userExist === "undefined") {
        return false;
      }

      if (userExist.password !== user.password) {
        return false;
      }

      userExist.isAuth = true;

      return true;
    },
    logout() {
      try {
        const userAuth = this.someoneIsAuth;
        if (typeof userAuth === "undefined") {
          return false;
        }
        userAuth.isAuth = false;
        return true;
      } catch (error) {
        return true;
      }
    },
  },
});

interface UserInfo {
  name: string;
  email: string;
  password: string;
  role: string;
  isAuth?: boolean;
}

interface UserForm {
  email: string;
  password: string;
}

interface Navigation {
  name: string;
  href: string;
  current: boolean;
  role: string;
}

interface UserNavigation {
  name: string;
  href: string;
}
