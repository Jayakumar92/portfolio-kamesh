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
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-xl bg-primary-200 px-5 py-1",
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
