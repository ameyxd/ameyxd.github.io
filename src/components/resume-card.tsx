"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  location?: string;
  specialization?: string;
}

export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  location,
  specialization,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="flex">
        <div className="flex-none">
          <Avatar className="border size-12 m-auto bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-x-2">
              <div>
                <h3 className="inline-flex items-center justify-center font-semibold text-lg">
                  {title}
                  <ChevronRightIcon
                    className={cn(
                      "ml-2 size-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1",
                      isExpanded ? "rotate-90" : "rotate-0"
                    )}
                  />
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-1.5 sm:mt-0 sm:ml-2 sm:inline-flex">
                  {badges?.map((badge, index) => (
                    <Badge
                      variant="secondary"
                      className="align-middle text-xs"
                      key={index}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-sm tabular-nums text-muted-foreground">
                {period}
              </div>
            </div>
            {subtitle && (
              <div className="text-base text-muted-foreground mt-1">{subtitle}</div>
            )}
            {specialization && (
              <div className="text-sm text-muted-foreground mt-1">
                Specialization: {specialization}
              </div>
            )}
            {location && (
              <div className="text-sm text-muted-foreground mt-1">
                {location}
              </div>
            )}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="px-6 pb-6 text-base text-muted-foreground"
            >
              <div className="mt-2">
                {description}
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
