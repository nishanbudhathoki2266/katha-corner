"use server";

interface GetMyPostsApiResponse {
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

interface CreatePostApiResponse {
  status: string;
  data?: {
    posts: {
      _id: string;
      description?: string;
      user: string;
      location: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
  message?: string;
  stack?: string;
}

export async function getMyPosts(
  token: string
): Promise<GetMyPostsApiResponse> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/posts/myPosts`, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data: GetMyPostsApiResponse = await res.json();

    return data;
  } catch (err: any) {
    return {
      status: "fail",
      message: err.message,
    } as GetMyPostsApiResponse;
  }
}

export async function createPost(
  token: string,
  formData: {
    description: string;
    location: string;
  }
): Promise<CreatePostApiResponse> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/posts`, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data: CreatePostApiResponse = await res.json();

    return data;
  } catch (err: any) {
    return {
      status: "fail",
      message: err.message,
    } as CreatePostApiResponse;
  }
}
