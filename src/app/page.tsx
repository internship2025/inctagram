import { redirect } from "next/navigation";
import { PATH } from "@/shared/constants/app-paths";

export default function Home() {
  redirect(PATH.SIGN_IN);
}
