import Card from "@/components/Card";

export interface ImageProps {
  id: number;
  name: string;
  img: string;
}

export default async function Portfolio() {
  let data: ImageProps[] = [];

  try {
    const response = await fetch("https://api.michalrodek.cz/images");
    data = await response.json();
    data.reverse();
  } catch (error) {}

  return (
    <div className="flex flex-col flex-auto gap-8">
      <h1 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100">
        UI design
      </h1>
      <div className="grid gap-12 grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))]">
        {data.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
