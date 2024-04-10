import { InfoItem, InfoPage } from "../components/info-page";
import { Morph } from "../components/morph";
import { PageProps } from "../routes/[page]";

const DATA: InfoItem[] = [
  {
    title: (
      <div class="flex gap-2 items-start">
        <span>Fullstack Software Engineer at</span>
        <Morph texts={["Vercel", "▲"]} />
      </div>
    ),
    start: "October 2022",
    end: "Present",
  },
  {
    title: "Software Engineer at Accenture Song",
    description:
      "At Accenture Song I worked for an automotive client building Micro Frontends. This included the AWS Infrastructure as well as developing a Serverless Backend-For-Frontend and React Applications in Typescript.",
    start: "March 2022",
    end: "October 2023",
  },
  {
    title: "Dual Student at SinnerSchrader",
    description:
      "For my dual studies I worked as a Software Engineer in 10 week intervals, alternating between University and different Client Projects. During the time I was getting to know the daily business of Web-Development and learned the technologies that are used in the industry.",
    start: "October 2018",
    end: "March 2022",
  },
];

export function Jobs(props: PageProps) {
  return (
    <>
      <InfoPage
        gradientColors="from-purple-500 to-pink-500"
        isVisible={props.isVisible}
        items={DATA}
        title="Experience"
      />
    </>
  );
}
