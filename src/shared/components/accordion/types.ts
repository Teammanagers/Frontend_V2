interface Props {
  title: string;
  tagList?: string[];
}

interface AccordionProps extends Props {
  children: React.ReactNode;
}

interface AccordionHeaderProps extends Props {
  isOpen: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export type { AccordionProps, AccordionHeaderProps };
