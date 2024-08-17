/** @format */

import UserLayout from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Decks = () => {
  return (
    <UserLayout>
      <div>Decks</div>

      <div>
        <Link href="/decks/review/1">
          <Button>Deck1</Button>
        </Link>
      </div>
    </UserLayout>
  );
};

export default Decks;
