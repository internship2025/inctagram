

export const useGitHubAuth = () => {
    const handleLoginGitHub = () => {
      const redirectUrl = encodeURIComponent(window.location.origin + "/auth");
      window.location.assign(
        `https://inctagram.work/api/v1/auth/github/login?redirect_url=${redirectUrl}`
      );
    };
  
    return handleLoginGitHub;
  };