"use client";

import { useState }
from "react";

import ReactMarkdown
from "react-markdown";

interface ClassTabsProps {

  sections: any[];
}

export function ClassTabs({
  sections,
}: ClassTabsProps) {

  const types =
    [...new Set(

      sections.map(
        (section) =>
          section.type
      )

    )];

  const [activeTab, setActiveTab] =
    useState(
      types[0]
    );

  const filteredSections =
    sections.filter(
      (section) =>
        section.type === activeTab
    );

  return (

    <div className="space-y-8">

      {/* TABS */}

      <div
        className="
          flex
          flex-wrap
          gap-4
        "
      >

        {types.map((type) => (

          <button
            key={type}

            onClick={() =>
              setActiveTab(type)
            }

            className={`
              px-6
              py-3
              rounded-2xl
              font-bold
              uppercase
              transition

              ${
                activeTab === type

                  ? `
                    bg-red-600
                    text-white
                  `

                  : `
                    bg-[#111]
                    border
                    border-red-900
                    text-gray-400
                    hover:border-red-500
                    hover:text-white
                  `
              }
            `}
          >
            {type}
          </button>

        ))}

      </div>

      {/* CONTENT */}

      <div className="space-y-8">

        {filteredSections.map((section) => (

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

    </div>
  );
}