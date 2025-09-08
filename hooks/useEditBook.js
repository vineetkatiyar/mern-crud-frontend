import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../src/api/bookApi";

export const useEditBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBook,
    onSuccess: (data, variables) => {
      queryClient.setQueriesData(["book", variables.id], data);

      queryClient.invalidateQueries(["books"]);
    },
  });
};
