import { cn } from "@/components/utils"

type CardProps = React.HTMLAttributes<HTMLDivElement>

const Card = ({ className, children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-gray shadow-md dark:bg-gray-100 dark:shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
