

export async function getPublicUser(id: number) {
    const response = await fetch(
      `https://inctagram.work/api/v1/public-user/profile/${id}`
    );
  
    return await response.json();
  }
  
  export async function getPostsUser(id: number) {
    const response = await fetch(
      `https://inctagram.work/api/v1/public-posts/user/${id}?pageSize=8`
    );
    
  
    return await response.json();
  }


  export async function getPostUser(id: any) {
    const response = await fetch(
      `https://inctagram.work/api/v1/public-posts/${id}`
    );
  
    return await response.json();
  }


 export async function getPublicPosts() {
    const response = await fetch(
      `https://inctagram.work/api/v1/public-posts/all?pageSize=4`
    );
    return response.json();
  }
  
  
 export async function getRegistratedUser() {
    const response = await fetch("https://inctagram.work/api/v1/public-user", {
      next: { revalidate: 60 },
    });
  
    return response.json();
  }
  