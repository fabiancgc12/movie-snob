import { MemberItem } from "@/components/CrewMember/CrewMemberCard";
import { PeopleDto } from "@/models/dto/Credit.dto";

type Props = {
  crew: PeopleDto[] | undefined;
};

export const CrewSection = ({ crew }: Props) => {
  if (!crew || crew.length == 0) return null;
  return (
    <div className="grid grid-cols-2 justify-between gap-2.5 p-4 gap-y-6">
      {crew.slice(0, 2).map((people) => (
        <MemberItem key={`${people.id}-${people.role}`} people={people} />
      ))}
    </div>
  );
};
