import { getMyPosts } from "@/app/actions/posts";
import { useQuery } from "@tanstack/react-query";

const useMyPosts = (token: string | null) => {
  const { isLoading, data: myPosts } = useQuery({
    queryKey: ["myPosts"],
    queryFn: async () => getMyPosts(token),
  });

  return { isLoading, myPosts: myPosts?.data?.posts };
};

export default useMyPosts;
