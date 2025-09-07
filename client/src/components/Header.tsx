import Link from "next/link";
import PROTECTED_PATHS from "@/constants/protected_paths";
import COOKIE_NAMES from "@/constants/cookie_names";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();
  const myCookie = cookieStore.get(COOKIE_NAMES.USER_NAME);

  if (!myCookie) return null;

  return (
    <header className="w-[80%] mx-auto">
      <nav className="flex justify-around pt-20">
        <Link href={PROTECTED_PATHS.quizzes.create}>Create</Link>
        <Link href={PROTECTED_PATHS.quizzes.base}>Quizzes</Link>
      </nav>
    </header>
  );
}
