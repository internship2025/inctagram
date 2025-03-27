export function calculatingDate(dateString: string) {
    let dateLast = new Date(dateString);
    let dateNow = new Date();
    let z = new Date(dateNow.getTime() - dateLast.getTime());
    let p = z.getTime() / (1000 * 60);

    let text = "min ago";

    if (p > 60) {
      p /= 60;
      text = "hours ago";
      if (p > 24) {
        p /= 24;
        text = "day ago";
      }
    }

    return `${Math.floor(p)} ${text}`;
  }