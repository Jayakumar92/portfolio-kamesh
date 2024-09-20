import { cn } from "@/components/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-gray rounded-xl shadow-md dark:bg-gray-100 dark:shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
