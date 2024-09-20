import * as React from "react"

import { cn } from "@/components/utils"
import Typography from "@/containers/general/typography"

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ label, className, ...props }: TagProps, ref) => {
    return (
      <div
        className={cn(
          "bg-primary-200 flex items-center justify-center rounded-xl px-5 py-1",
          className
        )}
        {...props}
      >
        <Typography variant="body3" className="font-medium">
          {label}
        </Typography>
      </div>
    )
  }
)

Tag.displayName = "Tag"

export default Tag
