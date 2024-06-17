'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs } from "@/components/ui/tabs"
import { ResponsiveLine } from "@nivo/line"
const LineChart = ({data}: {data: any}) => {
  return (
    <div className="aspect-[9/4]">
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: data
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={2}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        axisBottom={null}
        role="application"
      />
    </div>
  )
}

const StickersGraph = ({data, stickers, users}: {data: any, stickers: any, users: any}) => {
  return (
      
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Monthly Sales</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    A graph showing the daily stickers uploaded for this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart data={data}/>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total stickers created</CardDescription>
                  <CardTitle className="text-4xl">{stickers.length}</CardTitle>
                  <CardContent><div className="text-xs text-muted-foreground">and still counting...</div></CardContent>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total users registered</CardDescription>
                  <CardTitle className="text-4xl">{users.length}</CardTitle>
                  <CardContent><div className="text-xs text-muted-foreground">and still counting...</div></CardContent>
                </CardHeader>
              </Card>
            </div>
  )
}

export default StickersGraph;