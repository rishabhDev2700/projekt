import React from 'react'
import { Chrono } from 'react-chrono'
export default function ProjectTimeline() {
  return (
    <div>
        <Chrono items={[
               {
                title: "May 1940",
                cardTitle: "Dunkirk",
                url: "http://google.com",
                cardSubtitle:
                  "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
                cardDetailedText: `On 10 May 1940, Hitler began his long-awaited offensive in the west by invading neutral Holland and Belgium and attacking northern France. Holland capitulated after only five days of fighting, and the Belgians surrendered on 28 May. With the success of the German ‘Blitzkrieg’, the British Expeditionary Force and French troops were in danger of being cut off and destroyed.`,
              },
              {
                title: "25 July 1940",
                cardTitle: "The Battle of Britain",
                cardSubtitle: `RAF Spitfire pilots scramble for their planes`,
                cardDetailedText: `After France’s surrender in June 1940, Churchill told the British people, “Hitler knows that he will have to break us in this island or lose the war”. To mount a successful invasion, the Germans had to gain air superiority. The first phase of the battle began on 10 July with Luftwaffe attacks on shipping in the Channel.
              The following month, RAF Fighter Command airfields and aircraft factories came under attack. Under the dynamic direction of Lord Beaverbrook, production of Spitfire and Hurricane fighters increased, and despite its losses in pilots and planes, the RAF was never as seriously weakened as the Germans supposed.`,
              }]
        }
        showAllCardsHorizontal={true}
mode="VERTICAL"
        ></Chrono>
    </div>
  )
}
