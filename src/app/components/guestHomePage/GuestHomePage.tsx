async function getPublicPosts() {
  const response = await fetch('https://inctagram.work/api/v1/public-posts/all?pageSize=4');
  return response.json();
}

const GuestHomePage = async () => {
  const data = await getPublicPosts();
  console.log(data);

  return (
    <div>
      <h1>GuestHomePage</h1>
  
    </div>
  );
};

export default GuestHomePage;