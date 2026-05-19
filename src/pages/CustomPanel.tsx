import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const recentOrders = [
  { id: "KZ-901", customer: "Cliente 1", total: "$329.99", status: "pagado" },
  { id: "KZ-902", customer: "Cliente 2", total: "$89.50", status: "pendiente" },
  { id: "KZ-903", customer: "Cliente 3", total: "$249.00", status: "pagado" },
  { id: "KZ-904", customer: "Cliente 4", total: "$149.99", status: "enviado" },
];

export default function CustomPanel() {
  return (
    <section className="container py-10 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">HUD Kazuty Partz</h1>
          <p className="text-gray-600 dark:text-gray-300">Panel de control para ventas, stock y pedidos.</p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Input placeholder="Buscar pedido o cliente..." className="md:w-72" />
          <Button>Buscar</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardDescription>Ventas del dia</CardDescription><CardTitle className="text-2xl">$2,420</CardTitle></CardHeader><CardContent><Badge>+18.2%</Badge></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Pedidos</CardDescription><CardTitle className="text-2xl">52</CardTitle></CardHeader><CardContent><Badge variant="secondary">Tiempo real</Badge></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Conversion</CardDescription><CardTitle className="text-2xl">4.6%</CardTitle></CardHeader><CardContent><Progress value={46} /></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardDescription>Stock critico</CardDescription><CardTitle className="text-2xl">7 SKU</CardTitle></CardHeader><CardContent><Progress value={70} /></CardContent></Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList><TabsTrigger value="orders">Pedidos recientes</TabsTrigger><TabsTrigger value="stock">Alerta de stock</TabsTrigger></TabsList>
        <TabsContent value="orders" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Ultimos pedidos</CardTitle><CardDescription>Seguimiento rapido de ventas.</CardDescription></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Cliente</TableHead><TableHead>Total</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader>
                <TableBody>{recentOrders.map((order) => (<TableRow key={order.id}><TableCell>{order.id}</TableCell><TableCell>{order.customer}</TableCell><TableCell>{order.total}</TableCell><TableCell><Badge variant={order.status === "pendiente" ? "secondary" : "default"}>{order.status}</Badge></TableCell></TableRow>))}</TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stock" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Productos con poco stock</CardTitle><CardDescription>Prioriza reposicion.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-md border p-3"><p className="font-medium">Escape Pro Series</p><p className="text-sm text-muted-foreground">Stock disponible: 4 unidades</p></div>
              <div className="rounded-md border p-3"><p className="font-medium">Kit plasticos Racing</p><p className="text-sm text-muted-foreground">Stock disponible: 3 unidades</p></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
