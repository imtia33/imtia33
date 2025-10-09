"use client"

import { useState } from "react"

// SkillTag component definition
export const SkillTag = ({ skill }: { skill: { name: string; description: string; experience: string } }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Using theme-appropriate colors
  const cardClasses = "bg-card backdrop-blur-md shadow-[0_45px_80px_-15px_rgba(0,0,0,0.3)] border border-border";
  const arrowClasses = "border-b-card/95";
  const animationClass = "animate-scalePop";
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      <span
        className="px-3 py-1 text-xs border border-border rounded-full hover:border-primary/50 transition-colors duration-300 cursor-pointer block"
      >
        {skill.name}
      </span>
      
      {isHovered && (
        <div 
          className={`${cardClasses} ${animationClass} absolute z-20 top-full w-72 sm:w-80 p-5 rounded-xl transition-opacity duration-300 left-0 mt-2`}
        >
          <h3 className="text-lg font-bold text-primary mb-3 border-b border-border/70 pb-1">
            {skill.name}
          </h3>
          
          <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
            {skill.description}
          </p>
          {skill.experience&&(
          <div className="text-xs font-semibold text-muted-foreground border-t border-border/70 pt-2 mt-2">
            Experience: <span className="text-primary font-normal">{skill.experience}</span>
          </div>
          )}
          
          <div 
            className={`absolute top-[-8px] left-5 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 ${arrowClasses}`}
          ></div>
        </div>
      )}
    </div>
  );
};

// ToolTag component definition
export const ToolTag = ({ tool }: { tool: { name: string; description: string } }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Using theme-appropriate colors
  const cardClasses = "bg-card backdrop-blur-md shadow-[0_45px_80px_-15px_rgba(0,0,0,0.3)] border border-border";
  const arrowClasses = "border-b-card/95";
  const animationClass = "animate-scalePop";
  
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      <span
        className="px-3 py-2 text-sm border border-border rounded-full hover:border-primary/50 transition-colors duration-300 cursor-pointer block"
      >
        {tool.name}
      </span>
      
      {isHovered && (
        <div 
          className={`${cardClasses} ${animationClass} absolute z-20 top-full w-72 sm:w-80 p-5 rounded-xl transition-opacity duration-300 left-0 mt-2`}
        >
          <h3 className="text-lg font-bold text-primary mb-3 border-b border-border/70 pb-1">
            {tool.name}
          </h3>
          
          <p className="text-sm text-foreground/90 mb-4 leading-relaxed">
            {tool.description}
          </p>
          
          <div 
            className={`absolute top-[-8px] left-5 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 ${arrowClasses}`}
          ></div>
        </div>
      )}
    </div>
  );
};