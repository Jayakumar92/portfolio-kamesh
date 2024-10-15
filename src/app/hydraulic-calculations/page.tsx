import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bulking } from "@/containers/bulking"
import { Stress } from "@/containers/stress"
import { Thickness } from "@/containers/thickness"
import { Trelleborg } from "@/containers/trelleborg"

function Resources() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 bg-white p-4 sm:py-10">
      <Link href="/" className="flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm text-slate-600">Back</span>
      </Link>

      <Tabs defaultValue="stress">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="hydraulic">Hydraulic Cylinder</TabsTrigger>
          <TabsTrigger value="thickness">Tube Wall thickness</TabsTrigger>
          <TabsTrigger value="buckling">Rod Buckling</TabsTrigger>
          <TabsTrigger value="stress">Tube Principal Stress</TabsTrigger>
          <TabsTrigger value="piston-rod">Piston and Rod</TabsTrigger>
        </TabsList>
        <TabsContent value="hydraulic">
          <Trelleborg />
        </TabsContent>
        <TabsContent value="thickness">
          <Thickness />
        </TabsContent>
        <TabsContent value="buckling">
          <Bulking />
        </TabsContent>
        <TabsContent value="stress">
          <Stress />
        </TabsContent>
        <TabsContent value="piston-rod">Piston Rod</TabsContent>
      </Tabs>
    </div>
  )
}

export default Resources
