import { InfoItem, InfoPage } from "../components/info-page";
import { PageProps } from "../routes/[page]";

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

export function Education(props: PageProps) {
  return (
    <InfoPage
      gradientColors="from-pink-500 to-cyan-500"
      isVisible={props.isVisible}
      items={DATA}
      title="Education"
    />
  );
}
