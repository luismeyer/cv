import { PageProps } from "../App";
import { InfoItem, InfoPage } from "../components/info-page";

const DATA: InfoItem[] = [
  {
    title: "NORDAKADEMIE Hochschule der Wirtschaft, Elmshorn",
    description: "Applied Computer Science ➡️ Bachelor of Science",
    start: "October 2018",
    end: "March 2022",
  },
  {
    title: "Heilwig Gymnasium, Hamburg",
    description: "Abitur",
    start: "August 2009",
    end: "July 2017",
  },
];

export function Education({ isVisible }: PageProps) {
  return <InfoPage isVisible={isVisible} items={DATA} title="Education" />;
}
