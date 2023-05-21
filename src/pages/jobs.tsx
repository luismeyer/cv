import { PageProps } from "../App";
import { InfoItem, InfoPage } from "../components/info-page";

const DATA: InfoItem[] = [
  {
    title: "Product Engineer at Accenture Song, Hamburg",
    description:
      "At Accenture Song I worked for an automotive client building Micro Frontends. This included the AWS Infrastructure as well as developing a Serverless Backend-For-Frontend and React Applications in Typescript.",
    start: "March 2022",
    end: "Present",
  },
  {
    title: "Dual Student at SinnerSchrader, Hamburg",
    description:
      "For my dual studies I worked as a Product Engineer in 10 week intervals, alternating between University and different Client Projects. During the time I was getting to know the daily business of Web-Development and learned the technologies that are used in the industry.",
    start: "October 2018",
    end: "March 2022",
  },
];

export function Jobs({ isVisible }: PageProps) {
  return <InfoPage isVisible={isVisible} items={DATA} title="Experience" />;
}
