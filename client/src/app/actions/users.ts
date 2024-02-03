interface ApiResponse {
  status: string;
  data?: {
    user: {
      _id: string;
      name: string;
      email: string;
      bio: string;
    };
  };
  message?: string;
  stack?: string;
}

export async function getProfileById(id: string): Promise<ApiResponse> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${id}`, {
      next: { revalidate: 60 },
    });

    const data: ApiResponse = await res.json();

    await new Promise(function (resolve) {
      setTimeout(resolve, 5000);
    });

    return data;
  } catch (err: any) {
    return {
      status: "fail",
      message: err.message,
    } as ApiResponse;
  }
}
