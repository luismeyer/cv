import { PageProps } from "../App";
import { InfoItem, InfoPage } from "../components/info-page";

const DATA: InfoItem[] = [
  {
    title: "Product Engineer Intern at SinnerSchrader, Hamburg",
    description: "",
    start: "August 2018",
    end: "October 2023",
  },
];

export function Internships({ isVisible }: PageProps) {
  return <InfoPage isVisible={isVisible} items={DATA} title="Internships" />;
}
