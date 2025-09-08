import { useQuery } from "@tanstack/react-query"
import { getBookById } from "../src/api/bookApi"


export const useBookById = (id) =>{
    return useQuery({
        queryKey: ["book", id],
        queryFn: () => getBookById(id),
        enabled: !!id //only run whenever the id is truthy
    })
}