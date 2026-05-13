"use client";
import ReactMarkdown
from "react-markdown";

interface ClassTabsProps {

  sections: any[];
}

export function ClassTabs({
  sections,
}: ClassTabsProps) {

  return (

    <div className="space-y-8">

      {sections.map((section) => (

        <section
          key={section.id}
          className="
            bg-[#111]
            border
            border-red-900
            rounded-3xl
            overflow-hidden
          "
        >

          {/* IMAGE */}

          {section.image && (

            <div
              className="
                relative
                w-full
                h-[400px]
              "
            >

              <img
                src={section.image}
                alt={section.title}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

            </div>

          )}

          {/* CONTENT */}

          <div className="p-10 space-y-8">

            <div className="space-y-4">

              <span
                className="
                  inline-flex
                  bg-red-600
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-bold
                  uppercase
                  text-white
                "
              >
                {section.type}
              </span>

              <h2
                className="
                  text-5xl
                  font-black
                  text-white
                "
              >
                {section.title}
              </h2>

            </div>

            <div
              className="
                prose
                prose-invert
                max-w-none
              "
            >

              <ReactMarkdown>

                {section.content}

              </ReactMarkdown>

            </div>

            {/* VIDEO */}

            {section.video_url && (

              <div
                className="
                  aspect-video
                  rounded-2xl
                  overflow-hidden
                  border
                  border-red-900
                "
              >

                <iframe
                  src={section.video_url}
                  className="
                    w-full
                    h-full
                  "
                  allowFullScreen
                />

              </div>

            )}

          </div>

        </section>

      ))}

    </div>

  );
}