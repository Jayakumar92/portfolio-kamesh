import React from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trelleborg } from "@/containers/trelleborg"
import { Thickness } from "@/containers/thickness"
import { Bulking } from "@/containers/bulking"

function Resources() {
  return (
    <div className="mx-auto max-w-5xl  space-y-6 bg-white p-4  sm:py-10">
      <Link href="/" className="flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" />
        <span className=" text-sm text-slate-600">Back</span>
      </Link>

      <Tabs defaultValue="buckling">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="trelleborg">Trelleborg</TabsTrigger>
          <TabsTrigger value="thickness">Tube Wall thickness</TabsTrigger>
          <TabsTrigger value="buckling">Buckling</TabsTrigger>
        </TabsList>
        <TabsContent value="trelleborg"></TabsContent>
        <TabsContent value="thickness">
          <Thickness />
        </TabsContent>
        <TabsContent value="buckling">
          <Bulking />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Resources
