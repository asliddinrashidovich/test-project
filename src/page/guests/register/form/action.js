import { AddData } from "../../../../service/apiHelpers";
import { apiRoutes } from "../../../../service/apiRoutes";
import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = ({ ...options }) =>
  useMutation({
    ...options,
    mutationFn: async ({ data }) => {
      return await AddData(apiRoutes.signUp, data);
    },
  });
