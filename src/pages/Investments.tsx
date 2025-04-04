
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";
import { SipCalculator } from "@/components/calculators/SipCalculator";
import HlvCalculator from "@/components/calculators/HlvCalculator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Investments() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">Investment Tools</h1>
        <p className="text-lg text-muted-foreground">
          Calculate and plan your investments with our financial tools.
        </p>
      </div>

      <Tabs defaultValue="retirement">
        <TabsList className="grid w-full max-w-xl grid-cols-3">
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="sip">SIP</TabsTrigger>
          <TabsTrigger value="hlv">HLV</TabsTrigger>
        </TabsList>
        <TabsContent value="retirement">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Planning</CardTitle>
              <CardDescription>
                Calculate how much you need to save for a comfortable retirement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RetirementCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sip">
          <Card>
            <CardHeader>
              <CardTitle>Systematic Investment Plan</CardTitle>
              <CardDescription>
                Calculate returns on your regular investments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SipCalculator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hlv">
          <Card>
            <CardHeader>
              <CardTitle>Human Life Value</CardTitle>
              <CardDescription>
                Calculate your financial worth based on income potential and other factors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HlvCalculator />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
