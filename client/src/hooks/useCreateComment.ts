import { createComment } from "@/app/actions/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    // @ts-ignore
    mutationFn: (params: { token: string; postId: string; comment: string }) =>
      createComment(params.token, params.postId, params.comment),
    onSuccess: (data) => {
      console.log("DATA FROM MUTATION ", data);

      toast.success("Comment posted successfully!");

      queryClient.invalidateQueries({
        queryKey: ["myPosts"],
      });
    },
  });

  return { isPending, mutate };
}
