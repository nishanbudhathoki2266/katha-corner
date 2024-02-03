interface ApiResponse {
  status: string;
  data?: {
    posts: {
      _id: string;
      description: string;
      user: {
        _id: string;
        name: string;
        email: string;
        bio?: string;
      };
      location: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
  message?: string;
  stack?: string;
}

export async function getMyPosts(token: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/posts/myPosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await new Promise(function (resolve) {
      setTimeout(resolve, 5000);
    });

    const data: ApiResponse = await res.json();

    return data;
  } catch (err: any) {
    return {
      status: "fail",
      message: err.message,
    } as ApiResponse;
  }
}
