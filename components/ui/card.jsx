import React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef((props, ref) => (
  <div ref={ref} className={cn(props.className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef((props, ref) => (
  <div ref={ref} className={cn(props.className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef((props, ref) => (
  <p ref={ref} className={cn(props.className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef((props, ref) => (
  <p ref={ref} className={cn(props.className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef((props, ref) => (
  <div ref={ref} className={cn(props.className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef((props, ref) => (
  <div ref={ref} className={cn(props.className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
