export const getDashboardByRole = (role: string) => {
  switch (role) {
    case "student":
      return "/student";

    case "teacher":
      return "/teacher";

    case "parent":
      return "/parent";

    case "staff":
      return "/admin";

    default:
      return "/dashboard";
  }
};