"use client";
import React, { useState } from "react";
import Image from "next/image";

interface AccordionSectionProps {
  title: string;
  accordionData: { description: string[] }[];
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  accordionData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-section">
      <div className="accordion-header" onClick={toggleAccordion}>
        {title}
        <span className={`accordion-icon ${isOpen ? "open" : ""}`}>
          {isOpen ? (
            <Image
              height={20}
              width={20}
              src={"/svgs/expand_less.svg"}
              alt="expand_less"
            />
          ) : (
            <Image
              height={20}
              width={20}
              src={"/svgs/expand_more.svg"}
              alt="expand_more"
            />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content">
          {accordionData.map((section, index) => (
            <div key={index}>
              <ul>
                {section.description.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
