import { Button } from "../ui/button";

export default function RiskList({
  data,
  onClick,
}: {
  data: string[];
  onClick: (risk: string) => void;
}) {
  return (
    <ol className="flex flex-col gap-2">
      {data.map((item, index) => (
        <li key={index}>
          <Button
            variant="outline"
            onClick={() => onClick(item)}
            className="w-full whitespace-normal justify-start h-full text-base font-normal"
          >
            <div className="text-left">{item}</div>
          </Button>
        </li>
      ))}
    </ol>
  );
}
