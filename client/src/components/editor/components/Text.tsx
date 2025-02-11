export interface TextProps {
  text: string;
  className?: string;
}

export function Text({ text, className }: TextProps) {
  return (
    <div className={`relative p-2 ${className}`}>
      <p>{text}</p>
    </div>
  );
}