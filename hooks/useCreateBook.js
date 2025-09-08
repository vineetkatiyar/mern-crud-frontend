import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBook } from "../src/api/bookApi";

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postBook,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });
};
