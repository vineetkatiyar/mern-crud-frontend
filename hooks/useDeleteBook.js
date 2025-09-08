import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../src/api/bookApi";

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};
